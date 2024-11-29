import { API_ENDPOINTS } from './config.js';

// Função para buscar dados da API e preencher a tabela
async function fetchPaoDeMelData() {
    try {
        const response = await fetch(API_ENDPOINTS.PAO_DE_MEL.GET_ALL);
        if (!response.ok) throw new Error('Erro ao carregar dados');
        const data = await response.json();

        const tableBody = document.getElementById('data-table-body');
        tableBody.innerHTML = ''; // Limpar conteúdo anterior

        data.forEach(item => {
            const row = `
                <tr>
                    <td>${item.sabor}</td>
                    <td>${item.quantidade}</td>
                    <td>R$ ${item.preco_custo.toFixed(2)}</td>
                    <td>R$ ${item.preco_venda.toFixed(2)}</td>
                    <td><input type="number" class="form-control" id="quantidade-${item.id}" value="0" min="0"></td>
                    <td><input type="text" class="form-control" id="retorno-${item.id}" readonly></td>
                    <td><button class="btn btn-primary calcular-btn" data-id="${item.id}">Calcular</button></td>
                </tr>
            `;
            tableBody.innerHTML += row;
        });

        // Adicionar DataTables para formatação
        $('#sales-table').DataTable({
            responsive: true,
            language: {
                url: '//cdn.datatables.net/plug-ins/1.13.5/i18n/pt-BR.json',
            },
        });

        // Adicionar evento de clique aos botões "Calcular"
        document.querySelectorAll('.calcular-btn').forEach(button => {
            button.addEventListener('click', () => calcular(button.dataset.id));
        });
    } catch (error) {
        console.error('Erro ao carregar os dados:', error);
        alert('Erro ao carregar os dados da tabela. Verifique sua conexão.');
    }
}

// Função para calcular retorno e enviar dados para o backend
async function calcular(itemId) {
    const quantidade = parseFloat(document.getElementById(`quantidade-${itemId}`).value);
    const precoCusto = parseFloat(document.getElementById(`preco-custo-${itemId}`).value) || 0;
    const precoVenda = parseFloat(document.getElementById(`preco-venda-${itemId}`).value) || 0;

    if (!quantidade || precoCusto < 0 || precoVenda <= 0) {
        alert('Preencha todos os campos corretamente.');
        return;
    }

    const data = {
        quantidade_vendida: quantidade,
        preco_custo: precoCusto,
        preco_venda: precoVenda,
    };

    try {
        const response = await fetch(API_ENDPOINTS.CALCULATE, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        if (!response.ok) throw new Error('Erro ao calcular retorno');
        const result = await response.json();

        const retornoInput = document.getElementById(`retorno-${itemId}`);
        retornoInput.value = `R$ ${result.retorno.toFixed(2)}`;
    } catch (error) {
        console.error('Erro ao calcular retorno:', error);
        alert('Erro ao calcular o retorno. Tente novamente.');
    }
}

// Inicializar a página ao carregar
document.addEventListener('DOMContentLoaded', fetchPaoDeMelData);
