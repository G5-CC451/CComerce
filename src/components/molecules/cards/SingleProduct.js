import React, { useState } from 'react'
import Image from 'next/image'
import styled from '@emotion/styled'
// Components
import { Col, Row } from 'antd'
import { Carousel } from 'react-responsive-carousel'
// Styles
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import SectionContainer from './Section/SectionContainer'

import ImagenProducto from '@/assets/images/imagen-producto.png'

// this is childrend component of Product page
const SingleProduct = () => {
  const [productQty, setProductQty] = useState(10)

  const productCarousel = Array(4).fill(
    <Image src={ImagenProducto.src} alt="Imagen del producto" />
  )
  const BtnQtyStyle = {
    width: '30px',
    height: '30px',
    color: '#D9D9D9',
    background: '#FF9E6D',
    border: '1px solid #FFC759',
    borderRadius: '50%',
    fontSize: '36px',
    //margin: "auto",
    fontSize: '16px',
    fontWeight: '700',
    textAlign: 'center',
    cursor: 'pointer',
  }

  const BtnActionsStyle = {
    width: '255px',
    height: '48px',
    background: '#D9D9D9',
    border: '1px solid #000000',
    borderRadius: '20px',
    fontSize: '40px',
    lineHeight: '48px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    cursor: 'pointer',
  }

  const CustomCarousel = styled(Carousel)`
    &&& > .carousel .carousel-slider {
      margin: 'auto';
    }
  `

  return (
    <Row gutter={32}>
      <Col span={10} offset={2} style={{ display: 'flex' }}>
        <SectionContainer height="840px" padding="20px">
          <CustomCarousel
            width={689}
            style={{ margin: 'auto !important' }}
            centerSlidePercentage={100}
            autoPlay
            infiniteLoop
            dynamicHeight={true}
            showIndicators={false}
            showArrows={true}
            centerMode={true}
            showStatus={false}
            showThumbs={true}
            thumbWidth={110}
          >
            {productCarousel}
          </CustomCarousel>
        </SectionContainer>
      </Col>
      <Col span={12}>
        <div
          style={{
            width: '577px',
            height: '442px',
            background: '#D9D9D9',
            border: '1px solid #FFC759',
            borderRadius: '20px',
            marginTop: '48px',
            padding: '32px',
          }}
        >
          <Row gutter={16}>
            <Col span={24}>
              <h3>Descripción</h3>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <p style={{ fontSize: '20px' }}>
                Lorem itsum cirrus cuagonus atmosfericus a the webonus fa at
                mosfer the wemesierum, winwardium leviosa.
              </p>
            </Col>
          </Row>
          <h3>Precio</h3>
          <Row
            gutter={16}
            style={{
              width: '411px',
              height: '67px',
              background: '#FF9E6D',
              border: '3px solid #FFC759',
              borderRadius: '18px',
              fontSize: '36px',
              margin: 'auto',
              padding: '0 20px',
              marginBottom: '16px',
            }}
          >
            <Col span={4}>S/ </Col>
            <Col span={20} style={{ textAlign: 'right' }}>
              999.99
            </Col>
            <small
              style={{
                width: '100%',
                textAlign: 'end',
                fontSize: '12px',
                lineHeight: '36px',
              }}
            >
              Incluye IGV
            </small>
          </Row>
          <h3>Cantidad</h3>
          <Row gutter={16}>
            <Col
              span={11}
              style={{
                justifyContent: 'end',
                display: 'flex',
                paddingTop: '8px',
              }}
            >
              <p
                style={BtnQtyStyle}
                onClick={() => {
                  setProductQty(productQty - 1)
                }}
              >
                -
              </p>
            </Col>
            <Col span={2} style={{ textAlign: 'center', fontSize: '24px' }}>
              {productQty}
            </Col>
            <Col
              span={11}
              style={{
                justifyContent: 'start',
                display: 'flex',
                paddingTop: '8px',
              }}
            >
              <p
                style={BtnQtyStyle}
                onClick={() => {
                  setProductQty(productQty + 1)
                }}
              >
                +
              </p>
            </Col>
          </Row>
        </div>
        <Row
          gutter={16}
          style={{
            marginTop: '32px',
            width: '640px',
          }}
        >
          <Col span={12}>
            <div style={BtnActionsStyle}>COMPRAR</div>
          </Col>
          <Col span={12}>
            <div style={BtnActionsStyle}>AÑADIR</div>
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

export default SingleProduct
