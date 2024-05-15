var array = []
var APIBuscar = JSON.parse(localStorage.getItem("playlist"))

function Playlist_Salvar() {
    if (localStorage.playlist) {
        array = JSON.parse(localStorage.getItem("playlist"))
    }

    array.push({
        "Image": PlaylistImage.value,
        "Name": PlaylistName.value,
        "MúsicasList": []
    })

    localStorage.setItem("playlist", JSON.stringify(array))
}





for (var Playlist_itens = 0; Playlist_itens < APIBuscar.length; Playlist_itens++) {
    var Corpo = document.createElement("div")
    var List_Body = document.createElement("div")
    var Image = document.createElement("img")
    var Titulo = document.createElement("h1")

    var Itens = document.getElementById("Escolha_Itens_Playlist")

    Image.src = APIBuscar[Playlist_itens].Image
    Titulo.innerText = APIBuscar[Playlist_itens].Name

    Corpo.append(Image, Titulo)
    for (var i = 0; i < APIBuscar[Playlist_itens].MúsicasList.length; i++) {
        var List = document.createElement("button")

        Corpo.id = "Escolha_ITEM"
        List.id = APIBuscar[Playlist_itens].MúsicasList[i]
        List.className = i
        List.innerText = String(APIBuscar[Playlist_itens].MúsicasList[i]).replace(/%C3%93/g, " ").replace(/%20/g, " ").split("/")[4]
        Corpo.addEventListener("click", function () {
            document.getElementById("Abrir_Playlist").style.display = "block"
            document.getElementById("Escolha_Image_Playlist").src = Image.src
            document.getElementById("Escolha_Name_Playlist").innerText = Titulo.innerText
        })

        List.addEventListener("click", function () {
            ORIGINAL.src = this.id
            ORIGINAL.play()
            InfoMini.style.display = "block"
            TP_Name.innerText = this.id
            document.getElementById("Trás").className = this.className
            document.getElementById("Frente").className = this.className
        })

        document.getElementById("Trás").addEventListener("click",Tras)
        document.getElementById("Frente").addEventListener("click",Frente)


        Escolha_Itens_Playlist.append(List)
        Corpo.append(List_Body)
    }
    document.getElementById("Playlist_List").append(Corpo)
}

function RetornarDados() {
    ORIGINAL.play();
  }

  // Próxima Música
  function Frente() {
    var IDs = this.className
    IDs++
    document.getElementById("Trás").className = IDs
    document.getElementById("Frente").className = IDs
    ORIGINAL.src = APIBuscar[0].MúsicasList[IDs]
    RetornarDados()
  }
  // Trás Música
  function Tras() {
    var IDs = this.className
    IDs--
    document.getElementById("Trás").className = IDs
    document.getElementById("Frente").className = IDs
    ORIGINAL.src = APIBuscar[0].MúsicasList[IDs]
    RetornarDados()
  }

// Play e Pause Event
document.getElementById("BtnPauseEvent").addEventListener("click", function () {
    ORIGINAL.pause();
    document.getElementById("BtnPauseEvent").style.display = "none";
    document.getElementById("BtnPlayEvent").style.display = "inline-block";
});

document.getElementById("BtnPlayEvent").addEventListener("click", function () {
    ORIGINAL.play();
    document.getElementById("BtnPauseEvent").style.display = "inline-block";
    document.getElementById("BtnPlayEvent").style.display = "none";
});

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

// Recomeçar Function
Recomeçar.addEventListener("click", function () {
    document
      .querySelectorAll("audio")
      .forEach((el) => (el.currentTime = 0));
  });
  // Mais 5 Function
  Mais5.addEventListener("click", function () {
    document
      .querySelectorAll("audio")
      .forEach((el) => (el.currentTime += 1));
  });
  // Menos 5 Function
  Menos5.addEventListener("click", function () {
    document
      .querySelectorAll("audio")
      .forEach((el) => (el.currentTime -= 1));
  });