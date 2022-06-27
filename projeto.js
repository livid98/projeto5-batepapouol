
let mensagem;
let nome;
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

 if(type == "private_message"&&(to === nome||from === nome)){
    let mensagem = `<li class= "caixa rosa">
    <div class="hora"><span>(${time})</span></div>
    <div class="texto"><span><strong>${from}</strong></span> reservadamente para <span><strong>${to}</strong>:</span><span>${text}</span></div>
    </li>`;
     ulchat.innerHTML = ulchat.innerHTML + mensagem;
    }

}
 const elementoQueQueroQueApareca = document.querySelector(".caixa");
 elementoQueQueroQueApareca[elementoQueQueroQueApareca.length-1].scrollIntoView();
}

 setInterval(buscarmensagens, 3000);


function entrarsala() {
   nome = prompt("Qual o seu nome? ");
   const nomepessoa = {
      name: `${nome}`
   };
   const promise = axios.post(
      "https://mock-api.driven.com.br/api/v6/uol/participants",
      nomepessoa
   );
   promise.then(verificarstatus);
   promise.catch(alertaerro);

}
entrarsala();

function verificarstatus() {
   nome;
   statususuario = {
       name: `${nome}`
   }
   const promisse = axios.post(`https://mock-api.driven.com.br/api/v6/uol/status`, statususuario);

}

setInterval(verificarstatus,5000);

function alertaerro(error) {
   if (error.response.status === 400) {
     nome = prompt("Digite um nome válido");
   }
   enviarmsg();
}
    
function enviarmsg() {
   input = document.querySelector(`textarea`);
   const promisse = axios.post(`https://mock-api.driven.com.br/api/v6/uol/messages`, {
       from: nome,
       to: "Todos",
       text: input.value,
       type: "message",
   })
   input.value= "";
   promisse.then(() => {
       const promisse = axios.get(`https://mock-api.driven.com.br/api/v6/uol/messages`);
   })
   promisse.catch(() => {
       window.location.reload();
   })
}