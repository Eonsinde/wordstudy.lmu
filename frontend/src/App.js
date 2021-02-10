import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';


import { Provider } from 'react-redux';
import store from './store'; 

/* for routes */
import RouteControl from './routes/RouteControl';
import PrivateRoute from './routes/PrivateRoute';


/* from layouts */
import Alert from './layout/Alert';

import Home from './layout/Home';
import Library from './layout/Library';
import Contact from './forms/Contact';
import Register from './forms/Register';

import PageNotFound from './content/PageNotFound';

/* from the admin */
import Login from './admin/layout/Login';
import Dashboard from './admin/layout/Dashboard';
import Profile from './admin/layout/Profile';
import ManageBook from './admin/ManageBooks';
import ManageGenre from './admin/ManageGenre';
import ManageExcos from './admin/ManageExcos';
import ManageEvent from './admin/ManageEvent';
import ManageUsers from './admin/ManageUsers';
import ManageMembers from './admin/ManageMembers';
import ManageContacts from './admin/ManageContact';
import ManagePrayers from './admin/ManagePrayers';


function App() {
  return (
    <Provider store={store}>
      <Router>
        <Alert />
        <Switch>
            <RouteControl exact path='/' navFixedBg={false} component={Home} />
            <RouteControl path='/library' navFixedBg={true} component={Library} />
            <RouteControl path='/contact' navFixedBg={true} component={Contact} />
            <RouteControl path='/register' navFixedBg={true} component={Register} />
            
            {/* for the admin site */}
            <Route path='/admin-login' component={Login} />
            <PrivateRoute path='/admin-dashboard' component={Dashboard} />
            <PrivateRoute path='/admin-profile' component={Profile} />
            <PrivateRoute path='/manage-books' component={ManageBook} />
            <PrivateRoute path='/manage-genres' component={ManageGenre} />
            <PrivateRoute path='/manage-excos' component={ManageExcos} />
            <PrivateRoute path='/manage-events' component={ManageEvent} />
            <PrivateRoute path='/manage-admin-users' component={ManageUsers} />
            <PrivateRoute path='/manage-new-members' component={ManageMembers} />
            <PrivateRoute path='/manage-contacts' component={ManageContacts} />
            <PrivateRoute path='/manage-prayer-requests' component={ManagePrayers} />

            {/* <Route component={PageNotFound} />  */}
            <RouteControl navFixedBg={true} component={PageNotFound} />

        </Switch>
    </Router>
    </Provider>
  );
}

export default App;
