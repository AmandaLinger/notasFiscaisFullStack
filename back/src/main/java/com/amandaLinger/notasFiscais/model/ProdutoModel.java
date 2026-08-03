package com.amandaLinger.notasFiscais.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.math.BigDecimal;

@Entity(name = "Produto")
@Table(name = "produto")
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProdutoModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    private String nome;

    @NotNull
    private BigDecimal preco;

    private String descricao;
}
