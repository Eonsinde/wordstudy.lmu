import {useEffect, useState} from 'react';
import axios from 'axios';

import Swal from 'sweetalert2';
import TablePreloader from '../content/TablePreloader';

const ManageMembers = () => {
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
                setIsloading(false);
            }catch(err){
                Toast.fire({
                    icon: 'error',
                    title: 'Couldn\'t load members data'
                })
            }
        }
    fetchMembers();
    }, []);
  
    const tableStyle = {
        fontSize: '1rem'
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
                axios.delete(`/members/${id}`)
                    .then(res => {
                        Toast.fire({
                            icon: 'success',
                            title: 'Successfully Removed'
                        })   

                        setMembers([..._members.filter(member => member.id !== id)]);
                    })
                    .catch(e => 
                        Toast.fire({
                            icon: 'error',
                            title: 'Failed Deleted'
                        })    
                    )
            }
        })
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
                            <th title='Date Of Birth'>DOB</th>
                            <th title='Date Joined'>DJ</th>
                            <th className='text-center'><i className='fas fa-trash-alt'></i></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            isLoading
                            ?
                            <>
                            <tr className='bg-white'>
                                <td><TablePreloader /></td>
                                <td><TablePreloader /></td>
                                <td><TablePreloader /></td>
                                <td><TablePreloader /></td>
                                <td><TablePreloader /></td>
                                <td><TablePreloader /></td>
                                <td><TablePreloader /></td>
                                <td><TablePreloader /></td>
                            </tr>
                            <tr className='bg-white'>
                                <td><TablePreloader /></td>
                                <td><TablePreloader /></td>
                                <td><TablePreloader /></td>
                                <td><TablePreloader /></td>
                                <td><TablePreloader /></td>
                                <td><TablePreloader /></td>
                                <td><TablePreloader /></td>
                                <td><TablePreloader /></td>
                            </tr>
                            </>
                            :
                            _members.map((member, index) => 
                                <tr key={member.id}>
                                    <td>{index+1}</td>
                                    <td>{member.name}</td>
                                    <td>{member.email}</td>
                                    <td>{member.department}</td>
                                    <td>{member.room_no}</td>
                                    <td>{member.date_of_birth}</td>
                                    <td>{member.date_joined}</td>
                                    <td><button onClick={() => handleDelete(member.id)} className='btn btn-sm btn-danger'>&times;</button></td>
                                </tr>)    
                        }
                    </tbody>
                </table>
            </div>
        </section>
    );
}

const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-primary',
      cancelButton: 'btn btn-danger'
    },
});

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