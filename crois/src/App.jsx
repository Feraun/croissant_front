import { Routes, Route } from 'react-router-dom';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import RegPage from './pages/RegPage';
import MainPage from './pages/MainPage';
import SearchPage from './pages/SearchPage';
import ProfilePage from './pages/ProfilePage';


function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage/>}/>
      <Route path="/login" element={<AuthPage />} />
      <Route path='/signup' element={<RegPage />} />
      <Route path='/main' element={<MainPage/>} />
      <Route path='/main/search' element={<SearchPage />}/>

      <Route path='/profile' element={<ProfilePage />}/>
    </Routes>
  );
}

export default App;
