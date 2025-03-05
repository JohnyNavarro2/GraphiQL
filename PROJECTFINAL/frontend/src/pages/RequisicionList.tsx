import { useQuery } from '@apollo/client';
import clients from '../api/graphqlClient';  // 📌 Importamos los clientes
import { OBTENER_REQUISICIONES } from '../graphql/queries';

const RequisicionList = () => {
  const { data, loading, error } = useQuery(OBTENER_REQUISICIONES, {
    client: clients.requisicion, 
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :( Please try again</p>;

  return (
    <div className="container">
      <h2>Listado de Requisiciones</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Cargo</th>
            <th>Categoría Salarial</th>
            <th>Perfil</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {data && data.requisiciones.map((req: any) => (
            <tr key={req.id}>
              <td>{req.cargo}</td>
              <td>{req.categoriaSalarial}</td>
              <td>{req.perfil}</td>
              <td>{req.estado}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RequisicionList;
