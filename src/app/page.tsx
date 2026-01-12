"use client"
import api from '../api/api.js'
import { useState, useEffect } from 'react'
import ItemCard from '../components/Card/ItemCard'

interface ProductProps {
    id: number,
    name: string,
    description: string,
    price: number,
    image_url: string
}


export default function Home() {
  const [products, setProducts] = useState<ProductProps[]>([])

  useEffect(() => {
    const getProducts = async () => {
      const response = await api.get('/products')
      const data = response.data
      setProducts(data)
    }

    getProducts()
  }, [])

  return (
    <div className="container">
      {products.map(({id, name, description, price, image_url}) => {
        return (
          <ItemCard key={id} id={id} name={name} description={description} price={price} image={image_url}/>
        )
      })}
    </div>
  );
}
