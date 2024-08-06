import React, { useState } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import UserService from '../../../services/UserService';
import FormInput from '../formInput';
import { toast } from 'react-toastify';
import './styles.css';
import { useNavigate } from 'react-router-dom';

const FormBoxLogin = () => {
  const { login: setAuthToken } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await UserService.login({ email, password });
      setAuthToken(response.data.token);
      toast.success('login realizado');
      navigate('/dashboard');
    } catch (error) {
      toast.error('Login failed');
    }
  };

  return (
    <div className="form-box p-4">
      <h2>Login</h2>
      <hr/>
      <p className='bv'>Bem vindo ao PLPlanner</p>
      <form onSubmit={handleLogin}>
        <FormInput
          label="E-mail:"
          type="email"
          placeholder="exemplo@exemplo.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <FormInput
          label="Senha:"
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="text-center mt-4">
          <button type="submit" className="form-button">
            Entrar
          </button>
          <p className="mt-3">
            Novo por aqui? <a href="/cadastro">Cadastre-se aqui!</a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default FormBoxLogin;