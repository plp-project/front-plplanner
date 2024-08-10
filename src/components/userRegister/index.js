import "./styles.css";
import React, { useState } from "react";
import FormInput from "../form/formInput";
import UserService from '../../services/UserService';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const UserRegister = ({ type }) => {
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
        <div className="form-box p-4">
          <h2>Cadastre-se</h2>
          <hr/>
          <p className='bv'>Bem vindo ao PLPlanner</p>
          <form onSubmit={handleFormSubmit}>
            <FormInput
                label={"Nome:"}
                type={"name"}
                placeholder="Digite seu nome de usuário"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
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
              placeholder="Digite uma senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <FormInput
              label="Confirmar senha:"
              type="password"
              placeholder="Confirme sua senha"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
            />
            <div className="text-center mt-4">
              <button type="submit" className="form-button">
                Cadastrar
              </button>
              <p className="mt-3">
                Ja possui uma conta? <a href="/login">Entre aqui!</a>
              </p>
            </div>
          </form>
        </div>
    );
  };
  
  export default UserRegister;