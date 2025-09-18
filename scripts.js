const input = document.querySelector(".novo-item");
const categoria = document.getElementById("categoria");
const but = document.getElementById("adicionar");

const listaComida = document.querySelector(".comida-lista");
const listaLimpeza = document.querySelector(".limpeza-lista");

const containerFoods = document.getElementById("container-foods");
const containerCleaning = document.getElementById("container-cleaning");

function salvarLista() {
    const itens = {
        comida: [],
        limpeza: []
    };

    listaComida.querySelectorAll("li").forEach(li => {
        const texto = li.querySelector("span").textContent;
        const marcado = li.querySelector("input[type='checkbox']").checked;
        itens.comida.push({ texto, marcado });
    });

    listaLimpeza.querySelectorAll("li").forEach(li => {
        const texto = li.querySelector("span").textContent;
        const marcado = li.querySelector("input[type='checkbox']").checked;
        itens.limpeza.push({ texto, marcado });
    });

    localStorage.setItem("listaCompras", JSON.stringify(itens));
    mostrarListas();
}

function criarItem(texto, marcado = false, tipo = "comida") {
    const novoItem = document.createElement("li");

    const novoCheck = document.createElement("input");
    novoCheck.type = "checkbox";
    novoCheck.classList.add("check-custom");
    novoCheck.checked = marcado;

    const spanTexto = document.createElement("span");
    spanTexto.textContent = texto;
    if (marcado) {
        spanTexto.style.textDecoration = "line-through";
        spanTexto.style.textDecorationThickness = "3px";
        spanTexto.style.textDecorationColor = "#EF4444";
    }

    const remover = document.createElement("span");
    remover.textContent = "❌";
    remover.classList.add("remove-btn");

    novoItem.appendChild(novoCheck);
    novoItem.appendChild(spanTexto);
    novoItem.appendChild(remover);

    if (tipo === "comida") {
        listaComida.appendChild(novoItem);
    } else {
        listaLimpeza.appendChild(novoItem);
    }

    novoCheck.addEventListener("change", function () {
        spanTexto.style.textDecoration = novoCheck.checked ? "line-through" : "none";
        spanTexto.style.textDecorationThickness = "3px";
        spanTexto.style.textDecorationColor = "#EF4444";
        salvarLista();
    });

    remover.addEventListener("click", function () {
        novoItem.remove();
        salvarLista();
    });

    mostrarListas();
}

function mostrarListas() {
    containerFoods.style.display = listaComida.children.length > 0 ? "block" : "none";
    containerCleaning.style.display = listaLimpeza.children.length > 0 ? "block" : "none";
}

but.addEventListener("click", function () {
    const valor = input.value.trim();
    const tipo = categoria.value;
    if (valor !== "") {
        criarItem(valor, false, tipo);
        salvarLista();
        input.value = "";
    }
});

window.addEventListener("DOMContentLoaded", function () {
    const itensSalvos = JSON.parse(localStorage.getItem("listaCompras")) || { comida: [], limpeza: [] };
    itensSalvos.comida.forEach(item => criarItem(item.texto, item.marcado, "comida"));
    itensSalvos.limpeza.forEach(item => criarItem(item.texto, item.marcado, "limpeza"));
    mostrarListas();
});
