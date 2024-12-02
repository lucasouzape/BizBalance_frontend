/**
 * Obtém a URL base da API com suporte a diferentes ambientes (desenvolvimento ou produção).
 * @returns {string} URL base da API.
 */
const getApiBaseUrl = () => {
    // Use uma verificação baseada na URL do documento
    const isProduction = window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1';
    
    if (isProduction) {
        return "https://api.bizbalance.com/api"; // URL para produção
    }
    return "http://localhost:8080/api"; // URL para desenvolvimento
};

/**
 * URL base da API, definida dinamicamente com base no ambiente.
 */
export const API_BASE_URL = getApiBaseUrl();

/**
 * Endpoints organizados para acesso ao backend.
 */
export const API_ENDPOINTS = {
    PAO_DE_MEL: {
        GET_ALL: `${API_BASE_URL}/pao_de_mel`, // Endpoint para listar todos os itens
        ADD: `${API_BASE_URL}/pao_de_mel/add`, // Endpoint para adicionar um novo item
    },
    CALCULATE: {
        POST: `${API_BASE_URL}/calculate`, // Endpoint para realizar cálculos
    },
};

/**
 * Função para logar os endpoints atuais (apenas em desenvolvimento).
 */
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    console.log("API Base URL:", API_BASE_URL);
    console.log("API Endpoints:", API_ENDPOINTS);
}
