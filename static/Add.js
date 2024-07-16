
function Baixar() {
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

function Baixar_Playlist(){
    var value = document.getElementById('AdicionarPlaylistInput').value;
        $.ajax({
            url: '/AddPlaylistMusic',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ 'value': document.getElementById('AdicionarPlaylistInput').value })
        });
}