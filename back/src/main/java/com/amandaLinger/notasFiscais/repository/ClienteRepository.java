package com.amandaLinger.notasFiscais.repository;

import com.amandaLinger.notasFiscais.model.ClienteModel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ClienteRepository extends JpaRepository<ClienteModel, Long> {
    Optional<ClienteModel> findByCodigo(Long codigo);

    Optional<ClienteModel> findById(Long id);
}
