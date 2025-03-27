// Recebendo os elementos da página.
const expenses = document.querySelector("ul")
const newExpense = document.querySelector("#expense")
const typeNewExpense = document.querySelector("#category")
const newExpenseAmount = document.querySelector("#amount")
const form = document.querySelector("form")
const totalExpenses = document.querySelector("#expenses-total")
let totalAmount = document.querySelector("span#total-amount")

// Formatação do Input Amount
newExpenseAmount.oninput = () => {
    // Pega o que foi digitado e substitui por nada
    let value = newExpenseAmount.value.replace(/\D/g, "")

    // Transforma em centavos
    value = Number(value) / 100

    // Atualiza o valor
    newExpenseAmount.value = formatCurrencyBRL(value)
}

// Função para formatar a moeda
function formatCurrencyBRL(value){

    // Formata o valor para BRL
    value = value.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    })

    // Retorna esse valor para o bloco acima
    return value
}

// Resgatando os valores do formulario.
form.addEventListener("submit", (event) =>{
    event.preventDefault()

    // Criando os novos elementos.
    const newExpenseItem = document.createElement("li")
    const expenseName = document.createElement("strong")
    const expenseType = document.createElement("span")
    const expenseInfo = document.createElement("div")
    const expenseIcon = document.createElement("img")
    const expenseAmount = document.createElement("span")
    const expenseAmountSmall = document.createElement("small")
    const expenseDelete = document.createElement("img")

    // Adiciona a imagem de delete
    expenseDelete.src = "./img/remove.svg"

    // Adição de imagem com base no tipo
    switch(typeNewExpense.value){
        case "Alimentação": expenseIcon.src = "./img/food.svg"
            break
        case "Hospedagem": expenseIcon.src = "./img/accommodation.svg"
            break
        case "Transporte": expenseIcon.src = "./img/transport.svg"
            break
        case "Serviços": expenseIcon.src = "./img/services.svg"
            break
        case "Outros": expenseIcon.src = "./img/others.svg"
            break
    }

    // Adição das Classes.
    newExpenseItem.classList.add("expense")
    expenseInfo.classList.add("expense-info")
    expenseAmount.classList.add("expense-amount")
    expenseDelete.classList.add("remove-icon")
    
    // Juntando os elementos.

    // Adiciona os nomes dentro das tags strong e span.
    expenseName.append(newExpense.value)
    expenseType.append(typeNewExpense.value)

    // Adiciona o valor dentro do span que recebe o preço em reais.
    expenseAmount.append(newExpenseAmount.value)

    // Agrupa os elementos name e type em uma div.
    expenseInfo.append(expenseName, expenseType)

    // Junta todos os elementos e os insere na lista.
    newExpenseItem.append(expenseIcon, expenseInfo, expenseAmount, expenseDelete)
    expenses.prepend(newExpenseItem)

    // Limpando os Inputs.
    newExpenseAmount.value = ""
    newExpense.value = ""
    typeNewExpense.value = ""

    // Atualizando a quantidade de itens na lista.
    totalExpenses.textContent = document.querySelectorAll('li').length + " Despesas"
})

// Exclui o item ao clicar no icone de remover.
expenses.addEventListener("click", (event) => {
    if (event.target.classList.contains("remove-icon")) {
        event.target.closest("li").remove();

        // Atualizando a quantidade de itens na lista.
        totalExpenses.textContent = document.querySelectorAll('li').length + " Despesas"
    }
});


