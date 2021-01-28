import { Route } from 'react-router-dom';
import Navbar from '../layout/Nav';
import Footer from '../layout/Footer';



const RouteControl = ({ component:Component, navFixedBg, ...rest }) => {
    return (  
        <Route
            {...rest}
            render={props => {
                return (
                    <>
                        <Navbar navFixedBg={navFixedBg} />
                        <Component {...props} />
                        <Footer />
                    </>
                );
            }}
        />
    );
}
 
export default RouteControl;