import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
// Business logic
import { getProductsByCount, fetchProductsByFilter } from '@/functions/product'
import { getCategories } from '@/functions/category'
import { getSubs } from '@/functions/sub'
// Components
import ProductCard from '@/components/molecules/cards/ProductCard'
import PublicBasic from '@/components/templates/public/Basic'
import { Col, Row } from 'antd'

const Shop = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [price, setPrice] = useState([0, 0])
  const [ok, setOk] = useState(false)
  const [categories, setCategories] = useState([])
  const [subs, setSubs] = useState([])

  const { search } = useSelector((state) => ({ ...state }))
  const { text } = search

  useEffect(() => {
    loadAllProducts()
    // fetch categories
    getCategories().then((res) => setCategories(res.data))
    // fetch subcategories
    getSubs().then((res) => setSubs(res.data))
  }, [])

  const fetchProducts = (arg) => {
    fetchProductsByFilter(arg).then((res) => {
      setProducts(res.data)
      // setProducts([...res.data, ...res.data, ...res.data])
    })
  }

  // 1. load products by default on page load
  const loadAllProducts = () => {
    getProductsByCount(12).then((p) => {
      setProducts(p.data)
      // setProducts([...p.data, ...p.data, ...p.data])
      setLoading(false)
    })
  }

  // 2. load products on user search input
  useEffect(() => {
    const delayed = setTimeout(() => {
      fetchProducts({ query: text })
      if (!text) {
        loadAllProducts()
      }
    }, 300)
    return () => clearTimeout(delayed)
  }, [text])

  // 3. load products based on price range
  useEffect(() => {
    console.log('ok to request')
    fetchProducts({ price })
  }, [ok, price])
  console.log('shop-products', products)

  return (
    <PublicBasic>
      {loading ? (
        <h2>Cargando...</h2>
      ) : (
        <React.Fragment>
          <h2 style={{ margin: '24px 0px 24px 48px' }}>
            Resultados de Búsqueda
          </h2>
          <Row gutter={[16, 32]} justify="space-around" align="middle">
            {products.length < 1 ? (
              <Col>No se encontraron productos</Col>
            ) : (
              products &&
              products.length > 0 &&
              products.map((product, idx) => (
                <Col key={product._id} span={6}>
                  <ProductCard product={product} value={idx + 1} />
                </Col>
              ))
            )}
          </Row>
        </React.Fragment>
      )}
    </PublicBasic>
  )
}

export default Shop
