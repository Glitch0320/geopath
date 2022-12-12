import cookie from 'js-cookie'
import { useState } from 'react'

const Login = () => {

    const [ formData, setFormData ] = useState({
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
            <form>
                <label htmlFor='username'>Username</label>
                <input 
                id='username'
                onChange={e => setFormData({
                    ...formData, [e.target.id]: e.target.value
                })} 
                value={formData.username} 
                type='text' />
                <label htmlFor='password'>Password</label>
                <input 
                id='password'
                onChange={e => setFormData({
                    ...formData, [e.target.id]: e.target.value
                })} 
                value={formData.password} 
                type='password' />
                <button onClick={handleLogin}>Log In</button>
            </form>
        </>
    )
}

export default Login