var array = [];
var DadosList = [];
var EditList = [];
var Musicas = document.getElementById("Musicas");
var API_KEY = "36367067-43a20686ec62df15e47b5919d";
var Diva = document.createElement("div");
var TituloError = document.createElement("h1");

function Abrir_Player() {
  document.getElementById("InfoMini").style.display = "none"
  document.getElementById("MusicaPrincipal").style.display = "block";
}

fetch("/DadosMusic").then(function (response) {
  response.json().then((data) => {
    var MinhasMusicas = JSON.parse(JSON.stringify(data));
    for (var i = 0; i < MinhasMusicas.length; i++) {
      // About API
      var Api_Titulo = MinhasMusicas[i].titulo
      var Api_Image = MinhasMusicas[i].Image
      var Api_Id = MinhasMusicas[i].id
      var Api_Url = MinhasMusicas[i].url
      var Api_Letra = MinhasMusicas[i].Letra
      var Api_Artista = MinhasMusicas[i].Artista

      DadosList.push(Api_Titulo)
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
      var Dots = document.createElement("button")
      var Remove = document.createElement("button");
      var Edit = document.createElement("button");
      var IDNum = document.createElement("h3");
      var Dados = document.createElement("h2");
      var Letra = document.createElement("h3");
      // Get Elements
      var Recomeçar = document.getElementById("Recomeçar");
      var Mais5 = document.getElementById("Mais5");
      var Menos5 = document.getElementById("Menos5");
      var Volume = document.getElementById("Volume");
      var MuteeDismute = document.getElementById("MuteeDismute");
      var BtnMute = document.getElementById("BtnMute");
      var BtnVolume = document.getElementById("BtnVolume");
      var Randomizando = document.getElementById("Randomizando");
      var Playlist_Div = document.getElementById("PlaylistHome")
      var ORIGINAL = document.getElementById("ORIGINAL");
      var FecharPrincipal = document.getElementById("FecharPrincipal");
      var NormalBtn = document.getElementById("NormalBtn")
      var RandomBtn = document.getElementById("RandomBtn")
      var LoopBtn = document.getElementById("RecomecarBtn")

      var Id = i;
      Dados.id = `Dados${Id}`
      Letra.id = `LetraMusic${Id}`;
      Letra.className = `LetraMusic`;
      Dados.innerText = Api_Artista
      Letra.innerText = Api_Letra

      // Caixa de Texto
      CaixadeTexto.id = `CaixaTexto`;
      // ID Num
      IDNum.innerHTML = Id;
      IDNum.id = "IDss";
      // Remove e Editar
      Remove.classList = Edit.classList = Api_Id;
      Remove.id = Edit.id = i;
      InputDiv.id = "InputDiv";

      // Edit Function
      Edit.addEventListener("click", function () {
        var Id = this.id
        var BuscarImage = document.getElementById(`Image${Id}`).src
        var BuscarTitulo = document.getElementById(`Titulos${Id}`).innerText
        var BuscarArtista = document.getElementById(`Dados${Id}`).innerText
        var BuscarLetra = document.getElementById(`LetraMusic${Id}`).innerText
        Btn_Edit.classList = this.classList
        MyEdit_NameMusic.value = BuscarTitulo
        MyEdit_Artisc.value = BuscarArtista
        MyEdit_Letra.value = BuscarLetra
        MyEdit_Img.value = BuscarImage
        document.getElementById("MyEdit").style.display = "block"
      })


      // Remove Function
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

      Image.id = `Image${Id}`;
      Image.className = "Image";
      var ImagesPrincipal = document.querySelector("img#ImagesPrincipal");
      var TPImage = document.querySelector("img#TPImage");
      $("label.LabelPlayePause").on("click", function () {
        var Id = parseInt($(this).attr("id").replace("Labeis", ""));
        // Escolher Imagem
        ImagesPrincipal.src = TPImage.src = MinhasMusicas[Id].Image;
      });
      Image.src = MinhasMusicas[Id].Image

      // Titulo
      Titulo.innerHTML = String(Api_Titulo).replace(/\.[^/.]+$/, "");
      array.push(Api_Titulo);
      Titulo.id = `Titulos${Id}`;
      s.id = `${Id}`;
      // Box
      Box.id = `Boxs`;
      // music
      music.id = `Music${Id}`;
      // Play e Pause
      PlayePause.type = "checkbox";
      PlayePause.id = `PPause${Id}`;
      // Icone
      LabelPlayePause.setAttribute("for", `PPause${Id}`);
      LabelPlayePause.id = `Labeis${Id}`;
      LabelPlayePause.classList = "LabelPlayePause";
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

      // Play e Pause Function
      var Contador = localStorage.getItem("Tocandas");
      if (Contador < 0 || Contador === null) {
        var count = 0;
      } else {
        var count = Contador;
      }
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
      // Volume Function
      Volume.addEventListener("change", function () {
        var VolumeValor = Volume.value;
        document.querySelectorAll("audio").forEach((el) => (el.volume = VolumeValor));
      });
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
          document
            .querySelectorAll("audio")
            .forEach((el) => (el.muted = false));
          BtnMute.style.display = "none";
          BtnVolume.style.display = "inline-block";
        }
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


      // Barra de Progressão
      var progressed = document.getElementById("progressed");
      var progress_bar = document.getElementById("progress_bar");

      ORIGINAL.ontimeupdate = function () {
        progressed.style.width =
          Math.floor((ORIGINAL.currentTime * 100) / ORIGINAL.duration) + "%";
      };

      progress_bar.onclick = function (e) {
        ORIGINAL.currentTime =
          (e.offsetX / progress_bar.offsetWidth) * ORIGINAL.duration;
      };

      // Random Music
      Randomizando.addEventListener("click", function () {
        var MusicRandom = Math.floor(
          Math.random() * MinhasMusicas.length
        );
        ORIGINAL.src = `/music/${MinhasMusicas[MusicRandom].titulo}`;
        ORIGINAL.play();
        document.getElementById("TP_Name").innerHTML =
          MinhasMusicas[MusicRandom].titulo
      });

      // Função Principal do Scipt (Play,Pause,Tocandas)
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


        if (document.getElementById(this.id).checked == true) {
          ORIGINAL.src = Junção;
          document.getElementById("PlaylistHome").classList = this.id
          var Tamanho = parseInt(MinhasMusicas.length) - 1;
          ORIGINAL.play();
          // Tempo da música
          ORIGINAL.addEventListener("loadedmetadata", function () {
            duration = ORIGINAL.duration;
          });
          var BuscarMusicIds = MinhasMusicas[MusicIDs].titulo;
          document.getElementById("MusicaPrincipal").style.display = "block";
          const parent = String(BuscarMusicIds).replace(".mp4","");
          const Author = document.getElementById(`Dados${MusicIDs}`).innerText;
          const LetraId = document.getElementById(`LetraMusic${MusicIDs}`).innerText;
          TextosPrincipal.innerText = parent;
          ArtistaPrincipal.innerHTML = Author;
          LetraMusics.innerHTML = LetraId;
          document.getElementById("ImagesPrincipal").src = MinhasMusicas[MusicIDs].Image
          document.getElementById("TPImage").src = MinhasMusicas[MusicIDs].Image
          document.getElementById("TP_Name").innerHTML = BuscarMusicIds;
        } else {
          ORIGINAL.pause();
          document.getElementById("MusicaPrincipal").style.display = "none";
        }

        // Passar Próxima e Frente Event
        document.getElementById("Frente").addEventListener("click", Frente);
        document.getElementById("FrenteP").addEventListener("click", Frente);
        document.getElementById("TrásP").addEventListener("click", Tras);
        document.getElementById("Trás").addEventListener("click", Tras);


        if (localStorage.Escolha) {
          var Escolha = localStorage.getItem("Escolha")
        }

        if (Escolha == "Normal") {
          ORIGINAL.addEventListener("ended", Frente);
        } else if (Escolha == "Random") {
          ORIGINAL.addEventListener("ended", FrenteRandom);
        } else if (Escolha == "Loop") {
          ORIGINAL.addEventListener("ended", FrenteLoop);
        } else {
          ORIGINAL.addEventListener("ended", Frente);
        }

        NormalBtn.addEventListener("click", function () {
          localStorage.setItem("Escolha", "Normal")
          NormalBtn.style.display = "none"
          RandomBtn.style.display = "block"
          LoopBtn.style.display = "none"
        })

        RandomBtn.addEventListener("click", function () {
          localStorage.setItem("Escolha", "Random")
          NormalBtn.style.display = "none"
          RandomBtn.style.display = "none"
          LoopBtn.style.display = "block"
        })

        LoopBtn.addEventListener("click", function () {
          localStorage.setItem("Escolha", "Loop")
          NormalBtn.style.display = "block"
          RandomBtn.style.display = "none"
          LoopBtn.style.display = "none"
        })

        function RetornarDados() {
          var BuscarMusicIds = MinhasMusicas[MusicIDs].titulo;
          document.getElementById("TextosPrincipal").innerHTML = String(BuscarMusicIds).replace(".mp4","");
          document.getElementById("TP_Name").innerHTML = BuscarMusicIds;
          document.getElementById("ArtistaPrincipal").innerHTML =
            document.getElementById(`Dados${MusicIDs}`).innerText;
          document.getElementById("LetraMusics").innerHTML =
            document.getElementById(`LetraMusic${MusicIDs}`).innerText;
          ORIGINAL.play();
        }

        function FrenteRandom() {
          localStorage.setItem("Tocandas", count);
          count++;
          if (MusicIDs < Tamanho) {
            MusicIDs = Math.floor(Math.random() * MinhasMusicas.length);
            ORIGINAL.src = `/music/${MinhasMusicas[MusicIDs].titulo}`;
            ImagesPrincipal.src = TPImage.src = MinhasMusicas[MusicIDs].Image;
            document
              .querySelectorAll("#Playlist_List > li")
              .forEach((el) => (el.id = `${MusicIDs}`));
          } else {
            MusicIDs = Math.floor(Math.random() * MinhasMusicas.length);
            ORIGINAL.src = `/music/${MinhasMusicas[MusicIDs = 0].titulo}`;
            ImagesPrincipal.src = TPImage.src = MinhasMusicas[MusicIDs = 0].Image;
            document.querySelectorAll("#Playlist_List > li").forEach((el) => (el.id = `${MusicIDs}`));
          }
          RetornarDados();
        }

        function FrenteLoop() {
          localStorage.setItem("Tocandas", count);
          count++;
          ORIGINAL.src = `/music/${MinhasMusicas[MusicIDs].titulo}`;
          ImagesPrincipal.src = TPImage.src = MinhasMusicas[MusicIDs].Image;
          RetornarDados();
        }

        // Próxima Música
        function Frente() {
          localStorage.setItem("Tocandas", count);
          count++;
          if (MusicIDs < Tamanho) {
            MusicIDs++;
            ORIGINAL.src = `/music/${MinhasMusicas[MusicIDs].titulo}`;
            ImagesPrincipal.src = TPImage.src = MinhasMusicas[MusicIDs].Image;
            document
              .querySelectorAll("#Playlist_List > li")
              .forEach((el) => (el.id = `${MusicIDs}`));
          } else {
            MusicIDs++;
            ORIGINAL.src = `/music/${MinhasMusicas[MusicIDs = 0].titulo}`;
            ImagesPrincipal.src = TPImage.src = MinhasMusicas[MusicIDs = 0].Image;
            document
              .querySelectorAll("#Playlist_List > li")
              .forEach((el) => (el.id = `${MusicIDs}`));
          }
          RetornarDados();
        }
        // Trás Música
        function Tras() {
          localStorage.setItem("Tocandas", count);
          count++;
          if (MusicIDs > 0) {
            MusicIDs--;
            ORIGINAL.src = `/music/${MinhasMusicas[MusicIDs].titulo}`;
            ImagesPrincipal.src = TPImage.src = MinhasMusicas[MusicIDs].Image;
            document
              .querySelectorAll("#Playlist_List > li")
              .forEach((el) => (el.id = `${MusicIDs}`));
          } else {
            ORIGINAL.src = `/music/${MinhasMusicas[MusicIDs = 0].titulo}`;
            ImagesPrincipal.src = TPImage.src = MinhasMusicas[MusicIDs = 0].Image;
            document
              .querySelectorAll("#Playlist_List > li")
              .forEach((el) => (el.id = `${MusicIDs}`));
          }
          RetornarDados();
        }
      });
      // Append
      InputDiv.append(Remove,Edit);
      CaixadeTexto.append(Titulo, Dados, Letra, InputDiv);
      Box.append(IDNum, PlayePause, Image, CaixadeTexto, music);
      LabelPlayePause.append(Box);
      Musicas.append(LabelPlayePause);
    }
  });
});

// Playlist

document.getElementById("Btn_Edit").addEventListener("click", function () {
  var Id = this.className;
  $.ajax({
    url: '/Editar',
    type: 'POST',
    contentType: 'application/json',
    data: JSON.stringify({ 'value': Id, "Nome": MyEdit_NameMusic.value, "Letra": MyEdit_Letra.value, "Image": MyEdit_Img.value, "Artista": MyEdit_Artisc.value })
  });
})


// fetch("/PlaylistSearch").then(function (response) {
//   response.json().then((data) => {
//     for (var i = 0; i <= data.length; i++) {
//       var Titulo = document.createElement("h1")
//       Titulo.innerText = Titulo.id = data[i].titulo
//       Titulo.addEventListener("click", function () {
//         var Id = document.getElementById("PlaylistHome").className
//         var Buscar = this.id
//         fetch("/DadosMusic").then(function (response) {
//           response.json().then((data) => {
//             var Id_Replace = String(Id).replace("PPause", "")
//             console.log(Buscar);
//             $.ajax({
//               url: '/PlaylistItem',
//               type: 'POST',
//               contentType: 'application/json',
//               data: JSON.stringify({ 'value': data[Id_Replace].titulo, "Id": Buscar })
//             });
//           })
//         })
//       })
//       document.getElementById("PlaylistHome").append(Titulo)
//     }
//   })
// })

// Background
if (localStorage.BackgroundEscolhido) {
  document.querySelector("body").style.backgroundImage = `url(${localStorage.getItem("BackgroundEscolhido")})`;
}

// Abrir e Fechar Playlist e Letra

function Click_Playlist() {
  document.getElementById("PlaylistHome").style.display = "block"
  document.getElementById("LetraMusics").style.display = "none"
}

function Click_Letra() {
  document.getElementById("PlaylistHome").style.display = "none"
  document.getElementById("LetraMusics").style.display = "block"
}