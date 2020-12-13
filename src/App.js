import { useHistory } from 'react-router-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { HomeScreen, RegisterScreen } from './screens';
import { DashboardScreen } from './screens';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const history = useHistory();
  return (
    <Route
      {...rest}
      render={(routeProps) =>
        localStorage.getItem('token') ? (
          <Component {...routeProps} />
        ) : (
          history.push('/')
        )
      }
    />
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/register' component={RegisterScreen} />
        <ProtectedRoute path='/dashboard' component={DashboardScreen} />
        <Route path='/' exact component={HomeScreen} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
