import {Link} from 'react-router-dom';
import './styles/admin.css';


function Dasboard() {
    return (
        <>
            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 className="h3 mb-0 text-gray-800">Dashboard</h1>
                <Link to="#" className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"><i className="fas fa-download fa-sm text-white-50"></i> Generate Report</Link>
            </div>
            <div className="admin-contents">
                <div className="admin-card shadow shadow-sm p-5">
                    <Link to="#"><i className="fas fa-book-open"></i></Link>
                    <div className="admin-card-body">
                        <h3>Books</h3>
                        <small className='text-muted'>Manage All Books</small>
                    </div>
                </div>

                <div className="admin-card shadow shadow-sm p-5">
                    <Link to="#"><i className="fas fa-male"></i><i className='fas fa-female'></i></Link>
                    <div className="admin-card-body">
                        <h3>New Members</h3>
                        <small className='text-muted'>See All Newly  Registered Members</small>
                    </div>
                </div>

                <div className="admin-card shadow shadow-sm p-5">
                    <Link to="#"><i className="fas fa-clipboard-list"></i></Link>
                    <div className="admin-card-body">
                        <h3>Contact</h3>
                        <small className='text-muted'>Check Out Contact Records</small>
                    </div>
                </div>

                <div className="admin-card shadow shadow-sm p-5">
                    <Link to="#"><i className="fas fa-user "></i></Link>
                    <div className="admin-card-body">
                        <h3>Admin</h3>
                        <small className='text-muted'>Manage All Admin Users</small>
                    </div>
                </div>
            </div>
        </>
    );
}
 
export default Dasboard;