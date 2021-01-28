import {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import './styles/contact.css';


const Contact = () => {
    
    /* for the contact form */
    let [ name, setName ] = useState('');
    let [ email, setEmail ] = useState('');
    let [subject, setSubject] = useState('');
    let [message, setMessage] = useState('');

    /* for the prayerbox form */
    let [personName, setPersonName] = useState('');
    let [prayerReq, setPrayerReq] = useState('');

    useEffect(() => {
        document.title = 'Word Study | Contact';
    }, [])

    const handleContactSubmit = () => {
        if (name === '' || email === '' || subject === '' || message === ''){
            alert('Please Fill in all fields');
        }
    }

    const handlePrayerSubmit = () => {
        if (personName === '' || prayerReq === ''){
            alert('Please Fill in all fields');
        }
    }

    return ( 
        <section className="contact-section">
            <header className='contact-banner'>
                <main className='breadcrumbs-wrapper mb-3'>
                    <h2 class="mb-2 bread">Contact Us</h2>
                    <p class="breadcrumbs"><span class="mr-2"><Link to="/">Home</Link></span> / <span>Contact</span></p>
                </main>
            </header>
            <div className="container">
                <div className="row contact-body">
                    <div className="col-md-7">
                        <form className="contact-form shadow-sm" onSubmit={e => e.preventDefault()}>
                            <div className="px-2 mt-0 mb-4 text-center">
                                <h3 className='text-uppercase'>Contact Us</h3>
                            </div>
                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <input name="name" value={name} onChange={e => setName(e.target.value)} type="text" className=""/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="mail">Email</label>
                                <input name="mail" value={email} onChange={e => setEmail(e.target.value)} type="email" className=""/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="subject">Subject</label>
                                <input name="subject" value={subject} onChange={e => setSubject(e.target.value)} type="text" className=""/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="message">Message</label>
                                <textarea name="message" rows={5} subject={message} onChange={e => setMessage(e.target.value)} className=""></textarea>
                            </div>
                            <div className="form-group">
                                <input onClick={handleContactSubmit} type="submit" className="btn-outline-primary" value="Submit"/>
                            </div>
                        </form>
                    </div>
                    <div className='col-md-5'>
                        <form className="prayerbox-form shadow-sm" onSubmit={e => e.preventDefault()}>
                            <header className="mb-2">
                                <h3 className="text-uppercase text-dark mb-4">Prayer Box</h3>
                            </header>
                            <div className="form-group">
                                <input type="text" className="" value={personName} onChange={e => setPersonName(e.target.value)} placeholder="Name"/>
                            </div>
                            <div className="form-group">
                                <textarea name="prayer-req" value={prayerReq} onChange={e => setPrayerReq(e.target.value)} className="" placeholder="Prayer Request"></textarea>
                            </div>
                            <input onClick={handlePrayerSubmit} type="submit" className="btn-outline-primary" value="Send"/>
                        </form>
                        <section className="additional-contact-details text-center shadow-sm">
                                <h5 className=""><i className='fas text-app-theme fa-2x fa-envelope'></i></h5>
                                <main className='text-white-5 text-dark-50'>
                                    <p className="mb-2">chaplaincy.wordstudy@lmu.edu.ng</p>
                                    <p className="m-0">chaplaincy.wordstudy@gmail.com</p>
                                </main>
                        </section>
                    </div>
                </div>
                
            </div>
        </section>
    );
}
 
export default Contact;