/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react'
import router from 'next/router'
import styled from '@emotion/styled'
import _ from 'lodash'
import { useDispatch } from 'react-redux'
// Components
import { Col, notification, Row } from 'antd'
import { Carousel } from 'react-responsive-carousel'
import SectionContainer from './Section/SectionContainer'
// Styles
import 'react-responsive-carousel/lib/styles/carousel.min.css'

const SingleProductContainer = styled.div`
  width: 577px;
  height: 442px;
  background: #d9d9d9;
  border: 1px solid #ffc759;
  border-radius: 20px;
  margin-top: 16px;
  padding: 32px;
`

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
  &&& {
    margin: auto;
    height: 790px;
    overflow: hidden;

    & > div {
      margin: auto;
    }

    & > .carousel .thumbs-wrapper {
      margin: 20px 20px 20px -20px;
    }

    & > .carousel .thumb {
      margin-right: 3px;
      border: 3px solid #fee60c;
    }
  }
`

// this is childrend component of Product page
const SingleProduct = ({ product }) => {
  const dispatch = useDispatch()

  const [productQty, setProductQty] = useState(0)
  const [isFoundCart, setIsFoundCart] = useState(false)

  const productCarousel = product.images.map((productImage) => (
    <img
      key={productImage.public_id}
      id={productImage.public_id}
      src={productImage.url}
      alt={product.title}
    />
  ))

  const handleQuantityChange = (count) => {
    if (count > product.quantity) {
      notification.error({
        message: 'Cantidad no válida',
        description: `Máxima cantidad disponible: ${p.quantity}. Por favor, intente con una cantidad menor.`,
      })
      return
    }

    // Mostrar cantidad en la vista
    setProductQty(count)

    // Respalda la cantidad seleccionada solo si el producto ya está en el carrito de compras
    let cart = []
    if (typeof window !== 'undefined') {
      if (localStorage.getItem('cart')) {
        cart = JSON.parse(localStorage.getItem('cart'))
      }

      cart.map((cartProduct, i) => {
        if (cartProduct._id == product._id) {
          cart[i].count = count
        }
      })

      localStorage.setItem('cart', JSON.stringify(cart))
      dispatch({
        type: 'ADD_TO_CART',
        payload: cart,
      })
    }
  }

  const handleAddToCart = () => {
    // create cart array
    let cart = []
    if (typeof window !== 'undefined') {
      // if cart is in local storage GET it
      if (localStorage.getItem('cart')) {
        cart = JSON.parse(localStorage.getItem('cart'))
      }
      // push new product to cart
      cart.push({
        ...product,
        count: productQty,
      })
      // remove duplicates
      const unique = _.uniqWith(cart, _.isEqual)
      // save to local storage
      // console.log('unique', unique)
      localStorage.setItem('cart', JSON.stringify(unique))
      // show notification
      notification.success({
        message: 'Agregado al carrito',
        description: `El producto "${product.title}" se agregó al carrito.`,
      })

      // add to reeux state
      dispatch({
        type: 'ADD_TO_CART',
        payload: unique,
      })
      // show cart items in side drawer
      dispatch({
        type: 'SET_VISIBLE',
        payload: true,
      })
    }
  }

  const handleToBuy = () => {
    // create cart array
    let cart = []
    if (typeof window !== 'undefined') {
      // if cart is in local storage GET it
      if (localStorage.getItem('cart')) {
        cart = JSON.parse(localStorage.getItem('cart'))
      }
      // push new product to cart
      cart = [
        {
          ...product,
          count: productQty,
        },
      ]
      // remove duplicates
      const unique = _.uniqWith(cart, _.isEqual)
      // save to local storage
      // console.log('unique', unique)
      localStorage.setItem('cart', JSON.stringify(unique))
      // show notification
      notification.success({
        message: 'Agregado al carrito para compra',
        description: `El producto "${product.title}" se agregó al carrito.`,
      })

      // add to reeux state
      dispatch({
        type: 'ADD_TO_CART',
        payload: unique,
      })
      // show cart items in side drawer
      dispatch({
        type: 'SET_VISIBLE',
        payload: true,
      })

      setTimeout(() => {
        router.push(`${process.env.CCOMMERCE_BASE_URL}/cart`)
      }, 1000)
    }
  }

  useEffect(() => {
    if (!productQty) {
      let cart = []
      if (typeof window !== 'undefined') {
        if (localStorage.getItem('cart')) {
          cart = JSON.parse(localStorage.getItem('cart'))
        }

        const productInCart = cart.find(
          (cartProduct) => cartProduct._id == product._id
        )

        if (productInCart) {
          setProductQty(productInCart.count)
          setIsFoundCart(true)
        } else {
          setProductQty(1)
          setIsFoundCart(false)
        }
      } else {
        setProductQty(1)
        setIsFoundCart(false)
      }
    }
  }, [])

  return (
    <Row gutter={32}>
      <Col span={10} offset={2} style={{ display: 'flex' }}>
        <SectionContainer
          height="740px"
          padding="20px 0 0 0"
          display="flex"
          justifyContent="center"
        >
          <CustomCarousel
            width={560}
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
        <h2>{product.title}</h2>
        <SingleProductContainer>
          <Row gutter={16}>
            <Col span={24}>
              <h3>Descripción</h3>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <p style={{ fontSize: '20px', height: '135px' }}>
                {product.description}
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
              {Number(product.price).toFixed(2)}
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
                id="productQtyDecrease"
                onClick={() => {
                  if (product.quantity > 0 && productQty - 1 > 0) {
                    handleQuantityChange(productQty - 1)
                  } else {
                    notification.error({
                      message: 'Cantidad no válida',
                      description: 'Por favor, intente con una cantidad mayor.',
                    })
                  }
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
                id="productQtyIncrease"
                onClick={() => {
                  if (product.quantity >= productQty + 1) {
                    handleQuantityChange(productQty + 1)
                  } else {
                    notification.error({
                      message: 'Cantidad no válida',
                      description: `Máxima cantidad disponible: ${product.quantity}. Por favor, intente con una cantidad menor.`,
                    })
                  }
                }}
              >
                +
              </p>
            </Col>
          </Row>
        </SingleProductContainer>
        <Row
          gutter={16}
          style={{
            marginTop: '32px',
            width: '640px',
          }}
        >
          <Col span={12}>
            <div
              style={BtnActionsStyle}
              id="buy-to-cart-product"
              onClick={() => handleToBuy()}
            >
              COMPRAR
            </div>
          </Col>
          <Col span={12}>
            <div
              id="add-to-cart-product"
              style={BtnActionsStyle}
              onClick={() => {
                if (isFoundCart) {
                  notification.success({
                    message: `Cantidad del producto actualizada a ${productQty} unidades.`,
                    description: (
                      <div>
                        El producto <strong>{product.title}</strong> ya está en
                        el carrito de compras con su cantidad actualizada.
                      </div>
                    ),
                  })
                } else {
                  console.log('AÑADIR')
                  handleAddToCart()
                }
              }}
            >
              {isFoundCart ? '¡En carrito!' : 'AÑADIR'}
            </div>
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

export default SingleProduct
