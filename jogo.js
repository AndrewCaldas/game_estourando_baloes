var timerId = null; // variável que armazena a chamada da função timeout

function iniciaJogo(){
    var url = window.location.search;

    var opcao = url.replace("?", "");

    var tempo_segundos = 0;

    if(opcao == 1){ //1 facil -> 120 segundos
        tempo_segundos = 120;
    }

    if(opcao == 2){ //2 normal -> 60 segundos
        tempo_segundos = 60;
    }

    if(opcao == 3){ //3 dificil -> 30 segundos
        tempo_segundos = 30;
    }

    //inserindo segundos no spam
    document.getElementById('cronometro').innerHTML = tempo_segundos;

    // quantidade de balões
    var qtde_baloes = 20;

    cria_baloes(qtde_baloes);

    // imprimir qtde de baloes inteiros
    document.getElementById('baloes_inteiros').innerHTML = qtde_baloes;

    // imprimir qtde de baloes estourados
    document.getElementById('baloes_estourados').innerHTML = 0; 

    contagem_tempo(tempo_segundos + 1);

}

function contagem_tempo(segundos){

    segundos = segundos - 1;

    if(segundos == -1 || segundos == '-1'){
        clearTimeout(timerId); // para a execução da função do settimeout
        game_over();
        return false;
    } 

    document.getElementById('cronometro').innerHTML = segundos;
    
    timerId = setTimeout("contagem_tempo("+segundos+")", 1000);
}

function game_over(){
    alert('Fim de jogo, você não conseguiu estourar todos os balões')
}

function cria_baloes(qtde_baloes){

    for(var i = 1; i <= qtde_baloes; i++){
        var balao = document.createElement("img");
        balao.src = 'imagens/balao_azul_pequeno.png';
        balao.style.margin = '10px';
        balao.id = 'b'+i;
        balao.onclick = function(){ estourar(this); }

        document.getElementById("cenario").appendChild(balao);
    }  
}

function estourar(e){
    var id_balao = e.id;

    document.getElementById(id_balao).src = 'imagens/balao_azul_pequeno_estourado.png';

    pontuacao(-1);

}

function pontuacao(acao){
    var baloes_inteiros = document.getElementById('baloes_inteiros').innerHTML;
    var baloes_estourados = document.getElementById('baloes_estourados').innerHTML;

    baloes_inteiros = parseInt(baloes_inteiros);
    baloes_estourados = parseInt(baloes_estourados);

    baloes_inteiros = baloes_inteiros + acao;
    baloes_estourados = baloes_estourados - acao;

    document.getElementById('baloes_inteiros').innerHTML = baloes_inteiros;
    document.getElementById('baloes_estourados').innerHTML = baloes_estourados;

    situacao_jogo(baloes_inteiros);
}

function situacao_jogo(baloes_inteiros){
    if(baloes_inteiros == 0){
        alert("Parabéns, você conseguiu estourar todos os balões a tempo");
        parar_jogo();
    }
}

function parar_jogo(){
    clearTimeout(timerId);
 //   balao.onclick = null;
}