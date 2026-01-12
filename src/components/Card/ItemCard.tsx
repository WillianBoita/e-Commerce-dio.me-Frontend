import './card.css'

interface CardProps {
  id: number,
  name: string,
  description: string,
  price: number,
  image: string,
}

interface Product {
  id: number
  name: string
  price: number
}

export interface CartItem {
  product_id: number
  name: string
  price: number
  quantity: number
}
export default function Card({ id, name, description, price, image }: CardProps) {

  function getCart(): CartItem[] {
    return JSON.parse(localStorage.getItem('cart') || '[]')
  }
  
  function saveCart(cart: CartItem[]): void {
    localStorage.setItem('cart', JSON.stringify(cart))
  }
  

  function addToCart({id, name, price}: Product): void {
    const cart = getCart()
  
    const existing = cart.find(
      (item) => item.product_id === id
    )
  
    if (existing) {
      existing.quantity += 1
    } else {
      cart.push({
        product_id: id,
        name: name,
        price: price,
        quantity: 1
      })
    }
  
    saveCart(cart)
  }

  return (
    <div className="card">
      <div className="card-body">
        <div>
          <h2 className="card-title">{name}</h2>
          <p className="card-text">{description}</p>
        </div>
        <img className='card-image' src={image} alt={name}></img>
        <div className='sub-container'>
          <p className="card-price">R$ {price}</p>
          <button className='btn' type='button' onClick={() => addToCart({id, name, price})}>Adicionar ao carrinho</button>
        </div>
      </div>
    </div>
  )
}
