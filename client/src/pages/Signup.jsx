import cookie from 'js-cookie'
import { useState } from 'react'

const Signup = () => {

    const [formData, setFormData] = useState({
        username: '',
        password: '',
        confirm: ''
    })

    const handleSignup = async e => {
        e.preventDefault()

        //TODO: validate

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
                <label htmlFor='confirm'>Confirm Password</label>
                <input
                    id='confirm'
                    onChange={e => setFormData({
                        ...formData, [e.target.id]: e.target.value
                    })}
                    value={formData.confirm}
                    type='password' />
                <button onClick={handleSignup}>Sign Up</button>
            </form>
        </>
    )
}

export default Signup