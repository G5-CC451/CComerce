import React, { useState, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import styled from '@emotion/styled'
// Context
import { VoiceContext } from '@/context/voice-context'
// Components
import { Layout, Space, Modal, Row, Col } from 'antd'
import Search from '@/components/molecules/forms/Search'
// Assets
import {
  ShoppingCartOutlined,
  QuestionCircleOutlined,
  UserOutlined,
  AudioOutlined,
} from '@ant-design/icons'
import CCommerceLogo from '@/assets/images/CCommerceLogo.svg'

const { Header } = Layout

const AudioStyle = {
  color: '#000000',
  fontSize: '24px',
  verticalAlign: 'middle',
  cursor: 'pointer',
}

const HeaderContainer = styled(Header)`
  &&& {
    height: 70px;
    padding: 0 16px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    background: #ff9e6d;
    color: #ffffff;
  }
`

const CustomModal = styled(Modal)`
  & > .ant-modal-content {
    border: 4px solid #000000;
  }

  & > .ant-modal-content > .ant-modal-header,
  & > .ant-modal-content > .ant-modal-body,
  & > .ant-modal-content > .ant-modal-footer {
    background: #ffc759;
    border-bottom: 0px;
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
        <Link href="/">
          <Image
            src={CCommerceLogo.src}
            style={{
              cursor: 'pointer',
              width: `${CCommerceLogo.width - 60}px`,
              height: `${CCommerceLogo.height + 26}px`,
            }}
            alt="ccommerce-logo"
          />
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
        <Row gutter={32}>
          <Col>
            <Link href="/cart">
              <ShoppingCartOutlined style={AudioStyle} />
            </Link>
          </Col>
          <Col>
            <QuestionCircleOutlined style={AudioStyle} onClick={showModal} />
          </Col>
          <Col>
            <Link href="/user/history">
              <UserOutlined
                style={{
                  ...AudioStyle,
                  padding: '2px',
                  border: '3px solid #000000',
                  borderRadius: '50%',
                }}
              />
            </Link>
          </Col>
        </Row>
      </Space>
      <CustomModal
        title="INSTRUCCIONES"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        Para realizar la búsqueda de un determinado producto:
        <ul>
          <li></li>
        </ul>
      </CustomModal>
    </HeaderContainer>
  )
}

export default HeaderDefault
