var musicEscolhas = []
function Playlist_Salvar() {
    location.reload()
    $.ajax({
        url: "/PlaylistAdd",
        type: "POST",
        contentType: 'application/json',
        data: JSON.stringify({ 'Image': PlaylistImage.value, "Name": PlaylistName.value, "MusicList": "[]" })
    })
}
document.getElementById("FecharPrincipal_Btn").addEventListener("click", function () {
    document.getElementById("Playlist_Input").style.display = "none";
    // document.getElementById("InfoMini").style.display = "block";
});

var Caixa_Principal = document.createElement("div")
var Button_add = document.createElement("button")
Caixa_Principal.id = "Caixa_Button"
Button_add.innerText = "+"
Button_add.addEventListener("click", function () {
    document.getElementById("Playlist_Input").style.display = "block"
})

function Remover_Character(char, to_remove) {
    var new_String = char
    for (var i in to_remove) {
        new_String = String(new_String).replace(to_remove[i], "")
    }
    return new_String
}

function Play(Id) {
    document.getElementById("InfoMini").style.display = "block"
    document.getElementById("TPImage").src = Id.Image
    document.getElementById("TP_Name").innerText = Id.titulo
    document.getElementById("TP_Artista").innerText = Id.Artista
    ORIGINAL.src = `/music/${Id.titulo}`;
    ORIGINAL.play();
}


function Retorn_List_Music(Retorno, Position, Tamanho) {
    var Escolha_Body = document.getElementById("Escolha_Itens_Playlist")
    fetch("/DadosMusic").then((response) => response.json().then((dados) => {
        for (var i = 0; i < dados.length; i++) {
            var Name = String(dados[i].titulo)
            var Replace_Retorno = String(Retorno).replace(/.mp4]/, ".mp4")
            if (Name == String(Replace_Retorno)) {
                var Caixa_Label = document.createElement("div")
                var Caixa_Texto = document.createElement("div")
                var Titulo = document.createElement("h1")
                var Thumb = document.createElement("img")
                var Artist = document.createElement("p")
                var Position_Num = document.createElement("h2")
                Position_Num.innerText = Position
                Titulo.innerText = String(dados[i].titulo).replace(".mp4", "")
                Artist.innerText = String(dados[i].Artista)
                Thumb.src = dados[i].Image
                Caixa_Label.id = "Caixa_Label"
                Caixa_Label.className = i
                Caixa_Texto.id = "Caixa_Texto_Body_Playlist"
                Caixa_Texto.append(Titulo, Artist)
                Caixa_Label.append(Position_Num, Thumb, Caixa_Texto)
                Escolha_Body.append(Caixa_Label)
                musicEscolhas.push(i)
                Caixa_Label.addEventListener("click", function () {
                    Play(dados[this.className])
                    var MusicIDs = this.className
                    for (var x = 0; x < musicEscolhas.length; x++) {
                        if (MusicIDs == musicEscolhas[x]) {
                            var contador = x
                        }
                    }
                    document.getElementById("Frente").addEventListener("click", function (event) {
                        for (var x = 0; x < musicEscolhas.length; x++) {
                            if (MusicIDs == musicEscolhas[x]) {
                                if(contador <= musicEscolhas.length){
                                    contador++    
                                }else{
                                    contador = 0
                                }
                                Play(dados[musicEscolhas[contador]])
                            }
                        }
                    })

                    document.getElementById("Trás").addEventListener("click", function (event) {
                        for (var x = 0; x < musicEscolhas.length; x++) {
                            if (MusicIDs == musicEscolhas[x]) {
                                if(contador <= 0){
                                    contador = 0
                                }else{
                                    contador--
                                }
                                Play(dados[musicEscolhas[contador]])
                            }
                        }
                    })
                })
            }
        }

        for (var x = 0; x < musicEscolhas.length; x++) {
            document.getElementById("Randomizar").addEventListener("click", function () {
                var MusicRandom = musicEscolhas[Math.floor(Math.random() * musicEscolhas.length)]
                ORIGINAL.src = `/music/${dados[MusicRandom].titulo}`;
                ORIGINAL.play();
                document.getElementById("TP_Name").innerHTML = String(dados[MusicRandom].titulo).replace(".mp4", "")
                document.getElementById("TP_Artista").innerHTML = dados[MusicRandom].Artista
                document.getElementById("TPImage").src = dados[MusicRandom].Image
            })
        }
    }))
}



var NormalVolume = document.getElementById("NormalVolume");
function Normal_Volume() {
    Volume.value = "0.5";
    document.querySelectorAll("audio").forEach((el) => (el.volume = "0.5"));
}

// Normal Velocidade Btn
var PlayBack = document.getElementById("PlayBack");
function Normal_Velocidade() {
    document.querySelectorAll("audio").forEach((el) => (el.playbackRate = 1));
    document.getElementById("PlayBack").value = "5";
}

// Volume Function
Volume.addEventListener("change", function () {
    var VolumeValor = Volume.value;
    document.querySelectorAll("audio").forEach((el) => (el.volume = VolumeValor));
});

PlayBack.addEventListener("change", function () {
    var ValorPlay = PlayBack.value;
    document.querySelectorAll("audio").forEach((el) => (el.playbackRate = ValorPlay));
});

ORIGINAL.ontimeupdate = function () {
    progressed2.style.width = Math.floor((ORIGINAL.currentTime * 100) / ORIGINAL.duration) + "%";
};

progress_bar2.onclick = function (e) {
    ORIGINAL.currentTime = (e.offsetX / progress_bar2.offsetWidth) * ORIGINAL.duration;
}


// Function Recomeçar
function Recomeçar() {
    document.querySelectorAll("audio").forEach((el) => (el.currentTime = 0));
}

// Function Maior 5
function Mais5() {
    document.querySelectorAll("audio").forEach((el) => (el.currentTime += 1));
}

// Function Menor 5
function Menos5() {
    document.querySelectorAll("audio").forEach((el) => (el.currentTime -= 1));
}

// Mute
MuteeDismute.addEventListener("click", function () {
    if (document.getElementById(this.id).checked == true) {
        document.querySelectorAll("audio").forEach((el) => (el.muted = true));
        BtnMute.style.display = "inline-block";
        BtnVolume.style.display = "none";
    } else {
        document
            .querySelectorAll("audio")
            .forEach((el) => (el.muted = false));
        BtnMute.style.display = "none";
        BtnVolume.style.display = "inline-block";
    }
});

fetch("/PlaylistSearch").then(function (response) {
    response.json().then((data) => {
        Caixa_Principal.append(Button_add)
        for (var i = 0; i < data.length; i++) {
            if (data[i].titulo != "") {
                var Caixa = document.createElement("div")
                var Image = document.createElement("div")
                var Titulo = document.createElement("h1")
                var Sub_Titulo = document.createElement("h6")
                Caixa.id = i
                Image.style.backgroundImage = `url(${data[i].Image})`
                Titulo.innerText = data[i].titulo

                Caixa.addEventListener("click", function () {
                    var Listar = String(Remover_Character(data[this.id].List, "][','", "")).split(")]")
                    document.getElementById("Abrir_Playlist").style.display = "block"
                    var Transform_Array = new Set(Listar)
                    var ListarUnico = Array.from(Transform_Array)
                    var Tamanho = parseInt(ListarUnico.length)
                    document.getElementById("Escolha_Playlist_Num").innerText = `Playlist ${data[this.id].id}`
                    document.getElementById("Escolha_Image_Playlist").src = data[this.id].Image
                    document.getElementById("Escolha_Name_Playlist").innerText = data[this.id].titulo
                    document.getElementById("Escolha_Informações").innerText = `Quantidades de Músicas foi ${Tamanho - 1}`
                    for (var j = 1; j < ListarUnico.length; j++) {
                        if (ListarUnico[j] != "") {
                            Retorn_List_Music(ListarUnico[j], j, ListarUnico.length)
                        }
                    }
                })
                var Listar = String(Remover_Character(data[i].List, "][','", "")).split(")]")
                if (data[i].List == "[]") {
                    Sub_Titulo.innerText = `Quantidade de Músicas 0`
                } else {
                    Sub_Titulo.innerText = `Quantidade de Músicas ${Listar.length - 1}`
                }
                Caixa.append(Image, Titulo, Sub_Titulo)
                document.getElementById("Playlist_List").append(Caixa)
            }
        }
        document.getElementById("Playlist_List").append(Caixa_Principal)
    })
})

document.getElementById("FecharPrincipal").addEventListener("click",function(){
    document.getElementById("Abrir_Playlist").style.display = "none"
})

