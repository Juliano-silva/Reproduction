function Baixar() {
    var Value = document.getElementById('AdicionarInput').value;
    var value_Playlist = document.getElementById('AdicionarPlaylistInput').value
    if (Value.indexOf("https://")) {
        console.log("Não Tem");
    } else {
        if (Value.value != "") {
            $.ajax({
                url: '/AddMusic',
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({ 'value': Value })
            });
            document.getElementById('AdicionarInput').value = ""
        }
        else if (value_Playlist.value != "") {
            $.ajax({
                url: '/AddPlaylistMusic',
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({ 'value': value_Playlist })
            });
            document.getElementById('AdicionarPlaylistInput').value = ""
        } else {
            alert("Campo de Texto Vazio")
        }
    }
}