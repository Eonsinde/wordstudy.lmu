import {useState} from 'react';
import {connect} from 'react-redux';

import {addExco} from '../../actions/exco';

import Swal from 'sweetalert2';
import Modal from 'react-bootstrap/Modal';
import '../styles/createbook.css';

const CreateExco = ({show, setShow, addExco}) => {
    let [name, setName] = useState('');
    let [post, setPost] = useState('');
    let [image, setImage] = useState('');
    let [imageName, setImageName] = useState('');


    const handleSubmit = () => {
        if (name === '' || post === '' || imageName === ""){
            Toast.fire({
                icon: 'error',
                title: 'Please fill in all fields'
            })
        }else{
            const formData = {name, post, image, imageName};
            addExco(formData);

            setTimeout(() => {
                setName('');
                setPost('');
                setImage('');
                setImageName('');
            }, 2000);
        }
    }

    const handleFileChange = (e) => {
        setImage(e.target.files[0]);
        setImageName(e.target.files[0].name);
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
                    Add New Exco
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

 
export default connect(null, {addExco})(CreateExco);