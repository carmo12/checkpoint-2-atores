const listaAtores = document.getElementById("listaAtores");


// Formata a data
function formatarData(data) {

    // Se já estiver no formato DD/MM/AAAA
    if (data.includes("/")) {
        return data;
    }

    // Se estiver no formato AAAA-MM-DD
    const partes = data.split("-");

    const ano = partes[0];
    const mes = partes[1];
    const dia = partes[2];

    const meses = [
        "janeiro",
        "fevereiro",
        "março",
        "abril",
        "maio",
        "junho",
        "julho",
        "agosto",
        "setembro",
        "outubro",
        "novembro",
        "dezembro"
    ];

    return `${parseInt(dia)} de ${meses[parseInt(mes) - 1]} de ${ano}`;
}


// Mostra os atores
function mostrarAtores(lista) {

    listaAtores.innerHTML = "";

    lista.forEach(function(ator) {

        listaAtores.innerHTML += `
            <div class="card">

                <img
                    src="${ator.foto}"
                    alt="${ator.nome}"
                >

                <div class="informacoes">

                    <h2>${ator.nome}</h2>

                    <p>
                        <strong>🌎 País:</strong>
                        ${ator.pais}
                    </p>

                    <p>
                        <strong>🎂 Nascimento:</strong>
                        ${formatarData(ator.nascimento)}
                    </p>

                </div>

            </div>
        `;
    });


    if (lista.length === 0) {

        listaAtores.innerHTML = `
            <div class="sem-resultado">
                Nenhum ator ou atriz encontrado.
            </div>
        `;
    }
}


// Filtro de pesquisa
function filtrarAtores() {

    const texto = document
        .getElementById("campoBusca")
        .value
        .toLowerCase();


    const resultado = atores.filter(function(ator) {

        return ator.nome
            .toLowerCase()
            .includes(texto);

    });


    mostrarAtores(resultado);
}


// Carrega todos os atores
mostrarAtores(atores);