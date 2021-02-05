import {useState} from 'react';
import {connect} from 'react-redux';

import {addUser} from '../../actions/user';
 
import Swal from 'sweetalert2';
import Modal from 'react-bootstrap/Modal';
import '../styles/registeruser.css';


const RegisterUser = ({show, setShow, addUser}) => {
    let [username, setUsername] = useState('');
    let [email, setEmail] = useState('');
    let [firstName, setFirstName] = useState('');
    let [lastName, setLastName] = useState('');
    let [password, setPassword] = useState('');
    let [confPassword, setConfPassword] = useState('');
    let [image, setImage] = useState('');
    let [imageName, setImageName] = useState('');
    let [phone_no, setPhoneNo] = useState('');


    const handleSubmit = () => {
        if (username === '' || email === '' || firstName === "" || lastName === '' || image === '' || phone_no === '' || password === '' || confPassword === ''){
            Toast.fire({
                icon: 'error',
                title: 'Please fill in all fields'
            })
        }else if(password !== confPassword){
            Toast.fire({
                icon: 'error',
                title: 'Passwords don\'t match'
            })
        }else{
            let userFormData = new FormData();
            
            userFormData.append('username', username);
            userFormData.append('email', email);
            userFormData.append('first_name', firstName);
            userFormData.append('last_name', lastName);
            userFormData.append('password', password);
            userFormData.append('actual-img', image, imageName);
            userFormData.append('profile', JSON.stringify({
                'image': 'null',
                'phone_no': phone_no
            }));

            addUser(userFormData);

            setTimeout(() => {
                setUsername('');
                setEmail('');
                setFirstName('');
                setLastName('');
                setPassword('');
                setImage('');
                setImageName('');
                setPhoneNo('');
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
                size='lg'
                show={show}
                onHide={() => setShow(false)}
                scrollable={true}
                dialogClassName="modal-100w"
                aria-labelledby="example-custom-modal-styling-title"
            >
                <Modal.Header closeButton>
                <Modal.Title id="example-custom-modal-styling-title">
                    Register New Admin User
                </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className='registeruser-form' onSubmit={e => e.preventDefault()}>
                        <div className='row'>
                            <div className='col-md-6'>
                                <label>First Name</label>
                                <input className='early-input' onChange={e => setFirstName(e.target.value)} type="text" value={firstName} />
                            </div>
                            <div className='col-md-6'>
                                <label>Last Name</label>
                                <input className='early-input' onChange={e => setLastName(e.target.value)} type="text" value={lastName} />
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-md-6'>
                                <label>Username</label>
                                <input className='early-input' onChange={e => setUsername(e.target.value)} type="text" value={username} />
                            </div>
                            <div className='col-md-6'>
                                <label>Email</label>
                                <input className='early-input' onChange={e => setEmail(e.target.value)} type="text" value={email} />
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-md-6'>
                                <label>Password</label>
                                <input className='early-input' onChange={e => setPassword(e.target.value)} type="password" value={password} />
                            </div>
                            <div className='col-md-6'>
                                <label>Confirm Password</label>
                                <input className='early-input' onChange={e => setConfPassword(e.target.value)} type="password" value={confPassword} />
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-md-6'>
                                <label>Image</label>
                                <input className='early-input' style={{overflow:'hidden'}} onChange={handleFileChange} type="file" />
                            </div>
                            <div className='col-md-6'>
                                <label>Phone Number</label>
                                <input className='early-input' value={phone_no} onChange={e => setPhoneNo(e.target.value)} type="text" />
                            </div>
                        </div>
                        <div>
                            <input onClick={handleSubmit} className='registeruser-submit-btn' type="submit" />
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

 
export default connect(null, {addUser})(RegisterUser);