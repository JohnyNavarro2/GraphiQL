import { useQuery } from "@apollo/client";
import clients from "../api/graphqlClient";
import { OBTENER_PUBLICACIONES } from "../graphql/queries";

interface Publicacion {
  id: string;
  requisicionId: string;
  plataforma: string;
  fechaPublicacion: string;
  estado: string;
}

const PublicacionList = () => {
  const { data, loading, error } = useQuery<{ obtenerPublicaciones: Publicacion[] }>(OBTENER_PUBLICACIONES, {
    client: clients.publicacion,
  });

  if (loading) return <p>Cargando publicaciones...</p>;
  if (error) return <p>Error al cargar las publicaciones: {error.message}</p>;

  return (
    <div className="container mt-4">
      <h2>Listado de Publicaciones</h2>
      {data && data.obtenerPublicaciones.length > 0 ? (
        <table className="table table-striped">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Requisición ID</th>
              <th>Plataforma</th>
              <th>Fecha de Publicación</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {data.obtenerPublicaciones.map((pub: Publicacion) => (
              <tr key={pub.id}>
                <td>{pub.id}</td>
                <td>{pub.requisicionId}</td>
                <td>{pub.plataforma}</td>
                <td>{pub.fechaPublicacion}</td>
                <td>{pub.estado}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No hay publicaciones disponibles</p>
      )}
    </div>
  );
};

export default PublicacionList;
