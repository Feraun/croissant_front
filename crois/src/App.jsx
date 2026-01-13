import { Routes, Route } from 'react-router-dom';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import RegPage from './pages/RegPage';
import MainPage from './pages/MainPage';
import SearchPage from './pages/SearchPage';
import ProfilePage from './pages/ProfilePage';
import CitiesPage from './pages/AdminPages/CitiesPage'
import BoxesPage from './pages/ManagerPages/boxesPage';
import ProtectedRoute from './components/ProtectedRoute';


function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage/>}/>
      <Route path="/login" element={<AuthPage />} />
      <Route path='/signup' element={<RegPage />} />

      <Route
        path='/main' 
        element={
          <ProtectedRoute allowedRoles={["ROLE_CLIENT", "ROLE_ADMIN", "ROLE_MANAGER"]}>
            <MainPage/>
          </ProtectedRoute>
      } 
      />

      {/* сделать нормальную вложенную роутизацию */}
      
      <Route path='/main/search' element={<SearchPage />}/>

      <Route path='/profile' element={<ProfilePage />}/>

      <Route path='/cities' element={<CitiesPage />}/>

      <Route path='/boxes' element={<BoxesPage />}/>


    </Routes>
  );
}

export default App;
