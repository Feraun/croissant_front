import { Routes, Route } from "react-router-dom";

import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import RegPage from "./pages/RegPage";

import MainPage from "./pages/MainPage";
import ProfilePage from "./pages/ProfilePage";
import CitiesPage from "./pages/AdminPages/Cities/CitiesPage";
import BoxesPage from "./pages/ManagerPages/BoxesPage";
import CategoriesPages from "./pages/AdminPages/Categories/CategoriesPage"
import InstitutionsPage from "./pages/AdminPages/Institutions/InstitutionsPage"

import ProtectedRoute from "./components/ProtectedRoute";
import MainLayout from "./components/MainLayout";
import MyInstitutionsPage from "./pages/ManagerPages/MyInstitutionsPage";

function App() {
  return (
    <Routes>
      <Route 
        path="/" 
        element={<HomePage />} 
      />
      <Route 
        path="/login" 
        element={<AuthPage />} 
      />
      <Route 
        path="/signup" 
        element={<RegPage />} 
      />

      <Route
        path="/main"
        element={
          <ProtectedRoute 
            allowedRoles={[
              "ROLE_CLIENT", 
              "ROLE_ADMIN", 
              "ROLE_MANAGER"
            ]}>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route 
          index 
          element={<MainPage />} 
        />

        <Route 
          path="profile" 
          element={<ProfilePage />} 
        />

        <Route 
          path="cities" 
          element={<CitiesPage />} 
        />

        <Route 
          path="categories" 
          element={<CategoriesPages/>}
        />

        <Route
          path="myInstitutions/:institutionId/boxes"
          element={<BoxesPage />}
        />

        <Route 
          path="institutions"
          element={<InstitutionsPage/>} 
        />

        <Route 
          path="myInstitutions" 
          element={<MyInstitutionsPage/>} 
        />
      </Route>
    </Routes>
  );
}

export default App;
