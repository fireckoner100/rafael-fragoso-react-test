import AppRoutes from './router';
import './App.css';
import SessionManager from './components/SessionManager';
import Navbar from './components/Navbar';

function App() {
  return(
    <>
      <Navbar />
      <SessionManager />
      <AppRoutes />
    </>
  );
}

export default App;
