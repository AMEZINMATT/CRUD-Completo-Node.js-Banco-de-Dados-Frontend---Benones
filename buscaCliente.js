async function listarTodos() {
    const buscaNoBancoDeDados = await fetch('http://localhost:3000/cliente_matt360');
    const respostaObtida = await buscaNoBancoDeDados.json();
    console.log(respostaObtida);
    let html = '<table border="1"><tr><th>CPF</th><th>Nome</th><th>Numero</th><th>Nascimento</th><th>Email</th></tr>';

    respostaObtida.forEach(cliente => {
        html += `<tr><td>${cliente.cpf}</td><td>${cliente.nome}</td><td>${cliente.numero}</td><td>${cliente.nascimento}</td><td>${cliente.email}</td></tr>`;
    });

    html += '</table>';
    document.getElementById('resultado').innerHTML = html;
}
