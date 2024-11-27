// import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserLayout from "./component/navbar/userLayout";
import AdminLayout from "./component/navbar/adminLayout";
import HomePage from "./page/userpage/homePage";
import AdminHome from "./page/adminpage/adminHome";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Home Page */}
        <Route path="/"element={<UserLayout> <HomePage /> </UserLayout>}/>
        <Route path="/admin"element={<AdminLayout> <AdminHome /> </AdminLayout>}/>
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
};

export default App;
