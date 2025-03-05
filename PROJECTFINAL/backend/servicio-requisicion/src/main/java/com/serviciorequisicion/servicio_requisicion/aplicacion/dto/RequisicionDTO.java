package com.serviciorequisicion.servicio_requisicion.aplicacion.dto;

import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class RequisicionDTO {
    private Long id;
    private String cargo;
    private String funciones;
    private String categoriaSalarial;
    private String perfil;
    private String estado;
    private LocalDate fechaSolicitud;
}
