var array = []
var List_Playlist = []

function Playlist_Salvar() {
    $.ajax({
        url: "/PlaylistAdd",
        type: "POST",
        contentType: 'application/json',
        data: JSON.stringify({ 'Image': PlaylistImage.value, "Name": PlaylistName.value, "MusicList": "[]" })
    })
}




fetch("/PlaylistSearch").then(function (response) {
    response.json().then((data) => {
        for (var Playlist_itens = 0; Playlist_itens < data.length; Playlist_itens++) {
            var Corpo = document.createElement("div")

            Corpo.id = Playlist_itens

            var List_Body = document.createElement("div")
            var Image = document.createElement("img")
            var Titulo = document.createElement("h1")
            Image.src = data[Playlist_itens].Image
            Titulo.innerText = data[Playlist_itens].titulo

            Corpo.append(Image, Titulo)
            Corpo.addEventListener("click", function () {

                var Remove_Playlist = document.createElement("button")
                Remove_Playlist.id = data[this.id].id
                Remove_Playlist.innerText = "Remover"
                Remove_Playlist.addEventListener("click", function () {
                    $.ajax({
                        url: "Remove_Playlist_Btn",
                        type: "POST",
                        contentType: 'application/json',
                        data: JSON.stringify({
                            "value": this.id
                        })
                    })
                })

                document.getElementById("Abrir_Playlist").style.display = "block"
                document.getElementById("Escolha_Image_Playlist").src = data[this.id].Image
                document.getElementById("Escolha_Name_Playlist").innerText = data[this.id].titulo

                for (var i = 0; i < String(data[this.id].List).split(",").length; i++) {
                    var Conteudo = document.createElement("p")
                    var Musicas_Lista = String(data[this.id].List).replace("[", "").replace(/"/g, "").replace("]", "").split(",")[i]
                    Conteudo.innerText = Musicas_Lista

                    if(Musicas_Lista >= 0){
                         console.log("Nada");
                    }else{
                        List_Playlist.push(Musicas_Lista)
                    }

                    Conteudo.id = `Conteudo${i}`


                    Conteudo.addEventListener("click", function () {
                        document.getElementById("InfoMini").style.display = "block"
                        var Escolha = this.innerText
                        var Escolha_Id = String(this.id).replace("Conteudo", "")
                        fetch("/DadosMusic").then(function (response) {
                            response.json().then((dados) => {
                                var MinhasMusicas = JSON.parse(JSON.stringify(dados));
                                for (var i = 0; i < MinhasMusicas.length; i++) {
                                    if (Escolha == MinhasMusicas[i].titulo) {
                                        ORIGINAL.src = `/music/${MinhasMusicas[i].titulo}`
                                        document.getElementById("TP_Name").innerText = MinhasMusicas[i].titulo
                                        document.getElementById("TPImage").src = MinhasMusicas[i].Image
                                    }
                                }
                                document.getElementById("Frente").addEventListener("click", function () {
                                    if (Escolha_Id < List_Playlist.length) {
                                        Escolha_Id++
                                        var NextMusic = List_Playlist[Escolha_Id]
                                        ORIGINAL.src = `/music/${NextMusic}`;
                                        document.getElementById("TP_Name").innerHTML = NextMusic
                                    } else {
                                        var NextMusic = List_Playlist[0]
                                        ORIGINAL.src = `/music/${NextMusic}`;
                                        document.getElementById("TP_Name").innerHTML = NextMusic
                                    }
                                })
                        
                                Randomizando.addEventListener("click", function () {
                                    var MusicRandom = Math.floor(
                                      Math.random() * List_Playlist.length
                                    );
                                    ORIGINAL.src = `/music/${List_Playlist[MusicRandom]}`;
                                    ORIGINAL.play();
                                    document.getElementById("TP_Name").innerHTML = List_Playlist[MusicRandom]
                                  });

                                document.getElementById("Trás").addEventListener("click", function () {
                                    if (Escolha_Id < List_Playlist.length) {
                                        Escolha_Id--
                                        var NextMusic = List_Playlist[Escolha_Id]
                                        ORIGINAL.src = `/music/${NextMusic}`;
                                        document.getElementById("TP_Name").innerHTML = NextMusic
                                    } else {
                                        var NextMusic = List_Playlist[0]
                                        ORIGINAL.src = `/music/${NextMusic}`;
                                        document.getElementById("TP_Name").innerHTML = NextMusic
                                    }
                                })
                            })
                        })
                    })
                    document.getElementById("Escolha_Itens_Playlist").append(Conteudo, Remove_Playlist)
                }
            })
            // Recomeçar Function
            Recomeçar.addEventListener("click", function () {
                document.querySelectorAll("audio").forEach((el) => (el.currentTime = 0));
            });
            // Mais 5 Function
            Mais5.addEventListener("click", function () {
                document.querySelectorAll("audio").forEach((el) => (el.currentTime += 1));
            });
            // Menos 5 Function
            Menos5.addEventListener("click", function () {
                document.querySelectorAll("audio").forEach((el) => (el.currentTime -= 1));
            });
            // Volume Function
            Volume.addEventListener("change", function () {
                var VolumeValor = Volume.value;
                document.querySelectorAll("audio").forEach((el) => (el.volume = VolumeValor));
            });
            // Play e Pause
            document.getElementById("BtnPauseEvent").addEventListener("click", function () {
                ORIGINAL.pause();
                document.getElementById("BtnPauseEvent").style.display = "none";
                document.getElementById("BtnPlayEvent").style.display =
                    "inline-block";
            });

            document.getElementById("BtnPlayEvent").addEventListener("click", function () {
                ORIGINAL.play();
                document.getElementById("BtnPauseEvent").style.display = "inline-block";
                document.getElementById("BtnPlayEvent").style.display = "none";
            });
            document.getElementById("BtnPlayEvent").addEventListener("click", function () {
                ORIGINAL.play();
            });
            document.getElementById("BtnPauseEvent").addEventListener("click", function () {
                ORIGINAL.pause();
            });
            // Velocidade
            var PlayBack = document.getElementById("PlayBack");
            document.getElementById("NormalPlayBack").addEventListener("click", function () {
                document.querySelectorAll("audio").forEach((el) => (el.playbackRate = 1));
                document.getElementById("PlayBack").value = "5";
            });
            PlayBack.addEventListener("change", function () {
                var ValorPlay = PlayBack.value;
                document.querySelectorAll("audio").forEach((el) => (el.playbackRate = ValorPlay));
            });
            var NormalVolume = document.getElementById("NormalVolume");
            NormalVolume.addEventListener("click", function () {
                Volume.value = "0.5";
                document.querySelectorAll("audio").forEach((el) => (el.volume = "0.5"));
            });
            // Mute
            MuteeDismute.addEventListener("click", function () {
                if (document.getElementById(this.id).checked == true) {
                    document.querySelectorAll("audio").forEach((el) => (el.muted = true));
                    BtnMute.style.display = "inline-block";
                    BtnVolume.style.display = "none";
                } else {
                    document.querySelectorAll("audio").forEach((el) => (el.muted = false));
                    BtnMute.style.display = "none";
                    BtnVolume.style.display = "inline-block";
                }
            });
            document.getElementById("Playlist_List").append(Corpo)
        }
    })
})

document.getElementById("FecharPrincipal").addEventListener("click", function () {
    document.getElementById("Abrir_Playlist").style.display = "none";
  });
