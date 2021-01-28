import spinner from '../static/img/loader_gif.gif';


const Preloader = () => {
    return (
        <>
            <div className="card shadow-sm">
                <img className="card-img-top" src={spinner} alt='preloader cover' />
            </div>
            <div className="card shadow-sm">
                <img className="card-img-top" src={spinner} alt='preloader cover' />
            </div>
            <div className="card shadow-sm">
                <img className="card-img-top" src={spinner} alt='preloader cover' />
            </div>
        </>
    );
}
 
export default Preloader;