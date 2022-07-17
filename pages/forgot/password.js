import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'

import { auth } from '@/firebase'
import { notification } from 'antd'

const ForgotPassword = () => {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)

  const { user } = useSelector((state) => ({ ...state }))

  useEffect(() => {
    if (user && user.token) router.push('/')
  }, [user, router])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    const config = {
      url: process.env.FORGOT_PASSWORD_REDIRECT,
      handleCodeInApp: true,
    }

    await auth
      .sendPasswordResetEmail(auth.getAuth(), email, config)
      .then(() => {
        setEmail('')
        setLoading(false)
        notification.success({
          message:
            'Confirme su correo con el link para generale una nueva contraseña',
        })
      })
      .catch((error) => {
        setLoading(false)
        notification.error({ message: error.message })
        console.log('ERROR MSG IN FORGOT PASSWORD', error)
      })
  }

  return (
    <div className="container col-md-6 offset-md-3 p-5">
      {loading ? (
        <h4 className="text-danger">Cargando...</h4>
      ) : (
        <h4>¿Has olvidado tu contraseña?</h4>
      )}

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          className="form-control"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Ingrese su correo"
          autoFocus
        />
        <br />
        <button className="btn btn-raised" disabled={!email}>
          Enviar correo
        </button>
      </form>
    </div>
  )
}

export default ForgotPassword
