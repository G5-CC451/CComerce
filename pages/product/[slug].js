import React, { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
// Components
import { Layout, Spin } from 'antd'
import { getProduct } from '@/functions/product'
import SingleProduct from '@/components/molecules/cards/SingleProduct'
import PublicBasic from '@/components/templates/public/Basic'

const { Content } = Layout

const Product = () => {
  const router = useRouter()
  // state
  const [loading, setLoading] = useState(true)
  const [product, setProduct] = useState(undefined)
  // router
  const { slug } = router.query

  useEffect(() => {
    if (!product) {
      loadSingleProduct()
    }
  }, [loadSingleProduct, product, slug])

  const loadSingleProduct = useCallback(() => {
    setLoading(true)
    getProduct(slug).then((res) => {
      console.log('res.data', res.data)
      setProduct(res.data)
      setLoading(false)
    })
  }, [slug])

  return (
    <PublicBasic>
      <Layout style={{ background: 'transparent' }}>
        <Spin spinning={loading}>
          {product && (
            <Content
              style={{
                padding: '16px',
                margin: '16px 0',
                minHeight: 330,
              }}
            >
              {product && <SingleProduct product={product} />}
            </Content>
          )}
        </Spin>
      </Layout>
    </PublicBasic>
  )
}

export default Product
