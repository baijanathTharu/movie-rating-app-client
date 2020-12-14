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

const App = () => {
  const [user, setUser] = useState({});

  return (
    <UserContext.Provider value={{ userState: user, setUserState: setUser }}>
      <BrowserRouter>
        <Switch>
          <ProtectedRoute
            user={user}
            path='/dashboard'
            component={DashboardScreen}
          />
          <Route path='/movies' component={MoviesScreen} />
          <Route path='/register' component={RegisterScreen} />
          <Route path='/' exact component={HomeScreen} />
        </Switch>
      </BrowserRouter>
    </UserContext.Provider>
  );
};

export default App;
