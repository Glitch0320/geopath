import cookie from 'js-cookie'
import { useState } from 'react'
import { Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Login = () => {

    const [formData, setFormData] = useState({
        username: '',
        password: ''
    })

    const handleLogin = async e => {
        e.preventDefault()

        //TODO: validate

        const query = await fetch("/api/user/auth", {
            method: "post",
            body: JSON.stringify(formData),
            headers: {
                "Content-Type": "application/json"
            }
        })
        const result = await query.json()
        console.log(result)

        if (result && !result.err && result.token) {
            cookie.set("auth-token", result.token, { expires: 3 })
            window.location.href = '/profile'
        }
    }

    return (
        <>
            <Form className='text-center p-5'
                style={{
                    height: '100vh',
                    backgroundColor: '#090909',
                    color: '#2cff0f'
                }}
            >
                <Form.Group
                    className='mb-4'
                >
                    <Form.Label
                        className='d-block'
                        htmlFor='username'>Username</Form.Label>
                    <Form.Control
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
                        id='password'
                        onChange={e => setFormData({
                            ...formData, [e.target.id]: e.target.value
                        })}
                        value={formData.password}
                        placeholder='password...'
                        type='password' />
                </Form.Group>

                <button
                    className='border border-light border-3'
                    style={{
                        margin: 'auto',
                        width: '8rem',
                        height: '3rem',
                        backgroundColor: 'black',
                        borderRadius: '.5rem',
                        color: '#2cff0f',
                        padding: '.5rem'
                    }}
                    onClick={handleLogin}>Log In</button>
                <p
                className='p-3'
                >or</p>
                <Link to="/signup">
                <button
                    className='border border-light border-3'
                    type="button"
                    style={{
                        margin: 'auto',
                        width: '6rem',
                        height: '3rem',
                        backgroundColor: 'black',
                        borderRadius: '.5rem',
                        color: '#2cff0f',
                        padding: '.5rem'
                    }}
                >
                    Signup
                </button>
            </Link>
            </Form>
        </>
    )
}

export default Login