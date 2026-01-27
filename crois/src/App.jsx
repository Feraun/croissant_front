import { Routes, Route } from "react-router-dom";

import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import RegPage from "./pages/RegPage";

import MainPage from "./pages/MainPage";
import SearchPage from "./pages/SearchPage";
import ProfilePage from "./pages/ProfilePage";
import CitiesPage from "./pages/AdminPages/CitiesPage";
import BoxesPage from "./pages/ManagerPages/BoxesPage";

import ProtectedRoute from "./components/ProtectedRoute";
import MainLayout from "./components/MainLayout";
import MyInstitutionsPage from "./pages/ManagerPages/MyInstitutionsPage";

function App() {
  return (
    <Routes>
      {/* публичные */}
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<AuthPage />} />
      <Route path="/signup" element={<RegPage />} />

      {/* защищённая зона */}
      <Route
        path="/main"
        element={
          <ProtectedRoute allowedRoles={["ROLE_CLIENT", "ROLE_ADMIN", "ROLE_MANAGER"]}>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        {/* /main */}
        <Route index element={<MainPage />} />

        {/* /main/search */}
        <Route path="search" element={<SearchPage />} />

        {/* /main/profile */}
        <Route path="profile" element={<ProfilePage />} />

        {/* /main/cities */}
        <Route path="cities" element={<CitiesPage />} />

        {/* /main/boxes */}
        <Route
          path="myInstitutions/:institutionId/boxes"
          element={<BoxesPage />}
        />


        {/* /main/myInstitutions */}
        <Route path="myInstitutions" element={<MyInstitutionsPage/>} />
      </Route>
    </Routes>
  );
}

export default App;
