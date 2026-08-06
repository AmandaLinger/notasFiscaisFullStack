package com.amandaLinger.notasFiscais.controller;

import com.amandaLinger.notasFiscais.dto.ItemNotaFiscalDto;
import com.amandaLinger.notasFiscais.dto.NotaFiscalDto;
import com.amandaLinger.notasFiscais.dto.NotaFiscalDtoFinal;
import com.amandaLinger.notasFiscais.model.NotaFiscalModel;
import com.amandaLinger.notasFiscais.service.NotaFiscalService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/notaFiscal")
@CrossOrigin(origins = "http://localhost:4200")
public class NotaFiscalController {

    @Autowired
    private NotaFiscalService  notaFiscalService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity createNotaFiscal(@RequestBody @Valid NotaFiscalDto notaFiscalDto) {
        notaFiscalService.createNotaFiscal(notaFiscalDto);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(notaFiscalDto);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public ResponseEntity deleteNota(@PathVariable Long id){
        notaFiscalService.deleteNota(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity updateNota(@PathVariable Long id,@RequestBody @Valid NotaFiscalDto notaFiscalDto) {
        notaFiscalService.updateNota(id,notaFiscalDto);
        return ResponseEntity.status(HttpStatus.OK).body(notaFiscalDto);
    }

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<NotaFiscalModel> findAllNotaFiscal(){
        return notaFiscalService.findAllNotaFiscal();
    }

    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public NotaFiscalDtoFinal findNotaFiscal(@PathVariable Long id){
        return notaFiscalService.findById(id);
    }
}
