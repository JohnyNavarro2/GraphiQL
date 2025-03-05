package com.serviciorequisicion.servicio_requisicion.aplicacion.service;

import com.serviciorequisicion.servicio_requisicion.aplicacion.dto.RequisicionDTO;
import com.serviciorequisicion.servicio_requisicion.dominio.model.Requisicion;
import com.serviciorequisicion.servicio_requisicion.dominio.repository.RequisicionRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class RequisicionService {

    private final RequisicionRepository requisicionRepository;

    public RequisicionService(RequisicionRepository requisicionRepository) {
        this.requisicionRepository = requisicionRepository;
    }

    public List<RequisicionDTO> obtenerRequisiciones() {
        return requisicionRepository.findAll().stream()
                .map(this::convertirARequisicionDTO)
                .collect(Collectors.toList());
    }

    public RequisicionDTO crearRequisicion(RequisicionDTO dto) {
        Requisicion requisicion = new Requisicion(null, dto.getCargo(), dto.getFunciones(),
                dto.getCategoriaSalarial(), dto.getPerfil(), "PENDIENTE",
                dto.getFechaSolicitud());
        Requisicion nuevaRequisicion = requisicionRepository.save(requisicion);
        return convertirARequisicionDTO(nuevaRequisicion);
    }

    public RequisicionDTO actualizarEstado(Long id, String estado) {
        return requisicionRepository.findById(id)
                .map(requisicion -> {
                    requisicion.setEstado(estado);
                    Requisicion actualizada = requisicionRepository.save(requisicion);
                    return convertirARequisicionDTO(actualizada);
                })
                .orElseThrow(() -> new RuntimeException("Requisición no encontrada con ID: " + id));
    }

    private RequisicionDTO convertirARequisicionDTO(Requisicion requisicion) {
        return new RequisicionDTO(
            requisicion.getId(),
            requisicion.getCargo(),
            requisicion.getFunciones(),
            requisicion.getCategoriaSalarial(),
            requisicion.getPerfil(),
            requisicion.getEstado(),
            requisicion.getFechaSolicitud()
        );
    }
}
