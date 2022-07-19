import React, { useCallback, useEffect, useState } from 'react'
// Business logic
import { getProductsByCount } from '@/functions/product'
// Components
import { Row, Spin } from 'antd'
import SectionContainer from '@/components/molecules/cards/Section/SectionContainer'
import SectionTitle from '@/components/molecules/cards/Section/SectionTitle'
import OfferProductCard from '@/components/molecules/cards/OfferProductCard'
import { Carousel } from 'react-responsive-carousel'
// Styles
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import SectionContent from '@/components/molecules/cards/Section/SectionContent'

const Recommendations = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [carouselProducts, setCarouselProducts] = useState([])

  // 1. load products by default on page load
  const loadAllProducts = useCallback(() => {
    getProductsByCount(18).then((p) => {
      setProducts(p.data)
      // Clustering of products x4
      const productsToCluster = Array(p.data.length / 6).fill([
        0, 0, 0, 0, 0, 0,
      ])
      p.data.forEach((product, idxProduct) => {
        const idxX = parseInt(idxProduct / 6)
        const idxY = idxProduct % 6
        productsToCluster[idxX][idxY] = product
      })
      setCarouselProducts(productsToCluster)
      // Hide spin
      setLoading(false)
    })
  }, [])

  useEffect(() => {
    if (!products.length) {
      setLoading(true)
      loadAllProducts()
    }
  }, [loadAllProducts, products.length])

  const CarouselPages =
    carouselProducts &&
    carouselProducts.length > 0 &&
    carouselProducts.map((carouselProduct, idxCarouselProduct) => (
      <Row
        key={idxCarouselProduct.toString()}
        justify="space-evenly"
        style={{
          height: '432px',
        }}
      >
        {carouselProduct.map((product, idxProduct) => (
          <OfferProductCard
            key={product._id}
            product={product}
            value={idxProduct + 1 + idxCarouselProduct * carouselProduct.length}
          />
        ))}
      </Row>
    ))

  return (
    <SectionContainer width="100%" id="Recommendations">
      <SectionTitle>RECOMENDACIONES</SectionTitle>
      <SectionContent padding="36px 52px">
        <Spin spinning={loading}>
          <Carousel
            centerSlidePercentage={100}
            interval={8000}
            transitionTime={2000}
            autoPlay
            infiniteLoop
            showArrows={false}
            centerMode={true}
            showStatus={false}
            showThumbs={false}
            showIndicators={false}
            thumbWidth={110}
          >
            {CarouselPages}
          </Carousel>
        </Spin>
      </SectionContent>
    </SectionContainer>
  )
}

export default Recommendations
