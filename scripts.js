const input = document.getElementsByClassName("novo-item")[0];
const but = document.getElementById("adicionar");
const lista = document.getElementsByClassName("lista")[0];

but.addEventListener("click", function () {
    const valor = input.value;
    if (valor.trim() !== "") {
        const novoItem = document.createElement("li");

        const novoCheck = document.createElement("input");
        novoCheck.type = "checkbox";
        novoCheck.classList.add("check-custom");
        novoCheck.style.marginRight = "10px";

        const spanTexto = document.createElement("span");
        spanTexto.textContent = valor;

        const remover = document.createElement("span");
        remover.textContent = "❌";
        remover.classList.add("remove-btn");

        novoItem.appendChild(novoCheck);
        novoItem.appendChild(spanTexto);
        novoItem.appendChild(remover);

        lista.appendChild(novoItem);

        input.value = "";

        novoCheck.addEventListener("change", function () {
            novoItem.style.textDecoration = novoCheck.checked ? "line-through" : "none";
            novoItem.style.textDecorationThickness = "3px";
            novoItem.style.textDecorationColor = "#EF4444";
        });

        remover.addEventListener("click", function () {
            novoItem.remove();
        });
    }
});
