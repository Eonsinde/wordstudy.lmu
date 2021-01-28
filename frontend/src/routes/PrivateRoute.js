import { Route, Redirect } from 'react-router-dom';
import AdMain from '../admin/AdMain';



const PrivateRoute = ({isAuthenticated, component:Component, ...rest}) => {
    if (isAuthenticated)
        return <Route
            {...rest}
            render={props => {
                return <AdMain comp={Component} {...props} />
            }}
        />
    return <Redirect to='/management' />
} 

export default PrivateRoute;