
function Remover_ALL(){
    $.ajax({
        url:"/RemoveAll",
        type:"POST",
        contentType:"application/json"
    })
}



function Carregar(){
    fetch("/API").then((response) => response.json().then((dados) => {
        dados.forEach(function (element, index) {
            var Length = parseInt(index) + 1
            document.getElementById("QuantidadeMusic").innerText = ` ${Length}`     
        })
    }))

    document.getElementById("Quantidade").innerText = parseInt(localStorage.getItem("Tocadas"))
}

Carregar()