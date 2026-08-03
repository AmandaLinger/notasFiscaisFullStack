package com.amandaLinger.notasFiscais.repository;

import com.amandaLinger.notasFiscais.dto.ProdutoDto;
import com.amandaLinger.notasFiscais.dto.ProdutoDto4Construtores;
import com.amandaLinger.notasFiscais.model.ProdutoModel;
import jakarta.validation.constraints.NotNull;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;


public interface ProdutoRepository extends JpaRepository<ProdutoModel,Long> {
    Optional<ProdutoModel> findByNome(String nome);

    Double findByPreco(@NotNull Long produtoId);
}
