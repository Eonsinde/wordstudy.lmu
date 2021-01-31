import {useState, useEffect} from 'react';

import {connect} from 'react-redux';
import {getExcos, deleteExco, updateExco} from '../actions/exco';

import Preloader from '../content/Preloader';
import Swal from 'sweetalert2';

import Modal from 'react-bootstrap/Modal';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip';



const ManageExcos = ({excos, getExcos, deleteExco, updateExco, excosLoading}) => {
    let [isLoading, setIsLoading] = useState(true);
    let [show, setShow] = useState(false);

    let [name, setName] = useState('');
    let [post, setPost] = useState('');
    let [image, setImage] = useState('');
    let [imageName, setImageName] = useState('');

    let [currentExco, setCurrentExco] = useState('');

    useEffect(() => {
        document.title = 'Word Study | Exco Management';
        getExcos();
        setIsLoading(excosLoading);
    }, []);

    const setActiveExco = (id) => {
        setShow(true);
        setCurrentExco(id);
    }

    const handleFileChange = (e) => {
        setImage(e.target.files[0]);
        setImageName(e.target.files[0].name);
    }

    const handleUpdate = () => {
        if (name === '' && post === '' && imageName === ''){
            Toast.fire({
                icon: 'error',
                title: 'Fill in a field'
            })
        }else{
            let excoFormData = new FormData();

            if (name){
                excoFormData.append('name', name);
            }
            if (post){
                excoFormData.append('post', post);
            }
            if (image){
                excoFormData.append('photo', image, imageName);
            }

            updateExco(currentExco, excoFormData);

            setTimeout(() => {
                setName('');
                setPost('');
                setImage('');
                setImageName('');
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
                    deleteExco(id);
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
                excos.map((exco, index) => (
                    <div key={exco.id} className="my-admin-card shadow-sm">
                        <img className='card-img-top' src={exco.photo} alt={`${exco.name} avatar`} />
                        <div className='card-body'>
                            <p className="card-text text-center text-dark text-capitalize">
                                Name: {
                                    exco.name.length < 20 
                                    ? 
                                    exco.name
                                    : 
                                    <OverlayTrigger
                                        key={index}
                                        placement={'bottom'}
                                        overlay={
                                            <Tooltip id={`tooltip-${'bottom'}`}>
                                                {exco.name}
                                            </Tooltip>
                                        }
                                    >
                                        <span>{exco.name.slice(0,20)}...</span>
                                    </OverlayTrigger>
                                    }
                                <br />
                                Post: {
                                    exco.post.length < 20 
                                    ?
                                    exco.post 
                                    : 
                                    <OverlayTrigger
                                        key={exco.id}
                                        placement={'bottom'}
                                        overlay={
                                            <Tooltip id={`tooltip-${'bottom'}`}>
                                                {exco.post}
                                            </Tooltip>
                                        }
                                    >
                                        <span>{exco.post.slice(0,20)}...</span>
                                    </OverlayTrigger>
                                }
                                <br/>
                            </p>
                            <div className='my-admin-card-overlay'>
                                <button className='' onClick={() => setActiveExco(exco.id)}>Edit<i className='fas fa-pen ml-2'></i></button>
                                <button className='bg-danger' onClick={() => handleDelete(exco.id)}>Delete<i className='fas fa-trash ml-2'></i></button>
                            </div>
                        </div>
                    </div>
                ))
            }
            <Modal
                show={show}
                onHide={() => setShow(false)}
                dialogClassName="modal-90w"
                aria-labelledby="example-custom-modal-styling-title"
            >
                <Modal.Header closeButton>
                <Modal.Title id="example-custom-modal-styling-title">
                    Update Exco id:- {currentExco}
                </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className='createbook-form' onSubmit={e => e.preventDefault()}>
                        <div>
                            <label>Name</label>
                            <input className='early-input' onChange={e => setName(e.target.value)} type="text" value={name} />
                        </div>
                        <div>
                            <label>Post</label>
                            <input className='early-input' onChange={e => setPost(e.target.value)} type="text" value={post} />
                        </div>
                        <div>
                            <label>Photo</label>
                            <input className='early-input' onChange={handleFileChange} type="file" />
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
    excos: state.exco.excos_list,
    excosLoading: state.exco.isLoading
})

export default connect(mapStateToProps, {getExcos, updateExco, deleteExco})(ManageExcos);