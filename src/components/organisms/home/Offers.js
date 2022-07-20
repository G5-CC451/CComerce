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

const Offers = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [carouselProducts, setCarouselProducts] = useState([])

  // 1. load products by default on page load
  const loadAllProducts = useCallback(() => {
    getProductsByCount(12).then((p) => {
      setProducts(p.data)
      // Clustering of products x3
      const productsToCluster = Array(p.data.length / 3).fill([0, 0, 0])
      p.data.forEach((product, idxProduct) => {
        const idxX = parseInt(idxProduct / 3)
        const idxY = idxProduct % 3
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
          height: '320px',
        }}
      >
        {carouselProduct.map((product, idxProduct) => (
          <OfferProductCard
            id={`oferta-${
              idxProduct + 1 + idxCarouselProduct * carouselProduct.length
            }`}
            key={product._id}
            product={product}
            value={idxProduct + 1 + idxCarouselProduct * carouselProduct.length}
          />
        ))}
      </Row>
    ))

  return (
    <SectionContainer width="100%" id="Offers">
      <SectionTitle width="295px">OFERTAS</SectionTitle>
      <SectionContent padding="12px 16px">
        <Spin spinning={loading}>
          <Carousel
            style={{ margin: 'auto !important' }}
            centerSlidePercentage={100}
            interval={5000}
            transitionTime={1200}
            autoPlay
            infiniteLoop
            showArrows={true}
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

export default Offers
