import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Home from "../pages/Home";
import CreateGiftCard from "../pages/CreateGiftCard";
import ClaimGiftCard from "../pages/ClaimGiftCard";
import BatchPayment from "../pages/BatchPayment";
import ViewCard from "../pages/ViewCard";
import About from "../pages/About";
import Services from "../pages/Services";
import Contact from "../pages/Contact";

export default function Router(){
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="max-w-6xl mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<CreateGiftCard />} />
          <Route path="/claim" element={<ClaimGiftCard />} />
          <Route path="/batch" element={<BatchPayment />} />
          <Route path="/card/:id" element={<ViewCard />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}
