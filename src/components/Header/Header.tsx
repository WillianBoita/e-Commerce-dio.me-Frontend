"use client"
import Link from "next/link";
import { useState } from "react";
import CartModal from "../CartModal/CartModal";
import './header.css'

export default function Header() {
  const [isCartOpen, setIsCartOpen] = useState(false)


  return (
    <header className="header">
      <h1>Dio Shopping</h1>
      <div className="link-area">
        <Link className="header-link" href='/'>Home</Link>
        <button
        className="btn"
        onClick={() => setIsCartOpen(true)}
      >
        🛒 Carrinho
      </button>

      {isCartOpen && (
        <CartModal onClose={() => setIsCartOpen(false)} />
      )}
      </div>
    </header>
  )
}
