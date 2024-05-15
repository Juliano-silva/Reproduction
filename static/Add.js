var array = []
function Baixar() {
    // location.reload()
    var value = document.getElementById('AdicionarInput').value;
    if(value.indexOf("https://")){
        console.log("Não Tem");
    }else{
        var value = document.getElementById('AdicionarInput').value;
        $.ajax({
            url: '/AddMusic',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ 'value': value })
        });
        document.getElementById('AdicionarInput').value = ""
    }
}