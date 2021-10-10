
//Variáveis globais do sistema
const dino = document.querySelector(".dino");
const background = document.querySelector(".background");
const mostraPontos = document.querySelector("#pontos");
let pontos = 0;
let isJumping = false;
let isGameOver = false;
let  position = 0;

//chamando a função para criação dos cactus
createCactus();

//chamando a função para cadastrar os pontos e atualizar
score();

//chamando a função de pulo do dinossauro
document.addEventListener("keyup", handleKeyUp);

//função de pulo do dinossauro
function handleKeyUp(event) {

    //verificando para saber se a tecla pressionada é o espaço, cujo o número é o 32
    if (event.keyCode === 32) {

        //um if para saber se o dinossauro ja esta no ar, para não ocorrer o problema de resetar o pulo
        if (!isJumping) {
            jump();
        }
    }
}

function jump () {
    isJumping = true;

    //chamando a função que faz o dinossauro pular
    dinoComingUp();
}

function dinoComingUp(){
    //criando um intervalo para a animação de pulo, a posição irá mudar a cada 50milisegundos
    let upInterval = setInterval(() => {
        //verificando se a posição do dinossauro é 40 para marcar o limite do pulo
        if (position >= 40) {
            //parando o setInterval do pulo
            clearInterval(upInterval);
            //chamando a função para começar o intervalo de descida do dinossauro
            dinoComingDown();
        } else {
            //mudando a posição do dinossauro
            position += 20;
            dino.style.bottom = `${position}%`
        }
    },50);
}

function dinoComingDown () {
   //criando um intervalo para a animação de descida, a posição irá mudar a cada 80milisegundos
    let downInterval = setInterval(() => {
        //verificando se a posição do cactu é 0 para marcar o limite da descida
        if (position === 0) {
            //parando o setInterval da descida
            clearInterval(downInterval);
            //voltando a variável de pulo para falsa
            isJumping = false;
        } else {
            //mudando a posição do dinossauro
            position -= 20;
            dino.style.bottom = `${position}%`;
        }
    },80)
}


function createCactus () {
    //criando o cactu no html
    const cactus = document.createElement('div');
    //criando o intevalo de cactus
    let randomTime = Math.random() * 6000;
    let cactusPosition = 1000;

    //adicionando  a classe no html
    cactus.classList.add("cactus");

    //adicionando o cactu na página
    background.appendChild(cactus);
    cactus.style.left = `${cactusPosition}px`;

   //criando um intervalo para o 'andar' do cactu, a posição irá mudar a cada 20milisegundos

    let leftInterval = setInterval(() => {
        //verificando se o cactu saiu da tela para eliminar o cactu da página
        if (cactus && cactusPosition < -60) {
            // parando o intervalo e removendo o cactu da tela
            clearInterval(leftInterval);
            background.removeChild(cactus);

            //adicionando a função de colisão do jogo
            //quando a posição do cactu e do dinossauro forem as mesmas, o jogador perde o jogo
        } else if (cactusPosition > 0 && cactusPosition < 40 && position < 40) {
            // parando o intervalo e mudando o html da página para a de fim de jogo
            isGameOver = true;
            clearTimeout(interval);
            clearInterval(leftInterval);

            document.body.innerHTML = `<div class='game-over'>
                                        <h1>Fim de jogo</h1>
                                        <h2>Obrigado por jogar</h2>
                                        <h4>Gostaria de jogar novamente?</h4>
                                        <p>Total de Pontos: ${pontos}</p></div>`
        }
        else {
            //mudando a posição do cactu
            cactusPosition -= 10;
            cactus.style.left = `${cactusPosition}px`;
        }
    }, 20)
    //fazendo com que a função chame ela mesma em diferentes períodos de tempo,
    //assim os cactus ficam aparecendo indefinidamente
   let interval = setTimeout(createCactus, randomTime);
}
function score(){

    //criando o intervalo de tempo de pontos do usuario
    let scoreUser = setInterval(() => {
        //verificando se o jogo ainda não acabou
        if(isGameOver === false){
            //adicionando pontos e atualizando no html
            pontos++;
            mostraPontos.innerHTML = `${pontos}`;
        }
    },90)
}