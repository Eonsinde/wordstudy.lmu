import {useEffect} from 'react';
import {useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import '../styles/admin.css';


function Dasboard() {
    let user = useSelector(state => state.auth.user);

    useEffect(() => {
        document.title = 'Word Study | Dashboard';
    }, []);

    return (
        <>
            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 className="h3 mb-0 text-gray-800">Dashboard</h1>
                <Link to="#" className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"><i className="fas fa-download fa-sm text-white-50"></i> Generate Report</Link>
            </div>
            <div className="admin-contents">
                <div className="admin-card shadow shadow-sm p-5">
                    <Link to="/manage-books"><i className="fas fa-book-open"></i></Link>
                    <div className="admin-card-body">
                        <h3>Books</h3>
                        <small className='text-muted'>Manage All Books</small>
                    </div>
                </div>

                <div className="admin-card shadow shadow-sm p-5">
                    <Link to="/manage-genres"><i className="fas fa-folder"></i></Link>
                    <div className="admin-card-body">
                        <h3>Genres</h3>
                        <small className='text-muted'>Manage Genres</small>
                    </div>
                </div>

                <div className="admin-card shadow shadow-sm p-5">
                    <Link to="/manage-new-members"><i className="fas fa-male"></i><i className='fas fa-female'></i></Link>
                    <div className="admin-card-body">
                        <h3>New Members</h3>
                        <small className='text-muted'>See All Newly  Registered Members</small>
                    </div>
                </div>

                <div className="admin-card shadow shadow-sm p-5">
                    <Link to="/manage-contacts"><i className="fas fa-phone-alt"></i></Link>
                    <div className="admin-card-body">
                        <h3>Contact</h3>
                        <small className='text-muted'>Check Out Contact Records</small>
                    </div>
                </div>

                <div className="admin-card shadow shadow-sm p-5">
                    <Link to="manage-prayer-requests"><i className="fas fa-hands"></i></Link>
                    <div className="admin-card-body">
                        <h3>Prayer Requests</h3>
                        <small className='text-muted'>View All Prayer Requests</small>
                    </div>
                </div>

                <div className="admin-card shadow shadow-sm p-5">
                    <Link to="/manage-events"><i className="fas fa-globe"></i></Link>
                    <div className="admin-card-body">
                        <h3>Events</h3>
                        <small className='text-muted'>Manage All Events</small>
                    </div>
                </div>

                <div className="admin-card shadow shadow-sm p-5">
                    <Link to="/manage-excos"><i className="fas fa-briefcase"></i></Link>
                    <div className="admin-card-body">
                        <h3>Excos</h3>
                        <small className='text-muted'>Manage All Excos</small>
                    </div>
                </div>
                {
                    user.is_superuser
                    ?
                    <div className="admin-card shadow shadow-sm p-5">
                        <Link to="/manage-admin-users"><i className="fas fa-user "></i></Link>
                        <div className="admin-card-body">
                            <h3>Admin</h3>
                            <small className='text-muted'>Manage All Admin Users</small>
                        </div>
                    </div>
                    :
                    <>
                    </>
                }
                
            </div>
        </>
    );
}
 
export default Dasboard;