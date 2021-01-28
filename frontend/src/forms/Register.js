import {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import './styles/register.css';


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
            alert('Please fill in all fields');
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
                            <label htmlFor="room-no">Room Number</label>
                            <input type="text" value={roomNo} onChange={e => setRoomNo(e.target.value)} className="" />
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="date-of-birth">Date Of Birth</label>
                            <input type="date" value={dateOfBirth} onChange={e => setDateOfBirth(e.target.value)} className="" />
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="date-joined">Date Joined</label>
                            <input type="text" defaultValue={`${ Date().toString() }`} className="" />
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
 
export default Register;