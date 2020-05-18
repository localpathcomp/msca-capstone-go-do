import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import allActions from '../../actions/index'
import axios from 'axios'

import './Login.css'

const Login = () => {

    const [disable, setDisabled] = useState(false)
    const [inputError, setInputError] = useState(null)
    const [loginForm, setLoginForm] = useState({})
    const csrf = useSelector(state => state.csrf)
    const dispatch = useDispatch()

    const loginSuccess = (data) => {
        dispatch(allActions.jwtActions.setToken(data))
        dispatch(allActions.userActions.setUser({ email: loginForm.email }))        
    }

    const handleInputChange = e => {
        const { name, value } = e.target
        setLoginForm({ ...loginForm, [name]: value })
    }

    const verifyForm = (e) => {
        e.preventDefault()
        if (loginForm.email === '' || loginForm.email === undefined) {
            setInputError('Email cannot be blank!')
            return
        } else if (loginForm.password === '' || loginForm.password === undefined) {
            setInputError('Password cannot be blank!')
            return
        } else {
            setInputError(null)
            setDisabled(false)
            loginUser()
        }
    }
    
    const loginUser = () => {
        axios.post('/login', {
            email: loginForm.email,
            password: loginForm.password
          },{
            headers: {
                    'CSRF-TOKEN': csrf.csrfToken
                } 
          })
          .then(response => {
              if (response.status === 200) {
                document.querySelector('form').reset()
                loginSuccess(response.data)
            }
          })
            .catch(error => {
            if (error.response.status === 500 || error.response.status === 503) {
                  setInputError('Services are temporarily disabled. Please try again later.')
              } else if (error.response.status) {
                setInputError(error.response.data)
            }
          })
      }

    return (
            <div className="login-wrapper">
            <form onSubmit={ verifyForm }>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        onChange={handleInputChange}
                        id="email"
                        className="form-control"
                        type="email"
                        autoComplete="email"
                        name="email" />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        onChange={handleInputChange}
                        id="password"
                        className="form-control"
                        type="password"
                        autoComplete="new-password"
                        name="password" />
                </div>
                { inputError && <p className="login-error">{inputError}</p> }
                <div className="form-group">
                    <button type="submit" disabled={disable}>Login</button>
                </div>
            </form>
            </div>
        )
}

export default Login