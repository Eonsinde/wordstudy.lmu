import {useEffect, useState} from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import './styles/managemembers.css';

const ManageMembers = () => {
    let members = [
        {id: 1, name: 'enochsinde', email: 'olasinde.eon@gmail.com', department: 'department', roomNo: 'F308', dob: 'June 23, 2001'},
        {id: 2, name: 'enochsinde', email: 'olasinde.eon@gmail.com', department: 'department', roomNo: 'F308', dob: 'June 23, 2001'},
        {id: 3, name: 'enochsinde', email: 'olasinde.eon@gmail.com', department: 'department', roomNo: 'F308', dob: 'June 23, 2001'}
    ]

    let [isLoading, setIsloading] = useState(true);
    let [_members, setMembers] = useState([]);
 
    useEffect(() => {
        document.title = 'Word Study | Manage Members';
    }, []);

    useEffect(() => {
        const fetchMembers = async () => {
            try{
                let results = await axios.get('/members');
                setMembers(results.data);
                console.log(results);
                setIsloading(false);
            }catch(err){
                Toast.fire({
                    icon: 'error',
                    title: 'Couldn\'t load members data'
                })
            }
        }
    }, []);
  
    const tableStyle = {
        fontSize: '1rem'
    }

    return ( 
        <section className='manage-members py-3 px-2 bg-white'>
            <h4 className='text-dark text-sm-center'>Newly Registered Members</h4>
            <div className="table-wrapper">
                <table style={tableStyle} className='table table-striped mt-3 members-table'>
                    <thead>
                        <tr>
                            <th>S/N</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Department</th>
                            <th>Room No</th>
                            <th>DOB</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            members.map((member, index) => 
                                <tr key={member.id}>
                                    <td>{index+1}</td>
                                    <td>{member.name}</td>
                                    <td>{member.email}</td>
                                    <td>{member.department}</td>
                                    <td>{member.roomNo}</td>
                                    <td>{member.dob}</td>
                                </tr>    
                            )
                        }
                    </tbody>
                </table>
            </div>
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
 
export default ManageMembers;