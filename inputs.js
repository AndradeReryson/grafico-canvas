import {desenharLinhas, pontos, Ponto} from "./graf.js";

const btn_add = document.querySelector('#btn-add');
const btn_random = document.querySelector('#btn-random');
const inputs = document.querySelectorAll('.coord');

// import {pontos} é um vetor que guarda todos os pontos desenhados. serve de referencia para calcular o pos_x de cada ponto criado e desenhado
// precisa começar com o valor 0 pois o calculo da pos_x multiplica por 45 o tamanho desse vetor (45*1, 45*2, 45*3...). Isso posiciona cada ponto a 45 pixels de distancia um do outro no gráfico.

btn_add.addEventListener('click', () => {
    desenharLinhas(); // desenhar o plano cartesiano denovo e reseta o grafico_ponto (referecia para desenhar o primeiro ponto)
    
    for(let i = 0; i<10; i++){
        var pos_x = pontos.length*45 + 30 + 30;
        var pos_y = 310 - parseFloat(inputs[i].value*3)  + 30 + 20;
        let ponto = new Ponto(pos_x, pos_y);
        pontos.push(ponto);
        ponto.draw();
    }

    pontos.length = 0;  // apaga todos os valores do vetor
    pontos.push(0)      // insere o valor 0 padrão
    
});

// coloca valores aleatorios nos inputs
btn_random.addEventListener('click', () => {
    let max = 100;
    let min = 0;

    function pegarAleatorio(){ 
        return Math.random() * (max - min + 1) + min 
    }

    for(let j = 0; j<10; j++){
        inputs[j].value = pegarAleatorio();
    }
})

// adiciona um evento para os inputs 1 ao 9, onde ao apertar enter em cada input, ele joga o foco para o proximo
for(let i=0; i<9; i++){
    inputs[i].addEventListener('keypress', (e)=>{
        if(e.keyCode === 13){
            inputs[i+1].focus();
        }
    })
}

// como o ultimo input precisa jogar o foco pro botao "desenhar", ele está recebendo o evento separado dos outros
inputs[9].addEventListener('keypress', (e)=>{
    if(e.keyCode === 13){
        btn_add.focus();
    }
})

// quando está com o foco, apertar enter clica no botão de "desenhar"
btn_add.addEventListener('keypress', (e) => {
    if(e.keyCode === 13){
        btn_add.click();
    }
});

// adiciona a borda e remove a borda quando recebe/perde o foco, para os botões "adicionar valor" e "valor aleatorio"
btn_add.addEventListener('focus', () => {
    btn_add.classList.add('focused');
})
btn_add.addEventListener('blur', () => {
    btn_add.classList.remove('focused');
})
btn_random.addEventListener('focus', () => {
    btn_random.classList.add('focused');
})
btn_random.addEventListener('blur', () => {
    btn_random.classList.remove('focused');
})
