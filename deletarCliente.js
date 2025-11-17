async function carregarClientes() {
    const response = await fetch('http://localhost:3000/cliente_matt360');
    const clientes = await response.json();

    let html = '<table><tr><th>CPF</th><th>Nome</th><th>Numero</th><th>Nascimento</th><th>Email</th><th>Ação</th></tr>';

    clientes.forEach(clientes => {
        html += `<tr id="clientes-${clientes.id}">
        <td>${clientes.cpf}</td>
        <td>${clientes.nome}</td>
        <td>${clientes.numero}</td>
        <td>${clientes.nascimento}</td>
        <td>${clientes.email}</td>
        <td><button class="btn-deletar" onclick="deletarClientes(${clientes.id})">🗑️</button></td>
        </tr>`;
    });

    html += '</table>';
    document.getElementById('tabelaClientes').innerHTML = html;
}

async function deletarVenda(id) {
    if (!confirm(`Excluir cliente ID ${id}?`)) return;

    await fetch(`http://localhost:3000/cliente_matt360/${id}`, { method: 'DELETE' });
    document.getElementById(`clientes-${id}`).remove();
}

window.onload = carregarClientes;
