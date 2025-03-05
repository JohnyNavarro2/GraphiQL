package com.serviciorequisicion.servicio_requisicion.presentacion.graphql;

import com.serviciorequisicion.servicio_requisicion.aplicacion.dto.RequisicionDTO;
import com.serviciorequisicion.servicio_requisicion.aplicacion.service.RequisicionService;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;

import java.util.List;

@Controller
public class RequisicionGraphQL {

    private final RequisicionService requisicionService;

    public RequisicionGraphQL(RequisicionService requisicionService) {
        this.requisicionService = requisicionService;
    }

    @QueryMapping
    public List<RequisicionDTO> requisiciones() {
        return requisicionService.obtenerRequisiciones();
    }

    @MutationMapping
    public RequisicionDTO crearRequisicion(@Argument("input") RequisicionDTO input) {
        return requisicionService.crearRequisicion(input);
    }

    @MutationMapping
    public RequisicionDTO actualizarEstadoRequisicion(@Argument Long id, @Argument String estado) {
        return requisicionService.actualizarEstado(id, estado);
    }

}
