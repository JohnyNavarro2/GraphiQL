import { gql } from '@apollo/client';

export const OBTENER_REQUISICIONES = gql`
  query ObtenerRequisiciones {
    requisiciones {
      id
      cargo
      categoriaSalarial
      perfil
      estado
    }
  }
`;

export const CREAR_REQUISICION = gql`
  mutation CrearRequisicion($input: RequisicionInput!) {
    crearRequisicion(input: $input) {
      id
      cargo
      categoriaSalarial
      perfil
      estado
    }
  }
`;


export const ACTUALIZAR_ESTADO_REQUISICION = gql`
mutation ActualizarEstadoRequisicion($id: ID!, $estado: String!) {
  actualizarEstadoRequisicion(id: $id, estado: $estado) {
    id
    cargo
    categoriaSalarial
    perfil
    estado
  }
}
`;



export const OBTENER_PUBLICACIONES = gql`
query {
    obtenerPublicaciones {
        id
        requisicionId
        plataforma
        fechaPublicacion
        estado
    }
}
`;



export const CREAR_PUBLICACION = gql`
    mutation CrearPublicacion($requisicionId: ID!, $plataforma: String!, $fechaPublicacion: String!) {
        crearPublicacion(requisicionId: $requisicionId, plataforma: $plataforma, fechaPublicacion: $fechaPublicacion) {
            id
            requisicionId
            plataforma
            fechaPublicacion
            estado
        }
    }
`;
