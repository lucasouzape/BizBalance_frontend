import { API_ENDPOINTS } from './config.js';

async function fetchDashboardData() {
    try {
        console.log('Iniciando a requisição ao backend...');
        const response = await fetch(API_ENDPOINTS.PAO_DE_MEL.GET_ALL);
        if (!response.ok) throw new Error('Erro ao buscar dados do backend');

        const data = await response.json();
        console.log('Dados recebidos do backend:', data);

        // Filtrar dados inválidos
        const validData = data.filter(item => {
            const isPrecoValido = item.preco_venda > 0;
            const isQuantidadeValida = item.quantidade > 0;
            const isValidadeValida = item.validade && item.validade !== "0001-01-01T00:00:00Z";

            return isPrecoValido && isQuantidadeValida && isValidadeValida;
        });

        console.log('Dados filtrados:', validData);

        // Agrupar dados por sabor
        const groupedData = groupByFlavor(validData);
        console.log('Dados agrupados por sabor:', groupedData);

        // Atualiza os valores dos cards
        const totalAnual = validData.reduce((acc, item) => acc + item.preco_venda * item.quantidade, 0);
        const totalMensal = totalAnual / 12;

        document.getElementById('anual').innerText = `R$${totalAnual.toFixed(2)}`;
        document.getElementById('mensal').innerText = `R$${totalMensal.toFixed(2)}`;

        // Renderiza os gráficos
        renderLineChart(groupedData, document.getElementById('lineChart'));
        renderDoughnutChart(groupedData, document.getElementById('doughnutChart'));

        // Atualiza o container dinâmico com dados
        renderDataContainer(validData, document.getElementById('data-container'));
    } catch (error) {
        console.error('Erro ao carregar dados:', error);
    }
}

// Agrupa os dados por sabor e soma as quantidades e totais
function groupByFlavor(data) {
    const grouped = {};
    data.forEach(item => {
        if (!grouped[item.sabor]) {
            grouped[item.sabor] = {
                sabor: item.sabor,
                quantidade: item.quantidade,
                totalVenda: item.preco_venda * item.quantidade,
            };
        } else {
            grouped[item.sabor].quantidade += item.quantidade;
            grouped[item.sabor].totalVenda += item.preco_venda * item.quantidade;
        }
    });
    return Object.values(grouped);
}

// Renderiza o gráfico de linha
function renderLineChart(data, canvas) {
    if (!canvas) {
        console.error('Canvas para o gráfico de linha não encontrado.');
        return;
    }

    const labels = data.map(item => item.sabor);
    const values = data.map(item => item.totalVenda);

    const ctx = canvas.getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Vendas Totais (R$)',
                data: values,
                backgroundColor: 'rgba(78, 115, 223, 0.1)',
                borderColor: 'rgba(78, 115, 223, 1)',
                borderWidth: 2,
                fill: true
            }]
        },
        options: {
            maintainAspectRatio: false,
            responsive: true,
            plugins: {
                legend: { display: true, position: 'top' }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Renderiza o gráfico de pizza
function renderDoughnutChart(data, canvas) {
    if (!canvas) {
        console.error('Canvas para o gráfico de pizza não encontrado.');
        return;
    }

    const labels = data.map(item => item.sabor);
    const values = data.map(item => item.quantidade);

    const ctx = canvas.getContext('2d');
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: labels,
            datasets: [{
                data: values,
                backgroundColor: [
                    '#4e73df', '#1cc88a', '#36b9cc', '#ffce56', '#e74a3b', 
                    '#8e44ad', '#2ecc71', '#f1c40f', '#3498db', '#e67e22', 
                    '#e84393', '#2c3e50', '#95a5a6'
                ],
                hoverBackgroundColor: [
                    '#2e59d9', '#17a673', '#2c9faf', '#ffa500', '#d63031', 
                    '#732d91', '#27ae60', '#d4ac0d', '#2a80b9', '#d35400', 
                    '#c1395e', '#1a242f', '#7f8c8d'
                ]
                
            }]
        },
        options: {
            maintainAspectRatio: false,
            responsive: true,
            plugins: {
                legend: { display: true, position: 'bottom' }
            }
        }
    });
}

// Renderiza os dados no container dinâmico
function renderDataContainer(data, container) {
    if (!container) {
        console.error('Container de dados não encontrado.');
        return;
    }

    container.innerHTML = ''; // Limpa o conteúdo anterior

    data.forEach(item => {
        const card = `
            <div class="col-md-4 mb-4">
                <div class="card shadow">
                    <div class="card-header text-center"><strong>${item.sabor}</strong></div>
                    <div class="card-body">
                        <p>Quantidade: ${item.quantidade}</p>
                        <p>Preço de Custo: R$${item.preco_custo.toFixed(2)}</p>
                        <p>Preço de Venda: R$${item.preco_venda.toFixed(2)}</p>
                        <p>Validade: ${new Date(item.validade).toLocaleDateString()}</p>
                    </div>
                </div>
            </div>`;
        container.innerHTML += card;
    });
}

// Carrega os dados ao iniciar
window.addEventListener('DOMContentLoaded', fetchDashboardData);
