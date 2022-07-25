import React, { useState, useEffect } from 'react'
import router from 'next/router'
// Business logic
import { getCategories } from '@/functions/category'
// Components
import SectionContainer from '@/components/molecules/cards/Section/SectionContainer'
import SectionTitle from '@/components/molecules/cards/Section/SectionTitle'
import SectionCardItem from '@/components/molecules/cards/Section/SectionCardItem'
import SectionContent from '@/components/molecules/cards/Section/SectionContent'
import { Spin } from 'antd'

const CCOMMERCE_BASE_URL =
  process.env.CCOMMERCE_BASE_URL || 'http://localhost:3000'

console.log('CCOMMERCE_BASE_URL', CCOMMERCE_BASE_URL)

const CategorySidebar = () => {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    getCategories().then((c) => {
      setCategories(c.data)
      setLoading(false)
    })
  }, [])

  return (
    <SectionContainer height="485px">
      <SectionTitle width="278px">CATEGORÍAS</SectionTitle>
      <SectionContent
        padding="0px 16px"
        height="420px"
        style={{
          marginTop: '40px',
          overflow: 'hidden scroll',
        }}
      >
        <Spin spinning={loading}>
          {categories.length > 0 &&
            categories.map((category, idx) => (
              <SectionCardItem
                onClick={() => {
                  router.push(
                    `${CCOMMERCE_BASE_URL}/shop?searchBy=category&searchText=${category._id}`
                  )
                }}
                key={`category-${category._id}`}
                id={`category-selector-${idx + 1}`}
                width={380}
                height={64}
                textAlign="left"
                cardNumber={{
                  diameter: 40,
                  value: idx + 1,
                }}
                cardContent={{
                  margin: 'auto 0',
                  content: category.name,
                }}
              />
            ))}
        </Spin>
      </SectionContent>
    </SectionContainer>
  )
}

export default CategorySidebar
