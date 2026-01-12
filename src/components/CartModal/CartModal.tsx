"use client"
import Button from '../Button/Button'
import './cartModal.css'
import { useEffect, useState } from 'react'

export interface CartItem {
  product_id: number
  name: string
  price: number
  quantity: number
}

interface CartModalProps {
  onClose: () => void
}

export default function CartModal({ onClose }: CartModalProps) {
  const [products, setProducts] = useState<CartItem[]>([])

  function deleteCartItem(selectedItem: CartItem){
    const cart = JSON.parse(
      localStorage.getItem('cart') || '[]'
    ) as CartItem[]

    const updatedCart = cart.filter((item) => item.product_id !== selectedItem.product_id)

    setProducts(updatedCart)
    localStorage.setItem('cart', JSON.stringify(cart.filter((item) => item.product_id !== selectedItem.product_id)))
  }

  function buyCartItems() {
    const cart = JSON.parse(
      localStorage.getItem('cart') || '[]'
    ) as CartItem[]

    alert("Itens Comprados: " + cart.map(item => item.name) + " Valor: R$ " + total.toFixed(2))
    setProducts([])
    localStorage.setItem('cart', '')
  }

  useEffect(() => {
    const cart = JSON.parse(
      localStorage.getItem('cart') || '[]'
    ) as CartItem[]

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setProducts(cart)
  }, [])

  const total = products.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="cart-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="close-btn" onClick={onClose}>
          ✕
        </button>

        <h1>Carrinho de Compras</h1>

        {products.length === 0 && (
          <p>Carrinho vazio 😢</p>
        )}
        
        {products.map((item) => (
          <div className="cart-item" key={item.product_id}>
            <div>
              <span>{item.name} </span>
              <span>x{item.quantity} </span>
              <span>
                R$ {(item.price * item.quantity).toFixed(2)}
              </span>
            </div>
            <Button className='delete-btn' type='button' onClick={() => deleteCartItem(item)}>🗑</Button>
          </div>
        ))}

        {products.length > 0 && (
          <div className="cart-total">
            <div>
              <strong>Total: </strong>
              <span>R$ {total.toFixed(2)}</span>
            </div>
            <Button className='finalize-btn' type='button' onClick={() => buyCartItems()}>Finalizar compra</Button>
          </div>
        )}
      </div>
    </div>
  )
}
