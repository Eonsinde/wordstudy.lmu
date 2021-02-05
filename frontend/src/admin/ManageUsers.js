import {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {connect, useSelector} from 'react-redux';

import {deleteUser, getUsers, updateUser} from '../actions/user';
import Modal from 'react-bootstrap/Modal';
import Swal from 'sweetalert2';

import Preloader from '../content/Preloader';


const ManageUsers = ({users, isLoading, getUsers, deleteUser, updateUser}) => {
    let [username, setUsername] = useState('');
    let [email, setEmail] = useState('');
    let [firstName, setFirstName] = useState('');
    let [lastName, setLastName] = useState('');
    let [password, setPassword] = useState('');
    let [confPassword, setConfPassword] = useState('');
    let [image, setImage] = useState('');
    let [imageName, setImageName] = useState('');
    let [phone_no, setPhoneNo] = useState('');

    let [usersLoading, setUsersLoading] = useState(true);
    let [show, setShow] = useState(false);
    let [showUpdate, setShowUpdate] = useState(false);
    let [currentUser, setCUser] = useState({});

    let authUser = useSelector(state => state.auth.user);

    useEffect(() => {
        document.title = 'Word Study | Manage All Users';
    }, []);

    useEffect(() => {
        getUsers();
        setUsersLoading(isLoading);
    }, []);

    const setCurrentUser = (user) => {
        setCUser(user);
        setShow(true);
    }

    const setCurrentUserForUpdate = (user) => {
        setCUser(user);
        setShowUpdate(true);
    }

    const handleFileChange = (e) => {
        setImage(e.target.files[0]);
        setImageName(e.target.files[0].name);
    }

    const handleSubmit = () => {
        // using the currently set user, we can safely submitted
        if (username === '' && email === '' && firstName === "" && lastName === '' && image === '' && phone_no === '' && password === ''){
            Toast.fire({
                icon: 'error',
                title: 'Please fill in a field'
            })
        }else if(password !== confPassword){
            Toast.fire({
                icon: 'error',
                title: 'Passwords don\'t match'
            })
        }else{
            let formData = new FormData();

            if (username)
                formData.append('username', username);
            if (email)
                formData.append('email', email);
            if (firstName)
                formData.append('first_name', firstName);
            if (lastName)
                formData.append('last_name', lastName);
            if (password)
                formData.append('password', password);
            if (imageName)
                formData.append('actual-img', image, imageName);
            if (phone_no)
                formData.append('phone_no', phone_no);
            
            updateUser(currentUser.id, formData);

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
                deleteUser(id);
            }
        })
    }

    const labelStyles = {
        fontSize: '1.2rem'
    }, fieldStyles = {
        color: '#999',
        fontSize: '1.2rem'
    }, btnStyles = {
        fontSize: '1rem',
        padding: '8px 10px',
        outline: 'none',
        border: 'none'
    }

    return (
        <section className='manage-books'>
            {
                usersLoading
                ?
                <Preloader />
                :
                users?.map(user => 
                    user.id !== authUser.id 
                    ?
                    <div className='card' key={user.id}>
                        <img src={user.profile?.image} alt={`${user.username} avatar`} />
                        <div className='card-body text-center'>
                            <div>
                                <Link to='#' className='text-dark' style={{textDecoration: 'none'}} onClick={() => setCurrentUser(user)}>{user.username}</Link>
                            </div>
                            <div className='btn-group mt-3'>
                                <button style={btnStyles} onClick={() => setCurrentUserForUpdate(user)} className='btn-primary'>Update <i className='fas fa-pen ml-2'></i></button>
                                <button style={btnStyles} onClick={() => handleDelete(user.id)} className='btn-danger'>Delete <i className='ml-2 fas fa-trash-alt'></i></button>
                            </div>
                        </div>
                    </div>
                    :
                    <></>
                )
            }

            <Modal
                show={show}
                onHide={() => setShow(false)}
                scrollable={true}
                dialogClassName="modal-90w"
                aria-labelledby="example-custom-modal-styling-title"
            >
                <Modal.Header closeButton>
                <Modal.Title id="example-custom-modal-styling-title" className='text-capitalize'>
                    {currentUser.username} Details
                </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <div className='row profile-warp text-center text-uppercase'>
                    <div className='col-md-12'>
                        <label style={labelStyles}>First Name</label>
                        <p style={fieldStyles}>{currentUser.first_name}</p>
                    </div>
                    <div className='col-md-12'>
                        <label style={labelStyles}>Last Name</label>
                        <p style={fieldStyles}>{currentUser.last_name}</p>
                    </div>
                    <div className='col-md-12'>
                        <label style={labelStyles}>Username</label>
                        <p style={fieldStyles}>{currentUser.username}</p>
                    </div>
                    <div className='col-md-12'>
                        <label style={labelStyles}>Email</label>
                        <p style={fieldStyles}>{currentUser.email}</p>
                    </div>
                    <div className='col-md-12'>
                        <label style={labelStyles}>Phone Number</label>
                        <p style={fieldStyles}>{currentUser?.profile?.phone_no}</p>
                    </div>
                    <div className='col-md-12'>
                        <label style={labelStyles}>Super User</label>
                        <p style={fieldStyles}>{currentUser.is_superuser ? 'True' : 'False'}</p>
                    </div>
                </div>
                </Modal.Body>
            </Modal>

            <Modal
                size='lg'
                show={showUpdate}
                onHide={() => setShowUpdate(false)}
                scrollable={true}
                dialogClassName="modal-100w"
                aria-labelledby="example-custom-modal-styling-title"
            >
                <Modal.Header closeButton>
                <Modal.Title id="example-custom-modal-styling-title">
                    Update for {currentUser.username}
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
                            <input onClick={() => handleSubmit()} className='registeruser-submit-btn' type="submit" />
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
    users: state.user.users,
    isLoading: state.user.isLoading
});
 
export default connect(mapStateToProps, {getUsers, deleteUser, updateUser})(ManageUsers);