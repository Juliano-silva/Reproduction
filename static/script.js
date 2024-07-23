var Musicas = document.getElementById("Musicas");
var API_KEY = "36367067-43a20686ec62df15e47b5919d";
var Diva = document.createElement("div");
var TituloError = document.createElement("h1");
var Edit = document.createElement("button");
var Remove = document.createElement("button")
var Image_sidebar = document.createElement("img")
var Titulo_sidebar = document.createElement("h1")

function Abrir_Player() {
  document.getElementById("InfoMini").style.display = "none"
  document.getElementById("MusicaPrincipal").style.display = "block";
}

function Carregar_Fetch(Url) {
  fetch(`${Url}`).then(function (response) {
    response.json().then((data) => {
      var MinhasMusicas = JSON.parse(JSON.stringify(data));
      for (var i = 0; i < MinhasMusicas.length; i++) {
        // Sobre a Api
        var Api_Titulo = MinhasMusicas[i].titulo
        var Api_Image = MinhasMusicas[i].Image
        var Api_Id = MinhasMusicas[i].id
        var Api_Url = MinhasMusicas[i].url
        var Api_Letra = MinhasMusicas[i].Letra
        var Api_Artista = MinhasMusicas[i].Artista

        // Creates Elements
        var Titulo = document.createElement("h1");
        var Box = document.createElement("div");
        var music = document.createElement("audio");
        var PlayePause = document.createElement("input");
        var LabelPlayePause = document.createElement("label");
        var CaixadeTexto = document.createElement("div");
        var s = document.createElement("button");
        var Image = document.createElement("img");
        var InputDiv = document.createElement("div");
        var IDNum = document.createElement("h3");
        var Dados = document.createElement("h2");
        var Letra = document.createElement("h3");
        var Escolhas = document.createElement("button")
        // Get Elements e Querys
        var ORIGINAL = document.getElementById("ORIGINAL");
        var FecharPrincipal = document.getElementById("FecharPrincipal");
        var Frente = document.getElementById("FrenteP")
        var Tras = document.getElementById("TrásP")
        var ImagesPrincipal = document.querySelector("div#ImagesPrincipal");
        var TPImage = document.querySelector("img#TPImage");
        var Add_Config = document.getElementById("Add_Config")
        var Letra_btn = document.getElementById("Letra_Btn")
        var Normal_Button = document.getElementById("Normal")
        var Recomeçar_Button = document.getElementById("Recomecar")
        var Random = document.getElementById("Random")
        var Playlist_btn = document.getElementById("Playlist_Btn")
        // Ids e Class
        var Id = i;
        Dados.id = `Dados${Id}`
        Letra.id = `LetraMusic${Id}`;
        Letra.className = `LetraMusic`;
        PlayePause.id = `PPause${Id}`;
        Image.id = `Image${Id}`;
        LabelPlayePause.id = `Labeis${Id}`;
        LabelPlayePause.classList = "LabelPlayePause";
        LabelPlayePause.setAttribute("for", `PPause${Id}`);
        Titulo.id = `Titulos${Id}`;
        s.id = `${Id}`;
        IDNum.innerHTML = Id;
        IDNum.id = "IDss";
        Escolhas.id = i
        CaixadeTexto.id = `CaixaTexto`;
        InputDiv.id = "InputDiv";
        Box.id = `Boxs`;
        Image.className = "Image";
        music.id = `Music${Id}`;
        Remove.classList = Edit.classList = Api_Id;
        Remove.id = Edit.id = i;
        Dados.innerText = Api_Artista
        Letra.innerText = Api_Letra

        // Estilos Button

        Normal_Button.addEventListener("click", function () {
          Normal_Button.style.display = "none"
          Recomeçar_Button.style.display = "block"
          Random.style.display = "none"
          localStorage.setItem("Escolha_Estilo", "Normal")
        })

        Recomeçar_Button.addEventListener("click", function () {
          Normal_Button.style.display = "none"
          Recomeçar_Button.style.display = "none"
          Random.style.display = "block"
          localStorage.setItem("Escolha_Estilo", "Recomeçar")
        })

        Random.addEventListener("click", function () {
          Normal_Button.style.display = "block"
          Recomeçar_Button.style.display = "none"
          Random.style.display = "none"
          localStorage.setItem("Escolha_Estilo", "Random")
        })

        // Edit Function
        Edit.innerText = "Editar"
        Edit.addEventListener("click", function () {
          var Id = this.id
          var BuscarImage = document.getElementById(`Image${Id}`).src
          var BuscarTitulo = document.getElementById(`Titulos${Id}`).innerText
          var BuscarArtista = document.getElementById(`Dados${Id}`).innerText
          var BuscarLetra = document.getElementById(`LetraMusic${Id}`).innerText
          document.getElementById("Sidebar_Config").style.display = "none"
          Btn_Edit.classList = this.classList
          MyEdit_NameMusic.value = BuscarTitulo
          MyEdit_Artisc.value = BuscarArtista
          MyEdit_Letra.value = BuscarLetra
          MyEdit_Img.value = BuscarImage
          document.getElementById("MyEdit").style.display = "block"
        })

        // Remove Function
        Remove.innerText = "Remover"
        Remove.addEventListener("click", function () {
          var Id = this.className
          location.reload()
          $.ajax({
            url: '/Removendo',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ 'value': Id, "Titulo": this.id })
          });
        })

        //Thumb Gerada
        $("label.LabelPlayePause").on("click", function () {
          var Id = parseInt($(this).attr("id").replace("Labeis", ""));
          // Escolher Imagem
          ImagesPrincipal.style.backgroundImage = `url('${MinhasMusicas[Id].Image}')`
          TPImage.src = MinhasMusicas[Id].Image
        });
        Image.src = MinhasMusicas[Id].Image

        // Titulo
        Titulo.innerHTML = String(Api_Titulo).replace(/\.[^/.]+$/, "");
        // Play e Pause Function
        var Contador = localStorage.getItem("Tocandas");
        if (Contador < 0 || Contador === null) {
          var count = 0;
        } else {
          var count = Contador;
        }
        // Pausar e Play Function
        var Pause2 = document.getElementById("Pausar2");
        var Play2 = document.getElementById("play2");
        Pause2.addEventListener("click", function () {
          document.querySelectorAll("audio").forEach((el) => el.pause());
          Play2.style.display = "flex";
          Pause2.style.display = "none";
        });
        Play2.addEventListener("click", function () {
          document.querySelectorAll("audio").forEach((el) => el.play());
          Play2.style.display = "none";
          Pause2.style.display = "flex";
        });
        // Play e Pause Event
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
        // Escolha Config
        Escolhas.addEventListener("click", function () {
          var Verificar = document.getElementById("Sidebar_Config")
          var Verifcar_Ativo = window.getComputedStyle(Verificar).getPropertyValue("display")
          if (Verifcar_Ativo == "none") {
            Verificar.style.display = "block"
            Image_sidebar.src = data[this.id].Image
            Titulo_sidebar.innerText = data[this.id].titulo
            document.getElementById("Sidebar_Escolha").append(Image_sidebar, Titulo_sidebar)
          } else {
            Verificar.style.display = "none"
          }
        })
        // Barra de Progressão
        var progressed = document.getElementById("progressed");
        var progressed2 = document.getElementById("progressed2");
        var progress_bar = document.getElementById("progress_bar");
        var progress_bar2 = document.getElementById("progress_bar2");

        ORIGINAL.ontimeupdate = function () {
          progressed.style.width = Math.floor((ORIGINAL.currentTime * 100) / ORIGINAL.duration) + "%";
          progressed2.style.width = Math.floor((ORIGINAL.currentTime * 100) / ORIGINAL.duration) + "%";
        };

        progress_bar.onclick = function (e) {
          ORIGINAL.currentTime = (e.offsetX / progress_bar.offsetWidth) * ORIGINAL.duration;
        };

        progress_bar2.onclick = function (e) {
          ORIGINAL.currentTime = (e.offsetX / progress_bar2.offsetWidth) * ORIGINAL.duration;
        }
        // Função Principal do Scipt (Play,Pause,Tocandas)
        PlayePause.type = "checkbox";

        PlayePause.addEventListener("click", function () {
          localStorage.setItem("Tocandas", count);
          count++;
          // Junção
          var MusicIDs = this.id.replace("PPause", "");
          var Junção = `/music/${MinhasMusicas[MusicIDs].titulo}`;
          FecharPrincipal.addEventListener("click", function () {
            document.getElementById("MusicaPrincipal").style.display = "none";
            document.getElementById("InfoMini").style.display = "block";
          });

          // Random Music Function
          document.getElementById("Randomizar").addEventListener("click", function () {
            var MusicRandom = Math.floor(Math.random() * MinhasMusicas.length);
            ORIGINAL.src = `/music/${MinhasMusicas[MusicRandom].titulo}`;
            ORIGINAL.play();
            document.getElementById("TP_Name").innerHTML = String(MinhasMusicas[MusicRandom].titulo).replace(".mp4", "")
            document.getElementById("TP_Artista").innerHTML = MinhasMusicas[MusicRandom].Artista
            document.getElementById("TPImage").src = MinhasMusicas[MusicRandom].Image
          })

          Letra_btn.classList = Playlist_btn.classList = MusicIDs
          if (document.getElementById(this.id).checked == true) {
            ORIGINAL.src = Junção;
            ORIGINAL.play();
            // Tempo da música
            ORIGINAL.addEventListener("loadedmetadata", function () {
              duration = ORIGINAL.duration;
            });
            var BuscarMusicIds = MinhasMusicas[MusicIDs].titulo;
            document.getElementById("MusicaPrincipal").style.display = "block";
            const parent = String(BuscarMusicIds).replace(".mp4", "");
            const Author = document.getElementById(`Dados${MusicIDs}`).innerText;
            TextosPrincipal.innerText = parent;
            ArtistaPrincipal.innerHTML = Author;
            document.getElementById("ImagesPrincipal").style.backgroundImage = `url('${MinhasMusicas[MusicIDs].Image}')`
            document.getElementById("TPImage").src = MinhasMusicas[MusicIDs].Image
            document.getElementById("TP_Name").innerHTML = String(BuscarMusicIds).replace(".mp4", "");
            document.getElementById("TP_Artista").innerHTML = MinhasMusicas[MusicIDs].Artista
          } else {
            ORIGINAL.pause();
            document.getElementById("MusicaPrincipal").style.display = "none";
          }

          function Escolhas_Reproduction(Escolha, MusicIDs) {
            var Id_Music = parseInt(MusicIDs)
            var Tamanho = parseInt(MinhasMusicas.length)
            localStorage.setItem("Tocandas", count);
            count++;

            function RetornarDados(Id) {
              var BuscarMusicIds = MinhasMusicas[Id].titulo;
              document.getElementById("TextosPrincipal").innerHTML = String(BuscarMusicIds).replace(".mp4", "");
              document.getElementById("TP_Name").innerHTML = String(BuscarMusicIds).replace(".mp4", "");
              document.getElementById("TP_Artista").innerHTML = document.getElementById(`Dados${MusicIDs}`).innerText;
              document.getElementById("ArtistaPrincipal").innerHTML = document.getElementById(`Dados${MusicIDs}`).innerText;
              ORIGINAL.play();
            }

            function MusicsIds(ID_Atual) {
              ORIGINAL.src = `/music/${MinhasMusicas[ID_Atual].titulo}`;
              ImagesPrincipal.style.backgroundImage = `url('${MinhasMusicas[ID_Atual].Image}')`
              TPImage.src = MinhasMusicas[ID_Atual].Image
              document.querySelectorAll("#Playlist_List > li").forEach((el) => (el.id = `${ID_Atual}`));
            }

            if (Escolha == "Frente") {
              if (Id_Music < Tamanho) {
                MusicsIds(Id_Music)
                RetornarDados(Id_Music);
              }
            } else {
              MusicsIds(Id_Music)
              RetornarDados(Id_Music);
            }
            Letra_btn.className = Playlist_btn.className = MusicIDs
          }

          function Frente_Event() {
            var Random = Math.floor(Math.random() * MinhasMusicas.length)
            var Estilo = localStorage.getItem("Escolha_Estilo")
            if (MusicIDs >= parseInt(MinhasMusicas.length)) {
              MusicIDs = parseInt(0)
            } else {
              MusicIDs++
            }
            var Escolha = "Frente"
            if (Estilo == "Random") {
              var Id = Random
            } else {
              var Id = MusicIDs
            }
            Escolhas_Reproduction(Escolha, Id)
          }

          function Tipos_Retornos() {
            var Estilo = localStorage.getItem("Escolha_Estilo")
            if (Estilo == "Random") {
              var MusicRandom = Math.floor(Math.random() * MinhasMusicas.length);
              var BuscarMusicIds = MinhasMusicas[MusicRandom].titulo;
              ORIGINAL.addEventListener("ended", function () {
                document.getElementById("TextosPrincipal").innerHTML = String(BuscarMusicIds).replace(".mp4", "");
                document.getElementById("TP_Name").innerHTML = String(BuscarMusicIds).replace(".mp4", "");
                document.getElementById("TP_Artista").innerHTML = document.getElementById(`Dados${MusicRandom}`).innerText;
                document.getElementById("ArtistaPrincipal").innerHTML = document.getElementById(`Dados${MusicRandom}`).innerText;
                ORIGINAL.src = `/music/${BuscarMusicIds}`;
                ImagesPrincipal.style.backgroundImage = `url('${MinhasMusicas[MusicRandom].Image}')`
                ORIGINAL.play();
              })
            } else if (Estilo == "Recomeçar") {
              ORIGINAL.addEventListener("ended", function () {
                ORIGINAL.src = `/music/${ORIGINAL.src}`;
                ORIGINAL.play()
              })
            } else {
              ORIGINAL.addEventListener("ended", function (event) { Frente_Event() })
            }
            Frente.addEventListener("click", function (event) { Frente_Event() })
            document.getElementById("Frente").addEventListener("click", function (event) { Frente_Event() })
            Tras.addEventListener("click", function (event) { Tras_Event() })
            document.getElementById("Trás").addEventListener("click", function (event) { Tras_Event() })
          }

          if (localStorage.Escolha_Estilo) {
            Tipos_Retornos()
          } else {
            ORIGINAL.addEventListener("ended", function (event) { Frente_Event() })
            Frente.addEventListener("click", function (event) { Frente_Event() })
            document.getElementById("Frente").addEventListener("click", function (event) { Frente_Event() })
            Tras.addEventListener("click", function (event) { Tras_Event() })
            document.getElementById("Trás").addEventListener("click", function (event) { Tras_Event() })
          }
          function Tras_Event() {
            if (MusicIDs <= 0) {
              MusicIDs = parseInt(0)
            } else {
              MusicIDs--
            }

            var Escolha = "Tras"
            var Id = MusicIDs
            Escolhas_Reproduction(Escolha, Id)
          }
        });
        // Append
        InputDiv.append(Escolhas);
        Add_Config.append(Remove, Edit)
        CaixadeTexto.append(Titulo, Dados, Letra, InputDiv);
        Box.append(IDNum, PlayePause, Image, CaixadeTexto, music);
        LabelPlayePause.append(Box);
        Musicas.append(LabelPlayePause);
      }
    });
  });
}

Carregar_Fetch("/DadosMusic")

document.getElementById("Btn_Edit").addEventListener("click", function () {
  var Id = this.className;
  $.ajax({
    url: '/Editar',
    type: 'POST',
    contentType: 'application/json',
    data: JSON.stringify({ 'value': Id, "Nome": MyEdit_NameMusic.value, "Letra": MyEdit_Letra.value, "Image": MyEdit_Img.value, "Artista": MyEdit_Artisc.value })
  });
})

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

// Normal Velocidade Btn
var PlayBack = document.getElementById("PlayBack");
function Normal_Velocidade() {
  document.querySelectorAll("audio").forEach((el) => (el.playbackRate = 1));
  document.getElementById("PlayBack").value = "5";
}

PlayBack.addEventListener("change", function () {
  var ValorPlay = PlayBack.value;
  document.querySelectorAll("audio").forEach((el) => (el.playbackRate = ValorPlay));
});

// Normal Volume Btn
var NormalVolume = document.getElementById("NormalVolume");
function Normal_Volume() {
  Volume.value = "0.5";
  document.querySelectorAll("audio").forEach((el) => (el.volume = "0.5"));
}

// Volume Function
Volume.addEventListener("change", function () {
  var VolumeValor = Volume.value;
  document.querySelectorAll("audio").forEach((el) => (el.volume = VolumeValor));
});

// Search
document.getElementById("Search").addEventListener("keyup", function () {
  var Filtar = document.getElementById("Search").value;
  var BodyFiltar = document.getElementById("Musicas");
  var Linhas = BodyFiltar.getElementsByTagName("label");
  for (let position in Linhas) {
    if (true === isNaN(position)) {
      continue;
    }
    let ConteudoLinhas = Linhas[position].innerHTML;

    if (true === ConteudoLinhas.toLowerCase().includes(Filtar)) {
      Linhas[position].style.display = "";
    } else {
      Linhas[position].style.display = "none";
    }
  }
});

// Body Resetar
function Retornar(Conteudo) {
  var Fechar = document.createElement("button")
  Fechar.innerText = "✖"
  Fechar.id = "FecharPrincipal"
  Fechar.addEventListener("click", function () {
    document.getElementById(Conteudo).style.display = "none"
  })
  document.getElementById(Conteudo).append(Fechar)
}


// Letra de Música Ativa

document.getElementById("Letra_Btn").addEventListener("click", function () {
  document.getElementById("Conteudo_Letra_Musica").style.display = "block"
  document.getElementById("Conteudo_Letra_Musica").innerHTML = ""
  Retornar("Conteudo_Letra_Musica")
  var Id = this.className
  fetch(`/DadosMusic`).then(function (response) {
    response.json().then((data) => {
      var Caixa = document.createElement("div")
      var Titulo = document.createElement("h1")
      var Sub_Titulo = document.createElement("h6")
      var Letra = document.createElement("p")
      Titulo.innerText = String(data[Id].titulo).replace(".mp4", "");
      Sub_Titulo.innerText = data[Id].Artista
      Letra.innerText = data[Id].Letra
      Caixa.id = "Letra_Button_Body"
      Caixa.append(Titulo, Sub_Titulo, Letra)
      document.getElementById("Conteudo_Letra_Musica").append(Caixa)
    })
  })
})

// Adicionar uma Playlist
document.getElementById("Playlist_Btn").addEventListener("click", function () {
  document.getElementById("Conteudo_Playlist").style.display = "flex"
  document.getElementById("Conteudo_Playlist").innerHTML = ""
  var ID_Playlist = this.className
  Retornar("Conteudo_Playlist")
  var Out_Caixa = document.createElement("div")
  var Out_Caixa2 = document.createElement("div")
  Out_Caixa.id = "Caixa_Principal"
  Out_Caixa2.id = "Caixa_Principal2"
  fetch("/PlaylistSearch").then(function (response) {
    response.json().then((data) => {
      for (var i = 0; i < data.length; i++) {
        if (data[i].titulo != "") {
          var Caixa = document.createElement("div")
          var Add = document.createElement("button")
          var Titulo = document.createElement("h1")
          Add.innerText = "+"
          Titulo.innerText = data[i].titulo
          Titulo.id = `Caixa_Titulo${i}`
          Add.id = `Add_Titulo${i}`
          Caixa.append(Titulo, Add)
          Caixa.id = `Button_Playlist_Hover${i}`
          Caixa.style.backgroundImage = `url(${data[i].Image})`
          Caixa.className = "Playlist_Button_Body"

          Caixa.addEventListener("click", function () {
            var Id_Replace = String(this.id).replace("Button_Playlist_Hover", "")
            var Conteudo = document.getElementById(`Caixa_Titulo${Id_Replace}`)
            fetch("/DadosMusic").then(function (response) {
              response.json().then((data) => {
                $.ajax({
                  url: '/PlaylistItem',
                  type: 'POST',
                  contentType: 'application/json',
                  data: JSON.stringify({ 'value': String(data[ID_Playlist].titulo), "Id": String(Conteudo.innerText) })
                });
              })
            })
          })

          Caixa.addEventListener("mouseover", function () {
            var Id = String(this.id).replace("Button_Playlist_Hover", "")
            document.getElementById(`Caixa_Titulo${Id}`).style.display = "block"
            document.getElementById(`Add_Titulo${Id}`).style.display = "block"
            document.getElementById(`${this.id}`).style.background = "radial-gradient(151.92% 127.02% at 15.32% 21.04%, rgba(165, 239, 255, 0.20) 0%, rgba(110, 191, 244, 0.04) 77.08%, rgba(70, 144, 212, 0.00) 100%)"
          })

          Caixa.addEventListener("mouseout", function () {
            var Id = String(this.id).replace("Button_Playlist_Hover", "")
            document.getElementById(`Caixa_Titulo${Id}`).style.display = "none"
            document.getElementById(`Add_Titulo${Id}`).style.display = "none"
            document.getElementById(`${this.id}`).style.backgroundImage = `url(${data[Id].Image})`
            document.getElementById(`${this.id}`).style.backgroundRepeat = "no-repeat"
            document.getElementById(`${this.id}`).style.backgroundPosition = "center"
            document.getElementById(`${this.id}`).style.backgroundSize = "cover"
          })
          Out_Caixa.append(Caixa)
          Out_Caixa2.append(Out_Caixa)
          document.getElementById("Conteudo_Playlist").append(Out_Caixa2)
        }
      }
    })
  })
})



// Background
if (localStorage.BackgroundEscolhido) {
  document.querySelector("body").style.backgroundImage = `url(${localStorage.getItem("BackgroundEscolhido")})`;
}
