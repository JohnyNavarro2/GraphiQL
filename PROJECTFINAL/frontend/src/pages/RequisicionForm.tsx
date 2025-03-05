import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import clients from '../api/graphqlClient';
import { CREAR_REQUISICION } from '../graphql/queries';

const CrearRequisicion = () => {
  const [cargo, setCargo] = useState('');
  const [categoriaSalarial, setCategoriaSalarial] = useState('');
  const [perfil, setPerfil] = useState('');

  const [crearRequisicion] = useMutation(CREAR_REQUISICION, {
    client: clients.requisicion, // 📌 Usamos el cliente correcto
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await crearRequisicion({
        variables: { input: { cargo, categoriaSalarial, perfil } },
      });
      window.location.reload(); // Recarga la página después de enviar el formulario
      alert('Requisición creada con éxito');
    } catch (error) {
      console.error('Error al crear requisición', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Cargo" value={cargo} onChange={(e) => setCargo(e.target.value)} />
      <input type="text" placeholder="Categoría Salarial" value={categoriaSalarial} onChange={(e) => setCategoriaSalarial(e.target.value)} />
      <input type="text" placeholder="Perfil" value={perfil} onChange={(e) => setPerfil(e.target.value)} />
      <button type="submit">Crear Requisición</button>
    </form>
  );
};

export default CrearRequisicion;
