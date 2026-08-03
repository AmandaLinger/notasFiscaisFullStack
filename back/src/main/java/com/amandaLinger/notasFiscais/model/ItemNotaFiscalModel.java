package com.amandaLinger.notasFiscais.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.math.BigDecimal;

@Entity
@Table(name = "item_nota_fiscal")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ItemNotaFiscalModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private BigDecimal quantidade;

    private BigDecimal precoUnitario;

    @ManyToOne
    @JoinColumn(name = "produto_id")
    private ProdutoModel produto;

    @ManyToOne
    @JoinColumn(name = "nota_fiscal_id")
    @JsonBackReference
    private NotaFiscalModel notaFiscal;


}
