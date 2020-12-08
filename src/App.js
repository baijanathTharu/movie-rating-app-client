import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { HomeScreen, RegisterScreen } from './screens';

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/register' component={RegisterScreen} />
        <Route path='/' exact component={HomeScreen} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
