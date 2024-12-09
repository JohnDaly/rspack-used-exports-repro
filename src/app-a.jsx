import ReactDOM from 'react-dom';
import { Provider as ReduxProvider } from 'react-redux';
import store from './store';
import { ConnectedComponent } from './component-a.jsx';

let initialized = false;

function App() {
  return (
    <ReduxProvider store={store}>
      <ConnectedComponent />
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
