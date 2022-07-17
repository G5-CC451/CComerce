import React, { useEffect, useState } from 'react'
// Business logic
import { getProducts, getProductsCount } from '@/functions/product'
// Components
import { Pagination } from 'antd'
import ProductCard from '@/components/molecules/cards/ProductCard'
import LoadingCard from '@/components/molecules/cards/LoadingCard'

const BestSellers = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [productsCount, setProductsCount] = useState(0)
  const [page, setPage] = useState(1)

  useEffect(() => {
    loadAllProducts()
  }, [loadAllProducts, page])

  useEffect(() => {
    getProductsCount().then((res) => setProductsCount(res.data))
  }, [])

  const loadAllProducts = React.useCallback(() => {
    setLoading(true)
    // sort, order, limit
    getProducts('sold', 'desc', page).then((res) => {
      setProducts(res.data)
      setLoading(false)
    })
  }, [page])

  return (
    <React.Fragment>
      <div className="container">
        {loading ? (
          <LoadingCard count={3} />
        ) : (
          <div className="row">
            {products.map((product) => (
              <div key={product._id} className="col-md-4">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="row">
        <nav className="col-md-4 offset-md-4 text-center pt-5 p-3">
          <Pagination
            current={page}
            total={(productsCount / 3) * 10}
            onChange={(value) => setPage(value)}
          />
        </nav>
      </div>
    </React.Fragment>
  )
}

export default BestSellers
