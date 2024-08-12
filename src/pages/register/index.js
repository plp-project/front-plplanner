import "./styles.css";
import React from "react";
import UserRegister from "../../components/userRegister";

const Register = () => {
    return (
    <div className="d-flex align-items-center register" style={{height: "100%"}}>
      <div className="container overflow-auto">
        <div className="row align-items-center justify-content-center px-3 px-lg-0 gy-5">
          <div className="col-8 col-lg-6 custom-heading logo">
            <h1>PLPlanner</h1>
          </div>
          <div className="col-12 col-lg-6 box">
            <UserRegister/>
          </div>
        </div>
      </div>
    </div>
    );
  };
  
  export default Register;