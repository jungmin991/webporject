export default function Main() {
    return (
        <div className="main">
            <div className="login">
                <form className="form">
                    <label htmlFor="chk" aria-hidden="true">
                    Log in
                    </label>
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
                    <button>Log in</button>
                </form>
            </div>
        </div>      
    );
}