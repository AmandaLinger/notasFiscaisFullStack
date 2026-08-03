package com.amandaLinger.notasFiscais.service;

import com.amandaLinger.notasFiscais.ValidacaoException;
import com.amandaLinger.notasFiscais.dto.ProdutoDto;
import com.amandaLinger.notasFiscais.dto.ProdutoDto4Construtores;
import com.amandaLinger.notasFiscais.model.ProdutoModel;
import com.amandaLinger.notasFiscais.repository.ProdutoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.annotation.Validated;

import java.util.List;

@Service
@Validated
public class ProdutoService {

    @Autowired
    private ProdutoRepository produtoRepository;

    public void createProduto(ProdutoDto produtoDto){
        ProdutoModel produto = produtoRepository.findByNome(produtoDto.getNome())
                .orElse(null);

        if(produto != null){
            throw new ValidacaoException("Produto já existente com esse nome.");
        }

        produto = ProdutoModel.builder()
                .nome(produtoDto.getNome())
                .preco(produtoDto.getPreco())
                .descricao(produtoDto.getDescricao())
                .build();

        produtoRepository.save(produto);
    }

    public List<ProdutoModel> getAllProdutos() {

        List<ProdutoModel> produtos = produtoRepository.findAll();

        if(produtos.isEmpty()){
            throw new ValidacaoException("Nenhum produto encontrado.");
        } else {
            return produtos;
        }
    }

    @Transactional
    public void deleteProduto(Long id) {
        ProdutoModel produto = produtoRepository.findById(id)
                .orElse(null);
        if(produto == null){
            throw new ValidacaoException("Produto não encontrado");
        }

        produtoRepository.deleteById(id);
    }

    @Transactional
    public void updateProduto(Long id, ProdutoDto4Construtores produtoDto4Construtores){
        ProdutoModel produto = produtoRepository.findById(id)
                .orElseThrow(() -> new ValidacaoException("Produto não encontrado"));

        ProdutoModel produtoExistente = produtoRepository.findByNome(produtoDto4Construtores.getNome())
                .orElse(null);

        if(produtoExistente != null && !produtoExistente.getId().equals(id)){
            throw new ValidacaoException("Já existe outro produto com esse nome");
        }

        produto.setNome(produtoDto4Construtores.getNome());
        produto.setPreco(produtoDto4Construtores.getPreco());
        produto.setDescricao(produtoDto4Construtores.getDescricao());
    }

    public ProdutoModel getProduto(Long id) {
        ProdutoModel produto = produtoRepository.findById(id)
                .orElse(null);

        if(produto == null){
            throw new ValidacaoException("Produto não encontrado");
        }

        return produto;
    }
}
