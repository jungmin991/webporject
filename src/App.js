import './App.css';
import { Route, Routes } from 'react-router-dom';
import Main from './components/Main';
import Login from './components/Login';
import Register from './components/Register';
import CampingForm from './Owner/CampingForm';

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/host' element={<CampingForm />} />
      </Routes>
    </div>
  );
}

export default App;
