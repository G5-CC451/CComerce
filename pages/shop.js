import React, { useState, useEffect, useCallback } from 'react'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'
// Business logic
import { getProductsByCount, fetchProductsByFilter } from '@/functions/product'
// Components
import ProductCard from '@/components/molecules/cards/ProductCard'
import PublicBasic from '@/components/templates/public/Basic'
import { Col, Row } from 'antd'

const Shop = () => {
  // Params
  const router = useRouter()
  const { searchBy, searchText } = router.query

  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)

  const { search } = useSelector((state) => ({ ...state }))
  const { text } = search

  const fetchProducts = useCallback((arg) => {
    fetchProductsByFilter(arg).then((res) => {
      setProducts(res.data)
    })
  }, [])

  // 1. load products by default on page load
  const loadAllProducts = useCallback(() => {
    getProductsByCount(12).then((p) => {
      setProducts(p.data)
      setLoading(false)
    })
  }, [])

  // 2. load products on user search input
  useEffect(() => {
    if (text !== '') {
      fetchProducts({ query: text })
      loadAllProducts()
    }
  }, [fetchProducts, loadAllProducts, text])

  // 3. load products based
  useEffect(() => {
    if (searchBy && searchText) {
      fetchProducts({ [searchBy]: searchText })
    }
  }, [fetchProducts, searchBy, searchText])

  const colSpan = {
    xs: 24,
    sm: 12,
    md: 8,
    lg: 6,
    xl: 6,
  }

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
                <Col key={product._id} {...colSpan}>
                  <ProductCard
                    id={`compra-${idx + 1}`}
                    product={product}
                    value={idx + 1}
                  />
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
