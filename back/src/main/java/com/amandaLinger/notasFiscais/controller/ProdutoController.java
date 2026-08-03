package com.amandaLinger.notasFiscais.controller;

import com.amandaLinger.notasFiscais.dto.ProdutoDto;
import com.amandaLinger.notasFiscais.dto.ProdutoDto4Construtores;
import com.amandaLinger.notasFiscais.model.ProdutoModel;
import com.amandaLinger.notasFiscais.service.ProdutoService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/produto")
@CrossOrigin(origins = "http://localhost:4200")
@Validated
public class ProdutoController {
    @Autowired
    private ProdutoService produtoService;

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<ProdutoModel> listarTodosProdutos(){
        return produtoService.getAllProdutos();
    }

    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public ProdutoModel listaProduto(@PathVariable Long id){
        return produtoService.getProduto(id);
    }

    @PostMapping
    public ResponseEntity cadastrarProduto(@RequestBody @Valid ProdutoDto produtoDto){
        produtoService.createProduto(produtoDto);
        return  ResponseEntity.status(HttpStatus.CREATED).body(produtoDto);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public ResponseEntity deleteProduto(@PathVariable Long id){
        try {
            produtoService.deleteProduto(id);
            return ResponseEntity.noContent().build();
        } catch (DataIntegrityViolationException e) {
            return ResponseEntity
                    .status(HttpStatus.CONFLICT)
                    .body("Não é possível excluir o produto pois ele está vinculado a uma nota fiscal.");
        }
    }

    @PutMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity atualizarProduto(@PathVariable Long id,
                                   @RequestBody @Valid  ProdutoDto4Construtores produtoDto4construtores){
        produtoService.updateProduto(id, produtoDto4construtores);

        return ResponseEntity.status(HttpStatus.OK)
                .body(produtoDto4construtores);
    }
}
