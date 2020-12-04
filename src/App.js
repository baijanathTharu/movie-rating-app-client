import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { HomeScreen } from './screens/home.screen';

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' component={HomeScreen}></Route>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
