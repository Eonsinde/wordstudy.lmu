import {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import './styles/register.css';

import axios from 'axios';
import Swal from 'sweetalert2';



const Register = () => {
    let [name, setName] = useState('');
    let [email, setEmail] = useState('');
    let [department, setDepartment] = useState('');
    let [roomNo, setRoomNo] = useState('');
    let [dateOfBirth, setDateOfBirth] = useState('');

    useEffect(() => {
        document.title = 'Word Study | Register';
    }, [])

    const handleRegisterSubmit = () => {
        if (name === '' || email === '' || department === '' || roomNo === '' || dateOfBirth === ''){
            Toast.fire({
                icon: 'error',
                title: "Please fill in all fields"
            });
        }else{
            let postData = {
                name: name,
                email: email,
                department: department,
                room_no: roomNo,
                date_of_birth: dateOfBirth
            }

            const config = {
                headers : {
                    'Content-Type': 'application/json'
                }
            }
            
            axios.post('/members/', postData, config)
                .then(res => {
                    Toast.fire({
                        icon: 'success',
                        title: `Registration successful`
                    });

                    setTimeout(() => {
                        setName('');
                        setEmail('');
                        setDepartment('');
                        setRoomNo('');
                        setDateOfBirth('');
                    }, 2000);
                })
                .catch(() => 
                    Toast.fire({
                        icon: 'error',
                        title: `Failed to send`
                    })
                );
        }
    }

    return ( 
        <section className="register-section">
            <header className='contact-banner'>
                <main className='breadcrumbs-wrapper mb-3'>
                    <h2 class="mb-2 bread">Register</h2>
                    <p class="breadcrumbs"><span class="mr-2"><Link to="/">Home</Link></span> / <span>Register</span></p>
                </main>
            </header>
            <div className="container">
                <form className="register-form shadow-lg" onSubmit={e => e.preventDefault()}>
                    <div className="px-2 mt-0 mb-4">
                        <h3 className="register-header text-lg-left text-md-left text-sm-left text-center text-uppercase">Join Us</h3> 
                    </div>
                    <div className="row m-0">
                        <div className="form-group col-md-6">
                            <label htmlFor="name">Name</label>
                            <input type="text" value={name} onChange={e => setName(e.target.value)} className="" />
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="mail">Email</label>
                            <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="" />
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="department">Department</label>
                            <input type="text" value={department} onChange={e => setDepartment(e.target.value)} className="" />
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="room-no">Hall/Room Number</label>
                            <input type="text" value={roomNo} onChange={e => setRoomNo(e.target.value)} className="" />
                            <small className='text-muted'>Format: Abraham Hall, F304</small>
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="date-of-birth">Date Of Birth</label>
                            <input type="date" value={dateOfBirth} onChange={e => setDateOfBirth(e.target.value)} className="" />
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="date-joined">Date Joined</label>
                            <input type="text" defaultValue={`${ Date().toString() }`} disabled className="" />
                            <small className="text-muted"><i>This is automatically added</i></small>
                        </div>
                    </div>
                    <div className="form-group m-0 px-3">
                        <button onClick={handleRegisterSubmit} type="submit" className="register-submit-btn">Submit</button>
                    </div>
                </form>
            </div>
        </section>
    );
}

const Toast = Swal.mixin({
    toast: true,
    position: 'top',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: false,
    onOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
});
 
export default Register;