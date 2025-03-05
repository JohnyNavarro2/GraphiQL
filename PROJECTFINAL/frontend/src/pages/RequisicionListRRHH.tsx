import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import clients from "../api/graphqlClient"; // Verifica la ruta
import { OBTENER_REQUISICIONES, CREAR_PUBLICACION, ACTUALIZAR_ESTADO_REQUISICION } from "../graphql/queries";
import "bootstrap/dist/css/bootstrap.min.css";

interface Requisicion {
  id: string;
  cargo: string;
  categoriaSalarial: string;
  perfil: string;
  estado: string;
}

const RequisicionListRRHH = () => {
  const { data, loading, error, refetch } = useQuery<{ requisiciones: Requisicion[] }>(OBTENER_REQUISICIONES, {
    client: clients.requisicion,
  });
  const [crearPublicacion] = useMutation(CREAR_PUBLICACION, {
    client: clients.publicacion,
  });
  const [actualizarEstadoRequisicion] = useMutation(ACTUALIZAR_ESTADO_REQUISICION, {
    client: clients.requisicion,
  });

  const [fechaPublicacion, setFechaPublicacion] = useState("");
  const [selectedRequisicion, setSelectedRequisicion] = useState<Requisicion | null>(null);
  const [plataforma, setPlataforma] = useState("");

  const handleClickOpen = (requisicion: Requisicion) => {
    setSelectedRequisicion(requisicion);
    setPlataforma(""); // Resetear la selección de plataforma al abrir el modal
  };

  const handleClose = () => {
    setSelectedRequisicion(null);
    setPlataforma("");
    refetch();
  };

  const handleGuardar = async () => {
    if (selectedRequisicion && plataforma && fechaPublicacion) {
      try {
        await crearPublicacion({
          variables: {
            requisicionId: selectedRequisicion.id,
            plataforma: plataforma,
            fechaPublicacion: fechaPublicacion
          },
        });

        // Luego, actualizar el estado de la requisición a "ACTIVO"
        await actualizarEstadoRequisicion({
          variables: {
            id: selectedRequisicion.id,
            estado: "ACTIVO"
          }
        });

        alert("Publicación realizada correctamente y estado actualizado a ACTIVO.");
        handleClose(); // Cerrar el modal y recargar los datos
      } catch (err) {
        console.error("Error al procesar la publicación o al actualizar el estado:", err);
        alert("Error al publicar la vacante o actualizar el estado. Por favor, inténtelo de nuevo.");
      }
    } else {
      alert("Seleccione una plataforma para la publicación y asegúrese de que la requisición está seleccionada.");
    }
  };


  const handleRechazar = async (requisicionId: string) => {
    try {
      await actualizarEstadoRequisicion({
        variables: {
          id: requisicionId,
          estado: "RECHAZADO"
        }
      });
      alert("Requisición rechazada correctamente.");
      refetch();
    } catch (err) {
      console.error("Error al rechazar la requisición:", err);
      alert("Error al rechazar la requisición.");
    }
  };

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // Filtrar requisiciones por el estado "PENDIENTE"
  const pendingRequisitions = data ? data.requisiciones.filter(req => req.estado === "PENDIENTE") : [];

  return (
    <div className="container mt-4">
      <h2>Listado de Requisiciones</h2>
      <table className="table table-striped table-bordered">
        <thead className="table-dark">
          <tr>
            <th>Cargo</th>
            <th>Categoría Salarial</th>
            <th>Perfil</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {pendingRequisitions.map((req) => (
            <tr key={req.id}>
              <td>{req.cargo}</td>
              <td>{req.categoriaSalarial}</td>
              <td>{req.perfil}</td>
              <td>{req.estado}</td>
              <td>
                <button className="btn btn-primary me-2" onClick={() => handleClickOpen(req)}>
                  Publicar
                </button>
                <button className="btn btn-danger" onClick={() => handleRechazar(req.id)}>
                  Rechazar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedRequisicion && (
        <div className="modal fade show d-block" tabIndex={-1} role="dialog">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Publicar Requisición</h5>
                <button type="button" className="btn-close" onClick={handleClose}></button>
              </div>
              <div className="modal-body">
                <div>
                  <label className="form-label">Opción de Publicación</label><br />
                  <label>
                    <input
                      type="radio"
                      name="plataforma"
                      value="Interno"
                      checked={plataforma === "Interno"}
                      onChange={(e) => setPlataforma(e.target.value)}
                    /> Interno
                  </label><br />
                  <label>
                    <input
                      type="radio"
                      name="plataforma"
                      value="Externo"
                      checked={plataforma === "Externo"}
                      onChange={(e) => setPlataforma(e.target.value)}
                    /> Externo
                  </label>
                  {plataforma === "Externo" && (
                    <select className="form-control mt-2">
                      <option value="">Seleccione la plataforma...</option>
                      <option value="LinkedIn">LinkedIn</option>
                      <option value="Indeed">Indeed</option>
                    </select>
                  )}
                </div>
                <div className="mt-3">
                  <label htmlFor="fechaPublicacion">Fecha de Expiración:</label>
                  <input
                    type="datetime-local"
                    id="fechaPublicacion"
                    className="form-control"
                    value={fechaPublicacion}
                    onChange={(e) => setFechaPublicacion(e.target.value)}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={handleClose}>
                  Cancelar
                </button>
                <button className="btn btn-primary" onClick={handleGuardar}>
                  Guardar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RequisicionListRRHH;
