package com.amandaLinger.notasFiscais.repository;

import com.amandaLinger.notasFiscais.model.ItemNotaFiscalModel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ItemNotaFiscalRepository extends JpaRepository<ItemNotaFiscalModel, Long> {
}
