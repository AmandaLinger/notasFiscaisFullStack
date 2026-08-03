package com.amandaLinger.notasFiscais.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity(name = "PerfilModel")
@Table(name = "perfil_model")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class PerfilModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    private String nome;

    @NotBlank
    private String senha;
}
