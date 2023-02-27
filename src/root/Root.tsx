import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import { theme } from '../styles';
import StoreProvider from '../stores/StoreProvider';

const Root = () => (
  <StoreProvider>
    <Router>
      <App />
    </Router>
  </StoreProvider>
);

export default Root;
