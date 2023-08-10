export const canvas = document.getElementById('canvas1');
export const ctx = canvas.getContext('2d')

// const btn_add = document.querySelector('#btn-add');
//const div_interacao = document.querySelector('#interacao');
//const inputs = document.querySelectorAll('.coord');

// grafico_ponto contem a posição que o canvas deve começar a desenhar o primeiro ponto
// cada ponto desenhado atualiza esse valor
// [50, 350] == ponto 0,0 do gráfico

export const pontos = [0];
export var grafico_ponto = [95,350];

export function desenharLinhas(){
    // desenhando os numeros na linha vertical
    ctx.reset();
    document.getElementById('interacao').innerHTML = ""; // apaga as divs que foram criadas emcima dos pontos

    grafico_ponto[0] = 95    // ponto X do canvas equivalente ao 0 do grafico
    grafico_ponto[1] = 350   // ponto Y do canvas equivalente ao 0 do grafico
    let aux_vert = 353;
    for(let i = 0; i<=10; i++){
        
        ctx.beginPath();
        ctx.font = 'bold 16px rockwell';
        ctx.fillStyle = 'rgb(30,30,30)';
        if(i != 10){
            ctx.fillText(i*10,20, aux_vert+3);
        } else {
            ctx.fillText(i*10,13, aux_vert+3);
        }
        // desenhar linha horizontal na altura dos numeros
        // pular a linha do zero pois ela vai ser desenhada depois
        if(i > 0){
            ctx.strokeStyle = 'rgb(150,150,150)';
            ctx.moveTo(50, aux_vert-3);
            ctx.lineTo(530, aux_vert-3);
            ctx.stroke();
        }
        aux_vert -= 30;
    }

    // desenhando os numeros na linha horizontal 
    let aux_hori = 90;
    for(let i = 1; i<=10; i++){
        ctx.beginPath();
        ctx.font = 'bold 16px rockwell';
        ctx.fillStyle = 'rgb(30,30,30)';
        ctx.fillText(i,aux_hori, 373);
        // linha vertical em cada numero
        ctx.strokeStyle = 'rgb(150,150,150)';
        ctx.moveTo(aux_hori+5, 30);
        ctx.lineTo(aux_hori+5, 350);
        ctx.stroke();
        
        aux_hori += 45;
    }

    // desenhando as linhas do plano cartesiano
    ctx.beginPath();
    ctx.strokeStyle = 'rgb(1,1,1)';
    ctx.moveTo(50,30);  // começo da linha vertical (topo)
    ctx.lineTo(50,370); // fim da linha vertical
    ctx.stroke();

    ctx.beginPath();
    ctx.strokeStyle = 'rgb(1,1,1)';
    ctx.moveTo(35,350);  // começo da linha horizontal (horizontal)
    ctx.lineTo(530,350); // fim da linha horizontal
    ctx.stroke();


    // desenhando as palavras de acuracia e partida nas pontas das linhas
    ctx.beginPath();
    ctx.fillStyle = 'rgb(30,30,30)';
    ctx.font = 'bold 14px rockwell';
    ctx.fillText('acurácia',10,20);
    ctx.fillText('partidas',530,370)
}
desenharLinhas();



export class Ponto{
    constructor(x1,y1){
        this.x = x1;
        this.y = y1;
        this.data = "11/22/"+this.x+"0";
        this.tamanho = ctx.measureText(this.data).width;
        this.size = 6;
    }

    draw(){
        ctx.beginPath();
        // circulo
        const circle = new Path2D()
        ctx.fillStyle = 'rgb(37,150,190)';
        ctx.lineWidth = 2;
        circle.arc(this.x-10, this.y-10, 6, 0, Math.PI * 2);
        ctx.fill(circle);
        // linha
            // verificamos se existem 2 pontos no vetor, o ponto 0 padrão e o primeiro ponto desenhado, que não pode ter uma linha 
        if(pontos.length > 2){    
            ctx.lineWidth = 4;
            ctx.strokeStyle = 'rgb(37,150,190)';
            ctx.moveTo(grafico_ponto[0], grafico_ponto[1]);
            ctx.lineTo(this.x-10, this.y-10);
            ctx.stroke();
        }

        grafico_ponto = [this.x-10, this.y-10];
        // criando o botão pra colocar na div que está por cima do canvas
        const ponto = document.createElement('div')             // criando uma div que será o botão 
        ponto.style.position = 'absolute';                      // estilos para posicionar o botão emcima do ponto do cartesiano
        ponto.style.top = this.y-15+'px';                       // posicionando a nova div emcima do ponto pintado pelo canvas
        ponto.style.left = this.x-15+'px';
        ponto.className = 'ponto_interac'           
    
        const popup_data = document.createElement('span')                    // criando o quadrado popup de fundo para a data. Abaixo estilizando a posicao
        popup_data.style.padding = this.size/2+'px '+this.size*2+'px';
        popup_data.style.position = 'relative';                     
        popup_data.style.top = '-30px'                                      // posicionando o popup 30px pra cima do ponto
        popup_data.style.left = '-'+(this.tamanho/2 + this.size)+'px'       // pra esquerda dividimos metade do tamanho - tamanho do ponto
        popup_data.className = 'ponto_popup hidden';                                // adicionando classe para estilizar o modal

        const ponto_data = document.createTextNode(this.data)       // escrevendo a data e salvando na const
        popup_data.appendChild(ponto_data);                         // escreve a data dentro do modal (span)
        ponto.appendChild(popup_data);                              // coloca o popup dentro do ponto (vamos esconder de inicio)
        
        ponto.addEventListener('mouseover', ()=>{                   // evento para mostrar quando o mouse estiver emcima
            ponto.children[0].classList.remove('hidden')
            ponto.children[0].classList.add('visible')
        });

        ponto.addEventListener('mouseout', ()=>{                    // evento para esconder quando o mouse sair de cima
            ponto.children[0].classList.remove('visible')
            ponto.children[0].classList.add('hidden')
        });

        document.getElementById('interacao').appendChild(ponto);    // coloca o ponto na div
        //console.log(grafico_ponto)
    }
}
