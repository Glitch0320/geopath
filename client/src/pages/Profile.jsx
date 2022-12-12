import cookie from 'js-cookie'

const Profile = () => {
    if (!cookie.get('auth-token')) {
        window.location.href = '/'
    }
    return (
        <>
            Profile
        </>
    )
}

export default Profile