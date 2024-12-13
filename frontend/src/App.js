
import './App.css';
import Dashboard from './components/dashboard/Dashboard';
import SignIn from './components/signin/SignIn';
import SignUp from './components/signup/SignUp';
import { BrowserRouter, Routes,Route } from 'react-router-dom';


function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/'   element={<SignIn/>}/>
      <Route path='/signup'   element={<SignUp/>}/>
      <Route path='/dashboard'   element={<Dashboard/>}/>
    </Routes>
    </BrowserRouter>
    
  );
}

export default App;
