import {useState} from 'react';
import {connect} from 'react-redux';

import {addEvent} from '../../actions/event';

import Swal from 'sweetalert2';
import Modal from 'react-bootstrap/Modal';
import '../styles/createevent.css';

const CreateEvent = ({show, setShow, addEvent}) => {
    let [title, setTitle] = useState('');
    let [venue, setVenue] = useState('');
    let [theme, setTheme] = useState('');
    let [date, setDate] = useState('');
    let [time, setTime] = useState('');

    const handleSubmit = () => {
        if (title === ''|| venue === '' || theme === "" || date === '' || time === ''){
            Toast.fire({
                icon: 'error',
                title: 'Please fill in all fields'
            })
        }else{
            let eventData = {
                title: title,
                venue: venue,
                theme: theme,
                date: date,
                time: time
            }

            addEvent(eventData);
            
            setTimeout(() => {
                setTitle('');
                setDate('');
                setVenue('');
                setTime('');
                setTheme('');
            }, 2000);
        }
    }

    return (  
        <>
            <Modal
                show={show}
                onHide={() => setShow(false)}
                dialogClassName="modal-90w"
                scrollable={true}
                aria-labelledby="example-custom-modal-styling-title"
            >
                <Modal.Header closeButton>
                <Modal.Title id="example-custom-modal-styling-title">
                    Add New Event
                </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className='createevent-form' onSubmit={e => e.preventDefault()}>
                        <div>
                            <label>Title</label>
                            <input className='early-input' onChange={e => setTitle(e.target.value)} type="text" value={title} />
                        </div>
                        <div>
                            <label>Venue</label>
                            <input className='early-input' onChange={e => setVenue(e.target.value)} type="text" value={venue} />
                        </div>
                        <div>
                            <label>Theme</label>
                            <input className='early-input' onChange={e => setTheme(e.target.value)} type="text" value={theme} />
                        </div>
                        <div>
                            <label>Date</label>
                            <input className='early-input' type="date" onChange={e => setDate(e.target.value)} value={date} />
                        </div>
                        <div>
                            <label>Time</label>
                            <input className='early-input' type="time" onChange={e => setTime(e.target.value)} value={time} />
                        </div>
                        <div>
                            <input onClick={handleSubmit} className='createevent-submit-btn' type="submit" />
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

 
export default connect(null, {addEvent})(CreateEvent);