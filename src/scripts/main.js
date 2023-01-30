document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('[data-tab-button]');
    const questions = document.querySelectorAll('[data-faq-question]');

    const form = document.getElementById('form-cadastro');
    const msgSucesso = document.getElementById('msg-sucesso')
    const inputNome = document.getElementById('name')
    const inputEmail = document.getElementById('mail')

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        let nome = inputNome.value
        let email = inputEmail.value 

        if ((nome.length >= 3) && (email.length >= 4)) {
            msgSucesso.classList.add('form__info__formulario__success--active')
        } else {
            alert('Por favor, preencha os dados corretamente')
            msgSucesso.classList.remove('form__info__formulario__success--active')
        }
    })

    for (let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', function(botao) {
            const abaAtiva = botao.target.dataset.tabButton
            const aba = document.querySelector(`[data-tab-id=${abaAtiva}]`)
            escondeAbas()
            aba.classList.add('market__acao--is-disable')
            removeBotaoAtivo()
            botao.target.classList.add('market__buttons__verMais--is-active')
        })
    }

    for (let i = 0; i < questions.length; i++) {
        questions[i].addEventListener('click', abreOuFechaResposta)
    }

    AOS.init();

    const coins = 'USD-BRL'
    const endpoint = `https://economia.awesomeapi.com.br/last/${coins}`
    
    fetch(endpoint)
    .then(function(resposta) {
        return resposta.json()
    })
    .then(function(json) {
        const dolarReal = json.USDBRL

        const dolarMax = document.getElementById('dolMax');
        const dolarMin = document.getElementById('dolMin');

        dolarMax.innerHTML = `R$${parseFloat(dolarReal.high).toFixed(2)}`;
        dolarMin.innerHTML = `R$${parseFloat(dolarReal.low).toFixed(2)}`;
    })
})

function abreOuFechaResposta(elemento) {
    const classe = 'faq__questions__item--is-open'
    const elementoPai = elemento.target.parentNode

    elementoPai.classList.toggle(classe)
}

function escondeAbas() {
    const tabscontainer = document.querySelectorAll('[data-tab-id]')

    for (let i = 0; i < tabscontainer.length; i++) {
        tabscontainer[i].classList.remove('market__acao--is-disable')
    }
}

function removeBotaoAtivo() {
    const buttons = document.querySelectorAll('[data-tab-button]')
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].classList.remove('market__buttons__verMais--is-active')
    }
}