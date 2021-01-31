import skeleton from '../static/img/loader_gif.gif';
import PropTypes from 'prop-types';


const Preloader = ({size}) => {
    const imgStyle = { 
        height: '100%',
        width: '100%'
    };

    switch (size){
        case 'lg':
            return ( // 370px
                <>
                    <div style={{height: '370px'}} className="my-preloader-card shadow-sm">
                        <img style={imgStyle} className="" src={skeleton} alt='preloader cover' />
                    </div>
                    <div style={{height: '370px'}} className="my-preloader-card shadow-sm">
                        <img style={imgStyle} className="" src={skeleton} alt='preloader cover' />
                    </div>
                    <div style={{height: '370px'}} className="my-preloader-card shadow-sm">
                        <img style={imgStyle} className="" src={skeleton} alt='preloader cover' />
                    </div>
                </>
            );
        case 'md':
            return ( // 320px
                <>
                    <div style={{height: '320px'}} className="my-preloader-card shadow-sm">
                        <img style={imgStyle} className="" src={skeleton} alt='preloader cover' />
                    </div>
                    <div style={{height: '320px'}} className="my-preloader-card shadow-sm">
                        <img style={imgStyle} className="" src={skeleton} alt='preloader cover' />
                    </div>
                    <div style={{height: '320px'}} className="my-preloader-card shadow-sm">
                        <img style={imgStyle} className="" src={skeleton} alt='preloader cover' />
                    </div>
                </>
            );
        case 'sm':
        default:
            return ( // 230px
                <>
                    <div style={{height: '230px'}} className="my-preloader-card shadow-sm">
                        <img style={imgStyle} className="" src={skeleton} alt='preloader cover' />
                    </div>
                    <div style={{height: '230px'}} className="my-preloader-card shadow-sm">
                        <img style={imgStyle} className="" src={skeleton} alt='preloader cover' />
                    </div>
                    <div style={{height: '230px'}} className="my-preloader-card shadow-sm">
                        <img style={imgStyle} className="" src={skeleton} alt='preloader cover' />
                    </div>
                </>
            );
    }   
}    


Preloader.propTypes = {
    size: PropTypes.string,
}
 
export default Preloader;