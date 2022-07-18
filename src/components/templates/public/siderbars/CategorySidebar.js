import React, { useState, useEffect } from 'react'
// Business logic
import { getCategories } from '@/functions/category'
// Components
import SectionContainer from '@/components/molecules/cards/Section/SectionContainer'
import SectionTitle from '@/components/molecules/cards/Section/SectionTitle'
import SectionCardItem from '@/components/molecules/cards/Section/SectionCardItem'
import SectionContent from '@/components/molecules/cards/Section/SectionContent'

const CategorySidebar = () => {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    getCategories().then((c) => {
      console.log('c.data', c.data)
      setCategories(c.data)
      setLoading(false)
    })
  }, [])

  return (
    <SectionContainer height="530px">
      <SectionTitle width="278px">CATEGORÍAS</SectionTitle>
      <SectionContent
        padding="0px 16px"
        height="460px"
        style={{
          marginTop: '40px',
          overflow: 'hidden scroll',
        }}
      >
        {!loading &&
          categories.length > 0 &&
          categories.map((category, idx) => (
            <SectionCardItem
              onClick={() => {
                router
                console.log(`category-${category._id}`, category)
              }}
              key={`category-${category._id}`}
              id={`category-${category._id}`}
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
      </SectionContent>
    </SectionContainer>
  )
}

export default CategorySidebar
