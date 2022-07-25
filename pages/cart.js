import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Link from 'next/link'
// Components
import { Col, Layout, notification, Row } from 'antd'
import PublicBasic from '@/components/templates/public/Basic'
import SectionCardItem from '@/components/molecules/cards/Section/SectionCardItem'
import SectionContent from '@/components/molecules/cards/Section/SectionContent'
import { userCart } from '@/functions/user'
import { useRouter } from 'next/router'

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

const { Content } = Layout

const Cart = () => {
  const router = useRouter()

  const { cart, user } = useSelector((state) => ({ ...state }))
  const dispatch = useDispatch()

  const getTotal = () => {
    return cart.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.count * nextValue.price
    }, 0)
  }

  const saveOrderToDb = () => {
    // console.log("cart", JSON.stringify(cart, null, 4));
    userCart(cart, user.token)
      .then((res) => {
        console.log('CART POST RES', res)
        if (res.data.ok) router.push('/checkout')
      })
      .catch((err) => console.log('cart save err', err))
  }

  const saveCashOrderToDb = () => {
    // console.log("cart", JSON.stringify(cart, null, 4));
    const token = (user && user.token) || localStorage.getItem('userToken')
    console.log('token', token)
    dispatch({
      type: 'COD',
      payload: true,
    })
    userCart(cart, token)
      .then((res) => {
        console.log('CART POST RES', res)
        if (res.data.ok) router.push('/checkout')
      })
      .catch((err) => console.log('cart save err', err))
  }

  const handleQuantityChange = (product, count) => {
    if (count > product.quantity) {
      notification.error({
        message: 'Cantidad no válida',
        description: `Máxima cantidad disponible: ${p.quantity}. Por favor, intente con una cantidad menor.`,
      })
      return
    }

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

  const showCartItems = () => (
    <SectionContent
      padding="24px 0px"
      width="675px"
      height="703px"
      style={{
        overflow: 'hidden scroll',
      }}
    >
      {cart.map((product, idx) => (
        <SectionCardItem
          key={product.slug}
          id={product.slug}
          onClick={() => console.log(product.slug)}
          width={632}
          height={130}
          margin="16px"
          cardNumber={{
            diameter: 40,
            value: idx + 1,
          }}
          cardContent={{
            margin: 'auto 0',
            content: (
              <div>
                <div style={{ display: 'flex', height: '108px' }}>
                  <div>
                    <div
                      style={{
                        textAlign: 'left',
                        fontWeight: 'bold',
                        height: '36px',
                      }}
                    >
                      {product.title}
                    </div>
                    <div
                      style={{
                        textAlign: 'left',
                        fontSize: '14px',
                        width: '400px',
                      }}
                    >
                      {product.description}
                    </div>
                  </div>
                  <div
                    style={{
                      height: '106px',
                      display: 'inline-grid',
                      justifyItems: 'center',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        width: '156px',
                        fontSize: '16px',
                        justifyContent: 'space-between',
                      }}
                    >
                      <div style={{ marginRight: '16px' }}>P.U.:</div>
                      {` `}
                      <div
                        style={{
                          textAlign: 'right',
                          fontSize: '20px',
                          fontWeight: 'bold',
                        }}
                      >
                        S/ {Number(product.price).toFixed(2)}
                      </div>
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'end',
                        justifyContent: 'end',
                        gap: '8px',
                        width: '146px',
                      }}
                    >
                      <div
                        style={BtnQtyStyle}
                        id={`productQtyDecrease-${idx + 1}`}
                        data-product_id={product._id}
                        onClick={() => {
                          if (product.quantity > 0 && product.count - 1 > 0) {
                            handleQuantityChange(product, product.count - 1)
                          } else {
                            notification.error({
                              message: 'Cantidad no válida',
                              description:
                                'Por favor, intente con una cantidad mayor.',
                            })
                          }
                        }}
                      >
                        -
                      </div>
                      <div
                        span={2}
                        style={{ textAlign: 'center', fontSize: '24px' }}
                      >
                        {product.count}
                      </div>
                      <div
                        style={BtnQtyStyle}
                        id={`productQtyIncrease-${idx + 1}`}
                        data-product_id={product._id}
                        onClick={() => {
                          if (product.quantity >= product.count + 1) {
                            handleQuantityChange(product, product.count + 1)
                          } else {
                            notification.error({
                              message: 'Cantidad no válida',
                              description: `Máxima cantidad disponible: ${product.quantity}. Por favor, intente con una cantidad menor.`,
                            })
                          }
                        }}
                      >
                        +
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ),
          }}
        />
      ))}
    </SectionContent>
  )

  const total = getTotal()

  const igv = total * 0.18

  const subtotal = total - igv

  const amountStyle = { textAlign: 'right', fontSize: '24px' }

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
          <h2>Carrito de compras</h2>
          <Row gutter={24} style={{ marginTop: '32px' }}>
            <Col span={16}>
              {!cart.length ? (
                <p>No hay productos en el carrito de compras. </p>
              ) : (
                showCartItems()
              )}
            </Col>
            <Col span={8}>
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
                  <Col span={16}>
                    <h2>Total artículos:</h2>
                  </Col>
                  <Col span={8} style={{ textAlign: 'right' }}>
                    <h2>
                      {cart.reduce(
                        (prevVal, currVal) => prevVal + currVal.count,
                        0
                      )}
                    </h2>
                  </Col>
                </Row>
                <hr />
                <Row gutter={16}>
                  <Col span={16}>
                    <h3>Sub total:</h3>
                  </Col>
                  <Col span={8} style={amountStyle}>
                    <h4>{subtotal.toFixed(2)}</h4>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col span={16}>
                    <h3>I.G.V. (18%):</h3>
                  </Col>
                  <Col span={8} style={amountStyle}>
                    <h4>{igv.toFixed(2)}</h4>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col span={16}>
                    <h3>Descuento:</h3>
                  </Col>
                  <Col span={8} style={amountStyle}>
                    <h4>0.00</h4>
                  </Col>
                </Row>
                <hr />
                <h2>Total:</h2>
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
                  }}
                >
                  <Col span={4}>S/ </Col>
                  <Col span={20} style={{ textAlign: 'right' }}>
                    <b>{total}</b>
                  </Col>
                </Row>
              </div>
              <div
                //onClick={saveOrderToDb}
                id="cart_to_buy"
                onClick={saveCashOrderToDb}
                style={{
                  margin: 'auto',
                  marginTop: '60px',
                  width: '302px',
                  height: '95px',
                  background: '#D9D9D9',
                  opacity: '0.8',
                  border: '1px solid #FFC759',
                  boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                  borderRadius: '20px',
                  fontSize: '40px',
                  lineHeight: '48px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  color: '#000000',
                  cursor: 'pointer',
                }}
              >
                PAGAR
              </div>
            </Col>
          </Row>
        </Content>
      </Layout>
    </PublicBasic>
  )
}

export default Cart
