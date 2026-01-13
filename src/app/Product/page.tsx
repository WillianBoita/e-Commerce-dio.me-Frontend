"use client"

import React, { useState } from "react"
import Button from "@/src/components/Button/Button"
import api from "@/src/api/api"
import "./product.css"

interface Product {
  id: number
  name: string
  description: string
  price: number
  image_url: string
}

interface ProductForm {
  name: string
  description: string
  price: number
  image_url: string
}

export default function Product() {
  const [products, setProducts] = useState<Product[]>([])
  const [isActive, setIsActive] = useState(false)
  const [loading, setLoading] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)

  const [form, setForm] = useState<ProductForm>({
    name: "",
    description: "",
    price: 0,
    image_url: ""
  })

  const resetForm = () => {
    setForm({
      name: "",
      description: "",
      price: 0,
      image_url: ""
    })
    setEditingProduct(null)
  }

  const toggleForm = () => {
    setIsActive(prev => !prev)
    resetForm()
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    setForm(prev => ({
      ...prev,
      [name]: name === "price" ? Number(value) : value
    }))
  }

  const handleListProducts = async () => {
    const response = await api.get("/products")
    setProducts(response.data)
  }

  const handleCreateProduct = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault()

    if (!form.name || !form.price) {
      alert("Preencha nome e preço")
      return
    }

    try {
      setLoading(true)

      await api.post("/products", form)

      alert("Produto cadastrado com sucesso!")
      resetForm()
      setIsActive(false)
      handleListProducts()
    } catch (err) {
      alert("Erro ao cadastrar produto.")
    } finally {
      setLoading(false)
    }
  }

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product)
    setIsActive(true)

    setForm({
      name: product.name,
      description: product.description,
      price: product.price,
      image_url: product.image_url
    })
  }

  const handleUpdateProduct = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault()

    if (!editingProduct) return

    try {
      setLoading(true)

      await api.put(`/products/${editingProduct.id}`, form)

      alert("Produto atualizado!")
      resetForm()
      setIsActive(false)
      handleListProducts()
    } catch (err) {
      alert("Erro ao atualizar produto.")
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteProduct = async (product: Product) => {
    const confirmDelete = window.confirm(
      `Deseja realmente apagar "${product.name}"?`
    )

    if (!confirmDelete) return

    try {
      await api.delete(`/products/${product.id}`)
      handleListProducts()
    } catch {
      alert("Erro ao deletar produto.")
    }
  }

  return (
    <div className="container products">
      <div className="product-actions">
        <Button className="btn blue" onClick={handleListProducts}>
          Listar Produtos
        </Button>

        <Button className="btn green" onClick={toggleForm}>
          {isActive ? "Cancelar" : "Criar Produto"}
        </Button>
      </div>

      {isActive && (
        <form
          className="create-product-form"
          onSubmit={editingProduct ? handleUpdateProduct : handleCreateProduct}
        >
          <div>
            <label className="input-label">Nome</label>
            <input
              className="input"
              name="name"
              value={form.name}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="input-label">Descrição</label>
            <input
              className="input"
              name="description"
              value={form.description}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="input-label">Preço</label>
            <input
              className="input"
              type="number"
              name="price"
              value={form.price}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="input-label">Imagem (URL)</label>
            <input
              className="input"
              name="image_url"
              value={form.image_url}
              onChange={handleChange}
            />
          </div>

          <button className="btn submit" disabled={loading}>
            {loading
              ? "Salvando..."
              : editingProduct
              ? "Salvar"
              : "Criar"}
          </button>
        </form>
      )}

      <div className="product-list">
        {products.map(product => (
          <div className="product" key={product.id}>
            <span>{product.name}</span>

            <div>
              <button
                className="btn-icon"
                onClick={() => handleEditProduct(product)}
              >
                ✏️
              </button>

              <button
                className="btn-icon"
                onClick={() => handleDeleteProduct(product)}
              >
                🗑️
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
