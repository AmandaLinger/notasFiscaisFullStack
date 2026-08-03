package com.amandaLinger.notasFiscais.dto;

import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.math.BigDecimal;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@Builder
public class ItemNotaFiscalDto {

    @NotNull
    private Long produtoId;
    @NotNull
    private BigDecimal quantidade;

    @NotNull
    private BigDecimal precoUnitario;

}
