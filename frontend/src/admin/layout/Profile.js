import {connect} from 'react-redux';

import '../styles/profile.css';


const Profile = ({user}) => {
    return ( 
        <section className='profile-preview-wrapper text-uppercase'>
            <div className='profile-img-warp'>
                <img src={user.profile.image} alt={`${user.username} avatar`} />
            </div>
            <div className='row profile-warp'>
                <div className='col-md-12 text-center'>
                    <label>First Name</label>
                    <p className='text-dark'>{user.first_name}</p>
                </div>
                <div className='col-md-12 text-center'>
                    <label>Last Name</label>
                    <p className='text-dark'>{user.last_name}</p>
                </div>
                <div className='col-md-12 text-center'>
                    <label>Username</label>
                    <p className='text-dark'>{user.username}</p>
                </div>
                <div className='col-md-12 text-center'>
                    <label>Email</label>
                    <p className='text-dark'>{user.email}</p>
                </div>
                <div className='col-md-12 text-center'>
                    <label>Phone Number</label>
                    <p className='text-dark'>{user?.profile?.phone_no}</p>
                </div>
                <div className='col-md-12 text-center'>
                    <label>Super User</label>
                    <p className='text-dark'>{user.is_superuser ? 'True' : 'False'}</p>
                </div>
            </div>
        </section>
    );
}
 
const mapStateToProps = state => ({
    user: state.auth.user
})

export default connect(mapStateToProps)(Profile);