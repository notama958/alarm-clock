import './App.scss';
import { Fragment } from 'react';
// to combine redux with react
import { Provider } from 'react-redux';
import store from './store';
import MainScreen from './components/MainScreen';
import ButtonController from './components/ButtonController';

function App() {
  return (
    <Provider store={store}>
      <div className="container">
        <MainScreen />
        <ButtonController />
      </div>
    </Provider>
  );
}

export default App;
