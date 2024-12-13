// import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserLayout from "./component/navbar/userLayout";
import AdminLayout from "./component/navbar/adminLayout";
import HomePage from "./page/userpage/homePage";
import RecipePage from "./page/userpage/recipePage";
import AboutUs from "./page/userpage/AboutUs";
import ContactUs from "./page/userpage/contactUs";
import Subscription from "./page/userpage/Subscription";
import RecipeDetail from "./page/userpage/RecipeDetail";
import RecipeSteps from "./page/userpage/RecipeSteps";
{/* Auth Route */}
import Login from "./page/auth/Login";
import SignUp from "./page/auth/SignUp";
import ProtectedRoute from "./component/auth/ProtectedRoute";
import { AuthProvider } from "./context/authContext";
 {/* Admin Route */}
import AdminHome from "./page/adminpage/adminHome";
import CategoryPage from "./page/adminpage/categoryPage";
import IngredientPage from "./page/adminpage/ingredientPage";
import OriginPage from "./page/adminpage/originPage";
import ProfileAdmin from "./page/adminpage/profileAdmin";
const App = () => {
  return (
    <Router>
      <AuthProvider>
      <Routes>
        {/* Home Page */}
        <Route path="/" element={<UserLayout> <HomePage /> </UserLayout>}/>
        <Route path="/recipes" element={<UserLayout> <RecipePage /> </UserLayout>}/>
        <Route path="/recipe/:id" element={<UserLayout> <RecipeDetail /> </UserLayout>} />
        <Route path="/recipe/:id/steps" element={<UserLayout> <RecipeSteps /> </UserLayout>} />
        <Route path="/aboutus" element={<UserLayout> <AboutUs /> </UserLayout>}/>
        <Route path="/contact" element={<UserLayout> <ContactUs /> </UserLayout>}/>
        <Route path="/pricing" element={<UserLayout> <Subscription /> </UserLayout>}/>
        {/* Auth Page */}
        <Route path="/signin" element={<Login/>}/>
        <Route path="/signup" element={<SignUp/>}/>
        {/* Admin Page */}
        <Route path="/admin" element={<AdminLayout> <AdminHome /> </AdminLayout>}/>
        <Route path="/admin/category" element={<AdminLayout> <CategoryPage /> </AdminLayout>}/>
        <Route path="/admin/ingredient" element={<AdminLayout> <IngredientPage /> </AdminLayout>}/>
        <Route path="/admin/origin" element={<AdminLayout> <OriginPage /> </AdminLayout>}/>
        <Route path="/admin/profile" element={<AdminLayout> <ProfileAdmin /> </AdminLayout>}/>
        {/* Admin Protector */}
        <Route element={<ProtectedRoute allowedRole="Admin" />}>
          <Route path="/admin11" element={<AdminLayout> <AdminHome /> </AdminLayout>}/>
        </Route>
        {/* User Protector */}
        <Route element={<ProtectedRoute allowedRole="User" />}>
          <Route path="/profileUser" element={<UserLayout> <HomePage /> </UserLayout>}/>
        </Route>

        {/* Add more routes as needed */}
      </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
