package com.amandaLinger.notasFiscais.dto;

import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@Builder
public class NotaFiscalDtoFinal {
    @NotNull
    private Long numeroNotaFiscal;

    private LocalDate data = LocalDate.now();

    @NotNull
    private Long codigoCliente;

    private List<ItemNotaFiscalDto> itens;

    private BigDecimal valorTotal;
}
