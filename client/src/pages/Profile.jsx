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

  const style = {
    main: {
      height: '100vh',
      backgroundColor: '#090909',
      color: '#2cff0f',
      textAlign: 'center'
    },
    button: {
      margin: 'auto',
      width: '8rem',
      height: '3rem',
      backgroundColor: 'black',
      borderRadius: '.5rem',
      color: '#2cff0f',
      padding: '.5rem'
    },
    button2: {
      margin: '1rem auto',
      width: '6rem',
      height: '3rem',
      backgroundColor: 'black',
      borderRadius: '.5rem',
      color: '#2cff0f',
      padding: '.5rem'
    },
    path: {
      textAlign: 'center',
      border: '.25rem solid #2cff0f',
      borderRadius: '.5rem',
      padding: '.5rem',
      margin: '1.5rem 1rem 0 1rem',
    }
  }

  return (
    <main
      style={style.main}
    >
      {user.name && <>
        {paths.length === 0 ? (
          <>
            <h3 className='p-3'>Hello {name}, it looks like you haven't drawn any paths yet.</h3>
            <Link to="/map">
              <button
                className='border border-light border-3'
                style={style.button}
                type="button">
                Draw Path
              </button>
            </Link>
            <br />
            <button
              className='border border-light border-3'
              style={style.button2}
              onClick={() => {
                cookie.remove('auth-token')
                window.location.href = '/'
              }}
              type="button">
              Log Out
            </button>
          </>
        ) : (
          <>
            <section
              className='p-3'
            >
              Hello {name}, you have drawn {count} path{paths.length > 1 ? 's': ''} for a total of {dist < 1609.34 ? (
                <>
                  {Math.round(dist * 1.09361)} yds
                </>
              ) : (
                <>
                  {(dist * .000621371).toFixed(1)} mi
                </>
              )} over {((seconds) => {
                let hours = Math.floor(seconds / 3600);
                let minutes = Math.floor((seconds % 3600) / 60);
                let secs = seconds % 60;
                let timeString = "";
                if (hours > 0) {
                  timeString += hours + " hour" + (hours > 1 ? "s" : "");
                }
                if (minutes > 0) {
                  timeString += (hours > 0 && secs > 0 ? ", " : "") + (hours > 0 && !secs ? " and " : "") + minutes + " minute" + (minutes > 1 ? "s" : "");
                }
                if (secs > 0) {
                  timeString += (hours > 0 || minutes > 0 ? " and " : "") + secs + " second" + (secs > 1 ? "s" : "");
                }
                return timeString;
              })(time)}.

            </section>
            <Link to="/map">
              <button
                className='border border-light border-3'
                style={style.button}
                type="button">
                Draw Path
              </button>
            </Link>
            <br />
            <button
              className='border border-light border-3'
              style={style.button2}
              onClick={() => {
                cookie.remove('auth-token')
                window.location.href = '/'
              }}
              type="button">
              Log Out
            </button>
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
                  style={style.path}
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
                  } {` `}
                  over
                  {((seconds) => {
                    let hours = Math.floor(seconds / 3600);
                    let minutes = Math.floor((seconds % 3600) / 60);
                    let secs = seconds % 60;
                    let timeString = "";

                    timeString += hours < 10 ? "0" + hours : hours;
                    timeString += ":";
                    timeString += minutes < 10 ? "0" + minutes : minutes;
                    timeString += ":";
                    timeString += secs < 10 ? "0" + secs : secs;

                    return ' ' + timeString + ' '
                  })(path.time)}
                  on
                  {` ${path.date} `}
                  with a top speed of {Math.round(path.top_speed * 2.23694)} mph.
                </div>
              }).reverse()}
            </div>
          </>
        )}
      </>}
    </main>
  )
}

export default Profile