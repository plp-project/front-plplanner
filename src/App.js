import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Slide, ToastContainer } from "react-toastify";

import Login from './pages/login'
import Register from './pages/register';

function App() {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={2500}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        transition={Slide}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <BrowserRouter>
        <Routes>
          <Route element={<Navigate to="/login" />} path="/" />
          <Route element={<Navigate to="/login" />} path="/sair" />
          <Route element={<Login />} path="/login" />

          <Route element={<Register />} path="/cadastro" />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
