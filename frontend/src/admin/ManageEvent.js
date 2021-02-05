import {useState, useEffect} from 'react';

import {connect} from 'react-redux';
import {getEvents, deleteEvent, updateEvent} from '../actions/event';

import Preloader from '../content/Preloader';
import Swal from 'sweetalert2';

import Modal from 'react-bootstrap/Modal';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';


const ManageEvent = ({events, getEvents, updateEvent, deleteEvent}) => {
    let [isLoading, setIsLoading] = useState(true);
    let [show, setShow] = useState(false);

    let [currentEvent, setCurrentEvent] = useState('');

    let [title, setTitle] = useState('');
    let [venue, setVenue] = useState('');
    let [theme, setTheme] = useState('');
    let [date, setDate] = useState('');
    let [time, setTime] = useState('');
    
    useEffect(() => {
        document.title = 'Word Study | Event Management';
        getEvents();
        setIsLoading(false);
    }, []);

    const setActiveEvent = (id) => {
        setShow(true);
        setCurrentEvent(id);
    }

    const handleUpdate = () => {
        if (title === '' && venue === '' && theme === '' && date === '' && time === ''){
            Toast.fire({
                icon: 'error',
                title: 'Fill in a field'
            })
        }else{
            let eventData = {};

            if (title){
                eventData['title'] = title;
            }
            if (venue){
                eventData['venue'] = venue;
            }
            if (theme){
                eventData['theme'] = theme;
            }
            if (date){
                eventData['date'] = date;
            }
            if (time){
                eventData['time'] = time;
            }

            updateEvent(currentEvent, eventData);

            setTimeout(() => {
                setTitle('');
                setVenue('');
                setTheme('');
                setDate('');
                setTime('');
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
                    deleteEvent(id);
                }
            })
    } 

    return ( 
        <section className='manage-books'>
            {
                isLoading
                ?
                <Preloader />
                :
                events.map((evt, index) => (
                    <div key={evt.id} className="my-admin-card shadow-sm">
                        <div className="d-flex justify-content-center align-items-center mb-3">
                            <small>Event</small>
                        </div>
                        <p className="card-text text-center text-dark text-capitalize">
                            Title: {
                                evt.title.length < 20 
                                ? 
                                evt.title 
                                : 
                                <OverlayTrigger
                                    key={index}
                                    placement={'bottom'}
                                    overlay={
                                        <Tooltip id={`tooltip-${'bottom'}`}>
                                            {evt.title}
                                        </Tooltip>
                                    }
                                >
                                    <span>{evt.title.slice(0,20)}...</span>
                                </OverlayTrigger>
                                }
                            <br />
                            Theme: {
                                evt.theme.length < 20 
                                ? 
                                evt.theme 
                                : 
                                <OverlayTrigger
                                    key={index+1}
                                    placement={'bottom'}
                                    overlay={
                                        <Tooltip id={`tooltip-${'bottom'}`}>
                                            {evt.theme}
                                        </Tooltip>
                                    }
                                >
                                    <span>{evt.theme.slice(0,20)}...</span>
                                </OverlayTrigger>
                                }
                            <br />
                            Venue: {
                                evt.venue.length < 20 
                                ?
                                evt.venue 
                                : 
                                <OverlayTrigger
                                    key={index+2}
                                    placement={'bottom'}
                                    overlay={
                                        <Tooltip id={`tooltip-${'bottom'}`}>
                                            {evt.venue}
                                        </Tooltip>
                                    }
                                >
                                    <span>{evt.venue.slice(0,20)}...</span>
                                </OverlayTrigger>
                            }
                            <br/>
                            Date: {evt.date}
                            <br/>
                            Time: {evt.time.slice(0,5)}
                        </p>
                        <div className='my-admin-card-overlay'>
                            <button className='' onClick={() => setActiveEvent(evt.id)}>Edit<i className='fas fa-pen ml-2'></i></button>
                            <button className='bg-danger' onClick={() => handleDelete(evt.id)}>Delete<i className='fas fa-trash ml-2'></i></button>
                        </div>
                    </div>
                ))
            }
            <Modal
                show={show}
                onHide={() => setShow(false)}
                dialogClassName="modal-90w"
                scrollable={true}
                aria-labelledby="example-custom-modal-styling-title"
            >
                <Modal.Header closeButton>
                <Modal.Title id="example-custom-modal-styling-title">
                    Update Event id:- {currentEvent}
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
                            <input onClick={handleUpdate} className='createevent-submit-btn' type="submit" />
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
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

const mapStateToProps = state => ({
    events: state.event.events,
})

export default connect(mapStateToProps, {getEvents, deleteEvent, updateEvent})(ManageEvent);