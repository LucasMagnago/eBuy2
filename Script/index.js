window.onload(fazLogin());

function fazLogin(){
    let cadastroElogin = document.querySelector('#login-wrapper');
    let statusLogin = document.querySelector('#login-info');
    
    let cookie = document.cookie;
    let nome = cookie.split('; ').find(x => x.startsWith('nome=')).split('=')[1];
    
    if(nome!=null){
        cadastroElogin.style = 'display: none';
        statusLogin.innerHTML = `Olá, ${nome}`;
        statusLogin.style = 'display: flex';
    }
}