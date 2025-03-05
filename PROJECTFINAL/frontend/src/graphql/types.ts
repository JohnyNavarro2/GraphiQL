// Dentro de src/graphql/types.ts
export interface Requisicion {
    id: string;
    cargo: string;
    categoriaSalarial: string;
    perfil: string;
    estado: string;
  }
  
  export interface RequisicionesData {
    requisiciones: Requisicion[];
  }
  