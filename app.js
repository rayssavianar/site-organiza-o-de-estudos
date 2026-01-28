const formTarefa = document.getElementById('formTarefa');
const entradaTarefa = document.getElementById('entradaTarefa');
const listaTarefas = document.getElementById('listaTarefas');

entradaTarefa.addEventListener('input', (event) => {
    console.log("Digitando:", event.target.value)
})

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
})
