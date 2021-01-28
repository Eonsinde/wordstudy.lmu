import { Link } from 'react-router-dom';
import sImg from '../static/img/spiritual_cover.jpg';
import mImg from '../static/img/motivational_cover.jpg';

import './styles/book.css';


const Book = ({ data:mData }) => {
    return (
            <div className="card shadow-sm">
                <img className="card-img-top" src={ mData.genre.name === 'spiritual' ? sImg : mImg } alt='book cover' />
                <div className="card-body">
                    <p className="card-text text-dark text-capitalize">
                        Title: {mData.title.length < 20 ? mData.title : <span title={mData.title}>{mData.title.slice(0,20)}...</span>}
                        <br />Author: {mData.author.name.length < 20 ? mData.author.name : <span title={mData.author.name}>{mData.author.name.slice(0,20)}...</span>}
                    </p>
                    <div className="d-flex justify-content-between align-items-center">
                        <div className="">
                            <Link to={mData.file} target="_blank" rel="noreferrer" className="btn download-btn">Download</Link>
                        </div>
                        <small className='text-dark'><i className='fas fa-book-open fa-2x'></i></small>
                    </div>
                </div>
            </div>
    );
}
 
export default Book;