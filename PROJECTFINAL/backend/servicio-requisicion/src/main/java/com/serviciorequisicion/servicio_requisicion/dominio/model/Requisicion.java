package com.serviciorequisicion.servicio_requisicion.dominio.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name = "requisicion")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Requisicion {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String cargo;
    private String funciones;
    private String categoriaSalarial;
    private String perfil;
    private String estado; // "PENDIENTE", "APROBADA", "RECHAZADA"
    
    private LocalDate fechaSolicitud;
}
