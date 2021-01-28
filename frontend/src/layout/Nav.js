import React from 'react';
import { Link } from 'react-router-dom';
import m_logo from '../static/img/wsf_logo.png';
import './styles/nav.css';


class Navbar extends React.Component {

    componentDidMount() {
        let navCollapse = document.querySelector('.my-navbar-collapse');
        let navToggler = document.querySelector('a.my-navbar-toggler');
        let navContainer = document.querySelector('.nav-container');


        navToggler.addEventListener('click', function(){
            this.classList.toggle('change-to-close');
            navCollapse.classList.toggle('small-scr');
            // document.body.classList.toggle('lock-scroll');
        });

        window.addEventListener('resize', function(){
            if (this.innerWidth >= 768 && navToggler.classList.contains('change-to-close')){
                navCollapse.classList.remove('small-scr');
                navToggler.classList.remove('change-to-close');
                // document.body.classList.remove('lock-scroll');
            }
        });

        document.addEventListener('scroll', function(){
            if (document.documentElement.scrollTop > 80){
                navContainer.classList.add('my-scroll-navbar');
            }else{
                navContainer.classList.remove('my-scroll-navbar');
            }
        });
    }


    render() {
        let {navFixedBg} = this.props;

        return ( 
            <nav className={`nav-container ${ navFixedBg ? `set-fixed-with-blue-bg` : `` }`}>
                <div className="container">
                    <Link to="/" className="navbar-brand"><img src={m_logo} alt='not found' /></Link>
                    <Link to="#" className='my-navbar-toggler'>
                        <div className='hamburger-line'></div>
                    </Link>
                    <div className="my-navbar-collapse">
                            <ul className='my-navbar-nav'>
                                <li className='nav-item'>
                                    <Link to="/" className='nav-link'>Home</Link>
                                </li>
                                <li className='nav-item'>
                                    <Link to="/library" className='nav-link'>Library</Link>
                                </li>
                                <li className='nav-item'>
                                    <Link to="/contact" className='nav-link'>Contact</Link>
                                </li>
                                <li className='nav-item'>
                                    <Link to="/register" className='nav-link'>Register</Link>
                                </li>
                            </ul>
                            <div className="nav-social-icons">
                                <h6 className='px-2 text-white-50 mb-3'>Social Icons</h6>
                                <Link to="#" className="nav-social-icon"><i className="fab fa-facebook-square"></i></Link>
                                <Link to="#" className="nav-social-icon"><i className="fab fa-instagram"></i></Link>
                                <Link to="#" className='nav-social-icon'><i className="fab fa-twitter"></i></Link>
                                <Link to="#" className='nav-social-icon'><i className="fab fa-linkedin"></i></Link>
                            </div>
                    </div>
                </div>
            </nav>
        );
    }
}
 
export default Navbar;