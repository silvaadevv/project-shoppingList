const input = document.getElementsByClassName("novo-item")[0];
const but = document.getElementById("adicionar");
const lista = document.getElementsByClassName("lista")[0];

function salvarLista() {
    const itens = [];
    lista.querySelectorAll("li").forEach(li => {
        const texto = li.querySelector("span").textContent;
        const marcado = li.querySelector("input[type='checkbox']").checked;
        itens.push({ texto, marcado });
    });
    localStorage.setItem("listaCompras", JSON.stringify(itens));
}

function criarItem(texto, marcado = false) {
    const novoItem = document.createElement("li");

    const novoCheck = document.createElement("input");
    novoCheck.type = "checkbox";
    novoCheck.classList.add("check-custom");
    novoCheck.style.marginRight = "10px";
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

    lista.appendChild(novoItem);

    novoCheck.addEventListener("change", function () {
        spanTexto.style.textDecoration = novoCheck.checked ? "line-through" : "none";
        spanTexto.style.textDecorationThickness = "3px";
        spanTexto.style.textDecorationColor = "#EF4444";
        salvarLista();
    });

    remover.addEventListener("click", function () {
        novoItem.remove();
        salvarLista();
        mostrarLista();
    });
}

function mostrarLista() {
    const containerFoods = document.getElementById("container-foods");
    containerFoods.style.display = lista.children.length > 0 ? "block" : "none";
}

but.addEventListener("click", function () {
    const valor = input.value.trim();
    if (valor !== "") {
        criarItem(valor);
        salvarLista();
        mostrarLista();
        input.value = "";
    }
});

window.addEventListener("DOMContentLoaded", function () {
    const itensSalvos = JSON.parse(localStorage.getItem("listaCompras")) || [];
    itensSalvos.forEach(item => criarItem(item.texto, item.marcado));
    mostrarLista();
});
