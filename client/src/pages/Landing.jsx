import { Link } from "react-router-dom"

const Landing = () => {

    return (
        <>
            <h1>Welcome to Geo Path!</h1>
            <h2>What is Geo Path?</h2>
            <section>It draw line. It track stats.</section>
            <h2>Try it Out!</h2>
            <Link to="/map">
                <button type="button">
                    Draw Path
                </button>
            </Link>
            <Link to="/login">
                <button type="button">
                    Login
                </button>
            </Link>
            or
            <Link to="/signup">
                <button type="button">
                    Signup
                </button>
            </Link>
        </>
    )
}

export default Landing