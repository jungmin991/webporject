export default function Register() {
    return (
        <div className="main">
        <div className="register">
            <form className="form">
            <label htmlFor="chk" aria-hidden="true">
                Register
            </label>
            <input
                className="input"
                type="text"
                name="txt"
                placeholder="Username"
                required=""
            />
            <input
                className="input"
                type="id"
                name="id"
                placeholder="id"
                required=""
            />
            <input
                className="input"
                type="password"
                name="pswd"
                placeholder="Password"
                required=""
            />
            <input
                className="input"
                type="password"
                name="pswdChk"
                placeholder="Password chk"
                required=""
            />
            <button>Register</button>
            </form>
        </div>
        </div>
    )
}
