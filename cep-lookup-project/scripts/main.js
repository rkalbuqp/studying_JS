document.getElementById('cep-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const cep = document.getElementById('cep-input').value.trim();
    const loader = document.getElementById('loader');
    const result = document.getElementById('result');
    const error = document.getElementById('error');

    // Limpa resultados anteriores
    result.innerHTML = '';
    error.style.display = 'none';

    // Validação do CEP
    if (!/^\d{8}$/.test(cep)) {
        error.innerHTML = 'Por favor, insira um CEP válido com 8 dígitos numéricos.';
        error.style.display = 'block';
        return;
    }

    // Exibe o loader
    loader.style.display = 'block';

    // Cria a requisição
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `https://viacep.com.br/ws/${cep}/json/`, true);

    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            // Esconde o loader
            loader.style.display = 'none';

            if (xhr.status === 200) {
                const response = JSON.parse(xhr.responseText);

                // Verifica se houve erro no retorno da API
                if (response.erro) {
                    error.innerHTML = 'CEP não encontrado. Por favor, tente outro.';
                    error.style.display = 'block';
                } else {
                    // Exibe os dados retornados
                    result.innerHTML = `
                        <p><strong>Cidade:</strong> ${response.localidade}</p>
                        <p><strong>Estado:</strong> ${response.uf}</p>
                        <p><strong>Rua:</strong> ${response.logradouro}</p>
                        <p><strong>Bairro:</strong> ${response.bairro}</p>
                    `;
                }
            } else {
                // Exibe mensagem de erro genérica
                error.innerHTML = 'Ocorreu um erro ao buscar o CEP. Por favor, tente novamente mais tarde.';
                error.style.display = 'block';
            }
        }
    };

    xhr.send();
});
