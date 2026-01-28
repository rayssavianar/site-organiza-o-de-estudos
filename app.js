const formTarefa = document.getElementById('formTarefa');
const entradaTarefa = document.getElementById('entradaTarefa');
const listaTarefas = document.getElementById('listaTarefas');
const botaoLimpar = document.getElementById('botaoLimparConcluidas');


formTarefa.addEventListener('submit', function (event) {
    event.preventDefault();
    let valorEntradaTarefa = entradaTarefa.value.trim();

    if (valorEntradaTarefa === '') {
        alert('Por favor, insira uma tarefa válida.');
        return;
    }

    console.log(`Termo buscado: ${valorEntradaTarefa}`);

    entradaTarefa.value = '';
    entradaTarefa.focus();

    const li = document.createElement('li');
    li.classList.add('item-tarefa');

    // console.log('li criado:', li);

    const span = document.createElement('span');
    span.classList.add('texto-tarefa');
    span.textContent = valorEntradaTarefa;

    li.appendChild(span);

    console.log('span adicionado ao li:', li);

    listaTarefas.appendChild(li);

    // criando ação concluida

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';

    console.log(checkbox);

    li.appendChild(checkbox);
    li.appendChild(span);

    checkbox.addEventListener('change', function (event) {
        li.classList.toggle('concluida');
    });

});



