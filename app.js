const formTarefa = document.getElementById('formTarefa');
const entradaTarefa = document.getElementById('entradaTarefa');
const listaTarefas = document.getElementById('listaTarefas');
const botaoLimpar = document.getElementById('botaoLimparConcluidas');
const estadoVazio = document.getElementById('estadoVazio');

const CHAVE_TAREFAS = 'tarefas-organizador';

function atualizarEstadoVazio() {
    if (listaTarefas.children.length === 0) {
        estadoVazio.style.display = 'block';
    } else {
        estadoVazio.style.display = 'none';
    }
}

function salvarTarefas() {
    const tarefas = Array.from(listaTarefas.querySelectorAll('.item-tarefa')).map(function (item) {
        const texto = item.querySelector('.texto-tarefa')?.textContent || '';
        const concluida = item.classList.contains('item-tarefa-concluida');
        return { texto, concluida };
    });

    localStorage.setItem(CHAVE_TAREFAS, JSON.stringify(tarefas));
}

function criarItemTarefa(texto, concluida = false) {
    const li = document.createElement('li');
    li.classList.add('item-tarefa');
    li.classList.toggle('item-tarefa-concluida', concluida);

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = concluida;

    const span = document.createElement('span');
    span.classList.add('texto-tarefa');
    span.textContent = texto;

    checkbox.addEventListener('change', function () {
        li.classList.toggle('item-tarefa-concluida', checkbox.checked);
        salvarTarefas();
    });

    span.addEventListener('dblclick', function(){
        span.contentEditable = true;
    });

    span.addEventListener('keydown', function(event){
        if(event.key === 'Enter'){
            event.preventDefault();
            span.contentEditable = false;
            salvarTarefas();
        }
    });

    const textoAtual = span.textContent.trim();

    

    li.appendChild(checkbox);
    li.appendChild(span);
    listaTarefas.appendChild(li);
}

function carregarTarefas() {
    const tarefasSalvas = localStorage.getItem(CHAVE_TAREFAS);
    if (!tarefasSalvas) {
        atualizarEstadoVazio();
        return;
    }

    try {
        const tarefas = JSON.parse(tarefasSalvas);
        tarefas.forEach(function (tarefa) {
            criarItemTarefa(tarefa.texto, tarefa.concluida);
        });
    } catch (erro) {
        console.error('Erro ao carregar tarefas:', erro);
        localStorage.removeItem(CHAVE_TAREFAS);
    }

    atualizarEstadoVazio();
}

formTarefa.addEventListener('submit', function (event) {
    event.preventDefault();
    const valorEntradaTarefa = entradaTarefa.value.trim();

    if (valorEntradaTarefa === '') {
        alert('Por favor, insira uma tarefa valida.');
        return;
    }

    criarItemTarefa(valorEntradaTarefa);
    salvarTarefas();
    atualizarEstadoVazio();

    entradaTarefa.value = '';
    entradaTarefa.focus();
});

botaoLimpar.addEventListener('click', function () {
    const tarefasConcluidas = listaTarefas.querySelectorAll('.item-tarefa.item-tarefa-concluida');
    tarefasConcluidas.forEach(function (tarefa) {
        listaTarefas.removeChild(tarefa);
    });

    salvarTarefas();
    atualizarEstadoVazio();
});

carregarTarefas();
