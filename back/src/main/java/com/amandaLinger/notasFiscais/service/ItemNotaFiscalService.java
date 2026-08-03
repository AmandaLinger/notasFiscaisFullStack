package com.amandaLinger.notasFiscais.service;

import com.amandaLinger.notasFiscais.repository.ItemNotaFiscalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ItemNotaFiscalService {

    @Autowired
    private ItemNotaFiscalRepository itemNotaFiscalRepository;


}
