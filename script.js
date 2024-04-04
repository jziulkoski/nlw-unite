let participantes = [
    {
        nome: "Julia Azambuja",
        email: "azambuja@gmail.com",
        dataInscricao: new Date(2024, 2, 22, 19, 20),
        dataCheckIn: new Date(2024, 2, 25, 22, 0o0)
    },
    {
        nome: "Lauro Silva",
        email: "laurinho123@gmail.com",
        dataInscricao: new Date(2025, 2, 15, 19, 0o6),
        dataCheckIn: new Date(2020, 0o4, 0o4, 0o5, 0o0)
    },
    {
        nome: "João Santos",
        email: "joao.santos@example.com",
        dataInscricao: new Date(2023, 8, 10, 10, 30),
        dataCheckIn: new Date(2023, 8, 12, 18, 45)
    },
    {
        nome: "Maria Oliveira",
        email: "maria.oliveira@example.com",
        dataInscricao: new Date(2024, 5, 5, 14, 0),
        dataCheckIn: new Date(2024, 5, 7, 9, 30)
    },
    {
        nome: "Pedro Carvalho",
        email: "pedro.carvalho@example.com",
        dataInscricao: new Date(2024, 11, 12, 8, 45),
        dataCheckIn: new Date(2025, 0, 5, 12, 15)
    },
    {
        nome: "Ana Sousa",
        email: "ana.sousa@example.com",
        dataInscricao: new Date(2023, 4, 20, 17, 10),
        dataCheckIn: new Date(2023, 4, 23, 20, 0)
    },
    {
        nome: "Carlos Ferreira",
        email: "carlos.ferreira@example.com",
        dataInscricao: new Date(2024, 7, 8, 11, 20),
        dataCheckIn: new Date(2024, 7, 10, 8, 45)
    },
    {
        nome: "Mariana Costa",
        email: "mariana.costa@example.com",
        dataInscricao: new Date(2023, 10, 18, 9, 0),
        dataCheckIn: new Date(2023, 10, 21, 14, 30)
    },
    {
        nome: "Rafael Fernandes",
        email: "rafael.fernandes@example.com",
        dataInscricao: new Date(2024, 3, 28, 13, 15),
        dataCheckIn: new Date(2024, 4, 2, 10, 0)
    },
    {
        nome: "Patrícia Lima",
        email: "patricia.lima@example.com",
        dataInscricao: new Date(2023, 6, 3, 18, 50),
        dataCheckIn: new Date(2023, 6, 6, 16, 20)
    }
]

const criarNovoParticipante = (participante) => {
    const dataInscricao = dayjs(Date.now()).to(participante.dataInscricao)

    let dataCheckIn = dayjs(Date.now()).to(participante.dataCheckIn)

    if(participante.dataCheckIn == null) {
        dataCheckIn = `
        <button 
            data-email="${participante.email}"
            onclick="fazerCheckIn(event)"
        >
            Confirmar check-in
        </button>
        `
    }

    return `
    <tr>
        <td>
        <strong>
            ${participante.nome}
        </strong>
        <br>
        <small>
            ${participante.email}
        </small>
        </td>
        <td>
            ${dataInscricao}
        </td>
        <td>
            ${dataCheckIn}
        </td>
    </tr>
    `
}

const atualizarLista = (participantes) => {
    let output = ""
    
    for(let participante of participantes) {
        output = output + criarNovoParticipante(participante)
    }

    document.
    querySelector('tbody')
    .innerHTML = output
}

atualizarLista(participantes)

const adicionarParticipante = (event) => {
    event.preventDefault()

    const dadosDoFormulario = new FormData(event.target)

    const participante = {
        nome: dadosDoFormulario.get('nome'),
        email: dadosDoFormulario.get('email'),
        dataInscricao: new Date(),
        dataCheckIn: null
    }

    const participanteExiste = participantes.find((p) => p.email == participante.email)

    if(participanteExiste) {
        console.log('E-mail já cadastrado!')
        return
    }

    participantes = [participante, ...participantes]
    atualizarLista(participantes)

    event.target.querySelector('[name="nome"]').value = ""
    event.target.querySelector('[name="email"]').value = ""
}

const fazerCheckIn = (event) => {
    const mensagemConfirmacao = 'Tem certeza que deseja fazer o check-in?'
    if(confirm(mensagemConfirmacao) == false) {
        return
    }

    const participante = participantes.find((p) => p.email == event.target.dataset.email)
    
    participante.dataCheckIn = new Date()

    atualizarLista(participantes)
}