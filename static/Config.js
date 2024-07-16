function Add_Pasta(){
    $.ajax({
        url:"/Extractor",
        type:"POST",
        contentType: "application/json",
        data: JSON.stringify({value: document.getElementById("Add_Pasta").value})
    })
}


var Tocandas = localStorage.getItem("Tocandas")
if (Tocandas < 0){
    Quantidade.innerHTML = Tocandas + " Vezes"
}else{
    Quantidade.innerHTML = " 0 Vezes"
}
fetch("/DadosMusic").then(function (response) {
    response.json().then((data) => {
        var MinhasMusicas = JSON.parse(JSON.stringify(data))
        document.getElementById("QuantidadeMusic").innerHTML = MinhasMusicas.length
    })
})
document.getElementById("ButtonRemove").addEventListener("click",function(){
    localStorage.clear()
    location.reload()
    $.ajax({
        url:"/Delete_All_Btn",
        type:"POST",
        contentType: "application/json",
    })
})


function Abrir(){
    document.getElementById("Add_Pasta_body").style.display = "block"
}