import {useState, useEffect} from 'react';
import {connect} from 'react-redux';

import {getCategories, deleteGenre, updateGenre } from '../actions/category';

import Modal from 'react-bootstrap/Modal';

import Swal from 'sweetalert2';
import Preloader from '../content/Preloader';


const ManageGenre = ({genres, getCategories, deleteGenre, updateGenre}) => {
    let [isLoading, setIsLoading] = useState(true);
    let [name, setName] = useState('');
    let [show, setShow] = useState(false);

    let [currentGenre, setCurrentGenre] = useState('');

    useEffect(() => {
        document.title = 'Word Study | Manage Genre';
        getCategories();
        setIsLoading(false);
    }, []);

    const setActiveEvent = (id) => {
        setShow(true);
        setCurrentGenre(id);
    }

    const handleUpdate = () => {
        if (name === ''){
            Toast.fire({
                icon: 'error',
                title: 'Fill in the blank field'
            })
        }else{
            let genreData = {};

            if (name){
                genreData['name'] = name;
            }

            updateGenre(currentGenre, genreData);

            setTimeout(() => {
                setName('');
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
                deleteGenre(id);
            }
        })
    }

    return ( 
        <section className='manage-books'>
            {
                isLoading
                ?
                <Preloader />
                :
                genres?.map(genre => 
                    <div key={genre.id} className="my-admin-card shadow-sm">
                        <div className='text-center mb-2'>
                            <small >Genre</small>
                        </div>
                        <h3 className="card-text text-center text-dark text-capitalize">
                            {genre.name}
                        </h3>
                        <div className='my-admin-card-overlay mt-4'>
                            <button className='' onClick={() => setActiveEvent(genre.id)}>Edit<i className='fas fa-pen ml-2'></i></button>
                            <button className='bg-danger' onClick={() => handleDelete(genre.id)}>Delete<i className='fas fa-trash ml-2'></i></button>
                        </div>
                    </div>
                )
            }
            <Modal
                show={show}
                onHide={() => setShow(false)}
                dialogClassName="modal-90w"
                aria-labelledby="example-custom-modal-styling-title"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-custom-modal-styling-title">
                        Update Genre id:- {currentGenre}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className='creategenre-form' onSubmit={e => e.preventDefault()}>
                        <div>
                            <label>Name</label>
                            <input className='early-input' onChange={e => setName(e.target.value)} type="text" value={name} />
                        </div>
                        <div>
                            <input onClick={handleUpdate} className='creategenre-submit-btn' type="submit" />
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
    genres: state.category.categories
})


export default connect(mapStateToProps, {getCategories, deleteGenre, updateGenre})(ManageGenre);