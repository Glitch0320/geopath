import cookie from 'js-cookie'
import { useState } from 'react'
import { Container } from 'react-bootstrap'

const Profile = () => {
    if (!cookie.get('auth-token')) {
        window.location.href = '/'
    } 
    const [user, setUser] = useState({
        name: '',
        count: '',
        dist: '',
        time: '',
        paths: []
    })
    const { name, count, dist, time, paths } = user

    const getUser = async () => {
        const res = await fetch('/api/user/lookup')
        const { payload: { _id } } = await res.json()
        const r = await fetch(`/api/user/${_id}`)
        const { payload } = await r.json()
        setUser(payload)
    }
    getUser()

    return (
        <Container
            style={{
                height: '100vh',
                backgroundColor: '#090909',
                color: '#2cff0f'
            }}
        >
            {user.name && <section>
                Hello {name}, you have drawn {count} paths for a total of {dist} m over {time} s.
            </section>}
            {paths.map((p, i) => {
                const path = JSON.parse(p)
                return <div key={i}>
                    {path.properties.date}
                    {path.properties.time}
                    {path.properties.distance}
                </div>
            })}
        </Container>
    )
}

export default Profile