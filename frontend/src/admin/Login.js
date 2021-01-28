import {useState} from 'react';
import './styles/login.css';


const Login = () => {
    let [toggleReveal, setReveal] = useState(false);

    return ( 
        <section className='login-wrapper'>
            <form className='login-form'>
                <div className="login-form-header text-center">
                    <h1 className='login-form-header-text text-dark'>Word Study</h1>
                    <small className='login-form-header-sub-text text-muted'>Admin Portal</small>
                </div>

                <div className="form-sect">
                    <label htmlFor=""><i className="fas fa-user"></i></label>
                    <input type="text" placeholder="Username" />
                </div>
                <div className="form-sect">
                     <label htmlFor=""><i className="fas fa-key"></i></label>
                    <input type={`${toggleReveal ? 'text': 'password'}`} placeholder="Password" />
                    <div className='pswd-reveal' onClick={()=>setReveal(!toggleReveal)}><i className='fas fa-eye'></i></div>
                </div>
                <div className='form-sect'>
                    <input type="submit" value="Login" />
                </div>
            </form>
            <footer className="login-form-footer text-white-50 mt-3">
                <small>Copyright &copy; { new Date().getFullYear() }; Word Study</small>
            </footer>
        </section>  
    );
}
 
export default Login;