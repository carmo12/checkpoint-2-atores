const listaAtores = document.getElementById("listaAtores");


// Fotos personalizadas
const fotosPersonalizadas = {

    "Tom Hanks":
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3-Ut9IgmfllDrebHVgK357OcB19CtTZrU8p8DIYBLSboBF2LWMvi8ih00UMSby-XJqLILtMlXCX8JV8ooOCmMVwAmrSOaLjmk5JaGK3ZV8A&s=10",

    "Scarlett Johansson":
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9m_WCzJhzhNzCWgchNBKFDv5sWe0qNDaWnkVTP41Ss82sKIAy_8lgHZPLCYk0-Ua-MWm5rhikoBd5Z_8dhuncZrnOV3miYOcHJPqP2AYNQg&s=10",

    "Leonardo DiCaprio":
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPQ899PgoDdGuctdulkeX6st7ID8v8GU1USYxncIqCuf3qJJqWm_ZBzPHUTG98Fl9bJlIqn77Q1O3R_Gd7yDLxmtHket2jXeU61m8SruHUBg&s=10"
};


// Atualiza as fotos dos atores que já existem no dados.js
atores.forEach(function(ator) {

    if (fotosPersonalizadas[ator.nome]) {
        ator.foto = fotosPersonalizadas[ator.nome];
    }

});


// Adiciona Tom Hanks
if (!atores.some(function(ator) {
    return ator.nome === "Tom Hanks";
})) {

    atores.push({

        id: 99901,

        nome: "Tom Hanks",

        pais: "United States",

        nascimento: "1956-07-09",

        foto: fotosPersonalizadas["Tom Hanks"]

    });

}


// Adiciona Leonardo DiCaprio
if (!atores.some(function(ator) {
    return ator.nome === "Leonardo DiCaprio";
})) {

    atores.push({

        id: 99902,

        nome: "Leonardo DiCaprio",

        pais: "United States",

        nascimento: "1974-11-11",

        foto: fotosPersonalizadas["Leonardo DiCaprio"]

    });

}


// Formata a data por extenso
function formatarData(data) {

    // Se a data já estiver no formato DD/MM/AAAA
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