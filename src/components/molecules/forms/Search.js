import React from 'react'

import { Col, Row, Input } from 'antd'

const { Search } = Input

const onSearch = (value) => console.log(value)

const FormSearch = () => {
  return (
    <Row gutter={16}>
      <Col>
        <span
          style={{ color: '#000000', fontSize: '20px', fontWeight: 'bold' }}
        >
          BUSCAR
        </span>
      </Col>
      <Col>
        <Search
          placeholder="Buscar producto"
          allowClear
          onSearch={onSearch}
          style={{ width: 560, margin: 'auto', verticalAlign: 'middle' }}
        />
      </Col>
    </Row>
  )
}

export default FormSearch
