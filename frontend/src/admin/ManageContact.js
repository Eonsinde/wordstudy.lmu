import {useEffect, useState} from 'react';
import axios from 'axios';

import Swal from 'sweetalert2';
import Preloader from '../content/Preloader';


const ManangeContact = () => {
    let [isLoading, setIsLoading] = useState(true);
    let [contacts, setContacts] = useState([]);

    useEffect(() => {
        document.title = 'Word Study | Manage Contacts';
    }, []);

    useEffect(() => {
        const fetchMembers = async () => {
            try{
                let results = await axios.get('/contact');
                setContacts(results.data);
                setIsLoading(false);
            }catch(err){
                Toast.fire({
                    icon: 'error',
                    title: 'Couldn\'t load members data'
                })
            }
        }
    fetchMembers();
    }, []);

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
                axios.delete(`/contact/${id}`)
                    .then(res => {
                        Toast.fire({
                            icon: 'success',
                            title: 'Successfully Removed'
                        })   

                        setContacts([...contacts.filter(contact => contact.id !== id)]);
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

    const btnStyles = {
        border: 'none',
        padding: '5px 8px',
        outline: 'none'
    }

    return ( 
        <section className='manage-grid'>
            {
                isLoading
                ?
                <Preloader />
                :
                contacts.map(contact => 
                    <div className='contact-item bg-white p-4 text-center'>
                        <div className="d-flex justify-content-center align-items-center mb-3">
                            <small>Contact</small>
                        </div>
                        <div className='text-center mb-3 text-dark'>
                            <p className='m-0 mb-1'>{contact.name}</p>
                            <p className='m-0 mb-1'>{contact.email}</p>
                            <p className='m-0 mb-1'>{contact.message}</p>
                        </div>
                        <button style={btnStyles} className='btn-danger' onClick={() => handleDelete(contact.id)}><i className='fas mr-1 fa-trash-alt'></i> delete</button>
                    </div>   
                )
            }

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
 
export default ManangeContact;