package com.amandaLinger.notasFiscais.controller;

import com.amandaLinger.notasFiscais.dto.ClienteDto;
import com.amandaLinger.notasFiscais.model.ClienteModel;
import com.amandaLinger.notasFiscais.service.ClienteService;
import jakarta.validation.Valid;
import org.apache.coyote.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/cliente")
@CrossOrigin(origins = "http://localhost:4200", methods = {
        RequestMethod.GET,
        RequestMethod.POST,
        RequestMethod.PUT,
        RequestMethod.DELETE,
        RequestMethod.OPTIONS
})
@Validated
public class ClienteController {

    @Autowired
    private ClienteService clienteService;

    @GetMapping
    public List<ClienteModel> listarTodosClientes(){
        return clienteService.getAllClientes();
    }

    @GetMapping("/{id}") //ok
    public ClienteModel listarCliente(@PathVariable Long id){
        return clienteService.getCliente(id);
    }

    @PostMapping //ok
    public ResponseEntity<ClienteDto> criandoCliente(@RequestBody @Valid ClienteDto clienteDto) throws BadRequestException {
        ClienteDto clienteCriado = clienteService.createCliente(clienteDto);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(clienteDto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity removerCliente(@PathVariable Long id){
        clienteService.deleteCliente(id);
        return  ResponseEntity
                .noContent().build();
    }

    @PutMapping("{id}")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity updateCliente(@PathVariable Long id, @RequestBody ClienteDto clienteDto){

        clienteService.updateCliente(id, clienteDto);
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(clienteDto);
    }

}
