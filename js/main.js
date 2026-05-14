function navegarPara(telaId) {   //funcao para trocar de tela e mostrar a tela selecionada
    document.querySelectorAll('.tela').forEach(function(tela) {  
        tela.classList.remove('ativa'); //removera a classe 'ativa' de cada tela, encondendo-as

        if (telaId === 'tela-horario') {  //se a tela selecionada for a tela home, mostra o menu lateral
            mostrarAulas(); //chama a funcao para mostrar as aulas cadastradas
        
        if (telaId === 'tela-calendario') {
        renderizarCalendario();
    }
        
}
    });

    document.getElementById(telaId).classList.add('ativa'); //pega so a tela com o ID para mostrar
}

function fazerLogin() {  //funcao para fazer login
    var email = document.getElementById('login-email').value;  //pega o valor do campo de email
    var senha = document.getElementById('login-senha').value;  //pega o valor do campo de senha

    if (email === '') {
        alert('Por favor, insira seu email.');
        return;
    }

    if (!email.includes('@')) {
        alert('Por favor, insira um email válido.');
        return;
    }

    if (senha === '') {
        alert('Por favor, insira sua senha.');
        return;
    }

    alert('Login bem-sucedido!'); 
    navegarPara('tela-home');
}

function fazerCadastro() {  
    var email = document.getElementById('cadastro-email').value; 
    var senha = document.getElementById('cadastro-senha').value;

    if(email === '') {
        alert('Por favor, insira seu email.');
        return;
    }

    if (!email.includes('@')) {
        alert('Por favor, insira um email válido.');
        return;
    }

    if (senha === '') {
        alert('Por favor, insira sua senha.');
        return;
    }

    alert('Cadastro bem-sucedido!');
    navegarPara('tela-login');
}

// lista com algumas aulas ja cadastradas
var aulas = [
    { id: 1, nome: 'Matemática', dia:'Segunda-feira', horario: 'Segunda-feira, 10h' },
    { id: 2, nome: 'Português', dia:'Terça-feira', horario: 'Terça-feira, 14h' },
    { id: 3, nome: 'História', dia:'Quarta-feira', horario: 'Quarta-feira, 9h' }
];


function mostrarAulas() { // função para mostrar as aulas cadastradas
    var lista = document.getElementById('lista-aulas');
    lista.innerHTML = ''; // limpa a lista antes de desenhar

    aulas.forEach(function(aula) { // para cada aula, cria um card
        var card = document.createElement('div'); // cria uma div nova
        card.className = 'info-item'; // define o estilo do card
        card.innerHTML = '<h3>' + aula.materia + '</h3>' +
                         '<p>' + aula.dia + ' • ' + aula.horario + '</p>';
        lista.appendChild(card); // adiciona o card na lista
    });
}

function adicionarAula() {  //funcao para adicionar uma nova aula
    var materia = prompt('nome da matéria:');
    if (!materia) return;

    var dia = prompt('dia da semana:');
    if (!dia) return;

    var horario = prompt('Horário (ex: 08:00 - 09:40):', '08:00 - 09:40');
    if (!horario) return;

    // adiciona a nova aula na lista
    aulas.push({ materia: materia, dia: dia, horario: horario });

    // atualiza a tela
    mostrarAulas();

    alert('✅ Aula adicionada com sucesso!');
}

var dataAtual = new Date(); //pega a data atual
var eventos = [];

function renderizarCalendario() {
    var grid = document.getElementById('calendario-grid');
    var mesAnoEl = document.getElementById('mes-ano');

    // nomes dos dias e meses
    var diasSemana = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
    var meses = ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'];

    var ano = dataAtual.getFullYear();
    var mes = dataAtual.getMonth();

    mesAnoEl.textContent = meses[mes] + ' ' + ano;
    var primeiroDia = new Date(ano, mes, 1).getDay();
    var diasNoMes = new Date(ano, mes + 1, 0).getDate();
    var hoje = new Date();

    grid.innerHTML = '';

    // cabeçalhos dos dias da semana
    diasSemana.forEach(function(dia) {
        var el = document.createElement('div');
        el.className = 'cal-header';
        el.textContent = dia;
        grid.appendChild(el);
    });

    for (var i = 0; i < primeiroDia; i++) {
        var vazio = document.createElement('div');
        grid.appendChild(vazio);
    }

    for (var dia = 1; dia <= diasNoMes; dia++) {
        var el = document.createElement('div');
        el.className = 'cal-dia';
        el.textContent = dia;

        if (dia === hoje.getDate() &&
            mes === hoje.getMonth() &&
            ano === hoje.getFullYear()) {
            el.classList.add('hoje');
        }

        el.addEventListener('click', function() {
            adicionarEvento();
        });

        grid.appendChild(el);
    }

     mostrarEventos();
}

function mostrarEventos() {
    var lista = document.getElementById('lista-eventos');
    lista.innerHTML = '';

    if (eventos.length === 0) {
        lista.innerHTML = '<p style="color:#666; text-align:center;">Nenhum evento ainda</p>';
        return;
    }

     eventos.forEach(function(ev) {
        var card = document.createElement('div');
        card.className = 'info-item';
        card.innerHTML = '<h3>' + ev.titulo + '</h3>' +
                         '<p>' + ev.data + '</p>';
        lista.appendChild(card);
    });
}

// função para adicionar evento
function adicionarEvento() {
    var titulo = prompt('Nome do evento:');
    if (!titulo) return;

    var data = prompt('Data do evento (ex: 11/05/2026):');
    if (!data) return;

    eventos.push({ titulo: titulo, data: data });
    mostrarEventos();
    alert('✅ Evento adicionado!');
}

// função para ir ao mês anterior
function mesAnterior() {
    dataAtual.setMonth(dataAtual.getMonth() - 1);
    // diminui 1 mês
    renderizarCalendario();
}

// função para ir ao próximo mês
function proximoMes() {
    dataAtual.setMonth(dataAtual.getMonth() + 1);
    // aumenta 1 mês
    renderizarCalendario();
}

// lista de pastas começa com algumas já cadastradas
var pastas = [
    { nome: 'Matemática', arquivos: 3 },
    { nome: 'Português', arquivos: 5 },
    { nome: 'História', arquivos: 2 },
];

// função que mostra as pastas na tela
function mostrarPastas() {
    var lista = document.getElementById('lista-pastas');
    lista.innerHTML = ''; // limpa antes de desenhar

    pastas.forEach(function(pasta) {
        var card = document.createElement('div');
        card.className = 'info-item';
        card.innerHTML = '<h3>📁 ' + pasta.nome + '</h3>' +
                         '<p>' + pasta.arquivos + ' arquivo(s)</p>';

        // ao clicar na pasta abre um alert
        card.addEventListener('click', function() {
            alert('📁 Abrindo pasta: ' + pasta.nome);
        });

        lista.appendChild(card);
    });
}

// função para criar nova pasta
function criarPasta() {
    var nome = prompt('Nome da nova pasta:');
    if (!nome) return;

    // adiciona a nova pasta na lista
    pastas.push({ nome: nome, arquivos: 0 });

    // atualiza a tela
    mostrarPastas();

    alert('✅ Pasta "' + nome + '" criada!');
}

function navegarPara(telaId) {

    document.querySelectorAll('.tela').forEach(function(tela) {
        tela.classList.remove('ativa');
    });

    document.getElementById(telaId).classList.add('ativa');

    if (telaId === 'tela-horario') {
        mostrarAulas();
    }

    if (telaId === 'tela-calendario') {
        renderizarCalendario();
    }

    // adicionado agora
    if (telaId === 'tela-pasta') {
        mostrarPastas();
    }
}

// função que mostra a prévia da imagem
function previewImagem(event) {

    // pega o arquivo selecionado
    var file = event.target.files[0];
    if (!file) return;
    // se não selecionou nada, para aqui

    // FileReader lê o arquivo e converte para URL
    var reader = new FileReader();

    // quando terminar de ler, mostra a imagem
    reader.onload = function(e) {
        var preview = document.getElementById('scanner-preview');
        // substitui o conteúdo da caixa pela imagem
        preview.innerHTML = '<img src="' + e.target.result + '" alt="Preview"/>';
    };

    // começa a ler o arquivo
    reader.readAsDataURL(file);
}

// função para salvar a imagem
function salvarImagem() {
    var preview = document.getElementById('scanner-preview');

    // verifica se tem uma imagem no preview
    if (!preview.querySelector('img')) {
        alert('⚠️ Selecione uma imagem primeiro!');
        return;
    }

    alert('✅ Imagem salva com sucesso!');
}

// função que mostra preview na aula inteligente
function previewAula(event) {

    var file = event.target.files[0];
    if (!file) return;

    var reader = new FileReader();

    reader.onload = function(e) {
        var preview = document.getElementById('aula-preview');
        preview.innerHTML = '<img src="' + e.target.result + '" alt="Preview"/>';
    };

    reader.readAsDataURL(file);
}

// cada botão da aula inteligente mostra um alert
function fazerSlides() {
    alert('🖼️ Slides gerados com sucesso!');
}

function salvarGaleria() {
    alert('💾 Imagem salva na galeria!');
}

function criarResumo() {
    alert('📝 Resumo criado!\n\nSeus principais pontos foram organizados.');
    // \n pula uma linha dentro do alert
}

function criarFlashcards() {
    alert('🃏 Flashcards criados!\n\n3 flashcards gerados do seu material.');
}