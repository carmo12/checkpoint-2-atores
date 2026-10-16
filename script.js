const lista = document.getElementById("listaAtores");
const campoBusca = document.getElementById("campoBusca");
const filtroPais = document.getElementById("filtroPais");
const ordem = document.getElementById("ordem");
const contador = document.getElementById("contador");
const botaoTema = document.getElementById("botaoTema");

const bandeiras = {
    "Estados Unidos": "🇺🇸", "Brasil": "🇧🇷", "Reino Unido": "🇬🇧", "Austrália": "🇦🇺",
    "França": "🇫🇷", "Espanha": "🇪🇸", "Israel": "🇮🇱", "México": "🇲🇽", "Japão": "🇯🇵"
};

// ---------- utilidades ----------
const normalizar = (t) => t.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

function escapar(t) {
    const d = document.createElement("div");
    d.textContent = t;
    return d.innerHTML.replace(/"/g, "&quot;");
}

function paraData(s) {
    const [d, m, a] = s.split("/").map(Number);
    return new Date(a, m - 1, d);
}

function calcularIdade(s) {
    const nasc = paraData(s), hoje = new Date();
    let idade = hoje.getFullYear() - nasc.getFullYear();
    const fezAniversario = hoje.getMonth() > nasc.getMonth() ||
        (hoje.getMonth() === nasc.getMonth() && hoje.getDate() >= nasc.getDate());
    return fezAniversario ? idade : idade - 1;
}

function formatarData(s) {
    return paraData(s).toLocaleDateString("pt-BR", { day: "numeric", month: "long", year: "numeric" });
}

function iniciais(nome) {
    const p = nome.split(" ");
    return (p[0][0] + (p.length > 1 ? p[p.length - 1][0] : "")).toUpperCase();
}

// cada pessoa recebe sempre o mesmo matiz de fundo
function matiz(nome) {
    let h = 0;
    for (const c of nome) h = (h * 31 + c.charCodeAt(0)) % 360;
    return h;
}

// ---------- tema ----------
function aplicarTema(t) {
    document.documentElement.dataset.tema = t;
    botaoTema.textContent = t === "escuro" ? "☀️ Claro" : "🌙 Escuro";
    try { localStorage.setItem("tema", t); } catch (e) {}
}

botaoTema.addEventListener("click", () => {
    aplicarTema(document.documentElement.dataset.tema === "escuro" ? "claro" : "escuro");
});
aplicarTema(document.documentElement.dataset.tema);

// ---------- fotos via Wikipédia ----------
// Para quem não tem "foto" em dados.js (ou cujo link quebrou), busca a imagem
// da página da pessoa na Wikipédia. O resultado fica salvo no navegador.
let cacheFotos = {};
try { cacheFotos = JSON.parse(localStorage.getItem("fotosCache") || "{}"); } catch (e) {}

async function buscarUrlFoto(nome) {
    if (nome in cacheFotos) return cacheFotos[nome];
    try {
        const resp = await fetch("https://en.wikipedia.org/api/rest_v1/page/summary/" +
            encodeURIComponent(nome.replace(/ /g, "_")));
        if (!resp.ok) throw new Error("sem página");
        const dados = await resp.json();
        const pequena = dados.thumbnail ? dados.thumbnail.source : null;
        const resultado = pequena ? { pequena, grande: pequena.replace(/\/\d+px-/, "/500px-") } : null;
        cacheFotos[nome] = resultado;
        try { localStorage.setItem("fotosCache", JSON.stringify(cacheFotos)); } catch (e) {}
        return resultado;
    } catch (e) {
        return null; // sem internet ou sem página: fica com as iniciais
    }
}

async function preencherFoto(box) {
    if (box.querySelector("img")) return;
    const url = await buscarUrlFoto(box.dataset.nome);
    if (!url || box.querySelector("img")) return;

    const img = new Image();
    img.alt = box.dataset.nome;
    img.loading = "lazy";
    img.onerror = () => {
        if (img.src !== url.pequena) img.src = url.pequena;
        else img.remove();
    };
    img.src = url.grande;
    box.appendChild(img);
}

// ---------- renderização ----------
function card(ator) {
    const foto = ator.foto
        ? `<img src="${escapar(ator.foto)}" alt="${escapar(ator.nome)}" loading="lazy" referrerpolicy="no-referrer">`
        : "";
    return `
        <article class="card">
            <div class="foto" data-nome="${escapar(ator.nome)}" style="--h:${matiz(ator.nome)}">
                <span class="iniciais" aria-hidden="true">${iniciais(ator.nome)}</span>
                ${foto}
            </div>
            <div class="informacoes">
                <h2>${escapar(ator.nome)}</h2>
                <p class="destaque">${escapar(ator.destaque || "")}</p>
                <dl>
                    <div><dt>País</dt><dd>${bandeiras[ator.pais] || "🌎"} ${escapar(ator.pais)}</dd></div>
                    <div><dt>Nascimento</dt><dd>${formatarData(ator.nascimento)} (${calcularIdade(ator.nascimento)} anos)</dd></div>
                </dl>
            </div>
        </article>`;
}

function atualizar() {
    const texto = normalizar(campoBusca.value.trim());
    const pais = filtroPais.value;

    const resultado = atores
        .filter((a) => normalizar(a.nome).includes(texto) && (!pais || a.pais === pais))
        .sort((a, b) => {
            if (ordem.value === "velho") return paraData(a.nascimento) - paraData(b.nascimento);
            if (ordem.value === "novo") return paraData(b.nascimento) - paraData(a.nascimento);
            return a.nome.localeCompare(b.nome, "pt-BR");
        });

    contador.textContent = `${resultado.length} de ${atores.length} ${atores.length === 1 ? "pessoa" : "pessoas"}`;

    lista.innerHTML = resultado.length
        ? resultado.map(card).join("")
        : `<div class="sem-resultado">Nenhum resultado. Tente outro nome ou limpe o filtro de país.</div>`;

    lista.querySelectorAll(".foto").forEach(preencherFoto);
}

// foto quebrada: remove a imagem e deixa as iniciais aparecerem
lista.addEventListener("error", (e) => {
    if (e.target.tagName === "IMG" && e.target.closest(".foto")) {
        const box = e.target.closest(".foto");
        e.target.remove();
        preencherFoto(box);
    }
}, true);

// ---------- início ----------
[...new Set(atores.map((a) => a.pais))].sort((a, b) => a.localeCompare(b, "pt-BR")).forEach((p) => {
    filtroPais.insertAdjacentHTML("beforeend", `<option value="${escapar(p)}">${bandeiras[p] || "🌎"} ${escapar(p)}</option>`);
});

[campoBusca, filtroPais, ordem].forEach((el) => el.addEventListener("input", atualizar));
atualizar();