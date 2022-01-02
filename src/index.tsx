import ReactDOM from 'react-dom';
import Router from './Router';

const App = () => {
  return (
    <Router />
  )
};

ReactDOM.render(
  <App />, document.querySelector('#root')
)