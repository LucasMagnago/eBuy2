let ckb1 = document.querySelector('.ckb1');
let ckb2 = document.querySelector('.ckb2');
let produto1 = document.querySelector('.card1');
let produto2 = document.querySelector('.card2');
let produto3 = document.querySelector('.card3');


ckb1.checked = true;
ckb2.checked = true;

ckb1.addEventListener('click', ()=>{
    if(ckb1.checked){
        produto3.style.display = 'flex';
    }
    else{
        produto3.style.display = 'none';
    }
})

ckb2.addEventListener('click', ()=>{
    if(ckb2.checked){
        produto1.style.display = 'flex';
        produto2.style.display = 'flex';
    }
    else{
        produto1.style.display = 'none';
        produto2.style.display = 'none';
    }
})