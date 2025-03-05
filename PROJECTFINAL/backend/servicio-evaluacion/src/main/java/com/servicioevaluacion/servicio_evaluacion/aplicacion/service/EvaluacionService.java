package com.servicioevaluacion.servicio_evaluacion.aplicacion.service;

import com.servicioevaluacion.servicio_evaluacion.aplicacion.dto.CandidatoDTO;
import com.servicioevaluacion.servicio_evaluacion.aplicacion.dto.EvaluacionDTO;
import com.servicioevaluacion.servicio_evaluacion.dominio.model.Evaluacion;
import com.servicioevaluacion.servicio_evaluacion.dominio.repository.EvaluacionRepository;
import com.servicioevaluacion.servicio_evaluacion.infraestructura.clients.CandidatoClient;

import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class EvaluacionService {

    private final EvaluacionRepository evaluacionRepository;
    private final CandidatoClient candidatoClient;
    private final KafkaTemplate<String, String> kafkaTemplate;

    // ✅ Fusionamos todos los constructores en uno solo
    public EvaluacionService(EvaluacionRepository evaluacionRepository, 
                             CandidatoClient candidatoClient, 
                             KafkaTemplate<String, String> kafkaTemplate) {
        this.evaluacionRepository = evaluacionRepository;
        this.candidatoClient = candidatoClient;
        this.kafkaTemplate = kafkaTemplate;
    }

    public void enviarEvaluacion(Long candidatoId) {
        String mensaje = "Evaluación completada para candidato ID: " + candidatoId;
        kafkaTemplate.send("evaluacion-eventos", mensaje);
        System.out.println("Evento enviado: " + mensaje);
    }

    public CandidatoDTO validarCandidato(Long id) {
        return candidatoClient.obtenerCandidato(id);
    }

    public List<EvaluacionDTO> obtenerEvaluaciones() {
        return evaluacionRepository.findAll().stream()
                .map(ev -> new EvaluacionDTO(
                        ev.getId(), ev.getCandidatoId(), ev.getTipoEvaluacion(),
                        ev.getPuntaje(), ev.getEstado(), ev.getFechaEvaluacion()))
                .collect(Collectors.toList());
    }

    public EvaluacionDTO registrarEvaluacion(EvaluacionDTO dto) {
        Evaluacion evaluacion = new Evaluacion(null, dto.getCandidatoId(), dto.getTipoEvaluacion(),
                dto.getPuntaje(), "PENDIENTE", LocalDate.now());
        Evaluacion nuevaEvaluacion = evaluacionRepository.save(evaluacion);
        return new EvaluacionDTO(nuevaEvaluacion.getId(), nuevaEvaluacion.getCandidatoId(),
                nuevaEvaluacion.getTipoEvaluacion(), nuevaEvaluacion.getPuntaje(),
                nuevaEvaluacion.getEstado(), nuevaEvaluacion.getFechaEvaluacion());
    }
}
