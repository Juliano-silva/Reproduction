var array = [];
var DadosList = [];
var EditList = [];
var Musicas = document.getElementById("Musicas");
var API_KEY = "36367067-43a20686ec62df15e47b5919d";
var Diva = document.createElement("div");
var TituloError = document.createElement("h1");

fetch("/DadosMusic").then(function (response) {
  response.json().then((data) => {
    var MinhasMusicas = JSON.parse(JSON.stringify(data));
    for (var i = 0; i < MinhasMusicas.Name_Music.length; i++) {
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
      var Remove = document.createElement("input");
      var Edit = document.createElement("input");
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
      var ORIGINAL = document.getElementById("ORIGINAL");
      var FecharPrincipal = document.getElementById("FecharPrincipal");
      // Chave da Api do VAGALUME
      var Key = "666888f22b401b1859e2d405495c47ee"

      var NomesMusicas = MinhasMusicas.Name_Music[i];
      var NomeVagalume = NomesMusicas.replace(/\s/g, '%20').replace(/\.[^/.]+$/, "")

      const VagalumeLetra = () => {
        URLMUSICA = `https://api.vagalume.com.br/search.excerpt?apikey=${Key}&q=${NomeVagalume}`
        fetch(URLMUSICA).then((response) => response.json().then(async (dados) => {
          var LINKVAGALUME = "https://api.vagalume.com.br/search.php" + "?art=" + dados?.response?.docs[0]?.band + "&mus=" + dados?.response?.docs[0]?.title + `&apikey=${Key}`
          const respose = await fetch(LINKVAGALUME)
          const jsonData = await respose.json()
          DadosList.push({
            "Artista":jsonData?.art?.name,
            "Letra":jsonData?.mus[0].text
          })
          localStorage.setItem("Vagalume",JSON.stringify(DadosList))
        }))
    }
    VagalumeLetra()

    var Id = i;
    Dados.id = `Dados${Id}`
    Letra.id = `LetraMusic${Id}`;
    Letra.className = `LetraMusic`;

    Dados.innerText = JSON.parse(localStorage.getItem("Vagalume"))[i]?.Artista
    Letra.innerText = JSON.parse(localStorage.getItem("Vagalume"))[i]?.Letra

    // Caixa de Texto
      CaixadeTexto.id = `CaixaTexto`;
      // ID Num
      IDNum.innerHTML = Id;
      IDNum.id = "IDss";
      // Remove
      Remove.type = "submit";
      Remove.classList = i;
      Remove.id = MinhasMusicas.Name_Music[i];
      // Edit
      Edit.type = "submit";
      Edit.classList = i;
      Edit.id = MinhasMusicas.Name_Music[i];
      InputDiv.id = "InputDiv";
      //Thumb Gerada
      Image.id = `Image${Id}`;
      Image.className = "Image";
      fetch("/ThumbJson").then(function (response) {
        response.json().then((datas) => {
            for (var i = 0; i < datas.Imgs.length; i++) {
                var ImagesPrincipal = document.querySelector("img#ImagesPrincipal");
                var TPImage = document.querySelector("img#TPImage");
                var Image = window.document.querySelector(`img#Image${i}`)
               try{
                $("label.LabelPlayePause").on("click", function () {
                    var Id = parseInt($(this).attr("id").replace("Labeis", ""));
                    ImagesPrincipal.src = TPImage.src = datas.Imgs[Id];
                    // Frente
                    $(`button#Frente,button#FrenteP`).on("click", function () {
                      if (Id < MinhasMusicas.Name_Music.length) {
                        Id++;
                        ImagesPrincipal.src = TPImage.src = datas.Imgs[Id];
                      } else {
                        ImagesPrincipal.src = TPImage.src = datas.Imgs[(Id = 0)];
                      }
                    });
      
                    ORIGINAL.addEventListener("ended", function () {
                      Id++;
                      ImagesPrincipal.src = TPImage.src = datas.Imgs[Id];
                    });
      
                    // Trás
                    $(`button#TrásP,buttonTrás`).on("click", function () {
                      if (Id >= 0) {
                        Id--;
                        ImagesPrincipal.src = TPImage.src = datas.Imgs[Id];
                      } else {
                        ImagesPrincipal.src = TPImage.src = datas.Imgs[(Id = 0)];
                      }
                    });
                  });
                  Image.src = datas.Imgs[i]
               }catch(e){

               }
            }
        })});
      // Titulo
      Titulo.innerHTML = String(MinhasMusicas.Name_Music[i]).replace(/\.[^/.]+$/, "");
      array.push(MinhasMusicas.Name_Music[i]);
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
      // Remove Function
      Remove.addEventListener("click", Remover);
      function Remover() {
        location.reload();
        var value = this.id;
        var valueClass = this.className;
        $.ajax({
          url: "/RemoveFunc",
          type: "POST",
          contentType: "application/json",
          data: JSON.stringify({ value: value, Img: valueClass }),
        });
      }

      // Velocidade
      var PlayBack = document.getElementById("PlayBack");
      document
        .getElementById("NormalPlayBack")
        .addEventListener("click", function () {
          document
            .querySelectorAll("audio")
            .forEach((el) => (el.playbackRate = 1));
          document.getElementById("PlayBack").value = "5";
        });
      PlayBack.addEventListener("change", function () {
        var ValorPlay = PlayBack.value;
        document
          .querySelectorAll("audio")
          .forEach((el) => (el.playbackRate = ValorPlay));
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
          document.getElementById("BtnPauseEvent").style.display ="inline-block";
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
          Math.random() * MinhasMusicas.Name_Music.length
        );
        ORIGINAL.src = `/music/${MinhasMusicas.Name_Music[MusicRandom]}`;
        ORIGINAL.play();
        document.getElementById("TP_Name").innerHTML =
          MinhasMusicas.Name_Music[MusicRandom];
      });

      // Função Principal do Scipt (Play,Pause,Tocandas)
      PlayePause.addEventListener("click", function () {
        localStorage.setItem("Tocandas", count);
        count++;
        // Junção
        var MusicIDs = this.id.replace("PPause", "");
        var Junção = `/music/${MinhasMusicas.Name_Music[MusicIDs]}`;
        FecharPrincipal.addEventListener("click", function () {
          document.getElementById("MusicaPrincipal").style.display = "none";
          Image.style.display = "none"
          document.getElementById("InfoMini").style.display = "block";
        });
        if (document.getElementById(this.id).checked == true) {
          ORIGINAL.src = Junção;
          console.log(ORIGINAL.src);
          var Tamanho = parseInt(MinhasMusicas.Name_Music.length) - 1;
          ORIGINAL.play();
          // Tempo da música
          ORIGINAL.addEventListener("loadedmetadata", function () {
            duration = ORIGINAL.duration;
          });
          var BuscarMusicIds = MinhasMusicas.Name_Music[MusicIDs];
          document.getElementById("MusicaPrincipal").style.display = "block";
          const parent = MinhasMusicas.Name_Music[MusicIDs];
          const Author = document.getElementById(`Dados${MusicIDs}`).innerText;
          const LetraId = document.getElementById(`LetraMusic${MusicIDs}`).innerText;
          TextosPrincipal.innerText = parent;
          ArtistaPrincipal.innerHTML = Author;
          LetraMusics.innerHTML = LetraId;
          document.getElementById("TP_Name").innerHTML = BuscarMusicIds;
        } else {
          ORIGINAL.pause();
          document.getElementById("MusicaPrincipal").style.display = "none";
        }
        // Passar Próxima e Frente Event
        document.getElementById("Frente").addEventListener("click", Frente);
        document.getElementById("FrenteP").addEventListener("click", Frente);
        ORIGINAL.addEventListener("ended", Frente);
        document.getElementById("TrásP").addEventListener("click", Tras);
        document.getElementById("Trás").addEventListener("click", Tras);

        function RetornarDados() {
          var BuscarMusicIds = MinhasMusicas.Name_Music[MusicIDs];
          document.getElementById("TextosPrincipal").innerHTML = BuscarMusicIds;
          document.getElementById("TP_Name").innerHTML = BuscarMusicIds;
          document.getElementById("ArtistaPrincipal").innerHTML =
            document.getElementById(`Dados${MusicIDs}`).innerText;
          document.getElementById("LetraMusics").innerHTML =
            document.getElementById(`LetraMusic${MusicIDs}`).innerText;
          ORIGINAL.play();
        }

        // Próxima Música
        function Frente() {
          localStorage.setItem("Tocandas", count);
          count++;
          if (MusicIDs < Tamanho) {
            MusicIDs++;
            ORIGINAL.src = `/music/${MinhasMusicas.Name_Music[MusicIDs]}`;
            document
              .querySelectorAll("#Playlist_List > li")
              .forEach((el) => (el.id = `${MusicIDs}`));
          } else {
            MusicIDs++;
            ORIGINAL.src = `/music/${MinhasMusicas.Name_Music[(MusicIDs = 0)]}`;
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
            ORIGINAL.src = `/music/${MinhasMusicas.Name_Music[MusicIDs]}`;
            document
              .querySelectorAll("#Playlist_List > li")
              .forEach((el) => (el.id = `${MusicIDs}`));
          } else {
            ORIGINAL.src = `/music/${MinhasMusicas.Name_Music[(MusicIDs = 0)]}`;
            document
              .querySelectorAll("#Playlist_List > li")
              .forEach((el) => (el.id = `${MusicIDs}`));
          }
          RetornarDados();
        }
      });
      // Append
      InputDiv.append(Remove, Edit);
      CaixadeTexto.append(Titulo,Dados, Letra, InputDiv);
      Box.append(IDNum, PlayePause, Image, CaixadeTexto, music);
      LabelPlayePause.append(Box);
      Musicas.append(LabelPlayePause);
    }
  });
});


function Abrir_Player() {
  document.getElementById("MusicaPrincipal").style.display = "block";
}

// Playlist

var Json_Playlist = JSON.parse(localStorage.getItem("playlist"))
for(var i = 0 ; i <= Json_Playlist.length; i++){
  var Titulo = document.createElement("h1")
  Titulo.innerText = Json_Playlist[i]?.Name
  Titulo.id = i
  Titulo.addEventListener("click",function(){
    var Add;
    if(localStorage.getItem("playlist") == null){
      Add = []
    }else{
      Add = JSON.parse(localStorage.getItem("playlist"))
    }
    Add[this.id].MúsicasList.push(ORIGINAL.src)
    localStorage.setItem("playlist",JSON.stringify(Add))
  })
  document.getElementById("PlaylistHome").append(Titulo)
}


// Background
if (localStorage.BackgroundEscolhido) {
  document.querySelector(
    "body"
  ).style.backgroundImage = `url(${localStorage.getItem(
    "BackgroundEscolhido"
  )})`;
}
