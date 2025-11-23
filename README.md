# FlowPay

FlowPay is a **Web3-based payment and giftcard platform** designed to simplify token management and cryptocurrency transactions. The platform allows users to create ERC20-based giftcards, perform batch payments, and securely claim tokens using a browser wallet like MetaMask. Built with **React**, **TailwindCSS**, and **ethers.js**, FlowPay provides a seamless interface to interact with smart contracts on Ethereum-compatible networks.

---

## Features

* **Create Giftcards:** Generate ERC20 token giftcards with unique codes.
* **Claim Giftcards:** Redeem tokens securely to your wallet.
* **Batch Payments:** Send tokens to multiple recipients in a single transaction.
* **Wallet Integration:** Connect your MetaMask or other Ethereum-compatible wallet.
* **Interactive UI:** Clean and modern UI with animations powered by Framer Motion.

---

## Tech Stack

* **Frontend:** React, TailwindCSS, Framer Motion
* **Blockchain:** Solidity smart contracts deployed via Remix or local development nodes
* **Web3 Interaction:** ethers.js
* **Development Tools:** Vite, Node.js, npm

---

## Folder Structure

```
flow-pay/
├── flowpay-frontend/   # React frontend
├── flowpay-contract/   # Smart contracts (ERC20, Giftcard)
└── nitro-devnode/      # Local blockchain development node
```

---

## Getting Started

### Prerequisites

* Node.js >= 18.x
* npm >= 9.x
* MetaMask browser extension
* (Optional) Local Ethereum node like Nitro DevNode

### Installation

1. Clone the repository:

```bash
git clone https://github.com/Biswadaya/Flow-Pay.git
cd Flow-Pay
```

2. Navigate to the frontend folder and install dependencies:

```bash
cd flowpay-frontend
npm install
```

3. Start the development server:

```bash
npm run dev
```

The frontend will be available at `http://localhost:5173` (Vite default port).

---

## Environment Variables

Create a `.env` file in the `flowpay-frontend` folder and add:

```bash
VITE_RPC_URL=<YOUR_RPC_URL>
VITE_PRIVATE_KEY=<YOUR_WALLET_PRIVATE_KEY>
VITE_CONTRACT_ADDRESS=<DEPLOYED_CONTRACT_ADDRESS>
```

> **Note:** Keep your private key secure and never commit it to the repository.

---

## Usage

1. Open the frontend in your browser.
2. Connect your wallet via MetaMask using the **Connect Wallet** button.
3. Navigate to **Create Giftcard** or **Batch Payment** pages.
4. Enter the required details and execute transactions.
5. Track token balances and claimed giftcards in real-time.

---

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch: `git checkout -b feature/your-feature`
3. Make your changes and commit: `git commit -m "Add some feature"`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a Pull Request

---

## License

This project is licensed under the MIT License.

---

## Screenshots

*Add screenshots of your homepage, giftcard creation page, and batch payment page here to showcase the UI.*

---

## Contact

* **Developer:** Aadit
* **GitHub:** [https://github.com/Biswadaya](https://github.com/Biswadaya)
* **Project:** FlowPay - Web3 Payment & Giftcard Platform
