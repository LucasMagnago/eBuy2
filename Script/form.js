let form = document.querySelector('.form-cadastro');
let login = document.querySelector('.form-login');
let nome = document.querySelector('.nome');
let cpf = document.querySelector('.cpf');
let email = document.querySelector('.email');
let cep = document.querySelector('.cep');
let estado = document.querySelector('.estado');
let cidade = document.querySelector('.cidade');
let bairro = document.querySelector('.bairro');
let rua = document.querySelector('.rua');
let botao = document.querySelector('.btn-cadastro');
let erro = document.querySelector('.erro-hidden');
let erroLogin = document.querySelector('.erro-hidden-login');

fazLogin();

form.addEventListener('submit', function(e){
    
    if(!verificarVazio() && verificarCPF()){
        alert("Cadastro realizado com sucesso");

        //Salvando informações do formulário
        document.cookie = "nome=" + String(nome.value);
        document.cookie = "cpf=" + String(cpf.value);
        document.cookie = "email=" + String(email.value);
        document.cookie = "cep=" + String(cep.value);
        document.cookie = "estado=" + String(estado.value);
        document.cookie = "cidade=" + String(cidade.value);
        document.cookie = "bairro=" + String(bairro.value);
        document.cookie = "rua=" + String(rua.value);

        console.log("Cadastrou");
    }
    else{
        e.preventDefault();
        console.log("Não cadastrou");
    }
});
login.addEventListener('submit', function(e){
    let emailLogin = document.querySelector('#login-email').value;
    let senhaLogin = document.querySelector('#login-senha').value;

    let emailCk = '!@#$%';
    let senhaCk = '¨!@#$%';
    let nomeCk = '';

    try{
        emailCk = document.cookie.split('; ').find(x => x.startsWith('email=')).split('=')[1];
        senhaCk = document.cookie.split('; ').find(x => x.startsWith('cpf=')).split('=')[1];
        nomeCk = document.cookie.split('; ').find(x => x.startsWith('nome=')).split('=')[1];
    }
    catch{
        erroLogin.classList.remove("erro-hidden-login");
        erroLogin.classList.add("erro-login")
        erroLogin.innerHTML = "Email/Senha incorretos";

        e.preventDefault();
    }

    erroLogin.classList.remove("erro-login");
    erroLogin.classList.add("erro-hidden-login")

    if(String(emailLogin).toLowerCase() == String(emailCk).toLowerCase() && String(senhaLogin) == String(senhaCk).toLowerCase()){
        fazLogin();

        console.log("Fez login");

        alert(`${nomeCk} seja bem-vindo!`);
    }
    else{
        erroLogin.classList.remove("erro-hidden-login");
        erroLogin.classList.add("erro-login")
        erroLogin.innerHTML = "Email/Senha incorretos";

        console.log("Não fez login");

        e.preventDefault();
    }
})
function verificarVazio(){
    let _nome = nome.value;
    let _cpf = String(cpf.value);
    let _email = email.value;
    let _cep = String(cep.value);
    let _estado = String(estado.value);

    if(_nome == '' || _cpf == '' || _email == '' || _cep == '' || _estado == ''){
        erro.innerHTML = "Os campos não podem ficar vazios";
        erro.classList.remove("erro-hidden");
        erro.classList.add("erro");
        return true;
    }

    erro.classList.remove("erro");
    erro.classList.add("erro-hidden");

    return false;
}

function verificarCPF(){
    let _cpf = String(cpf.value);
    
    console.log("Como o cpf chega a função " + _cpf);
    //Removendo os erros antes de uma nova verificação
    erro.classList.remove("erro");
    erro.classList.add("erro-hidden");

    //Se o cpf nao tiver o tamanho correto ou se tiver pontuação,
    //já é retornado falso e a função é encerrada
    if(_cpf.length != 11 || _cpf.includes(".") || _cpf.includes(",")){
        erro.innerHTML = "CPF inválido";
        erro.classList.remove("erro-hidden");
        erro.classList.add("erro");
        return false;
    }
    
    //Caso o cpf tenha tamanho correto e contenha somente numeros ele é mandado
    //para a função de verificação
    let cpfValido = TestaCPF(_cpf);

    //Se o cpf for válido é retornado true
    if(cpfValido) return true;

    //Se for inválido é retornado false e exibido erro na tela.
    erro.innerHTML = "CPF inválido";
    erro.classList.remove("erro-hidden");
    erro.classList.add("erro");
    return false;
}

function TestaCPF(strCPF) {
    var Soma;
    var Resto;
    Soma = 0;
    
    if (strCPF == "00000000000") return false;
    if (strCPF == "11111111111") return false;
    if (strCPF == "22222222222") return false;
    if (strCPF == "33333333333") return false;
    if (strCPF == "44444444444") return false;
    if (strCPF == "55555555555") return false;
    if (strCPF == "66666666666") return false;
    if (strCPF == "77777777777") return false;
    if (strCPF == "88888888888") return false;
    if (strCPF == "99999999999") return false;

    for (i=1; i<=9; i++) Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (11 - i);
    Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11))  Resto = 0;
    if (Resto != parseInt(strCPF.substring(9, 10)) ) return false;

    Soma = 0;
    for (i = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (12 - i);
    Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11))  Resto = 0;
    if (Resto != parseInt(strCPF.substring(10, 11) ) ) return false;
    return true;
}

function limpa_formulário_cep() {
    //Limpa valores do formulário de cep.
    rua.value=("");
    bairro.value=("");
    cidade.value=("");
    estado.value=("");
}

function meu_callback(conteudo) {
    if (!("erro" in conteudo)) {
        //Atualiza os campos com os valores.
        rua.value=(conteudo.logradouro);
        bairro.value=(conteudo.bairro);
        cidade.value=(conteudo.localidade);
        estado.value=(conteudo.uf);
    } //end if.
    else {
        //CEP não Encontrado.
        limpa_formulário_cep();
        alert("CEP não encontrado.");
    }
}

function pesquisacep(valor) {

    //Nova variável "cep" somente com dígitos.
    var cep = valor.replace(/\D/g, '');

    //Verifica se campo cep possui valor informado.
    if (cep != "") {

        //Expressão regular para validar o CEP.
        var validacep = /^[0-9]{8}$/;

        //Valida o formato do CEP.
        if(validacep.test(cep)) {

            //Preenche os campos com "..." enquanto consulta webservice.
            rua.value="...";
            bairro.value="...";
            cidade.value="...";
            estado.value="...";

            //Cria um elemento javascript.
            var script = document.createElement('script');

            //Sincroniza com o callback.
            script.src = 'https://viacep.com.br/ws/'+ cep + '/json/?callback=meu_callback';

            //Insere script no documento e carrega o conteúdo.
            document.body.appendChild(script);

        } //end if.
        else {
            //cep é inválido.
            limpa_formulário_cep();
            alert("Formato de CEP inválido.");
        }
    } //end if.
    else {
        //cep sem valor, limpa formulário.
        limpa_formulário_cep();
    }
}
function fazLogin(){
    try{
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
    catch{
        return;
    }
}