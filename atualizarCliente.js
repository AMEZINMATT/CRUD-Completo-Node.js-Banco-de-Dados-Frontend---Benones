let editandoId = null;

async function carregarClientes() {
    const response = await fetch('http://localhost:3000/cliente_matt360');
    const cliente = await response.json();

    let html = '<table><tr><th>CPF</th><th>Nome</th><th>Numero</th><th>Nascimento</th><th>Email</th></tr>';

    cliente.forEach(cliente => {
        const nascimento = cliente.nascimento.split('T')[0];
        html += `<tr id="cliente-${cliente.id}">
        <td>${cliente.id}</td>
        <td id="c-${cliente.id}-0">${cliente.cpf}</td>
        <td id="c-${cliente.id}-1">${cliente.nome}</td>
        <td id="c-${cliente.id}-2">${cliente.numero}</td>

        <td id="c-${cliente.id}-3" data-val="${nascimento}">${nascimento}</td>

        <td id="c-${cliente.id}-4">"${email}">${email}</td>
        <td><button class="btn-editar" onclick="editarVenda(${cliente.id})">✏️</button></td>
        </tr>`;
    });

    document.getElementById('tabelaClientes').innerHTML = html + '</table>';
}

function editarVenda(id) {
    if (editandoId) return alert('Salve ou cancele a edição atual primeiro!');

    editandoId = id;
    document.getElementById(`c-${id}-0`).innerHTML = `<input type="text" id="i-${id}-1" value="${document.getElementById(`c-${id}-1`).textContent}" step="0.01">`;
    document.getElementById(`c-${id}-1`).innerHTML = `<input type="text" id="i-${id}-1" value="${document.getElementById(`c-${id}-1`).textContent}" step="0.01">`;
    document.getElementById(`c-${id}-2`).innerHTML = `<input type="text" id="i-${id}-1" value="${document.getElementById(`c-${id}-1`).textContent}" step="0.01">`;
    document.getElementById(`c-${id}-3`).innerHTML = `<input type="date" id="i-${id}-3" value="${document.getElementById(`c-${id}-3`).getAttribute('data-val')}">`;
    document.getElementById(`c-${id}-4`).innerHTML = `<input type="email" id="i-${id}-1" value="${document.getElementById(`c-${id}-1`).textContent}" step="0.01">`;

    document.querySelector(`#cliente-${id} td:last-child`).innerHTML = `
        <button class="btn-salvar" onclick="salvarVenda(${id})">💾</button>
        <button class="btn-cancelar" onclick="cancelarEdicao()">❌</button>`;
}

async function salvarVenda(id) {
    const response = await fetch(`http://localhost:3000/cliente_matt360/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            cpf: document.getElementById(`i-${id}-0`).value,
            nome: document.getElementById(`i-${id}-1`).value,
            numero: document.getElementById(`i-${id}-2`).value,
            nascimento: document.getElementById(`i-${id}-3`).value,
            email: document.getElementById(`i-${id}-4`).value
        })
    });

    if (response.ok) {
        editandoId = null;
        carregarVendas();
    } else {
        alert('Erro ao atualizar!');
    }
}

function cancelarEdicao() {
    editandoId = null;
    carregarVendas();
}

window.onload = carregarClientes;