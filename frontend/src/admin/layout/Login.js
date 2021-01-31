import {useState, useEffect} from 'react';
import {Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../../actions/auth';

import {loadUser} from '../../actions/auth';

import Swal from 'sweetalert2';

import '../styles/login.css';



const Login = ({login, loadUser, isAuthenticated}) => {
    let [username, setUsername] = useState('');
    let [password, setPassword] = useState('');
    let [submitted, setSubmitted] = useState(false);
    let [toggleReveal, setReveal] = useState(false);

    useEffect(() => {
        document.title = 'Word Study | Admin Login';
        loadUser();
    }, [submitted]);

    const handleSubmit = e => {
        e.preventDefault();

        if (username === '' || password === ''){
            Toast.fire({
                icon: 'error',
                title: `Please fill in all fields`
            });
        }else{
            login({username, password});
            setSubmitted(true);
        }
    }

    if (isAuthenticated)
        return <Redirect to='/admin-dashboard' />
    return (
        <section className='login-wrapper'>
            <form className='login-form' onSubmit={handleSubmit}>
                <div className="login-form-header text-center">
                    <h1 className='login-form-header-text text-dark'>Word Study</h1>
                    <small className='login-form-header-sub-text text-muted'>Admin Portal</small>
                </div>

                <div className="form-sect">
                    <label htmlFor=""><i className="fas fa-user"></i></label>
                    <input type="text" onChange={e => setUsername(e.target.value)} value={username} placeholder="Username" />
                </div>
                <div className="form-sect">
                        <label htmlFor=""><i className="fas fa-key"></i></label>
                    <input type={`${toggleReveal ? 'text': 'password'}`} value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
                    <div className='pswd-reveal' onClick={()=>setReveal(!toggleReveal)}><i className={`fas ${toggleReveal ? 'fa-eye-slash' : 'fa-eye'}`}></i></div>
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

const Toast = Swal.mixin({
    toast: true,
    position: 'top',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: false,
    onOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
});

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})
 
export default connect(mapStateToProps, {login, loadUser})(Login);