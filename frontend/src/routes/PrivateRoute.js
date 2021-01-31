import { Route, Redirect } from 'react-router-dom';
import {connect} from 'react-redux';
import AdMain from '../admin/layout/AdMain';



const PrivateRoute = ({isAuthenticated, component:Component, ...rest}) => {
    if (isAuthenticated)
        return <Route
            {...rest}
            render={props => {
                return <AdMain comp={Component} {...props} />
            }}
        />
    return <Redirect to='/admin-login' />
} 

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps)(PrivateRoute);
