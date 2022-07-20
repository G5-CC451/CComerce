import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Col, notification, Row } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
// Business logic
import {
  getUserCart,
  emptyUserCart,
  saveUserAddress,
  applyCoupon,
  createCashOrderForUser,
} from '@/functions/user'
import PublicBasic from '@/components/templates/public/Basic'
// Assets

const Checkout = () => {
  const router = useRouter()
  const [products, setProducts] = useState([])
  const [total, setTotal] = useState(0)
  const [addressSaved, setAddressSaved] = useState(false)
  const [coupon, setCoupon] = useState('')
  // discount price
  const [totalAfterDiscount, setTotalAfterDiscount] = useState(0)

  const dispatch = useDispatch()
  const { user, COD } = useSelector((state) => ({ ...state }))
  const couponTrueOrFalse = useSelector((state) => state.coupon)

  useEffect(() => {
    const token = (user && user.token) || localStorage.getItem('userToken')
    getUserCart(token).then((res) => {
      setProducts(res.data.products)
      setTotal(res.data.cartTotal)
    })
  }, [user])

  const emptyCart = () => {
    // remove from local storage
    if (typeof window !== 'undefined') {
      localStorage.removeItem('cart')
    }
    // remove from redux
    dispatch({
      type: 'ADD_TO_CART',
      payload: [],
    })
    // remove from backend
    const token = (user && user.token) || localStorage.getItem('userToken')
    emptyUserCart(token).then((res) => {
      setProducts([])
      setTotal(0)
      setTotalAfterDiscount(0)
      setCoupon('')
      notification.success({
        message: 'Se ha limpiado el carrito de compras. Continue su compra...',
      })
    })
  }

  const showProductSummary = () =>
    products.map((p, i) => (
      <div key={i}>
        <p>
          {p.product.title} ({p.color}) x {p.count} ={' '}
          {p.product.price * p.count}
        </p>
      </div>
    ))

  const createCashOrder = () => {
    const token = (user && user.token) || localStorage.getItem('userToken')
    createCashOrderForUser(token, COD, couponTrueOrFalse).then((res) => {
      console.log('USER CASH ORDER CREATED RES ', res)
      // empty cart form redux, local Storage, reset coupon, reset COD, redirect
      if (res.data.ok) {
        // empty local storage
        if (typeof window !== 'undefined') localStorage.removeItem('cart')
        // empty redux cart
        dispatch({
          type: 'ADD_TO_CART',
          payload: [],
        })
        // empty redux coupon
        dispatch({
          type: 'COUPON_APPLIED',
          payload: false,
        })
        // empty redux COD
        dispatch({
          type: 'COD',
          payload: false,
        })
        // mepty cart from backend
        emptyUserCart(token)
        // redirect
        setTimeout(() => {
          router.push('/')
        }, 1000)
      }
    })
  }

  return (
    <PublicBasic>
      <Row style={{ marginTop: '48px' }}>
        <Col span={12} offset={6}>
          <h4>Resumen de pedido</h4>
          <hr />
          <p>Productos: {products.length}</p>
          <hr />
          {showProductSummary()}
          <hr />
          <p>Total: {total}</p>

          <Row>
            <Col span={12}>
              <button
                className="btn btn-primary"
                disabled={!products.length}
                onClick={() => {
                  notification.success({
                    message: 'Gracias por su compra',
                  })
                  createCashOrder()
                }}
              >
                Efectuar pedido
              </button>
            </Col>

            <Col span={12}>
              <button
                disabled={!products.length}
                onClick={emptyCart}
                className="btn btn-primary"
              >
                Vaciar carrito
              </button>
            </Col>
          </Row>
        </Col>
      </Row>
    </PublicBasic>
  )
}

export default Checkout
