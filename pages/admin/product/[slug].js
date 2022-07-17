import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
// Business logic
import { getProduct, updateProduct } from '@/functions/product'
import { getCategories, getCategorySubs } from '@/functions/category'
// Components
import AdminNav from '@/components/molecules/nav/AdminNav'
import FileUpload from '@/components/molecules/forms/FileUpload'
import ProductUpdateForm from '@/components/molecules/forms/ProductUpdateForm'
// Assets
import { LoadingOutlined } from '@ant-design/icons'
import { notification } from 'antd'

const initialState = {
  title: '',
  description: '',
  price: '',
  category: '',
  subs: [],
  shipping: '',
  quantity: '',
  images: [],
  colors: ['Black', 'Brown', 'Silver', 'White', 'Blue'],
  brands: ['Apple', 'Samsung', 'Microsoft', 'Lenovo', 'ASUS'],
  color: '',
  brand: '',
}

const ProductUpdate = () => {
  const router = useRouter()
  // state
  const [values, setValues] = useState(initialState)
  const [categories, setCategories] = useState([])
  const [subOptions, setSubOptions] = useState([])
  const [arrayOfSubs, setArrayOfSubs] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('')
  const [loading, setLoading] = useState(false)

  const { user } = useSelector((state) => ({ ...state }))
  // router
  const { slug } = router.query

  useEffect(() => {
    loadProduct()
    loadCategories()
  }, [loadCategories, loadProduct])

  const loadProduct = React.useCallback(() => {
    getProduct(slug).then((p) => {
      // console.log("single product", p);
      // 1 load single proudct
      setValues({ ...values, ...p.data })
      // 2 load single product category subs
      getCategorySubs(p.data.category._id).then((res) => {
        setSubOptions(res.data) // on first load, show default subs
      })
      // 3 prepare array of sub ids to show as default sub values in antd Select
      const arr = []
      p.data.subs.map((s) => {
        arr.push(s._id)
      })
      console.log('ARR', arr)
      setArrayOfSubs((prev) => arr) // required for ant design select to work
    })
  }, [slug, values])

  const loadCategories = React.useCallback(
    () =>
      getCategories().then((c) => {
        console.log('GET CATEGORIES IN UPDATE PRODUCT', c.data)
        setCategories(c.data)
      }),
    []
  )

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)

    values.subs = arrayOfSubs
    values.category = selectedCategory ? selectedCategory : values.category

    updateProduct(slug, values, user.token)
      .then((res) => {
        setLoading(false)
        notification.success({ message: `"${res.data.title}" is updated` })
        router.push('/admin/products')
      })
      .catch((err) => {
        console.log(err)
        setLoading(false)
        notification.error({ message: err.response.data.err })
      })
  }

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
    // console.log(e.target.name, " ----- ", e.target.value);
  }

  const handleCategoryChange = (e) => {
    e.preventDefault()
    console.log('CLICKED CATEGORY', e.target.value)
    setValues({ ...values, subs: [] })

    setSelectedCategory(e.target.value)

    getCategorySubs(e.target.value).then((res) => {
      console.log('SUB OPTIONS ON CATGORY CLICK', res)
      setSubOptions(res.data)
    })

    console.log('EXISTING CATEGORY values.category', values.category)

    // if user clicks back to the original category
    // show its sub categories in default
    if (values.category._id === e.target.value) {
      loadProduct()
    }
    // clear old sub category ids
    setArrayOfSubs([])
  }

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>

        <div className="col-md-10">
          {loading ? (
            <LoadingOutlined className="text-danger h1" />
          ) : (
            <h4>Product update</h4>
          )}

          {/* {JSON.stringify(values)} */}

          <div className="p-3">
            <FileUpload
              values={values}
              setValues={setValues}
              setLoading={setLoading}
            />
          </div>

          <ProductUpdateForm
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            setValues={setValues}
            values={values}
            handleCategoryChange={handleCategoryChange}
            categories={categories}
            subOptions={subOptions}
            arrayOfSubs={arrayOfSubs}
            setArrayOfSubs={setArrayOfSubs}
            selectedCategory={selectedCategory}
          />
          <hr />
        </div>
      </div>
    </div>
  )
}

export default ProductUpdate
