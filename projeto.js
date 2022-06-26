
let mensagem;

buscarmensagens();

function buscarmensagens(){
const promessa = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages");
promessa.then(dadosVoltou);
}
function dadosVoltou(resposta){
console.log("Os dados chegaram!");
console.log(resposta);
mensagem = resposta.data;
renderizarMensagens(resposta);
}





function renderizarMensagens(resposta){
const ulchat = document.querySelector(".conteudo");   
ulchat.innerHTML = "";
console.log(resposta);
const msg = resposta.data.length;
for(let i=0; msg>i; i++){
const from = (resposta.data[i].from);
const text = (resposta.data[i].text);
const time = (resposta.data[i].time);
const to = (resposta.data[i].to);
const type = (resposta.data[i].type);
if (type == "status"){
let mensagem = `<li class= "caixa cinza">
<div class="hora"><span>(${time})</span></div>
<div class="texto"><span><strong>${from}</strong></span>${text}</div>
</li>`;
 ulchat.innerHTML = ulchat.innerHTML + mensagem;
}
if (type == "message"){
    let mensagem = `<li class= "caixa branca">
    <div class="hora"><span>(${time})</span></div>
    <div class="texto"><span><strong>${from}</strong></span> para <span><strong>${to}</strong>:</span><span>${text}</span></div>
    </li>`;
     ulchat.innerHTML = ulchat.innerHTML + mensagem;
    }

 if(type == "private_message"){
    let mensagem = `<li class= "caixa rosa">
    <div class="hora"><span>(${time})</span></div>
    <div class="texto"><span><strong>${from}</strong></span> reservadamente para <span><strong>${to}</strong>:</span><span>${text}</span></div>
    </li>`;
     ulchat.innerHTML = ulchat.innerHTML + mensagem;
    }
}

}

setInterval(buscarmensagens, 3000);
const elementoQueQueroQueApareca = document.querySelector('.caixa');
elementoQueQueroQueApareca.scrollIntoView();

entrarsala();
function entrarsala(){

    
}