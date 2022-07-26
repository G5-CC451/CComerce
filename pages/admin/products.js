import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
// Business logic
import { getProductsByCount, removeProduct } from '@/functions/product'
// Components
import { Col, notification, Row } from 'antd'
import AdminNav from '@/components/molecules/nav/AdminNav'
import AdminProductCard from '@/components/molecules/cards/AdminProductCard'
import PublicBasic from '@/components/templates/public/Basic'

const AllProducts = () => {
  const { user } = useSelector((state) => ({ ...state }))

  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    loadAllProducts()
  }, [])

  const loadAllProducts = () => {
    setLoading(true)
    getProductsByCount(100)
      .then((res) => {
        setProducts(res.data)
        setLoading(false)
      })
      .catch((err) => {
        setLoading(false)
        console.log(err)
      })
  }

  const handleRemove = (slug) => {
    if (window.confirm('¿Desea eliminar producto?')) {
      setLoading(true)
      removeProduct(slug, user.token)
        .then((res) => {
          setLoading(false)
          notification.success({
            message: 'Producto eliminado',
            description: `¡Producto "${res.data.name}" fue eliminado satisfactoriamente!`,
          })
          loadAllProducts()
        })
        .catch((err) => {
          if (err.response.status === 400) {
            setLoading(false)
            notification.error({
              message: 'Error al eliminar producto',
              description: err.response.data,
            })
          }
        })
    }
  }

  return (
    <PublicBasic>
      <div className="container-fluid">
        <Row>
          <Col span={4}>
            <AdminNav />
          </Col>

          <Col span={20}>
            {loading ? (
              <h4 className="text-danger">Cargando...</h4>
            ) : (
              <h4>Productos</h4>
            )}
            <Row gutter={16}>
              {products.map((product) => (
                <Col key={product._id} span={6} style={{ paddingBottom: 24 }}>
                  <AdminProductCard
                    product={product}
                    handleRemove={handleRemove}
                  />
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </div>
    </PublicBasic>
  )
}

export default AllProducts
