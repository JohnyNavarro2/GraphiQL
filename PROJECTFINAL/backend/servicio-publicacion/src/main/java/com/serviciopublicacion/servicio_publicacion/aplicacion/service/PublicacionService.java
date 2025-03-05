package com.serviciopublicacion.servicio_publicacion.aplicacion.service;

import com.serviciopublicacion.servicio_publicacion.aplicacion.dto.PublicacionDTO;
import com.serviciopublicacion.servicio_publicacion.dominio.model.Publicacion;
import com.serviciopublicacion.servicio_publicacion.dominio.repository.PublicacionRepository;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PublicacionService {

    private final PublicacionRepository publicacionRepository;

    public PublicacionService(PublicacionRepository publicacionRepository) {
        this.publicacionRepository = publicacionRepository;
    }

    public List<PublicacionDTO> obtenerPublicaciones() {
        return publicacionRepository.findAll().stream()
                .map(pub -> new PublicacionDTO(
                        pub.getId(), pub.getRequisicionId(), pub.getPlataforma(),
                        pub.getFechaPublicacion(), pub.getEstado()))
                .collect(Collectors.toList());
    }

    public PublicacionDTO crearPublicacion(PublicacionDTO dto) {
        Publicacion publicacion = new Publicacion(null, dto.getRequisicionId(),
                dto.getPlataforma(), dto.getFechaPublicacion(), "ACTIVA");
        Publicacion nuevaPublicacion = publicacionRepository.save(publicacion);
        return new PublicacionDTO(nuevaPublicacion.getId(), nuevaPublicacion.getRequisicionId(),
                nuevaPublicacion.getPlataforma(), nuevaPublicacion.getFechaPublicacion(),
                nuevaPublicacion.getEstado());
    }
}
