import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Card } from 'antd'
// Utils
import _ from 'lodash'
import SectionCardItem from './Section/SectionCardItem'

const { Meta } = Card

const ProductCard = ({ product, value }) => {
  const [tooltip, setTooltip] = useState('Click to add')

  // redux
  const { user, cart } = useSelector((state) => ({ ...state }))
  const dispatch = useDispatch()

  const handleAddToCart = () => {
    // create cart array
    let cart = []
    if (typeof window !== 'undefined') {
      // if cart is in local storage GET it
      if (localStorage.getItem('cart')) {
        cart = JSON.parse(localStorage.getItem('cart'))
      }
      // push new product to cart
      cart.push({
        ...product,
        count: 1,
      })
      // remove duplicates
      const unique = _.uniqWith(cart, _.isEqual)
      // save to local storage
      // console.log('unique', unique)
      localStorage.setItem('cart', JSON.stringify(unique))
      // show tooltip
      setTooltip('Added')

      // add to reeux state
      dispatch({
        type: 'ADD_TO_CART',
        payload: unique,
      })
      // show cart items in side drawer
      dispatch({
        type: 'SET_VISIBLE',
        payload: true,
      })
    }
  }

  // destructure
  const { images, title, description, slug, price } = product
  // console.log("product", product);
  return (
    <SectionCardItem
      key={slug}
      id={slug}
      onClick={() => console.log(slug)}
      width={310}
      height={180}
      margin="16px"
      cardNumber={{
        diameter: 40,
        value: value,
      }}
      cardContent={{
        margin: 'auto',
        content: <div>Item {value}</div>,
      }}
    />
  )
}

export default ProductCard
