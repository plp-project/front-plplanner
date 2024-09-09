import React, { useState } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import UserService from '../../../services/UserService';
import FormInput from '../formInput';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import './styles.css';

const FormBoxLogin = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await UserService.login({ email, password });
      login(response.data.token, response.data.user);
      navigate('/home');
    } catch (error) {
      toast.error('Login failed');
    }
  };

  return (
    <div className="p-10 box-custom">
      <div>
          <h2 className="title-custom-login font mb-5">Login</h2>
        <form onSubmit={handleLogin}>
          <FormInput
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <FormInput
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="text-center mt-6">
            <button type="submit" className="submit-button">
              Entrar
            </button>
            <p className="mt-4 text-sm link-page">
              Novo por aqui? <a href="/cadastro" className="hover:underline">Cadastre-se aqui!</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormBoxLogin;
