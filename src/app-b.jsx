import ReactDOM from 'react-dom';
import { Provider as ReduxProvider } from 'react-redux';
import store from './store';

let initialized = false;

function App() {
  return (
    <ReduxProvider store={store}>
      <h1>Application B</h1>
    </ReduxProvider>
  );
}

function initializeApp() {
  ReactDOM.render(<App />, document.getElementById('root'));
  initialized = true;
}

if (!initialized) {
  initializeApp();
}
