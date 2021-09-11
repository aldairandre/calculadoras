'use strict';

const display = document.getElementById('display');

const numeros = document.querySelectorAll('[id*=tecla]');

const operadores = document.querySelectorAll('[id*=operador]');

let novoNumero = true;
let operador;
let numeroAnterior;

function operacaoPendente (){
    if(operador !== undefined){
        return true
    }
}

function calcular() {
    if(operacaoPendente()){
        const numeroAtual = parseFloat(display.textContent.replace(',','.')) 
        novoNumero = true;
        let resultado = eval(`${numeroAnterior}${operador}${numeroAtual}`)
        atualizarDisplay(resultado)
    }
}


function atualizarDisplay (text) {
    if(novoNumero){
        display.textContent = text;
        novoNumero = false; 
    }else{
        display.textContent += text;
    }  
}

function inserirNumero(evento){
    /*display.textContent =  evento.target.textContent;*/
    atualizarDisplay(evento.target.textContent)
}

numeros.forEach(function (numero) {
    numero.addEventListener('click',inserirNumero);
})

function selecionarOperador (evento) {
    if(!novoNumero){
        novoNumero = true;
        operador = evento.target.textContent;
        numeroAnterior  = parseFloat(display.textContent.replace(',','.'));
    } 
}

operadores.forEach(function (operador){
    operador.addEventListener('click',selecionarOperador)
})

function ativarIgual(){
    calcular();
    operador = undefined;
}

document.getElementById('igual').addEventListener('click',ativarIgual)

function limparDisplay(){
    display.textContent = ''
}

document.getElementById('limparDisplay').addEventListener('click',limparDisplay)

function limparCalculo() {
    limparDisplay();
    operador = undefined;
    novoNumero = true;
    numeroAnterior = undefined;   
}

document.getElementById('limparCalculo').addEventListener('click',limparCalculo)

function removorUltimoNumero (){
    display.textContent = display.textContent.slice(0,-1);
}

document.getElementById('backSpace').addEventListener('click',removorUltimoNumero)

function inverterSinal (){
    novoNumero = true
    atualizarDisplay(display.textContent * -1)

}

document.getElementById('inverter').addEventListener('click',inverterSinal)

function existeDecimal (){
    return display.textContent.indexOf(',') !== -1
}

function existeValor() {
    return display.textContent.length > 0 
}

function inserirDecimal (){
    if(!existeDecimal()){
        if(existeValor()){
            atualizarDisplay(',')
        }else{
            atualizarDisplay('0,')
        }
    }
}

document.getElementById('decimal').addEventListener('click',inserirDecimal)