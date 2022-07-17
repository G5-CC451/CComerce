import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'
// Business logic
import { getUserOrders } from '@/functions/user'
// Components
import UserNav from '@/components/molecules/nav/UserNav'
import ShowPaymentInfo from '@/components/molecules/cards/ShowPaymentInfo'
// Assets
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons'

const History = () => {
  const router = useRouter()
  const [orders, setOrders] = useState([])
  const { user } = useSelector((state) => ({ ...state }))

  useEffect(() => {
    loadUserOrders()
  }, [loadUserOrders])

  const loadUserOrders = React.useCallback(async () => {
    console.log('user', user)
    if (user) {
      try {
        const res = await getUserOrders(user.token)
        setOrders(res.data)
      } catch (error) {
        console.log(error)
      }
    } else {
      router.push('/login')
    }
  }, [router, user])

  const showOrderInTable = (order) => (
    <table className="table table-bordered">
      <thead className="thead-light">
        <tr>
          <th scope="col">Title</th>
          <th scope="col">Price</th>
          <th scope="col">Brand</th>
          <th scope="col">Color</th>
          <th scope="col">Count</th>
          <th scope="col">Shipping</th>
        </tr>
      </thead>

      <tbody>
        {order.products.map((p, i) => (
          <tr key={i}>
            <td>
              <b>{p.product.title}</b>
            </td>
            <td>{p.product.price}</td>
            <td>{p.product.brand}</td>
            <td>{p.color}</td>
            <td>{p.count}</td>
            <td>
              {p.product.shipping === 'Yes' ? (
                <CheckCircleOutlined style={{ color: 'green' }} />
              ) : (
                <CloseCircleOutlined style={{ color: 'red' }} />
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )

  const showEachOrders = () =>
    orders.reverse().map((order, i) => (
      <div key={i} className="m-5 p-3 card">
        <ShowPaymentInfo order={order} />
        {showOrderInTable(order)}
        <div className="row">Link de la orden</div>
      </div>
    ))

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <UserNav />
        </div>
        <div className="col text-center">
          <h4>
            {orders.length > 0
              ? 'Órdenes de compra del usuario'
              : 'Sin ordenes de compra'}
          </h4>
          {showEachOrders()}
        </div>
      </div>
    </div>
  )
}

export default History
