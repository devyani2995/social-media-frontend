import './App.css';
import AppRouter from './AppRouter';
import Navbar from './components/Navbar';

//Main application entry point
function App() {
  return (
    <div>
      <Navbar />
      <AppRouter />
    </div>
  );
}

export default App;
