import React, { useState, useRef } from 'react'
import Link from 'next/link'
import styled from '@emotion/styled'
// Context
import { VoiceContext } from '@/context/voice-context'
// Components
import { Layout, Space, Modal } from 'antd'
import Search from '@/components/molecules/forms/Search'
// Assets
import {
  ShoppingCartOutlined,
  QuestionCircleOutlined,
  UserOutlined,
  AudioOutlined,
  HomeOutlined,
} from '@ant-design/icons'

const { Header } = Layout

const AudioStyle = {
  color: 'white',
  fontSize: '24px',
  verticalAlign: 'middle',
}

const HeaderContainer = styled(Header)`
  &&& {
    height: 56px;
    padding: 0 16px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    background: #ff9e6d;
    color: #ffffff;
  }
`

const HeaderDefault = () => {
  const microphoneRef = useRef(null)
  const { handleListing, toogleListening, transcript, active } =
    React.useContext(VoiceContext)
  const voiceHandleListing = React.useCallback(() => {
    handleListing(microphoneRef)
  }, [handleListing])

  const voiceToogleListing = () => {
    toogleListening(microphoneRef)
  }

  const [isModalVisible, setIsModalVisible] = useState(false)

  const showModal = () => {
    setIsModalVisible(true)
  }

  const handleOk = () => {
    setIsModalVisible(false)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  React.useEffect(() => {
    if (active) {
      voiceHandleListing()
    }
  }, [active, voiceHandleListing])

  return (
    <HeaderContainer>
      <Space align="start">
        <Link href="/admin/dashboard">
          <HomeOutlined style={AudioStyle} />
        </Link>
      </Space>
      <Space align="center">
        <Search />
        <AudioOutlined
          style={AudioStyle}
          ref={microphoneRef}
          onClick={voiceToogleListing}
        />
      </Space>
      <Space align="end">
        <Link href="/cart">
          <ShoppingCartOutlined style={AudioStyle} />
        </Link>
        <QuestionCircleOutlined
          style={AudioStyle}
          onClick={showModal}
          id="ccommerce-help"
        />
        <Link href="/user/history">
          <UserOutlined style={AudioStyle} />
        </Link>
      </Space>
      <Modal
        title="Basic Modal"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {transcript && <p style={{ fontWeight: 'bold' }}>{transcript}</p>}
      </Modal>
    </HeaderContainer>
  )
}

export default HeaderDefault
