import skeleton from '../static/img/loader_gif.gif';
import PropTypes from 'prop-types';



const TablePreloader = () => {
    const imgStyle = { 
        height: '100%',
        width: '100%'
    };

    return (
        <div style={{margin: '10px 0', width:'100%', height: '50px', border: '1px #f4f4f4 solid', borderRadius: '5px'}}>
            <img src={skeleton} style={imgStyle} alt="skeleton loader" />
        </div>
    );
}

// TablePreloader.propTypes = {
//     size: PropTypes.string,
// }

export default TablePreloader;

