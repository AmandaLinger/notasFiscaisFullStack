package com.amandaLinger.notasFiscais.repository;

import com.amandaLinger.notasFiscais.dto.ItemNotaFiscalDto;
import com.amandaLinger.notasFiscais.dto.NotaFiscalDto;
import com.amandaLinger.notasFiscais.dto.NotaFiscalDtoFinal;
import com.amandaLinger.notasFiscais.model.NotaFiscalModel;
import jakarta.validation.constraints.NotNull;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface NotaFiscalRepository extends JpaRepository<NotaFiscalModel,Long> {

    Optional<NotaFiscalModel> findById(Long id);
}
