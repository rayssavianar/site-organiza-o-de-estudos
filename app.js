const formTarefa = document.getElementById('formTarefa');
const entradaTarefa = document.getElementById('entradaTarefa');
const listaTarefas = document.getElementById('listaTarefas');
const botaoLimpar = document.getElementById('botaoLimparConcluidas');
const estadoVazio = document.getElementById('estadoVazio');
const contadorTarefas = document.getElementById('contadorTarefas');

// Chave unica para persistir as tarefas no navegador.
const CHAVE_TAREFAS = 'tarefas-organizador';

// Mostra/esconde a mensagem quando a lista está vazia.
function atualizarEstadoVazio() {
    if (listaTarefas.children.length === 0) {
        estadoVazio.style.display = 'block';
    } else {
        estadoVazio.style.display = 'none';
    }
}

function atualizarContador(){
    const quantidade = listaTarefas.children.length;
    contadorTarefas.textContent = `${quantidade} tarefas`;
}


// Leva os itens da tela e salva tudo no localStorage.
function salvarTarefas() {
    const tarefas = Array.from(listaTarefas.querySelectorAll('.item-tarefa')).map(function (item) {
        const texto = item.querySelector('.texto-tarefa')?.textContent || '';
        const concluida = item.classList.contains('item-tarefa-concluida');
        return { texto, concluida };
    });

    localStorage.setItem(CHAVE_TAREFAS, JSON.stringify(tarefas));
}

// Cria um item visual de tarefa e conecta seus eventos.
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

    // Marcar/desmarcar tarefa atualiza estilo e persistência.
    checkbox.addEventListener('change', function () {
        li.classList.toggle('item-tarefa-concluida', checkbox.checked);
        salvarTarefas();
    });

    // Duplo clique ativa edição inline do texto.
    span.addEventListener('dblclick', function(){
        span.contentEditable = true;
    });

    // Enter finaliza edi��o e salva novo conte�do.
    span.addEventListener('keydown', function(event){
        if(event.key === 'Enter'){
            event.preventDefault();
            span.contentEditable = false;
            salvarTarefas();
        }
    });

    li.appendChild(checkbox);
    li.appendChild(span);
    listaTarefas.appendChild(li);
}

// Reidrata a lista com o que já estava salvo no navegador.
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
}

// Submissão do formulário adiciona nova tarefa válida.
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
    atualizarContador()

    entradaTarefa.value = '';
    entradaTarefa.focus();
});

// Remove da lista apenas tarefas já concluidas.
botaoLimpar.addEventListener('click', function () {
    const tarefasConcluidas = listaTarefas.querySelectorAll('.item-tarefa.item-tarefa-concluida');
    tarefasConcluidas.forEach(function (tarefa) {
        listaTarefas.removeChild(tarefa);
    });

    salvarTarefas();
    atualizarEstadoVazio();
    atualizarContador()
});

// Inicializa a interface com dados persistidos.
carregarTarefas();
atualizarContador()

