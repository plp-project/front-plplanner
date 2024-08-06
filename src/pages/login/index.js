import React from 'react';
import FormBoxLogin from '../../components/form/formBoxLogin';
import './styles.css';


const LoginPage = () => {
  return (
    <div className="d-flex align-items-center login" style={{height: "100vh"}}>
      <div className="container overflow-auto">
        <div className="row align-items-center justify-content-center px-3 px-lg-0 gy-5">
          <div className="col-8 col-lg-6 custom-heading">
            <h1>PLPlanner</h1>
          </div>
          <div className="col-12 col-lg-6">
            <FormBoxLogin />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;