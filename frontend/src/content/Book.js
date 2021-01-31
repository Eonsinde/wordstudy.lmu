import { Link } from 'react-router-dom';
import sImg from '../static/img/spiritual_cover.jpg';
import mImg from '../static/img/motivational_cover.jpg';

import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip';

import './styles/book.css';


const Book = ({ data:mData }) => {
    return (
            <div className="card shadow-sm">
                <Link to={mData.file} target="_blank" rel="noreferrer" className="download-btn"><i className='fas fa-download mr-2'></i></Link>
                <img className="card-img-top" src={ mData.genre.name === 'spiritual' ? sImg : mImg } alt='book cover' />
                <div className="card-body text-center">
                    <p className="card-text text-dark text-capitalize">
                        Title: {
                            mData.title.length < 20 
                            ? 
                            mData.title 
                            : 
                            <OverlayTrigger
                                key={0}
                                placement={'bottom'}
                                overlay={
                                    <Tooltip id={`tooltip-${'bottom'}`}>
                                        {mData.title}
                                    </Tooltip>
                                }
                            >
                                <span>{mData.title.slice(0,20)}...</span>
                            </OverlayTrigger>
                        }
                        <br />
                        Author: {
                            mData.author.length < 20 
                            ?
                            mData.author 
                            : 
                            <OverlayTrigger
                                key={mData.id}
                                placement={'bottom'}
                                overlay={
                                    <Tooltip id={`tooltip-${'bottom'}`}>
                                        {mData.author}
                                    </Tooltip>
                                }
                            >
                                <span>{mData.author.slice(0,20)}...</span>
                            </OverlayTrigger>
                        }
                        <br/>
                        Genre: {
                            mData.genre.name.length < 20
                            ? 
                            mData.genre.name
                            :
                            <OverlayTrigger
                            key={mData.id}
                            placement={'bottom'}
                            overlay={
                                <Tooltip id={`tooltip-${'bottom'}`}>
                                    {mData.genre.name}
                                </Tooltip>
                                }
                            >
                                <span>{mData.genre.name.slice(0, 20)}...</span>
                            </OverlayTrigger>
                        }
                    </p>
                    <div className="d-flex justify-content-center align-items-center">
                        <small className='text-dark'><i className='fas fa-book-open fa-2x'></i></small>
                        
                    </div>
                </div>
            </div>
    );
}
 
export default Book;