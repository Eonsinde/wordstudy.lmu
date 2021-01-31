import {useState, useEffect} from 'react';

import {connect} from 'react-redux';
import {getBooks, deleteBook, updateBook} from '../actions/book';
import {getCategories as getGenres} from '../actions/category';

import Preloader from '../content/Preloader';
import Swal from 'sweetalert2';

import Modal from 'react-bootstrap/Modal';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip';

import './styles/books.css';


const ManageBooks = ({books, genres, booksLoading, getBooks, deleteBook, updateBook, getGenres}) => {
    let [isLoading, setIsLoading] = useState(true);
    let [show, setShow] = useState(false);

    let [title, setTitle] = useState('');
    let [author, setAuthor] = useState('');
    let [file, setFile] = useState('');
    let [fileName, setFileName] = useState('');
    let [selectedGenre, setGenre] = useState('');

    let [currentBook, setCurrentBook] = useState('');
    
    useEffect(() => {
        document.title = 'Word Study | Book Management';
        getBooks();
        getGenres();
        setIsLoading(booksLoading);
    }, []);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
        setFileName(e.target.files[0].name);
    }

    const setActiveBook = (id) => {
        setShow(true);
        setCurrentBook(id);
    }

    const handleUpdate = () => {
        if (title === '' && author === '' && fileName === '' && selectedGenre === ''){
            Toast.fire({
                icon: 'error',
                title: 'Fill in a field'
            })
        }else{
            let bookFormData = new FormData();

            if (title){
                bookFormData.append('title', title);
            }
            if (author){
                bookFormData.append('author', author);
            }
            if (file){
                bookFormData.append('file', file, fileName);
            }
            if (selectedGenre){
                bookFormData.append('genre', JSON.stringify({
                    name: selectedGenre
                })); 
            }

            updateBook(currentBook, bookFormData);

            setTimeout(() => {
                setTitle('');
                setAuthor('');
                setFile('');
                setFileName('');
                setGenre('');  
            }, 2000);
        }
    } 

    const handleDelete = (id) => {
        swalWithBootstrapButtons.fire({
                title: `Are you sure?`,
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes',
                cancelButtonText: 'No, cancel!',
                reverseButtons: false
            })
            .then((result) => {
                if (result.isConfirmed) {
                    deleteBook(id);
                }
            })
    } 

    return ( 
        <section className='manage-grid'>
            {
                isLoading
                ?
                <Preloader size='md' />
                :
                books.map((book, index) => (
                    <div key={book.id} className="my-admin-card shadow-sm">
                        <div className="d-flex justify-content-center align-items-center mb-3">
                            <small className='text-dark'><i className='fas fa-book-open fa-3x'></i></small>
                        </div>
                        <p className="card-text text-center text-dark text-capitalize">
                            Title: {
                                book.title.length < 20 
                                ? 
                                book.title 
                                : 
                                <OverlayTrigger
                                    key={index}
                                    placement={'bottom'}
                                    overlay={
                                        <Tooltip id={`tooltip-${'bottom'}`}>
                                            {book.title}
                                        </Tooltip>
                                    }
                                >
                                    <span>{book.title.slice(0,20)}...</span>
                                </OverlayTrigger>
                                }
                            <br />
                            Author: {
                                book.author.length < 20 
                                ?
                                book.author 
                                : 
                                <OverlayTrigger
                                    key={book.id}
                                    placement={'bottom'}
                                    overlay={
                                        <Tooltip id={`tooltip-${'bottom'}`}>
                                            {book.author}
                                        </Tooltip>
                                    }
                                >
                                    <span>{book.author.slice(0,20)}...</span>
                                </OverlayTrigger>
                            }
                            <br/>
                            Genre: {book.genre.name < 20 ? book.genre.name : book.genre.name.slice(0, 20)}
                            <br />
                            File: {
                                book.file.length < 30
                                ?
                                book.file
                                :
                                <OverlayTrigger
                                    key={book.id}
                                    placement={'bottom'}
                                    overlay={
                                        <Tooltip id={`tooltip-${'bottom'}`}>
                                            {book.file}
                                        </Tooltip>
                                    }
                                >
                                    <span>{book.file.slice(0,25)}...</span>
                                </OverlayTrigger>
                            }
                        </p>
                        <div className='my-admin-card-overlay'>
                            <button className='' onClick={() => setActiveBook(book.id)}>Edit<i className='fas fa-pen ml-2'></i></button>
                            <button className='bg-danger' onClick={() => handleDelete(book.id)}>Delete<i className='fas fa-trash ml-2'></i></button>
                        </div>
                    </div>
                ))
            }
            <Modal
                show={show}
                onHide={() => setShow(false)}
                dialogClassName="modal-90w"
                scrollable={true}
                aria-labelledby="example-custom-modal-styling-title"
            >
                <Modal.Header closeButton>
                <Modal.Title id="example-custom-modal-styling-title">
                    Update Book id:- {currentBook}
                </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className='createbook-form' onSubmit={e => e.preventDefault()}>
                        <div>
                            <label>Title</label>
                            <input className='early-input' onChange={e => setTitle(e.target.value)} type="text" value={title} />
                        </div>
                        <div>
                            <label>Author</label>
                            <input className='early-input' onChange={e => setAuthor(e.target.value)} type="text" value={author} />
                        </div>
                        <div>
                            <label>File</label>
                            <input className='early-input' onChange={handleFileChange} type="file" />
                        </div>
                        <div>
                            <label>Genre</label>
                            <select onChange={e => setGenre(e.target.value)} >
                                <option value="" key="0">All</option>
                                {
                                    genres.map(genre => 
                                        <option value={genre.name} key={genre.id}>{genre.name}</option>    
                                    )
                                }
                            </select>
                        </div>
                        <div>
                            <input onClick={handleUpdate} className='createbook-submit-btn' type="submit" />
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
        </section>
    );
}

const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: false,
    onOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
});

const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-primary',
      cancelButton: 'btn btn-danger'
    },
});

const mapStateToProps = state => ({
    books: state.book.books,
    booksLoading: state.book.isLoading,
    genres: state.category.categories
})

export default connect(mapStateToProps, {getBooks, updateBook, deleteBook, getGenres})(ManageBooks);