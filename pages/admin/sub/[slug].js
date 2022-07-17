import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
// Business logic
import { getCategories } from '@/functions/category'
import { updateSub, getSub } from '@/functions/sub'
// Components
import { notification } from 'antd'
import AdminNav from '@/components/molecules/nav/AdminNav'
import CategoryForm from '@/components/molecules/forms/CategoryForm'

const SubUpdate = () => {
  const router = useRouter()
  const { user } = useSelector((state) => ({ ...state }))

  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [categories, setCategories] = useState([])
  const [parent, setParent] = useState('')

  useEffect(() => {
    loadCategories()
    loadSub()
  }, [loadCategories, loadSub])

  const loadCategories = React.useCallback(
    () => getCategories().then((c) => setCategories(c.data)),
    []
  )

  const loadSub = React.useCallback(
    () =>
      getSub(router.query.slug).then((s) => {
        setName(s.data.name)
        setParent(s.data.parent)
      }),
    [router.query.slug]
  )

  const handleSubmit = (e) => {
    e.preventDefault()

    setLoading(true)
    updateSub(router.query.slug, { name, parent }, user.token)
      .then((res) => {
        setLoading(false)
        setName('')
        notification.success({
          message: 'Subcategoría actualizada',
          description: `¡Subcategoría "${res.data.name}" fue actualizada satisfactoriamente!`,
        })
        router.push('/admin/sub')
      })
      .catch((err) => {
        console.log(err)
        setLoading(false)
        if (err.response.status === 400) {
          notification.error({
            message: 'Error al actualizar subcategoría',
            description: err.response.data,
          })
        }
      })
  }

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col">
          {loading ? (
            <h4 className="text-danger">Cargando...</h4>
          ) : (
            <h4>Actualizar subcategoría</h4>
          )}

          <div className="form-group">
            <label>Categoría padre</label>
            <select
              name="category"
              className="form-control"
              onChange={(e) => setParent(e.target.value)}
            >
              <option>Seleccione una opción</option>
              {categories.length > 0 &&
                categories.map((c) => (
                  <option key={c._id} value={c._id} selected={c._id === parent}>
                    {c.name}
                  </option>
                ))}
            </select>
          </div>

          <CategoryForm
            handleSubmit={handleSubmit}
            name={name}
            setName={setName}
          />
        </div>
      </div>
    </div>
  )
}

export default SubUpdate
