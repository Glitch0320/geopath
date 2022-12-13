import { Link } from "react-router-dom"
import { Container } from 'react-bootstrap'

const Landing = () => {

    return (
        <Container
            style={{
                height: '100vh',
                backgroundColor: '#090909',
                color: '#2cff0f'
            }}
            className='text-center'
        >
            <h1
                className="display-3 pt-3"
            >Welcome to Geo Path!</h1>
            <section
                style={{
                    fontSize: 'larger',
                    textAlign: 'center',
                    lineHeight: '2rem',
                    padding: '1rem'
                }}
            >
                An app that tracks statistics while drawing your path on a map while walking, running, skating, or whatever you like! {`(Planes, trains, and automobiles experimental)`}<br /><br />
                If you'd like to track your overall stats and have the option to save your paths, <br /><br />
            </section>

            <Link to="/login">
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
                    Login
                </button>
            </Link>
            <span
                style={{
                    padding: '0 1rem 0 1rem'
                }}
            >
                or
            </span>
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
            <p
                style={{
                    margin: '4rem 0 2rem 0'
                }}
            >
                Just want to check it out?
            </p>
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
        </Container>
    )
}

export default Landing