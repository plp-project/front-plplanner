import "./styles.css";
import React, { useState } from "react";
import FormInput from "../form/formInput";
import UserService from '../../services/UserService';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import './styles.css';

const UserRegister = () => {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const navigate = useNavigate();
  
    const handleFormSubmit = async (e) => {
      e.preventDefault();

      if (password !== passwordConfirm) {
        toast.error("As senhas não coincidem!");
        return;
      }

      const user = {
        name: name,
        email: email,
        password: password,
      };

      try {
        const response = await UserService.registerUser(user);
        
        sessionStorage.setItem("userId", response.data.id);
        
        toast.success("Cadastro realizado com sucesso!");
        navigate("/login");
      } catch (error) {
        toast.error("Erro ao realizar o cadastro!");
      }
    };
  
    return (
        <div className="p-10 box-custom">
          <h2 className="title-custom-register font mb-5">Cadastre-se</h2>
          <form onSubmit={handleFormSubmit}>
            <FormInput
                type={"name"}
                placeholder="Usuário"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <FormInput
              type="email"
              placeholder="exemplo@exemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <FormInput
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <FormInput
              type="password"
              placeholder="Confirmar senha"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
            />
            <div className="text-center mt-4">
              <button type="submit" className="submit-button">
                Cadastrar-se
              </button>
              <p className="mt-4 text-sm link-page">
                Já possui uma conta? <a href="/login" className="hover:underline">Entre aqui!</a>
              </p>
            </div>
          </form>
        </div>
    );
  };
  
  export default UserRegister;
