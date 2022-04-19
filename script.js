


const textarea = document.querySelector('#textarea');
const btnGravar = document.querySelector('#btnGravar');
const btnParar = document.querySelector('#btnParar');
const btnBaixar = document.querySelector('#btnBaixar');
const btnLimpar = document.querySelector('#btnLimpar');


class speechApi{

    constructor(){

    const speechToText = window.SpeechRecognition || window.webkitSpeechRecognition;
     
     this.speechApi = new speechToText();

     this.output = textarea.output;


     this.speechApi.continuous = true;
     this.speechApi.lang = "pt-BR";

     this.speechApi.onresult = (e) => {
        var resultIndex = e.resultIndex
        var transcript = e.results[resultIndex][0].transcript

        console.log(transcript);

        textarea.value += transcript;
     }

    }

    start(){
        this.speechApi.start();
    }

    stop(){
        this.speechApi.stop();
    }
}



const speech = new speechApi();

btnGravar.addEventListener('click',()=>{
    btnBaixar.disabled = true;
    btnParar.disabled = false;

   
    speech.start(); 
})

btnParar.addEventListener('click',()=>{
    btnBaixar.disabled = false;
    btnParar.disabled = true;


    speech.stop(); 
})


btnBaixar.addEventListener('click',()=>{
    const text = textarea.value;
    const filename = "speech.txt"; 


    donwload(text, filename);

    
});


function donwload(text, filename){

    const element = document.createElement('a');

    element.setAttribute('href', 'data:text/plaincharset=utf-8,'+ encodeURIComponent(text));

    element.setAttribute('download',filename);

    element.style.display = 'none';

    document.body.appendChild(element);


    element.click();

    document.body.removeChild(element);
    
}



btnLimpar.addEventListener('click', ()=>{
    textarea.value = "";

    btnGravar.disabled = false;
    btnParar.disabled = true;

    speech.stop();
})