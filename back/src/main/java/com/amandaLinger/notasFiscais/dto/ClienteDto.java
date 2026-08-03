package com.amandaLinger.notasFiscais.dto;


import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@Builder
public class ClienteDto{
    @NotBlank(message = "Nome obrigatório")
    String nome;

    @NotNull(message = "Código obrigatório")
    Long codigo;

}
