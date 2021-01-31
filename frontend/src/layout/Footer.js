import {Link} from 'react-router-dom';
import './styles/footer.css';


const Footer = () => {
    return ( 
        <footer className='main-footer'>
        <div className="container py-5">
            <div className="row">
                <div className="col-md-12 text-center">
                    <h5 className='mb-3'>Follow Us</h5>
                    <p className='text-white-50'>Let us be social</p>
                    <div className="social-icons">
                        {/* add their actual social links */}
                        <Link to="#" className="social-icon"><i className="fab fa-facebook-square"></i></Link>
                        <Link to="#" className="social-icon"><i className="fab fa-instagram"></i></Link>
                        <Link to="#" className='social-icon'><i className="fab fa-twitter"></i></Link>
                        <Link to="#" className='social-icon'><i className="fab fa-linkedin"></i></Link>
                    </div>
                </div>
            </div>
        </div>
        <hr className="footer__line" />
        <div className="col-12 text-white p-4">
            <p className='text-center m-0' style={{zIndex: '0'}}>Word-Study &copy; 2020</p>
        </div>
    </footer>
    );
}
 
export default Footer;