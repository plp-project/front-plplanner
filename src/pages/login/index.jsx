import React from 'react';
import FormBoxLogin from '../../components/form/formBoxLogin';
import './style.css';

const LoginPage = () => {
  return (
    <div className="flex items-center justify-center login" style={{height: "100vh"}}>
      <div className="container overflow-auto custom-container px-0" style={{width: "90vw"}}>
        <div className="flex flex-col lg:flex-row items-center justify-center px-0 lg:px-0 custom-box">
          <div className="custom-heading">
            <p><strong>PLP</strong>lanner</p>
          </div>
          <div className="custom-form">
            <FormBoxLogin />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
