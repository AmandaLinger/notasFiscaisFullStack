package com.amandaLinger.notasFiscais.dto;

import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@Builder
public class RespostaErroDto {
    private String mensagem;
    private Integer status;
}
