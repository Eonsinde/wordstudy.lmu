import {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import {addBook} from '../../actions/book';

import Swal from 'sweetalert2';
import Modal from 'react-bootstrap/Modal';
import '../styles/createbook.css';

const CreateBook = ({show, setShow, addBook}) => {
    let [genres, setGenres] = useState([]);
    let [title, setTitle] = useState('');
    let [author, setAuthor] = useState('');
    let [file, setFile] = useState('');
    let [fileName, setFileName] = useState('');
    let [selectedGenre, setGenre] = useState('');

    useEffect(() => {
        const fetchGenres = async() => {
            let result = await axios.get('/genres');

            setGenres(result.data);
        }

        fetchGenres();
    }, []);

    const handleSubmit = () => {
        if (title === '' || author === '' || file === "" || selectedGenre === ''){
            Toast.fire({
                icon: 'error',
                title: 'Please fill in all fields'
            })
        }else{
            let book_data = {
                title: title,
                author: author,
                file: file,
                fileName: fileName,
                genre: selectedGenre
            }

            addBook(book_data);
            
            setTimeout(() => {
                setTitle('');
                setAuthor('');
                setFile('');
                setFileName('');
                setGenre('');   
            }, 2000);
        }
    }

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
        setFileName(e.target.files[0].name);
    }

    return (  
        <>
            <Modal
                show={show}
                onHide={() => setShow(false)}
                dialogClassName="modal-90w"
                aria-labelledby="example-custom-modal-styling-title"
            >
                <Modal.Header closeButton>
                <Modal.Title id="example-custom-modal-styling-title">
                    Add Book
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
                            <input onClick={handleSubmit} className='createbook-submit-btn' type="submit" />
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
        </>
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

 
export default connect(null, {addBook})(CreateBook);