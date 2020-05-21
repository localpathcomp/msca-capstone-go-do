import React, { useState } from 'react'
import {
    Link,
    withRouter
} from 'react-router-dom'
import { useSelector } from 'react-redux'
import axios from 'axios'

import './ForgotPassword.css'

const ForgotPassword = props => {

    const [inputError, setInputError] = useState(null)
    const [lostPasswordForm, setLostPasswordForm] = useState({})
    const csrf = useSelector(state => state.csrf)

    const handleInputChange = e => {
        const { name, value } = e.target
        setLostPasswordForm({ ...lostPasswordForm, [name]: value })
    }

    const verifyForm = (e) => {
        e.preventDefault()
        if (lostPasswordForm.email === '' || lostPasswordForm.email === undefined) {
            setInputError('Email cannot be blank!')
            return
        } else {
            setInputError(null)
            sumbitForgotPassword()
        }
    }
    
    const sumbitForgotPassword = () => {
        axios.post('/forgot-password', {
            email: lostPasswordForm.email
          },{
            headers: {
                    'CSRF-TOKEN': csrf.csrfToken
                } 
          })
          .then(response => {
              if (response.status === 201) {
                  alert('Request submitted! Please check your email to reset your password.')
                  props.history.push('/login')
            }
          })
            .catch(error => {
            if (error.response.status === 500) {
                  setInputError('Services are temporarily disabled. Please try again later.')
              } else if (error.response.status) {
                setInputError(error.response.data)
            }
          })
      }

    return (
        <div className="register-wrapper forgot-password">
            <div className="forgot-password-splash">
                <p>Submit your email to receive a password reset link. This link will expire in 24 hours.</p>
            </div>
            <form onSubmit={verifyForm}>
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
                { inputError && <p className="lost-password-error">{inputError}</p> }
                <div className="form-group">
                    <button type="submit">Submit</button>
                </div>
                <div className="register-or">
                    <p>Don't have an account?<br></br><Link to="/register">Go here to register!</Link></p>
                    <p>Already have an account?<br></br><Link to="/login">Log in</Link></p>
                </div>
            </form>
        </div>
        )
}

export default withRouter(ForgotPassword)