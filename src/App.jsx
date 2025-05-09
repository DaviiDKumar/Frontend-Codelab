import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from 'react';
import Home from "./components/Home";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Navbar from "./components/Navbar";
import UpdateProfilePage from "./components/UpdateProfilePage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import UploadCourse from "./components/UploadCourse";
import Cart from "./components/Cart";
import CoursePage from "./components/CoursePage";
import Footer from "./components/Footer";
import MyLearning from "./components/MyLearning";
import CoursePageNormal from "./components/CoursePageNormal";
import DeleteButton from "./components/DeleteButton";
import ProtectedRoute from "./Routes/ProtectedRoute";
import PublicRoute from "./Routes/PublicRoute";

// Import your category components
import WebDevelopment from "../src/pages/WebDevelopment";
import DSA from "../src/pages/DSA";
import ReactPage from "../src/pages/React";
import PythonPage from "../src/pages/Python";
import MachineLearningPage from "../src/pages/MachineLearning";
import AIPage from "../src/pages/AI";
import BlockchainPage from "../src/pages/BlockChain";
import CyberSecurityPage from "../src/pages/CyberSecurity";
import DevOpsPage from "../src/pages/DevOps";
import UIUXPage from "../src/pages/UIUX";

const App = () => {

  

useEffect(() => {
  window.scrollTo(0, 0); // Scroll to top when component mounts
}, []); // Empty dependency array makes it run only once after mount


  return (
    <>
      <Router>
        <Navbar />
        <Routes>.
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route element={<PublicRoute />}>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
          </Route>

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/uploadcourse" element={<UploadCourse />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/updateProfile" element={<UpdateProfilePage />} />
            <Route path="/my-learning" element={<MyLearning />} />
            
          </Route>

          {/* Category Routes */}
          <Route path="/web-development" element={<WebDevelopment />} />
          <Route path="/dsa" element={<DSA />} />
          <Route path="/react" element={<ReactPage />} />
          <Route path="/python" element={<PythonPage />} />
          <Route path="/machine-learning" element={<MachineLearningPage />} />
          <Route path="/ai" element={<AIPage />} />
          <Route path="/blockchain" element={<BlockchainPage />} />
          <Route path="/cyber-security" element={<CyberSecurityPage />} />
          <Route path="/devops" element={<DevOpsPage />} />
          <Route path="/ui-ux" element={<UIUXPage />} />

          {/* Publicly available course pages */}
          <Route path="/course/:id" element={<CoursePage />} />
          <Route path="/newcoursepage/:id" element={<CoursePageNormal />} />
          <Route path="/deleteButton/:id" element={<DeleteButton />} />
        </Routes>
        <Footer />
      </Router>
      <ToastContainer />
    </>
  );
};

export default App;
