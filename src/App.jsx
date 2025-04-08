import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
import SaveMyLearningButton from "./components/Savemylearning";
import CoursePageNormal from "./components/CoursePageNormal";
import DeleteButton from "./components/DeleteButton";
import ProtectedRoute from "./Routes/ProtectedRoute";
import PublicRoute from "./Routes/PublicRoute";

// 👇 ADD THESE


const App = () => {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
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
            <Route path="/SaveMyLearningButton" element={<SaveMyLearningButton />} />
          </Route>

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
