import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';  
import "./Home.css";
import axios from "axios";

const Home = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/users");
      if (response.status === 200) {
        setData(response.data);
      }
    } catch (error) {
      toast.error("Falha ao buscar usuários");
    }
  };

  const onDeleteUser = async (id) => {
    if (window.confirm("Tem certeza de que deseja excluir este registro de usuário?")) {
      try {
        const response = await axios.delete(`http://localhost:5000/user/${id}`);
        if (response.status === 200) {
          toast.success(response.data);
          getUsers(); 
        }
      } catch (error) {
        toast.error("Erro ao excluir usuário");
      }
    }
  };

  return (
    <div style={{ marginTop: "150px" }}>
      <table className="styled-table">
        <thead>
          <tr>
            <th style={{ textAlign: "center" }}>No.</th>
            <th style={{ textAlign: "center" }}>Name</th>
            <th style={{ textAlign: "center" }}>Email</th>
            <th style={{ textAlign: "center" }}>Contact</th>
            <th style={{ textAlign: "center" }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {data && data.map((item, index) => {
            return (
              <tr key={index}>
                <th scope="row" style={{ textAlign: "center" }}>{index + 1}</th>
                <td style={{ textAlign: "center" }}>{item.name}</td>
                <td style={{ textAlign: "center" }}>{item.email}</td>
                <td style={{ textAlign: "center" }}>{item.contact}</td>
                <td style={{ textAlign: "center" }}>
                  <Link to={`/view/${item.id}`}>
                    <button className="btn-btn-view">View</button>
                  </Link>
                  <Link to={`/update/${item.id}`}>
                    <button className="btn-btn-edit">Edit</button>
                  </Link>
                  <button className="btn-btn-delete" onClick={() => onDeleteUser(item.id)}>Delete</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
