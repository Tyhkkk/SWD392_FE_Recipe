// import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserLayout from "./component/navbar/userLayout";
import AdminLayout from "./component/navbar/adminLayout";
import HomePage from "./page/userpage/homePage";
import RecipePage from "./page/userpage/recipePage";
import AboutUs from "./page/userpage/AboutUs";
import ContactUs from "./page/userpage/contactUs";
import Subscription from "./page/userpage/Subscription";
 {/* Admin Route */}
import AdminHome from "./page/adminpage/adminHome";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Home Page */}
        <Route path="/" element={<UserLayout> <HomePage /> </UserLayout>}/>
        <Route path="/recipes" element={<UserLayout> <RecipePage /> </UserLayout>}/>
        <Route path="/aboutus" element={<UserLayout> <AboutUs /> </UserLayout>}/>
        <Route path="/contact" element={<UserLayout> <ContactUs /> </UserLayout>}/>
        <Route path="/pricing" element={<UserLayout> <Subscription /> </UserLayout>}/>
        {/* Admin Page */}
        <Route path="/admin" element={<AdminLayout> <AdminHome /> </AdminLayout>}/>

        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
};

export default App;
