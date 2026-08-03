<h1>📑​ Sistema back-end de notas fiscais</h1>
</br>
<h2>API REST desenvolvida em Java com Spring Boot para gerenciamento de clientes, produtos e notas fiscais.</h2>
</br>
<h3>Tecnologias utilizadas:</h3>
<p>⛏️​ Java 21</p>
<p>⛏️​ Spring Boot</p>
<p>⛏️​ Spring Data JPA</p>
<p>⛏️​ Lombok</p>
<p>⛏️​ PostgreSql</p>
<p>⛏️​ Docker</p>
<p>⛏️​ Maven</p>
<p>⛏️​ Postman</p>
</br>
<h3>Regras de negócio</h3>
<P> O código do cliente deve ser único.</P>
<P> O número da nota fiscal deve ser único.</P>
<p> Não é possível emitir nota para cliente inexistente.</p> 
<p> O estoque do produto é atualizado após a emissão da nota. (comentado)</p> 
<p> O valor total da nota é calculado automaticamente com base nos itens.</p> 
</br>
<h3>Estrutura do projeto</h3>
<h4>Controller
    ➡️​
    Service
   ➡️​
    Repository
   ➡️​
    PostgreSQL</h4>
</br>
<h2>Modelos Json para requisições:</h2>
<h3>👤​ Cliente</h3>
<h4>POST de cliente:</h4>
<p>http://localhost:8080/cliente</p>
<p>Body: {
    "nome": "Julia",
    "codigo": 5
}</p>

<h4>GET ALL de clientes:</h4>
<p>http://localhost:8080/cliente</p>

<h4>GET cliente específico:</h4>
<p>http://localhost:8080/cliente/1</p>

<h4>PUT de cliente:</h4>
<p>http://localhost:8080/cliente</p>
<p>Body: {
    "nome": "amanda marques",
    "codigo": 225
}</p>

<h4>DELETE de cliente:</h4>
<p>http://localhost:8080/cliente/1</p>
</br>
</br>
<h3>💻​ Produto</h3>
<h4>POST de produto:</h4>
<p>http://localhost:8080/produto</p>
<p>Body: {
    "nome": "nokia 2010",
    "preco": 700.00,
    "descricao": "Alta capacidade de bateria"
}</p>

<h4>GET ALL de produtos:</h4>
<p>http://localhost:8080/produto</p>

<h4>GET produto específico:</h4>
<p>http://localhost:8080/produto/1</p>

<h4>PUT de produto:</h4>
<p>http://localhost:8080/produto/1</p>
<p>Body: {
        "nome": "samsung s21",
        "preco": 1700.99,
        "descricao": "celular última geração 8GB RAM"
}</p>

<h4>DELETE de produto:</h4>
<p>http://localhost:8080/produto/1</p>
</br>
</br>
<h3>📑​ Nota Fiscal</h3>
<h4>POST de nota fiscal:</h4>
<p>http://localhost:8080/notaFiscal</p>
<p>Body: {
  "numeroNotaFiscal": 215,
  "codigoCliente": 2,
  "itens": [
    {
      "produtoId": 6,
      "quantidade": 2
    }
  ]
}</p>

<h4>GET ALL de nota fiscal:</h4>
<p>http://localhost:8080/notaFiscal</p>

<h4>GET nota fiscal específica:</h4>
<p>http://localhost:8080/notaFiscal/1</p>

<h4>PUT de nota fiscal:</h4>
<p>http://localhost:8080/notaFiscal/1</p>
<p>Body: [
  {
    "produtoId": 9,
    "quantidade": 2,
    "precoUnitario": 1518.00
  }]</p>

<h4>DELETE de nota fiscal:</h4>
<p>http://localhost:8080/notaFiscal/1</p>
