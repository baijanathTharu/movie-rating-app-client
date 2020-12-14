import { useState } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { UserContext } from './context';
import { HomeScreen, MoviesScreen, RegisterScreen } from './screens';
import { DashboardScreen } from './screens';

const ProtectedRoute = ({ component: Component, user, ...rest }) =>
  user ? (
    <Route
      {...rest}
      render={(renderProps) => <Component {...rest} {...renderProps} />}
    />
  ) : (
    <Redirect to={{ pathname: '/' }} />
  );

const UltraProtectedRoute = ({ component: Component, user, ...rest }) =>
  user && user.role === 0 ? (
    <Route {...rest} render={(props) => <Component {...props} />} />
  ) : (
    <Redirect to='/' />
  );

const App = () => {
  const [user, setUser] = useState({});

  return (
    <UserContext.Provider value={{ userState: user, setUserState: setUser }}>
      <BrowserRouter>
        <Switch>
          <UltraProtectedRoute
            user={user}
            path='/dashboard'
            component={DashboardScreen}
          />
          <Route path='/movies' component={MoviesScreen} />
          <Route
            path='/register'
            render={(props) =>
              user && user.username ? (
                <Redirect to='/movies' />
              ) : (
                <RegisterScreen {...props} />
              )
            }
          />
          <Route
            path='/'
            exact
            render={(props) =>
              user && user.username ? (
                <Redirect to='/movies' />
              ) : (
                <HomeScreen {...props} />
              )
            }
          />
        </Switch>
      </BrowserRouter>
    </UserContext.Provider>
  );
};

export default App;
