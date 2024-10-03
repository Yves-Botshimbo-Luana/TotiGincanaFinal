import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";  
import "./AddEdit.css";
import { toast } from 'react-toastify';
import axios from "axios";


const initialState = {
    name: "",
    email: "",
    contact: "",
};

const AddEdit = () => {
  const [state, setState] = useState(initialState);
  const { name, email, contact } = state;

  const navigate = useNavigate(); 
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      getSingleUser(id);
    }
  }, [id]);

  const getSingleUser = async (id) => {
    try {
      const response = await axios.get(`http://localhost:5000/user/${id}`);
      if (response.status === 200) {
        setState({ ...response.data[0] });
      }
    } catch (error) {
      toast.error("Erro ao buscar usuário");
    }
  };

  const handleInputChange = (e) => {
    let { name, value } = e.target;
    setState({
      ...state,
      [name]: value,
    });
  };

  const addUser = async (data) => {
    try {
      const response = await axios.post("http://localhost:5000/user", data);
      if (response.status === 200) {
        toast.success("Usuário adicionado com sucesso");
      }
    } catch (error) {
      toast.error("Erro ao adicionar usuário");
    }
  };

  const updateUser = async (data, id) => {
    try {
      const response = await axios.put(`http://localhost:5000/user/${id}`, data);
      if (response.status === 200) {
        toast.success("Usuário atualizado com sucesso");
      }
    } catch (error) {
      toast.error("Erro ao atualizar usuário");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !contact) {
      toast.error("Preencha todos os campos para adicionar ou atualizar um contato");
    } else {
      if (!id) {
        addUser(state);
      } else {
        updateUser(state, id);
      }
      navigate("/home"); // Redireciona imediatamente após a operação
    }
  };

  return (
    <div style={{ marginTop: "100px" }}>
      <form
        style={{
          margin: "auto",
          padding: "15px",
          maxWidth: "400px",
          alignContent: "center",
        }}
        onSubmit={handleSubmit}
      >
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Digite seu Nome ..."
          onChange={handleInputChange}
          value={name}
        />

        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Digite seu Email ..."
          onChange={handleInputChange}
          value={email}
        />

        <label htmlFor="contact">Contact</label>
        <input
          type="number"
          id="contact"
          name="contact"
          placeholder="Digite seu Contato No."
          onChange={handleInputChange}
          value={contact}
        />
        <input type="submit" value={id ? "Atualizar" : "Adicionar"} />
      </form>
    </div>
  );
};

export default AddEdit;
