let ckb1 = document.querySelector('.ckb1');
let ckb2 = document.querySelector('.ckb2');
let produto1 = document.querySelector('.card1');
let produto2 = document.querySelector('.card2');


ckb1.checked = true;
ckb2.checked = true;

ckb1.addEventListener('click', ()=>{
    if(ckb1.checked){
        produto1.style.display = 'flex';
    }
    else{
        produto1.style.display = 'none';
    }
})

ckb2.addEventListener('click', ()=>{
    if(ckb2.checked){
        produto2.style.display = 'flex';
    }
    else{
        produto2.style.display = 'none';
    }
})