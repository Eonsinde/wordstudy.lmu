import {useState} from 'react';
import { Link } from 'react-router-dom'; 
import './styles/admin.css'

import wsf_logo from '../static/img/wsf_logo.png';

const AdMain = ({comp: Component}) => {
    let [asideShow, setAsideShow] = useState(false);
    let [dropShow, setDropShow] = useState(false);
    let [formDropShow, setFormDropShow] = useState(false); // for the search form


    const handleRender = () => {
        return (<section className='admin-wrapper'>
            <aside className={`admin-aside ${asideShow ? 'show' : ''}`}>
                <Link to="#" className="navbar-brand"><img src={wsf_logo} alt="avatar" /></Link>
                <hr className="sidebar-divider my-0"></hr>
                <div className='admin-aside-header-text'>
                    <h2>Word Study</h2>
                    <p>Admin Portal</p>
                </div>
                <hr className="sidebar-divider my-0"></hr>
                <ul className='admin-aside-nav'>
                    <li className="nav-item">
                        <Link to='#' className="nav-link">
                        <i className="fas fa-fw fa-tachometer-alt"></i>
                        <span>Dashboard</span></Link>
                    </li>
                    <li className="nav-item">
                        <Link to='#' className="nav-link">
                        <i className="fas fa-fw fa-book"></i>
                        <span>Create Book</span></Link>
                    </li>
                    <li className="nav-item active">
                        <Link to='#' className="nav-link">
                            <i className="fas fa-fw fa-user"></i>
                            <span>Register</span>
                        </Link>
                    </li>
                </ul>

                <div className="sub-div text-center">
                    <button className="rounded-circle border-0" onClick={() => setAsideShow(false)} id="sidebarToggle"></button>
                </div>
            </aside>

            <div className="admin-body">
                <nav className='navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow'>
                    <button id="sidebarToggleTop" onClick={() => setAsideShow(true)} className="btn btn-link d-md-none rounded-circle mr-3">
                        <i className="fa fa-bars"></i>
                    </button>

                    <form className="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
                        <div className="input-group">
                            <input type="text" className="form-control bg-light border-0 small" placeholder="Search for..." aria-label="Search" aria-describedby="basic-addon2"/>
                            <div className="input-group-append">
                                <button className="btn btn-primary" type="button">
                                    <i className="fas fa-search fa-sm"></i>
                                </button>
                            </div>
                        </div>
                    </form>

                    <ul className="navbar-nav ml-auto">
                        <li className='nav-item dropdown no-arrow d-sm-none'>
                            <Link to='#' className="nav-link dropdown-toggle">
                                <i className="fas fa-search fa-fw"></i>
                            </Link>
                            <div className='dropdown-menu show dropdown-menu-right p-3 shadow animated--grow-in'>
                                <form className="form-inline mr-auto w-100 navbar-search">
                                <div className="input-group">
                                    <input type="text" className="form-control bg-light border-0 small" placeholder="Search for..."/>
                                    <div className="input-group-append">
                                    <button className="btn btn-primary" type="button">
                                        <i className="fas fa-search fa-sm"></i>
                                    </button>
                                    </div>
                                </div>
                                </form>
                            </div>
                        </li>

                        <div className="topbar-divider d-none d-sm-block"></div>

                        <li className="nav-item dropdown no-arrow">
                            <Link to='#' className="nav-link dropdown-toggle" onClick={() => setDropShow(!dropShow)}>
                                <span className="mr-2 d-none d-lg-inline small">Valerie Luna</span>
                                <img className="img-profile rounded-circle" src="https://source.unsplash.com/QAB-WJcbgJk/60x60"/>
                            </Link>

                            <div className={`dropdown-menu  ${ dropShow ? `show` : `` } dropdown-menu-right shadow animated--grow-in`}>
                                <Link to='#' className="dropdown-item">
                                    <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                                    Profile
                                </Link>
                                <Link to="#" className="dropdown-item">
                                    <i className="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400"></i>
                                    Settings
                                </Link>
                                <Link to='#' className="dropdown-item">
                                    <i className="fas fa-list fa-sm fa-fw mr-2 text-gray-400"></i>
                                    Activity Log
                                </Link>
                                <div className="dropdown-divider"></div>
                                <Link to='#' className="dropdown-item" >
                                    <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                                    Logout
                                </Link>
                            </div>
                        </li>
                    </ul>

                </nav>

                <div className='admin-content-wrapper'>
                    <div className="container-fluid">
                        {/* render everything here */}
                        <>
                            <Component />
                        </>
                    </div>
                </div>

                <footer className="bg-white pb-3">
                    <div className="container my-auto">
                        <div className="copyright text-center my-auto">
                            <span style={{fontSize: '1rem'}}>Copyright © WS Admin Portal - {new Date().getFullYear()}</span>
                        </div>
                    </div>
                </footer>
            </div>
        </section>);
    }

    return handleRender();
}
 
export default AdMain;