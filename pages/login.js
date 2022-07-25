import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
// Business logic
import { auth } from '@/firebase'
import { createOrUpdateUser } from '@/functions/auth'
// Components
import { Button, Input, notification } from 'antd'
// Contexts
import { AuthContext } from '@/context/auth-context'
import PublicBasic from '@/components/templates/public/Basic'

const Login = () => {
  const router = useRouter()
  const authContext = React.useContext(AuthContext)
  const [email, setEmail] = useState('jhonny.lorenzo.r@uni.pe')
  const [password, setPassword] = useState('12345678')
  const [loading, setLoading] = useState(false)

  const { user } = useSelector((state) => ({ ...state }))

  useEffect(() => {
    const intended = router.query
    if (intended) {
      return
    } else {
      if (user && user.token) router.push('/')
    }
    authContext.isUserAuthenticated()
      ? router.push('/')
      : router.push('/dashboard')
  }, [authContext, router, user])

  const dispatch = useDispatch()

  const roleBasedRedirect = (res) => {
    console.log('router', router)
    const intended = router.query
    console.log('intended', intended)
    if (Object.keys(intended).length > 0) {
      router.push(intended.from)
    } else {
      const newRedirect = "/"
      if (res.data.role === 'admin') {
        router.push(newRedirect)
      } else {
        router.push(newRedirect)
      }
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    console.table(email, password)
    try {
      const result = await auth.signInWithEmailAndPassword(
        auth.getAuth(),
        email,
        password
      )
      console.log(result)
      const idTokenResult = await auth.getIdTokenResult(result.user)
      console.log('idTokenResult.token', idTokenResult.token)

      try {
        localStorage.setItem('userToken', idTokenResult.token)
        const res = await createOrUpdateUser(idTokenResult.token)
        console.log('res', res)
        dispatch({
          type: 'LOGGED_IN_USER',
          payload: {
            name: res.data.name,
            email: res.data.email,
            token: idTokenResult.token,
            role: res.data.role,
            _id: res.data._id,
          },
        })
        roleBasedRedirect(res)
      } catch (err) {
        console.error(err)
      }
    } catch (error) {
      console.log(error)
      notification.error({ message: error.message })
      setLoading(false)
    }
  }

  const InputStyle = {
    background: '#EBEBEB',
    borderRadius: '20px',
  }

  const loginForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Correo electrónico</label>
        <Input
          type="email"
          className="form-control"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Ingrese su correo"
          autoFocus
          style={InputStyle}
        />
      </div>

      <div className="form-group">
        <label>Contraseña</label>
        <Input
          type="password"
          className="form-control"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Ingrese su contraseña"
          style={InputStyle}
        />
      </div>

      <br />
      <Button
        onClick={handleSubmit}
        type="primary"
        className="mb-3"
        block
        size="large"
        disabled={!email || password.length < 6}
        style={{
          borderRadius: '12px',
          color: '#000000',
          background: '#FF9E6D',
          border: '1px solid #FF9E6D',
        }}
      >
        INGRESAR
      </Button>
    </form>
  )

  return (
    <PublicBasic>
      <div
        style={{
          width: '609px',
          height: '598px',
          background: '#DBDBDB',
          border: '1px solid #FF9E6D',
          borderRadius: '20px',
          margin: 'auto',
          marginTop: '120px',
          padding: '32px 0',
          boxSizing: 'border-box',
        }}
      >
        <div className="row">
          <div className="col-md-10 offset-md-1">
            {loading ? (
              <h4 className="text-danger">Cargando...</h4>
            ) : (
              <h4
                style={{
                  width: '100%',
                  textAlign: 'center',
                  marginBottom: '60px',
                }}
              >
                Iniciar sesión
              </h4>
            )}
            {loginForm()}
          </div>
        </div>
      </div>
    </PublicBasic>
  )
}

export default Login
