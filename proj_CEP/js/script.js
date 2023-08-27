const inputEl = document.querySelector("#cepId")
const buscarEl = document.querySelector("#buscarBtn")
const contFadeEl = document.querySelector("#fade")
const loaderEl = document.querySelector("#loader")
const contMsgEl = document.querySelector("#mensagem")
const msgText = document.querySelector("#mensagem p")
const cidadeEl = document.querySelector("#cityId")
const regionEl = document.querySelector("#regionId")
const btnClose = document.querySelector("#close-message")
const btnLimpar = document.querySelector("#limparBtn")

inputEl.addEventListener("keypress", (e) => {
    const onlyNumbers = /[0-9]/
    const key = String.fromCharCode(e.keyCode)

    if(!onlyNumbers.test(key)){
        e.preventDefault()
        return
    }
})

buscarEl.addEventListener("click", () => {

    const inputAtual = document.querySelector("#cepId").value
    const tamInput = inputAtual.replace(/[^0-9]/g, "")

    if(tamInput.length === 8){
        processCEP(tamInput)
    }
})

async function processCEP(cep){
    toggleLoader()

    const apiUrl = `https://viacep.com.br/ws/${cep}/json/`
    const resposta = await fetch(apiUrl)
    const data = await resposta.json()
    console.log(data)

    if(data.erro === true){
        toggleLoader()
        inputEl.value = ""
        toggleMenssage("CEP inválido, tente novamente!")
        return
    }

    cidadeEl.value = data.localidade
    cidadeEl.style.color = "white"
    regionEl.value = data.uf
    regionEl.style.color = "white"
    inputEl.value = ""

    toggleLoader()
}

function toggleLoader(){
    contFadeEl.classList.toggle("hide")
    loaderEl.classList.toggle("hide")
}

function toggleMenssage(msg){
    contFadeEl.classList.toggle("hide")
    contMsgEl.classList.toggle("hide")
    msgText.innerHTML = `${msg}`
}

btnClose.addEventListener("click", () => {
    toggleMenssage("")
})

btnLimpar.addEventListener("click", () => {
    inputEl.value = ""
    cidadeEl.value = ""
    regionEl.value = regionEl[0].value
    cidadeEl.style.color = "var(--cor05)"
    regionEl.style.color = "var(--cor05)"
})