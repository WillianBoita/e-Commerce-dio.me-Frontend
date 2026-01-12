"use client"
import Button from "@/src/components/Button/Button";
import api from "@/src/api/api";
import './product.css'
import { useState } from "react";
import { CartItem } from "@/src/components/CartModal/CartModal";

export default function Product() {
  const [products, setProducts] = useState<CartItem[]>([])

  const handleListProducts = async () => {
    const response = await api.get('/products')
    const data = response.data

    setProducts(data)
  }

  return (
    <div className="container products">
      <div className="product-actions">
        <Button className="btn blue" onClick={handleListProducts}>Listar Produtos</Button>
        <Button className="btn green">Criar Produto</Button>
        <Button className="btn yellow">Editar Produto</Button>
        <Button className="btn red">Deletar Produto</Button>
      </div>

      <div>
        {products.map((item) => (
          <div key={item.product_id}>
            <span>{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
