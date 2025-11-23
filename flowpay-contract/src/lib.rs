#![cfg_attr(not(feature = "export-abi"), no_main)]
extern crate alloc;

use stylus_sdk::{
    alloy_primitives::{Address, U256, FixedBytes},
    prelude::*,
};
use alloy_sol_types::sol;
use alloc::vec::Vec;
use alloc::string::String;

// ============================================================================
// EVENTS
// ============================================================================

sol! {
    event BatchPaymentExecuted(
        address indexed sender,
        address indexed token,
        uint256 total_amount,
        uint256 recipient_count
    );

    event GiftCardCreated(
        uint256 indexed card_id,
        address indexed creator,
        address indexed token,
        uint256 amount
    );

    event GiftCardClaimed(
        uint256 indexed card_id,
        address indexed claimer,
        uint256 amount
    );
}

// ============================================================================
// ERRORS
// ============================================================================

sol! {
    error InvalidLength();
    error ZeroAddress();
    error ZeroAmount();
    error TransferFailed();
    error AlreadyClaimed();
    error InvalidCode();
    error CardNotFound();
}

// Error enum for Result types
#[derive(SolidityError)]
pub enum FlowPayError {
    InvalidLength(InvalidLength),
    ZeroAddress(ZeroAddress),
    ZeroAmount(ZeroAmount),
    TransferFailed(TransferFailed),
    AlreadyClaimed(AlreadyClaimed),
    InvalidCode(InvalidCode),
    CardNotFound(CardNotFound),
}

// ============================================================================
// STORAGE
// ============================================================================

sol_storage! {
    #[entrypoint]
    pub struct FlowPay {
        uint256 card_counter;
        mapping(uint256 => GiftCard) cards;
        mapping(bytes32 => uint256) code_to_card;
    }

    pub struct GiftCard {
        address creator;
        address token;
        uint256 amount;
        address claimer;
    }
}

// ============================================================================
// ERC20 INTERFACE
// ============================================================================

sol_interface! {
    interface IERC20 {
        function transferFrom(address from, address to, uint256 amount) external returns (bool);
        function transfer(address to, uint256 amount) external returns (bool);
    }
}

// ============================================================================
// IMPLEMENTATION
// ============================================================================

#[public]
impl FlowPay {

    pub fn batch_payment(
        &mut self,
        recipients: Vec<Address>,
        amounts: Vec<U256>,
        token: Address,
    ) -> Result<(), FlowPayError> {
        if recipients.len() != amounts.len() || recipients.is_empty() {
            return Err(FlowPayError::InvalidLength(InvalidLength {}));
        }

        let mut total = U256::ZERO;
        for (i, recipient) in recipients.iter().enumerate() {
            if *recipient == Address::ZERO {
                return Err(FlowPayError::ZeroAddress(ZeroAddress {}));
            }
            if amounts[i] == U256::ZERO {
                return Err(FlowPayError::ZeroAmount(ZeroAmount {}));
            }
            total += amounts[i];
        }

        let sender = self.vm().msg_sender();
        let contract_addr = self.vm().contract_address();
        let erc20 = IERC20::new(token);

        // FIX: Use &mut *self instead of self
        let success = erc20.transfer_from(&mut *self, sender, contract_addr, total)
            .map_err(|_| FlowPayError::TransferFailed(TransferFailed {}))?;

        if !success {
            return Err(FlowPayError::TransferFailed(TransferFailed {}));
        }

        for (i, recipient) in recipients.iter().enumerate() {
            // FIX: Use &mut *self instead of self
            let success = erc20.transfer(&mut *self, *recipient, amounts[i])
                .map_err(|_| FlowPayError::TransferFailed(TransferFailed {}))?;

            if !success {
                return Err(FlowPayError::TransferFailed(TransferFailed {}));
            }
        }

        log(self.vm(), BatchPaymentExecuted {
            sender,
            token,
            total_amount: total,
            recipient_count: U256::from(recipients.len()),
        });

        Ok(())
    }

    pub fn create_giftcard(
        &mut self,
        token: Address,
        amount: U256,
        code_hash: FixedBytes<32>,
    ) -> Result<U256, FlowPayError> {
        if amount == U256::ZERO {
            return Err(FlowPayError::ZeroAmount(ZeroAmount {}));
        }

        let existing_id = self.code_to_card.get(code_hash);
        if existing_id != U256::ZERO {
            return Err(FlowPayError::InvalidCode(InvalidCode {}));
        }

        let sender = self.vm().msg_sender();
        let contract_addr = self.vm().contract_address();
        let erc20 = IERC20::new(token);

        // FIX: Use &mut *self instead of self
        let success = erc20.transfer_from(&mut *self, sender, contract_addr, amount)
            .map_err(|_| FlowPayError::TransferFailed(TransferFailed {}))?;

        if !success {
            return Err(FlowPayError::TransferFailed(TransferFailed {}));
        }

        let mut counter = self.card_counter.get();
        counter += U256::from(1);
        self.card_counter.set(counter);

        let card_id = counter;

        let mut card = self.cards.setter(card_id);
        card.creator.set(sender);
        card.token.set(token);
        card.amount.set(amount);
        card.claimer.set(Address::ZERO);

        self.code_to_card.insert(code_hash, card_id);

        log(self.vm(), GiftCardCreated {
            card_id,
            creator: sender,
            token,
            amount,
        });

        Ok(card_id)
    }

    pub fn claim_giftcard(
        &mut self,
        code: String,
        recipient: Address,
    ) -> Result<(), FlowPayError> {
        if recipient == Address::ZERO {
            return Err(FlowPayError::ZeroAddress(ZeroAddress {}));
        }

        use stylus_sdk::alloy_primitives::keccak256;
        let code_hash = keccak256(code.as_bytes());

        let card_id = self.code_to_card.get(code_hash);
        if card_id == U256::ZERO {
            return Err(FlowPayError::CardNotFound(CardNotFound {}));
        }

        let card = self.cards.getter(card_id);
        let claimer = card.claimer.get();

        if claimer != Address::ZERO {
            return Err(FlowPayError::AlreadyClaimed(AlreadyClaimed {}));
        }

        let token = card.token.get();
        let amount = card.amount.get();

        let erc20 = IERC20::new(token);

        // FIX: Use &mut *self instead of self
        let success = erc20.transfer(&mut *self, recipient, amount)
            .map_err(|_| FlowPayError::TransferFailed(TransferFailed {}))?;

        if !success {
            return Err(FlowPayError::TransferFailed(TransferFailed {}));
        }

        let mut card_mut = self.cards.setter(card_id);
        card_mut.claimer.set(recipient);

        log(self.vm(), GiftCardClaimed {
            card_id,
            claimer: recipient,
            amount,
        });

        Ok(())
    }

    pub fn get_giftcard(&self, card_id: U256) -> Result<(Address, Address, U256, Address, bool), FlowPayError> {
        if card_id == U256::ZERO || card_id > self.card_counter.get() {
            return Err(FlowPayError::CardNotFound(CardNotFound {}));
        }

        let card = self.cards.getter(card_id);
        let creator = card.creator.get();
        let token = card.token.get();
        let amount = card.amount.get();
        let claimer = card.claimer.get();
        let is_claimed = claimer != Address::ZERO;

        Ok((creator, token, amount, claimer, is_claimed))
    }

    pub fn get_card_by_code(&self, code_hash: FixedBytes<32>) -> U256 {
        self.code_to_card.get(code_hash)
    }

    pub fn get_card_count(&self) -> U256 {
        self.card_counter.get()
    }
}