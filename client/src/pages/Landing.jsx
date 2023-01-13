import { Link } from "react-router-dom"

const Landing = () => {

    const style = {
        main: {
            height: '100vh',
            backgroundColor: '#090909',
            color: '#2cff0f'
        },
        section: {
            fontSize: 'larger',
            textAlign: 'center',
            lineHeight: '2rem',
            padding: '1rem'
        },
        p: {
            margin: '1rem 0 2rem 0'
        },
        span: {
            padding: '0 1rem 0 1rem'
        },
        button: {
            margin: 'auto',
            width: '6rem',
            height: '3rem',
            backgroundColor: 'black',
            borderRadius: '.5rem',
            color: '#2cff0f',
            padding: '.5rem'
        },
        draw: {
            margin: 'auto',
            width: '8rem',
            height: '3rem',
            backgroundColor: 'black',
            borderRadius: '.5rem',
            color: '#2cff0f',
            padding: '.5rem'
        }
    }

    return (
        <main
            style={style.main}
            className='text-center'
        >
            <h1
                className="display-3 pt-3"
            >Welcome to Geo Path!</h1>
            <section
                style={style.section}
            >
                An app that tracks statistics while drawing your path on a map while walking, running, skating, or whatever you like! {`(Planes, trains, and automobiles experimental)`}
                If you'd like to track your overall stats and have the option to save your paths,
            </section>

            <Link to="/login">
                <button
                    className='border border-light border-3'
                    type="button"
                    style={style.button}
                >
                    Login
                </button>
            </Link>
            <span
                style={style.span}
            >
                or
            </span>
            <Link to="/signup">
                <button
                    className='border border-light border-3'
                    type="button"
                    style={style.button}
                >
                    Signup
                </button>
            </Link>
            <p
                style={style.p}
            >
                Just want to check it out?
            </p>
            <Link to="/map">
                <button
                    className='border border-light border-3'
                    style={style.draw}
                    type="button">
                    Draw Path
                </button>
            </Link>
        </main>
    )
}

export default Landing