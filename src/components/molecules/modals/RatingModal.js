import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { Modal, notification } from 'antd'
import { useSelector } from 'react-redux'
import { StarOutlined } from '@ant-design/icons'

const RatingModal = ({ children }) => {
  const router = useRouter()
  const { user } = useSelector((state) => ({ ...state }))
  const [modalVisible, setModalVisible] = useState(false)

  const { slug } = router.query

  const handleModal = () => {
    if (user && user.token) {
      setModalVisible(true)
    } else {
      router.push({
        pathname: '/login',
        query: { from: `/product/${slug}` },
      })
    }
  }

  return (
    <React.Fragment>
      <div onClick={handleModal}>
        <StarOutlined className="text-danger" /> <br />{' '}
        {user ? 'Leave rating' : 'Login to leave rating'}
      </div>
      <Modal
        title="Leave your rating"
        centered
        visible={modalVisible}
        onOk={() => {
          setModalVisible(false)
          notification.success({
            message: 'Thanks for your review. It will apper soon',
          })
        }}
        onCancel={() => setModalVisible(false)}
      >
        {children}
      </Modal>
    </React.Fragment>
  )
}

export default RatingModal
