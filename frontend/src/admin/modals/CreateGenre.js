import {useState} from 'react';
import {connect} from 'react-redux';

import {addGenre} from '../../actions/category';

import Swal from 'sweetalert2';
import Modal from 'react-bootstrap/Modal';
import '../styles/creategenre.css';

const CreateGenre = ({show, setShow, addGenre}) => {
    let [name, setName] = useState('');

    const handleSubmit = () => {
        if (name === ''){
            Toast.fire({
                icon: 'error',
                title: 'Please fill in all fields'
            })
        }else{
            const genreData = {
                name: name,
            }
            addGenre(genreData);

            setTimeout(() => {
                setName('');
            }, 2000);
        }
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
                    Add New Genre
                </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className='creategenre-form' onSubmit={e => e.preventDefault()}>
                        <div>
                            <label>Name</label>
                            <input className='early-input' onChange={e => setName(e.target.value)} type="text" value={name} />
                        </div>
                        <div>
                            <input onClick={handleSubmit} className='creategenre-submit-btn' type="submit" />
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

 
export default connect(null, {addGenre})(CreateGenre);