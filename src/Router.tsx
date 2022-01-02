import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from 'react-router-dom';
import TicketApp from './pages/TicketApp';
import TichetDetail from './pages/TicketDetail';


/**
 * RouterApp  is defined simply
 * to manager the routes
 * @function
 */
const RouterApp: React.FC = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<TicketApp />} />
          <Route path="/detail/:listId/:cardId" element={<TichetDetail />} />
        </Routes>
      </Router>
    </div>
  )
}

export default RouterApp;