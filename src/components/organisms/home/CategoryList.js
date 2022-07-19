import React, { useState, useEffect } from 'react'
import { getCategories } from '@/functions/category'
import Link from 'next/link'

const CategoryList = () => {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    getCategories().then((c) => {
      setCategories(c.data)
      setLoading(false)
    })
  }, [])

  const showCategories = () =>
    categories.map((c) => (
      <div
        key={c._id}
        className="col btn btn-outlined-primary btn-lg btn-block btn-raised m-3"
      >
        <Link href={`/category/${c.slug}`}>{c.name}</Link>
      </div>
    ))

  return (
    <div className="container">
      <div className="row">
        {loading ? (
          <h4 className="text-center">Cargando...</h4>
        ) : (
          showCategories()
        )}
      </div>
    </div>
  )
}

export default CategoryList
