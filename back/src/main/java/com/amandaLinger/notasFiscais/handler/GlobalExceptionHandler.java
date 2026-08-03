package com.amandaLinger.notasFiscais.handler;

import com.amandaLinger.notasFiscais.ValidacaoException;
import com.amandaLinger.notasFiscais.dto.RespostaErroDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.stream.Collectors;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ValidacaoException.class)
    public ResponseEntity<RespostaErroDto> handleValidacaoException(
            ValidacaoException ex) {

        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(new RespostaErroDto(
                        ex.getMessage(),
                        HttpStatus.NOT_FOUND.value()
                ));
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<RespostaErroDto> handleValidationException(
            MethodArgumentNotValidException ex) {
        String mensagem = ex.getBindingResult().getFieldErrors()
                .stream()
                .map(error -> error.getField() + ": " + error.getDefaultMessage())
                .collect(Collectors.joining("; "));

        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(new RespostaErroDto(
                        mensagem.isEmpty() ? "Erro de validação nos dados enviados" : mensagem,
                        HttpStatus.BAD_REQUEST.value()
                ));
    }
}
