document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('[data-tab-button]')
    const questions = document.querySelectorAll('[data-faq-question]')

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
    const endpoint = 'https://api.github.com/users/leonardoSibuya'
    
    fetch(endpoint)
    .then(function(resposta) {
        return resposta.json()
    })
    .then(function(json) {
        const ibovVariation = document.getElementById('ibov');
        ibovVariation.innerHTML = json.public_repos;
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