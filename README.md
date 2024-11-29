```markdown
# BizBalance Frontend

O BizBalance Frontend é a interface visual do sistema BizBalance, projetada para gerenciar finanças e fluxo de caixa com funcionalidades específicas para a gestão de produtos da Sonho de Mel. Este projeto foi desenvolvido utilizando HTML, CSS, JavaScript e bibliotecas modernas para oferecer uma experiência de usuário interativa e responsiva.

---

## **Funcionalidades**
- Exibição de tabelas dinâmicas para produtos cadastrados.
- Integração com a API do backend para listar, calcular e gerenciar dados.
- Interface intuitiva e responsiva com suporte a dispositivos móveis.
- Funcionalidade para cálculo de retornos financeiros diretamente pela interface.

---

## **Tecnologias Utilizadas**
- **HTML5**, **CSS3** e **JavaScript (ES6)**.
- **Bibliotecas**:
  - [Bootstrap](https://getbootstrap.com/) para estilos e responsividade.
  - [DataTables](https://datatables.net/) para formatação avançada de tabelas.
- **Ferramentas de Desenvolvimento**:
  - [Live Server](https://github.com/ritwickdey/vscode-live-server) ou [http-server](https://www.npmjs.com/package/http-server) para desenvolvimento local.
  - Arquitetura baseada em módulos ES6.

---

## **Pré-requisitos**
Certifique-se de ter os seguintes itens instalados no sistema:
- **Node.js** (opcional, se quiser usar o `http-server`).
- **Browser moderno** compatível com ES6 (como Chrome, Firefox ou Edge).

---

## **Configuração e Execução**

### **Passo 1: Clone o Repositório**
```bash
git clone git@github.com:lucasouzape/BizBalance_frontend.git
cd BizBalance_frontend
```

### **Passo 2: Configurar Integração com o Backend**
Certifique-se de que o arquivo `config.js` contém a URL correta da API do backend:
```javascript
export const API_ENDPOINTS = {
    PAO_DE_MEL: {
        GET_ALL: "http://localhost:8080/api/pao_de_mel",
        ADD: "http://localhost:8080/api/pao_de_mel/add"
    },
    CALCULATE: "http://localhost:8080/api/calculate"
};
```

### **Passo 3: Iniciar o Frontend**
Escolha uma das opções abaixo para iniciar o frontend:

#### Opção 1: Usando o `http-server` (recomendado)
1. Instale o `http-server` (caso ainda não esteja instalado):
   ```bash
   npm install -g http-server
   ```
2. Inicie o servidor local:
   ```bash
   http-server . -p 5500
   ```
3. Acesse a aplicação no navegador:
   ```
   http://localhost:5500
   ```

#### Opção 2: Usando o Live Server no VS Code
1. Instale a extensão **Live Server** no VS Code.
2. Clique com o botão direito no arquivo `index.html` e selecione **"Open with Live Server"**.
3. A aplicação será aberta no navegador.

---

## **Estrutura de Arquivos**
```
BizBalance_frontend/
├── assets/                     # Arquivos estáticos (CSS, JS e imagens)
│   ├── bootstrap/              # Arquivos do Bootstrap
│   ├── css/                    # Estilos customizados
│   ├── fonts/                  # Fontes utilizadas no projeto
│   ├── js/                     # Scripts adicionais (opcional)
├── index.html                  # Página inicial (Dashboard)
├── table.html                  # Página de tabela dinâmica (Produtos)
├── config.js                   # Configuração de URLs da API
├── table.js                    # Script para gerenciamento da tabela de produtos
```

---

## **Endpoints Gerenciados**
O frontend consome os seguintes endpoints fornecidos pelo backend:

- **GET /api/pao_de_mel**: Lista todos os produtos cadastrados.
- **POST /api/pao_de_mel/add**: Adiciona um novo produto.
- **POST /api/calculate**: Realiza o cálculo de retorno financeiro.

---

## **Uso**
### **Tabela de Produtos**
1. Acesse a página `table.html` para visualizar os produtos cadastrados.
2. Os dados serão carregados automaticamente ao abrir a página.
3. Utilize os campos de entrada para calcular o retorno financeiro:
   - Preencha os valores de "quantidade vendida", "preço de custo" e "preço de venda".
   - Clique no botão **"Calcular"** para obter o retorno.

---

## **Testes**
### **Backend Conectado**
- Certifique-se de que o backend está rodando localmente e acessível em `http://localhost:8080`.

### **Validação**
1. Verifique no navegador se os dados da API são carregados corretamente na tabela.
2. Realize cálculos de retorno clicando nos botões da tabela.
3. Confira se os valores calculados aparecem corretamente no campo "Retorno".

---

## **Contribuições**
Contribuições são bem-vindas! Sinta-se à vontade para abrir um pull request ou relatar problemas na página de issues do repositório.

---

## **Licença**
Este projeto está licenciado sob os termos da licença MIT. Consulte o arquivo `LICENSE` para mais detalhes.
```