import React, { useState, useEffect, useRef } from 'react'
import {
    withRouter,
    useParams
} from 'react-router-dom'
import { useSelector } from 'react-redux'
import axios from 'axios'

const ResetPassword = props => {

    const firstRender = useRef(true)
    const [disable, setDisabled] = useState(true)
    const [inputError, setInputError] = useState(null)
    const [resetPasswordForm, setResetPasswordForm] = useState({})
    const csrf = useSelector(state => state.csrf)

    const validationLink = useParams()

    const handleInputChange = e => {
        const { name, value } = e.target
        setResetPasswordForm({ ...resetPasswordForm, [name]: value })
    }
    
    useEffect(() => {
        if (firstRender.current) {
            firstRender.current = false
            return
          }
        const passwordValidation = () => {
            if (resetPasswordForm.password !== resetPasswordForm.passwordVerify) {
                setInputError('Passwords must match!')
                return true
            }
            setInputError(null)
            return false
        }
        setDisabled(passwordValidation())
    }, [resetPasswordForm.password, resetPasswordForm.passwordVerify])


    const submitResetPasswordForm = (e) => {
        e.preventDefault()
        setInputError(null)
        resetPassword()
    }

    const resetPassword = () => {
        axios.post('/reset-password', {
            password: resetPasswordForm.password,
            validationLink: validationLink.link
          },{
            headers: {
                    'CSRF-TOKEN': csrf.csrfToken
                }
          })
          .then(response => {
              if (response.status === 200) {
                document.querySelector('form').reset()
                  alert('Password reset successfully! Please log in to your account.')
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
        <div className="register-wrapper">
            <form onSubmit={ submitResetPasswordForm }>
                <div className="form-group">
                    <label htmlFor="password">New Password</label>
                    <input
                        onChange={handleInputChange}
                        id="password"
                        className="form-control"
                        type="password"
                        autoComplete="new-password"
                        name="password" />
                </div>
                <div className="form-group">
                    <label htmlFor="passwordVerify">Repeat New Password</label>
                    <input
                        onChange={handleInputChange}
                        id="passwordVerify"
                        className="form-control"
                        type="password"
                        autoComplete="off"
                        name="passwordVerify" />
                </div>
                { inputError && <p className="registration-error">{inputError}</p> }
                <div className="form-group">
                    <button type="submit" disabled={disable}>Submit</button>
                </div>
            </form>
            </div>
    )
}

export default withRouter(ResetPassword)