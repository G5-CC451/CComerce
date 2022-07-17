import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
// Components
import { Layout } from 'antd'
import { getProduct } from '@/functions/product'
import SingleProduct from '@/components/molecules/cards/SingleProduct'
import PublicBasic from '@/components/templates/public/Basic'

const { Content } = Layout

const Product = () => {
  const router = useRouter()
  // state
  const [product, setProduct] = useState({})
  // router
  const { slug } = router.query

  useEffect(() => {
    loadSingleProduct()
  }, [loadSingleProduct, slug])

  const loadSingleProduct = React.useCallback(() => {
    getProduct(slug).then((res) => {
      console.log('res.data', res.data)
      setProduct(res.data)
    })
  }, [slug])

  return (
    <PublicBasic>
      <Layout style={{ background: 'transparent' }}>
        <Content
          style={{
            padding: '16px',
            margin: '16px 0',
            minHeight: 330,
          }}
        >
          <h2>Título del producto</h2>
          <SingleProduct />
        </Content>
      </Layout>
    </PublicBasic>
  )
}

export default Product
