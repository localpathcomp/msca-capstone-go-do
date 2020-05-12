import React, { useState, useEffect, useRef } from 'react'
import { withRouter } from 'react-router-dom'
import axios from 'axios'

import './Register.css'

const Register = props => {

    const firstRender = useRef(true)
    const [disable, setDisabled] = useState(true)
    const [inputError, setInputError] = useState(null)
    const [registrationForm, setRegistrationForm] = useState({})

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
          })
          .then(response => {
              if (response.status === 201) {
                document.querySelector('form').reset()
                  alert('signup success!')
                  props.history.push('/login')
            }
          })
          .catch(error => {
              if (error.response.status) {
                setInputError(error.response.data)
            }
          })
      }

    if (props.loggedIn === true) {
        return (
            <div>logged in</div>
            )
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
                { inputError && <p>{inputError}</p> }
                <div className="form-group">
                    <button type="submit" disabled={disable}>Register</button>
                </div>
            </form>
            </div>
        )
}

export default withRouter(Register)