import cookie from 'js-cookie'
import { useState } from 'react'
import { Link } from 'react-router-dom'

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
  if (!user.name) getUser()

  return (
    <div
      style={{
        height: '100vh',
        backgroundColor: '#090909',
        color: '#2cff0f',
        textAlign: 'center'
      }}
    >
      {paths.length === 0 ? (
        <>
          <h3 className='p-3'>It looks like you haven't drawn any paths yet.</h3>
          <Link to="/map">
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
              type="button">
              Draw Path
            </button>
          </Link>
        </>
      ) : (
        <>
          {user.name && <section
            style={{
              padding: '1rem'
            }}
          >
            Hello {name}, you have drawn {count} paths for a total of {dist < 1609.34 ? (
              <>
                {Math.round(dist * 1.09361)} yds
              </>
            ) : (
              <>
                {(dist * .000621371).toFixed(1)} mi
              </>
            )} over {((s) => {
              let str = ''
              const hrs = (new Date(s * 1000).toISOString().slice(11, 13))
              const mns = (new Date(s * 1000).toISOString().slice(14, 16))
              const sec = (new Date(s * 1000).toISOString().slice(17, 19))
              if (parseInt(hrs) > 0) str = `${parseInt(hrs)} hours, `
              if (parseInt(hrs) > 0 && parseInt(mns) === 0) str = `${parseInt(hrs)} hours, and `
              if (parseInt(hrs) > 0 && parseInt(mns) === 0 && parseInt(sec) === 0) str = `${parseInt(hrs)} hours`
              if (parseInt(mns) > 0) str += `${parseInt(mns)} minutes, and `
              if (parseInt(sec) > 0) str += `${parseInt(sec)} seconds`
              return str
            })(time)}.

          </section>}
          <Link to="/map">
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
              type="button">
              Draw Path
            </button>
          </Link>
          <h2 className='text-center p-3'
            style={{
              borderBottom: '.25rem solid #2cff0f',
              marginBottom: '1rem'
            }}
          >Saved Paths</h2>
          <div>
            {paths.map((p, i) => {
              const path = JSON.parse(p)
              return <div key={i}
                style={{
                  textAlign: 'center',
                  border: '.25rem solid #2cff0f',
                  borderRadius: '.5rem',
                  padding: '.5rem',
                  margin: '1.5rem 1rem 0 1rem'
                }}
              >
                {
                  path.distance < 1609.34 ? (
                    <>
                      {Math.round(path.distance * 1.09361)} yds
                    </>
                  ) : (
                    <>
                      {Math.round(path.distance * .000621371)} mi
                    </>
                  )
                } on
                {` ${path.date}`} for {` `}
                {((s) => {
                  let str = ''
                  const hrs = (new Date(s * 1000).toISOString().slice(11, 13))
                  const mns = (new Date(s * 1000).toISOString().slice(14, 16))
                  const sec = (new Date(s * 1000).toISOString().slice(17, 19))
                  if (parseInt(hrs) > 0) str = `${parseInt(hrs)} hours, `
                  if (parseInt(hrs) > 0 && parseInt(mns) === 0) str = `${parseInt(hrs)} hours, and `
                  if (parseInt(hrs) > 0 && parseInt(mns) === 0 && parseInt(sec) === 0) str = `${parseInt(hrs)} hours`
                  if (parseInt(mns) > 0) str += `${parseInt(mns)} minutes, and `
                  if (parseInt(sec) > 0) str += `${parseInt(sec)} seconds`
                  return str
                })(path.time)} with a top speed of {Math.round(path.top_speed * 2.23694)} mph.
              </div>
            })}
          </div>
        </>
      )}
    </div >
  )
}

export default Profile