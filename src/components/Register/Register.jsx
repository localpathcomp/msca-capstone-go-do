import React, { useState, useEffect, useRef } from 'react'
import {
    withRouter,
    Link
} from 'react-router-dom'
import { useSelector } from 'react-redux'
import axios from 'axios'

import './Register.css'

const Register = props => {

    const firstRender = useRef(true)
    const [disable, setDisabled] = useState(true)
    const [inputError, setInputError] = useState(null)
    const [registrationForm, setRegistrationForm] = useState({})
    const csrf = useSelector(state => state.csrf)

    const handleInputChange = e => {
        const { name, value } = e.target
        setRegistrationForm({ ...registrationForm, [name]: value })
    }
    
    useEffect(() => {
        if (firstRender.current) {
            firstRender.current = false
            return
          }
        const passwordValidation = () => {
            if (registrationForm.password !== registrationForm.passwordVerify) {
                setInputError('Passwords must match!')
                return true
            }
            setInputError(null)
            return false
        }
        setDisabled(passwordValidation())
    }, [registrationForm.password, registrationForm.passwordVerify])

    const verifyForm = (e) => {
        e.preventDefault()
        if (registrationForm.firstName === '' || registrationForm.firstName === undefined) {
            setInputError('First name cannot be blank!')
            return
        } else if (registrationForm.email === '' || registrationForm.email === undefined) {
            setInputError('Email cannot be blank!')
            return
        } else {
            setInputError(null)
            registerUser()
        }
    }
    
    const registerUser = () => {
        axios.post('/register', {
            firstName: registrationForm.firstName,
            email: registrationForm.email,
            password: registrationForm.password
          },{
            headers: {
                    'CSRF-TOKEN': csrf.csrfToken
                } 
          })
          .then(response => {
              if (response.status === 201) {
                document.querySelector('form').reset()
                  alert('Signup success! Please check your email to verify your account.')
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
            <form onSubmit={ verifyForm }>
                <div className="form-group">
                    <label htmlFor="firstName">First Name</label>
                    <input
                        onChange={handleInputChange}
                        id="firstName"
                        className="form-control"
                        type="text"
                        autoComplete="name"
                        name="firstName" />
                </div>
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
                <div className="form-group">
                    <label htmlFor="passwordVerify">Password Verify</label>
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
                    <button type="submit" disabled={disable}>Register</button>
                </div>
                <div className="register-or">
                    <p>Forgot your password?<br></br><Link to="/forgot-password">Go here to reset it</Link></p>
                    <p>Already have an account?<br></br><Link to="/login">Log in</Link></p>
                </div>
            </form>
            </div>
        )
}

export default withRouter(Register)