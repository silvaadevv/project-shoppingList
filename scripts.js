const input = document.querySelector(".novo-item");
const categoria = document.getElementById("categoria");
const but = document.getElementById("adicionar");

const listaComida = document.querySelector(".comida-lista");
const listaLimpeza = document.querySelector(".limpeza-lista");

const containerFoods = document.getElementById("container-foods");
const containerCleaning = document.getElementById("container-cleaning");

const totalComidaEl = containerFoods.querySelector(".total");
const totalLimpezaEl = containerCleaning.querySelector(".total");
const totalGeralEl = document.getElementById("total-geral");

containerFoods.style.display = "none";
containerCleaning.style.display = "none";

function atualizarTotais() {
    let totalC = 0;
    let existePrecoC = false;

    listaComida.querySelectorAll("li").forEach(li => {
        const check = li.querySelector(".check-custom");
        const preco = parseFloat(li.querySelector(".preco-item").value);
        if (check.checked && !isNaN(preco)) {
            totalC += preco;
            existePrecoC = true;
        }
    });

    if (existePrecoC) {
        totalComidaEl.style.display = "block";
        totalComidaEl.textContent = `Total: R$ ${totalC.toFixed(2)}`;
    } else {
        totalComidaEl.style.display = "none";
    }

    let totalL = 0;
    let existePrecoL = false;

    listaLimpeza.querySelectorAll("li").forEach(li => {
        const check = li.querySelector(".check-custom");
        const preco = parseFloat(li.querySelector(".preco-item").value);
        if (check.checked && !isNaN(preco)) {
            totalL += preco;
            existePrecoL = true;
        }
    });

    if (existePrecoL) {
        totalLimpezaEl.style.display = "block";
        totalLimpezaEl.textContent = `Total: R$ ${totalL.toFixed(2)}`;
    } else {
        totalLimpezaEl.style.display = "none";
    }

    const totalGeral = totalC + totalL;
    if (totalGeral > 0) {
        totalGeralEl.style.display = "block";
        totalGeralEl.textContent = `Total Geral: R$ ${totalGeral.toFixed(2)}`;
    } else {
        totalGeralEl.style.display = "none";
    }
}

function mostrarListas() {
    containerFoods.style.display = listaComida.children.length > 0 ? "block" : "none";
    containerCleaning.style.display = listaLimpeza.children.length > 0 ? "block" : "none";
}

function salvarLista() {
    const itens = { comida: [], limpeza: [] };

    listaComida.querySelectorAll("li").forEach(li => {
        itens.comida.push({
            texto: li.querySelector(".item-left span").textContent,
            marcado: li.querySelector(".check-custom").checked,
            preco: li.querySelector(".preco-item").value
        });
    });

    listaLimpeza.querySelectorAll("li").forEach(li => {
        itens.limpeza.push({
            texto: li.querySelector(".item-left span").textContent,
            marcado: li.querySelector(".check-custom").checked,
            preco: li.querySelector(".preco-item").value
        });
    });

    localStorage.setItem("listaCompras", JSON.stringify(itens));
    atualizarTotais();
    mostrarListas();
}

function criarItem(texto, marcado = false, tipo = "comida", preco = "") {
    const li = document.createElement("li");

    const itemLeft = document.createElement("div");
    itemLeft.classList.add("item-left");

    const check = document.createElement("input");
    check.type = "checkbox";
    check.classList.add("check-custom");
    check.checked = marcado;

    const span = document.createElement("span");
    span.textContent = texto;
    if (marcado) {
        span.style.textDecoration = "line-through";
        span.style.textDecorationThickness = "3px";
        span.style.textDecorationColor = "#EF4444";
    }

    itemLeft.appendChild(check);
    itemLeft.appendChild(span);

    const itemRight = document.createElement("div");
    itemRight.classList.add("item-right");

    const precoInput = document.createElement("input");
    precoInput.type = "number";
    precoInput.placeholder = "R$";
    precoInput.value = preco;
    precoInput.classList.add("preco-item");
    precoInput.style.display = marcado ? "block" : "none";

    const remover = document.createElement("span");
    remover.textContent = "❌";
    remover.classList.add("remove-btn");

    itemRight.appendChild(precoInput);
    itemRight.appendChild(remover);

    li.appendChild(itemLeft);
    li.appendChild(itemRight);

    if (tipo === "comida") listaComida.appendChild(li);
    else listaLimpeza.appendChild(li);

    check.addEventListener("change", () => {
        const marcado = check.checked;
        span.style.textDecoration = marcado ? "line-through" : "none";
        span.style.textDecorationThickness = "3px";
        span.style.textDecorationColor = "#EF4444";
        precoInput.style.display = marcado ? "block" : "none";
        salvarLista();
    });

    precoInput.addEventListener("input", salvarLista);
    remover.addEventListener("click", () => {
        li.remove();
        salvarLista();
    });

    salvarLista();
}

but.addEventListener("click", () => {
    const valor = input.value.trim();
    if (valor !== "") {
        criarItem(valor, false, categoria.value);
        input.value = "";
    }
});

window.addEventListener("DOMContentLoaded", () => {
    const itens = JSON.parse(localStorage.getItem("listaCompras")) || { comida: [], limpeza: [] };
    itens.comida.forEach(i => criarItem(i.texto, i.marcado, "comida", i.preco));
    itens.limpeza.forEach(i => criarItem(i.texto, i.marcado, "limpeza", i.preco));
});
