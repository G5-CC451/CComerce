import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useDispatch } from 'react-redux'
import _ from 'lodash'
// Components
import { Tooltip, notification } from 'antd'
import SectionCardItem from './Section/SectionCardItem'
// Utils
import { EyeOutlined, ShoppingCartOutlined } from '@ant-design/icons'

// Assets
import ProductImageDefault from '@/assets/images/product-default.jpeg'
import { cloudinaryUrl } from '@/config/cloudinary'

const OfferProductCard = ({ product, value, id }) => {
  // redux
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
      // show notification
      notification.success({
        message: 'Agregado al carrito',
        description: `El producto "${product.title}" se agregó al carrito.`,
      })

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
      id={id}
      data-id={product._id}
      data-slug={slug}
      onClick={() => {
        console.log('slug', slug)
      }}
      width={420}
      height={200}
      margin="auto"
      cardNumber={{
        position: 'absolute',
        margin: '8px',
        diameter: 32,
        value: value,
      }}
      cardContent={{
        margin: 'auto',
        content: (
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <Image
              src={
                images[0]
                  ? cloudinaryUrl(images[0].public_id, 192, 192)
                  : ProductImageDefault.src
              }
              width={192}
              height={192}
              layout="fixed"
              loading="lazy"
              style={{
                height: '192px',
                width: '192px',
                objectFit: 'cover',
                borderTopLeftRadius: '12px',
                borderBottomLeftRadius: '12px',
              }}
              className="p-1"
              alt={title}
            />
            <div
              style={{
                display: 'grid',
                alignContent: 'space-between',
                width: '220px',
              }}
            >
              <div
                style={{
                  width: '128px',
                }}
              >
                <Tooltip placement="left" title={title}>
                  <div
                    style={{
                      width: '204px',
                      height: '24px',
                      marginTop: '8px',
                      marginBottom: '12px',
                      marginLeft: '8px',
                      textAlign: 'left',
                      fontSize: '16px',
                      fontWeight: 'bold',
                      lineHeight: '24px',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {title}
                  </div>
                </Tooltip>
                <Tooltip placement="left" title={description}>
                  <div
                    style={{
                      width: '204px',
                      height: '24px',
                      marginBottom: '8px',
                      marginLeft: '8px',
                      textAlign: 'left',
                      fontSize: '14px',
                      lineHeight: '24px',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {description}
                  </div>
                </Tooltip>
              </div>

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  width: '220px',
                }}
              >
                <Tooltip
                  placement="top"
                  title={`S/ ${Number(price).toFixed(2)}`}
                >
                  <div
                    style={{
                      width: '128px',
                      height: '24px',
                      marginTop: '16px',
                      marginBottom: '12px',
                      marginLeft: '8px',
                      textAlign: 'left',
                      fontSize: '20px',
                      fontWeight: 'bold',
                      lineHeight: '24px',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    S/ {Number(price).toFixed(2)}
                  </div>
                </Tooltip>
                <Link key="action-2" href={`/product/${slug}`}>
                  <Tooltip placement="top" title={'Ver producto'}>
                    <div
                      style={{
                        width: '63px',
                        background: '#ebebeb',
                        cursor: 'pointer',
                      }}
                    >
                      <EyeOutlined />
                    </div>
                  </Tooltip>
                </Link>
                <Tooltip
                  key="action-1"
                  placement="top"
                  title={
                    product.quantity < 1
                      ? 'Fuera de stock'
                      : 'Agregar al carrito'
                  }
                >
                  <div
                    className="handleAddToCart"
                    onClick={handleAddToCart}
                    disabled={product.quantity < 1}
                    style={{
                      width: '64px',
                      background: '#ff9e6d',
                      color: '#000000',
                      borderBottomRightRadius: '10px',
                      cursor: 'pointer',
                    }}
                  >
                    <ShoppingCartOutlined />
                  </div>
                </Tooltip>
              </div>
            </div>
          </div>
        ),
      }}
    />
  )
}

export default OfferProductCard
