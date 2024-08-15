//formatando dados de preco e valor

export const dateFormatter = new Intl.DateTimeFormat('pt-BR');

export const priceFormatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
});