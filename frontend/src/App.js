import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';


import { Provider } from 'react-redux';
import store from './store'; 

/* for routes */
import RouteControl from './routes/RouteControl';
import PrivateRoute from './routes/PrivateRoute';


/* from layouts */
import Home from './layout/Home';
import Library from './layout/Library';
import Contact from './forms/Contact';
import Register from './forms/Register';

/* from the admin */
import Login from './admin/Login';
import Dashboard from './admin/Dashboard';


function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
            <RouteControl exact path='/' navFixedBg={false} component={Home} />
            <RouteControl path='/library' navFixedBg={true} component={Library} />
            <RouteControl path='/contact' navFixedBg={true} component={Contact} />
            <RouteControl path='/register' navFixedBg={true} component={Register} />
            
            {/* for the admin site */}
            <Route path='/management'  component={Login} />
            <PrivateRoute path='/dashboard' isAuthenticated={true} component={Dashboard} />
            
            {/* <Route path="/contact" component={Contact} />

            <Route component={PageNotFound} /> */}
        </Switch>
    </Router>
    </Provider>
  );
}

export default App;
