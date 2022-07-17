import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
// Business logic
import { getOrders, changeStatus } from '@/functions/admin'
// Components
import AdminNav from '@/components/molecules/nav/AdminNav'
import Orders from '@/components/organisms/order/Orders'
import PrivateBasic from '@/components/templates/private/Basic'
import { notification } from 'antd'

const AdminDashboard = () => {
  const [orders, setOrders] = useState([])
  const { user } = useSelector((state) => ({ ...state }))

  useEffect(() => {
    loadOrders()
  }, [loadOrders])

  const loadOrders = React.useCallback(
    () =>
      getOrders(user?.token).then((res) => {
        console.log(JSON.stringify(res.data, null, 4))
        setOrders(res.data)
      }),
    [user?.token]
  )

  const handleStatusChange = (orderId, orderStatus) => {
    changeStatus(orderId, orderStatus, user.token).then((res) => {
      notification.success({ message: 'Status updated' })
      loadOrders()
    })
  }

  return (
    <PrivateBasic>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-2">
            <AdminNav />
          </div>

          <div className="col-md-10">
            <h4>Admin Dashboard</h4>
            {/* {JSON.stringify(orders)} */}
            <Orders orders={orders} handleStatusChange={handleStatusChange} />
          </div>
        </div>
      </div>
    </PrivateBasic>
  )
}

export default AdminDashboard
