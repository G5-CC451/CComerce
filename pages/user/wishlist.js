import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import Link from 'next/link'
// Business logic
import { getWishlist, removeWishlist } from '@/functions/user'
import UserNav from '@/components/molecules/nav/UserNav'
// Assets
import { DeleteOutlined } from '@ant-design/icons'

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([])
  const { user } = useSelector((state) => ({ ...state }))

  useEffect(() => {
    loadWishlist()
  }, [loadWishlist])

  const loadWishlist = React.useCallback(
    () =>
      getWishlist(user.token).then((res) => {
        setWishlist(res.data.wishlist)
      }),
    [user.token]
  )

  const handleRemove = (productId) =>
    removeWishlist(productId, user.token).then((res) => {
      loadWishlist()
    })

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <UserNav />
        </div>
        <div className="col">
          <h4>Lista de deseos</h4>

          {wishlist.map((p) => (
            <div key={p._id} className="alert alert-secondary">
              <Link href={`/product/${p.slug}`}>{p.title}</Link>
              <span
                onClick={() => handleRemove(p._id)}
                className="btn btn-sm float-right"
              >
                <DeleteOutlined className="text-danger" />
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Wishlist
