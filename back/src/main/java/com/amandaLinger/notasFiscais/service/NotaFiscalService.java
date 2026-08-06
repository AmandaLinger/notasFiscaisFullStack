package com.amandaLinger.notasFiscais.service;

import com.amandaLinger.notasFiscais.ValidacaoException;
import com.amandaLinger.notasFiscais.dto.ItemNotaFiscalDto;
import com.amandaLinger.notasFiscais.dto.NotaFiscalDto;
import com.amandaLinger.notasFiscais.dto.NotaFiscalDtoFinal;
import com.amandaLinger.notasFiscais.model.ClienteModel;
import com.amandaLinger.notasFiscais.model.ItemNotaFiscalModel;
import com.amandaLinger.notasFiscais.model.NotaFiscalModel;
import com.amandaLinger.notasFiscais.model.ProdutoModel;
import com.amandaLinger.notasFiscais.repository.ClienteRepository;
import com.amandaLinger.notasFiscais.repository.ItemNotaFiscalRepository;
import com.amandaLinger.notasFiscais.repository.NotaFiscalRepository;
import com.amandaLinger.notasFiscais.repository.ProdutoRepository;
import jakarta.validation.constraints.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Service
public class NotaFiscalService {

    @Autowired
    private NotaFiscalRepository notaFiscalRepository;

    @Autowired
    private ItemNotaFiscalRepository itemNotaFiscalRepository;

    @Autowired
    private ClienteRepository clienteRepository;

    @Autowired
    private ProdutoRepository produtoRepository;


    public void createNotaFiscal(NotaFiscalDto notaFiscalDto) {
        NotaFiscalModel notaFiscal = new NotaFiscalModel();
        ClienteModel cliente = clienteRepository.findByCodigo(
                        Long.valueOf(notaFiscalDto.getCodigoCliente()))
                .orElseThrow(() -> new ValidacaoException("Cliente não encontrado"));

        validaCodigoNota(notaFiscalDto, notaFiscal);

        notaFiscal.setData(notaFiscalDto.getData());

        for (ItemNotaFiscalDto itemDto : notaFiscalDto.getItens()) {
            ItemNotaFiscalModel item = new ItemNotaFiscalModel();

            ProdutoModel produto = produtoRepository.findById(itemDto.getProdutoId())
                    .orElseThrow(() -> new ValidacaoException("Produto não encontrado"));

            item.setQuantidade(itemDto.getQuantidade());
            item.setProduto(produto);
            item.setPrecoUnitario(produto.getPreco());
            item.setNotaFiscal(notaFiscal);
            notaFiscal.getItens().add(item);

//            diminuiQuantidadePosCompra(itemDto);
        }
        notaFiscal.setCliente(cliente);

        notaFiscalRepository.save(notaFiscal);
    }


//    //diminuindo quantidade de produto após compra
//    public void diminuiQuantidadePosCompra(ItemNotaFiscalDto itemNotaFiscalDto) {
//        ProdutoModel produto = produtoRepository.findById(itemNotaFiscalDto.getProdutoId())
//                .orElseThrow(() -> new ValidacaoException("produto não encontrado"));
//
//        if(produto.getQuantidade().compareTo(itemNotaFiscalDto.getQuantidade()) < 0){
//            throw new ValidacaoException("Estoque insuficiente");
//        }
//
//        produto.setQuantidade(produto.getQuantidade().min(itemNotaFiscalDto.getQuantidade()));
//    }

    //validando codigo nota fiscal
    public void validaCodigoNota(NotaFiscalDto notaFiscalDto, NotaFiscalModel notaFiscal) {
        NotaFiscalModel numeroNota = notaFiscalRepository.findById(notaFiscalDto.getNumeroNotaFiscal())
                .orElse(null);
        if(numeroNota != null) {
            throw new ValidacaoException("Outra nota já cadastrada com esse número");
        } else {
            notaFiscal.setNumeroNotaFiscal(notaFiscalDto.getNumeroNotaFiscal());
        }
    }

    @Transactional
    public void deleteNota(Long id) {
        notaFiscalRepository.deleteById(id);
    }

    @Transactional
    public void updateNota(Long id, NotaFiscalDto notaFiscalDto) {

        NotaFiscalModel notaFiscal = notaFiscalRepository.findById(id)
                .orElseThrow(() -> new ValidacaoException("Nota não encontrada"));

        notaFiscal.setNumeroNotaFiscal(notaFiscalDto.getNumeroNotaFiscal());
        notaFiscal.setData(notaFiscalDto.getData());

        ClienteModel cliente = clienteRepository
                .findByCodigo(notaFiscalDto.getCodigoCliente())
                        .orElseThrow(() -> new ValidacaoException(("Cliente não encontrado")));

        notaFiscal.setCliente(cliente);


        notaFiscal.getItens().clear();

        for(ItemNotaFiscalDto itemDto : notaFiscalDto.getItens()) {
            ProdutoModel produto = produtoRepository.findById(itemDto.getProdutoId())
                    .orElseThrow(() -> new ValidacaoException("Produto não encontrado"));

            ItemNotaFiscalModel item = new ItemNotaFiscalModel();


            item.setProduto(produto);
            item.setQuantidade(itemDto.getQuantidade());
            item.setPrecoUnitario(produto.getPreco());
            item.setNotaFiscal(notaFiscal);

            notaFiscal.getItens().add(item);
        }

        notaFiscalRepository.save(notaFiscal);
    }

    public NotaFiscalDtoFinal findById(Long id) {

        NotaFiscalModel nota = notaFiscalRepository.findById(id)
                .orElseThrow(() -> new ValidacaoException("Nota fiscal não encontrada"));

        return paraDto(nota);
    }



    //função para metodo de listar todas notas fiscais
    public List<NotaFiscalModel> findAllNotaFiscal() {
        return listarNotas();
    }

    public List<NotaFiscalModel> listarNotas() {
        return notaFiscalRepository.findAll()
                .stream()
                .toList();
    }
    private NotaFiscalDtoFinal paraDto(NotaFiscalModel nota) {

        NotaFiscalDtoFinal dto = new NotaFiscalDtoFinal();

        dto.setNumeroNotaFiscal(nota.getNumeroNotaFiscal());
        dto.setData(nota.getData());
        dto.setCodigoCliente(nota.getCliente().getCodigo());
        dto.setValorTotal(nota.getPrecoTotal());

        // Converte os itens
        List<ItemNotaFiscalDto> itens = nota.getItens()
                .stream()
                .map(this::paraItemDto)
                .toList();

        dto.setItens(itens);

        return dto;
    }

    private ItemNotaFiscalDto paraItemDto(ItemNotaFiscalModel item) {

        ItemNotaFiscalDto dto = new ItemNotaFiscalDto();

        dto.setQuantidade(item.getQuantidade());
        dto.setProdutoId(item.getProduto().getId());
        dto.setPrecoUnitario(item.getPrecoUnitario());

        return dto;
    }


}
