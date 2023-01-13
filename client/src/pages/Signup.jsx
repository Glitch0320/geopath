import cookie from 'js-cookie'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Form } from 'react-bootstrap'

const Signup = () => {

    const [formData, setFormData] = useState({
        username: '',
        password: '',
        confirm: ''
    })

    const handleSignup = async e => {
        e.preventDefault()

        if (formData.username.length < 3) return alert('Username must be at least 3 characters long')
        if (formData.password.length < 8) return alert('Password must be at least 8 characters long')
        if (formData.password !== formData.confirm) return alert('Passwords must match')

        const query = await fetch("/api/user/", {
            method: "post",
            body: JSON.stringify({
                username: formData.username,
                password: formData.password
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
        const result = await query.json()
        console.log(result)

        if (result && !result.err && result.message === 'success') {
            cookie.set("auth-token", result.token, { expires: 3 })
            window.location.href = '/profile'
        } else {
            alert('Username taken')
        }
    }

    const style = {
        form: {
            height: '100vh',
            backgroundColor: '#090909',
            color: '#2cff0f'
        },
        signup: {
            margin: 'auto',
            width: '8rem',
            height: '3rem',
            backgroundColor: 'black',
            borderRadius: '.5rem',
            color: '#2cff0f',
            padding: '.5rem'
        },
        login: {
            margin: 'auto',
            width: '6rem',
            height: '3rem',
            backgroundColor: 'black',
            borderRadius: '.5rem',
            color: '#2cff0f',
            padding: '.5rem'
        },
        control: {
            maxWidth: '20rem',
            margin: 'auto'
        }
    }

    return (
        <>
            <Form className='text-center p-5'
                style={style.form}
            >
                <Form.Group
                    className='mb-4'
                >
                    <Form.Label
                        className='d-block'
                        htmlFor='username'>Username</Form.Label>
                    <Form.Control
                        style={style.control}
                        id='username'
                        onChange={e => setFormData({
                            ...formData, [e.target.id]: e.target.value
                        })}
                        value={formData.username}
                        placeholder='username...'
                        type='text' />
                </Form.Group>

                <Form.Group
                    className='mb-5'
                >
                    <Form.Label
                        className='d-block'
                        htmlFor='password'>Password</Form.Label>
                    <Form.Control
                        style={style.control}
                        id='password'
                        onChange={e => setFormData({
                            ...formData, [e.target.id]: e.target.value
                        })}
                        value={formData.password}
                        placeholder='password...'
                        type='password' />
                </Form.Group>

                <Form.Group
                    className='mb-5'
                >
                    <Form.Label
                        className='d-block'
                        htmlFor='confirm'>Confirm password</Form.Label>
                    <Form.Control
                        style={style.control}
                        id='confirm'
                        onChange={e => setFormData({
                            ...formData, [e.target.id]: e.target.value
                        })}
                        value={formData.confirm}
                        placeholder='confirm password...'
                        type='password' />
                </Form.Group>

                <button
                    className='border border-light border-3'
                    style={style.signup}
                    onClick={handleSignup}>Sign Up</button>
                <p
                    className='p-3'
                >or</p>
                <Link to="/login">
                    <button
                        className='border border-light border-3'
                        type="button"
                        style={style.login}
                    >
                        Login
                    </button>
                </Link>
            </Form>
        </>
    )
}

export default Signup