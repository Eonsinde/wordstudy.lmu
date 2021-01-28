import { useState, useEffect} from 'react';
import {connect, useSelector} from 'react-redux';
import axios from 'axios';
// import { Link } from 'react-router-dom';

import './styles/home.css';

import famimg3 from '../static/img/fam_preview3.JPG';
import famimg2 from '../static/img/fam_preview2.JPG';
import famimg1 from '../static/img/fam_preview1.jpg';
import famimg4 from '../static/img/fam_preview4.JPG';

// import leaderImg from '../static/img/PASTOR_TOPE_NO_BG2.png';
import leaderImg from '../static/img/PASTOR_TOPE.jpg';
import worshipImg from '../static/img/perfect.jpg';
import excosImg from '../static/img/excos/DSC_0070.JPG';


import OwlCarousel from 'react-owl-carousel';  
import 'owl.carousel/dist/assets/owl.carousel.css';  
import 'owl.carousel/dist/assets/owl.theme.default.css';  

import Preloader from '../content/Preloader';
import {getExcos} from '../actions/exco';


const Home = ({getExcos}) => {

    let [excos, setExcos] = useState([]);
    let [excosLoading, setExcosLoading] = useState(true);

    useEffect(() => {
        document.title = 'Word Study | Home';

        // all the get request
        const fetchExcos = async () => {
            const result = await axios(`/excos`);
            console.log(result.data);

            setExcos(result.data);
            setExcosLoading(false);
        }

        fetchExcos();
    }, []);

    return ( 
        <>
            <section className="banner-area" id="home">
                <div className="container">
                    <div className="d-flex align-items-center justify-content-center" style={{height: '100vh'}}>
                        <div className="banner-content">
                            <h5 className="text-uppercase">Welcome</h5>
                            <h1>
                                God's Fellowship Centre
                            </h1>
                            <p className='text-white-50'>
                                We focus on imparting the lives of members of the <br/>
                                word study family and as many students as possible
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="welcome-section bg-teritary-theme">
                <div className="container">
                    <div className="welcome-content">
                        <header className="welcome-header text-center mb-4">
                            <h2 className="text-uppercase text-white">WELCOME</h2>
                        </header>
                        {/* <hr className="welcome__line" /> */}
                        <main className='text-center'>
                            <p className="text-white-50 m-0">
                                Welcome to word study family website. Get access to several spiritual and motivational books for free. In case you've been wanting to be a part of the family, you could hit the register link to join us
                                and we'll surely get back to you. You can also reach out to us via the contact form in case you want to discuss anything troubling you or different. Drop your prayer requests and we will join you 
                                in prayers and the good Lord will make a way - <span className='text-white font-italic'>Shalloh</span>
                            </p>
                        </main>
                    </div>
                </div>
            </section>

            <section className="brief-section">
                <div className="container">
                    <div className="brief-items-container">
                        <div className="card briefing">
                            <div className="card-header text-center">
                                <i className="fas fa-book-reader fa-2x mb-2"></i>
                                <h4 className="text-uppercase text-center">briefing</h4>
                            </div>
                            <p className="card-body text-center">
                                <b>Word study</b> is a <b>Fellowship Centre</b> that diffuses the fragnance of God's word 
                                to <a href="https://www.lmu.edu.ng" rel="noreferrer" target="_blank" className="text-uppercase text-white text-info" style={{textDecoration: 'none'}}>landmark university</a> commmunity. Our work is to make sure <b>Hab 2 vs. 14</b> becomes a reality
                                through committed fellowship
                            </p>
                        </div>
                        <div className="card briefing">
                            <div className="card-header text-center">
                                <i className="fas fa-binoculars fa-2x mb-2"></i>
                                <h4 className="text-uppercase text-center">Vision</h4>
                            </div>
                            <p className="card-body text-center">
                                By <b>Fellowship</b>, we mean leading to the place of eden i.e His presence, 
                                where possibilities are always achieved.
                                Our targeted vision is For the earth to be filled with the knowledge of the glory
                                of the Lord <b>Hab 2 vs. 14</b>
                            </p>
                        </div>
                        <div className="card briefing">
                            <div className="card-header text-center">
                                <i className="fas fa-bacon fa-2x mb-2"></i> 
                                <h4 className="text-uppercase text-center">Mission</h4>
                            </div>
                            <p className="card-body text-center">
                                A study of the scripture would reveal that God's word and the Holy Spirit are His 
                                methods for carrying out His plans and purpose on the earth;
                                scriptural ref: <b>Gen 1 vs. 1-3, John 6 vs. 63</b>
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* <div className="addendum blue">
                <h3>Get access to several spiritual and motivational books for free</h3>
            </div> */}

          

            {/* <section className="wordtalk-section">
                <div className="container">
                    <div className="wordtalk-content">
                        <img src={leaderImg} alt="not found" />
                        <div className="wordtalk-content-body shadow-sm">
                            <header className="wordtalk-header text-center mb-4">
                                <h4 className="text-uppercase text-white">A word from our spiritual leader</h4>
                            </header>
                            <main className='text-center'>
                                <p className="text-white-50">
                                    Welcome to word study family website.  This is basically me prototyping. There is no one who loves pain itself, who seeks after it and wants to have it, simply because it is pain. There is no one who loves pain itself, who seeks after it and wants to have it, simply because it is pain
                                </p>
                                <h5 className="text-white">Pastor Tope Johnson</h5>
                            </main>
                        </div>
                    </div>
                </div>
            </section> */}

            <section className="wordtalk-section bg-secondar-theme">
                <div className="wordtalk-content bg-white">
                    <div className='single-word-content'>
                        <img src={worshipImg} alt="worship cover" />
                    </div>
                    <div className="single-word-content word p-5 text-dark p-0">
                        <div>
                            <header className="word-header mb-4">
                                <h4>Inspiring Words</h4>
                                <h1 className="text-uppercase">Come On In</h1>
                                <hr style={{ background: 'var(--app-theme)', width: '20%' }}/>
                            </header>
                            <p className="">
                                Welcome to word study family website.  This is basically me prototyping. There is no one who loves pain itself, who seeks after it and wants to have it, simply because it is pain. There is no one who loves pain itself, who seeks after it and wants to have it, simply because it is pain
                            </p>
                        </div>
                    </div>
                    
                    <div className="single-word-content word word-content-body p-5 text-dark p-0">
                        <div>
                            <header className="word-header mb-4">
                                <h4 className="text-uppercase">Leader's Word</h4>
                                <h1 className="text-uppercase">Take a Peek</h1>
                                <hr style={{ background: 'var(--app-theme)', width: '20%' }}/>
                            </header>
                            <main className=''>
                                <p className="">
                                    Welcome to word study family website.  This is basically me prototyping. There is no one who loves pain itself, who seeks after it and wants to have it, simply because it is pain. There is no one who loves pain itself, who seeks after it and wants to have it, simply because it is pain
                                </p>
                                <h5 className="text-dark">Pastor Tope Johnson</h5>
                            </main>
                        </div>
                    </div>
                    <div className='single-word-content d-flex align-items-end p-0'>
                        <img src={leaderImg} alt="Leader avatar" />
                    </div>
                </div>
            </section>

            <section className="excos-section text-white">{/* change this to owl carousel for ease in design */}
                <div className="container">
                    <div className='excos-header'>
                        <h3 className="text-center text-dark">MEET OUR EXCOS</h3>
                    </div>
                    <OwlCarousel items={3}  
                        className="owl-theme"  
                        stagePadding={5}
                        responsive={{
                                0:{
                                    items: 1
                                },
                                575: {
                                    items: 2
                                },
                                768:{
                                    items: 3
                                },
                                1000:{
                                    items: 3
                                }
                        }}
                        margin={10}>
                        {
                            !excosLoading
                            ?
                            excos.map(exco => 
                                <div key={exco.id} className="item mb-2">
                                    <div className="single-exco card shadow-sm">
                                        <img className="card-img-top" src={exco.photo} alt='excos avatar' />
                                        <div className="card-body">
                                            <p className="card-text text-dark text-uppercase text-center">
                                                Name: {exco.name} <br />
                                                Post: { exco.post.length > 10 ? <span title={`${exco.post}`}>{exco.post.slice(0, 10) + '...'}</span> : exco.post }
                                            </p>
                                        </div>
                                    </div>
                                </div> 
                            ) 
                            :
                            <Preloader/>
                        } 
                    </OwlCarousel>
                </div>
            </section>

            <section className="showcase-section ">
                <div className="container">
                    <h3 className="text-uppercase text-center text-dark mb-4">A preview of our family</h3>
                    {/* <hr className='showcase__line' /> */}
                    <main className="showcase">
                        <div className="fam-item fam-item-1"><img src={famimg3} alt="" /></div>
                        <div className="fam-item fam-item-2"><img src={famimg2} alt="" /></div>
                        <div className="fam-item fam-item-3"><img src={famimg1} alt="" /></div>
                        <div className="fam-item fam-item-4"><img src={famimg4} alt="" /></div>
                    </main>
                </div>
            </section>

            <section className="event-section">
                <div className="container">
                    <h3 className="text-uppercase text-center mb-4 text-white-50">Upcoming Events/Meetings</h3>
                    <OwlCarousel items={3}  
                        className="owl-theme"  
                        stagePadding={5}
                        responsive={{
                                0:{
                                    items: 1
                                },
                                575: {
                                    items: 2
                                },
                                768:{
                                    items: 3
                                },
                                1000:{
                                    items: 3
                                }
                        }}
                        margin={10} >  
                        <div className="item">
                            <div className="card">
                                <div className="card-body">
                                    <div className="card-text text-uppercase text-center">
                                        <h5>Tuesday Fellowship Meeting</h5>
                                        <p>Venue: In Front Of University Chapel</p>
                                        <p>Duration: 6:10pm - 7:45pm</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="item">
                            <div className="card">
                                <div className="card-body">
                                    <div className="card-text text-uppercase text-center">
                                        <h5>Tuesday Fellowship Meeting</h5>
                                        <p>Venue: In Front Of University Chapel</p>
                                        <p>Duration: 6:10pm - 7:45pm</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="item">
                            <div className="card">
                                <div className="card-body">
                                    <div className="card-text text-uppercase text-center">
                                        <h5>Tuesday Fellowship Meeting</h5>
                                        <p>Venue: In Front Of University Chapel</p>
                                        <p>Duration: 6:10pm - 7:45pm</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="item">
                            <div className="card">
                                <div className="card-body">
                                    <div className="card-text text-uppercase text-center">
                                        <h5>Tuesday Fellowship Meeting</h5>
                                        <p>Venue: In Front Of University Chapel</p>
                                        <p>Duration: 6:10pm - 7:45pm</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="item">
                            <div className="card">
                                <div className="card-body">
                                    <div className="card-text text-uppercase text-center">
                                        <h5>Tuesday Fellowship Meeting</h5>
                                        <p>Venue: In Front Of University Chapel</p>
                                        <p>Duration: 6:10pm - 7:45pm</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="item">
                            <div className="card">
                                <div className="card-body">
                                    <div className="card-text text-uppercase text-center">
                                        <h5>Tuesday Fellowship Meeting</h5>
                                        <p>Venue: In Front Of University Chapel</p>
                                        <p>Duration: 6:10pm - 7:45pm</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </OwlCarousel>  
                </div>
            </section>
        </>
    );
}

const mapStateToProps = state => ({
    excos: state.exco.excos_list
});
 
export default connect(mapStateToProps, {getExcos})(Home);