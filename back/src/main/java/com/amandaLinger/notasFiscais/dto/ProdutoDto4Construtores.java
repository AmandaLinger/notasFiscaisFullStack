package com.amandaLinger.notasFiscais.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.math.BigDecimal;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@Builder
public class ProdutoDto4Construtores {
    @NotBlank
    private String nome;

    @NotNull
    private BigDecimal preco;

    private String descricao;

//    @NotNull
//    private BigDecimal quantidade;
}
