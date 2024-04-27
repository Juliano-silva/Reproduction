var array = []
var DadosList = []
var EditList = []
var Musicas = document.getElementById("Musicas")
var API_KEY = '36367067-43a20686ec62df15e47b5919d';
var Diva = document.createElement("div")
var TituloError = document.createElement("h1")
var Diva = document.createElement("div")
var TituloError = document.createElement("h1")

function RandomColor(tamanho) {
    var Primeiro = "#"
    var caracter = "0123456789abcdef"
    for (var i = 0; i < tamanho; i++) {
        Primeiro += caracter.charAt(Math.floor(Math.random() * caracter.length))
    }
    return Primeiro;
}


fetch("/DadosMusic").then(function (response) {
    response.json().then((data) => {
        var MinhasMusicas = JSON.parse(JSON.stringify(data))
        for (var i = 0; i < MinhasMusicas.Name_Music.length; i++) {
            // Creates Elements
            var Titulo = document.createElement("h1")
            var Box = document.createElement("div")
            var music = document.createElement("audio")
            var PlayePause = document.createElement("input")
            var LabelPlayePause = document.createElement("label")
            var CaixadeTexto = document.createElement("div")
            var s = document.createElement("button")
            var Image = document.createElement("img")
            var InputDiv = document.createElement("div")
            var Remove = document.createElement("input")
            var Edit = document.createElement("input")
            var IDNum = document.createElement("h3")
            var Dados = document.createElement("h2")
            var Letra = document.createElement("h3")
            // Get Elements
            var Recomeçar = document.getElementById("Recomeçar")
            var Mais5 = document.getElementById("Mais5")
            var Menos5 = document.getElementById("Menos5")
            var Volume = document.getElementById("Volume")
            var MuteeDismute = document.getElementById("MuteeDismute")
            var BtnMute = document.getElementById("BtnMute")
            var BtnVolume = document.getElementById("BtnVolume")
            var Randomizando = document.getElementById("Randomizando")
            var ORIGINAL = document.getElementById("ORIGINAL")
            var FecharPrincipal = document.getElementById("FecharPrincipal")
            // Name Música Replace
            var MusicReplace = MinhasMusicas.Name_Music[i].replace("SnapSave.io - ", "").replace(".mp3", "").replace("(128 kbps)", "").replace(".m4a", "").replace(".mp4", "").replace("SnapInsta.io -", "")
            // Chave da Api do VAGALUME
            var Key = "666888f22b401b1859e2d405495c47ee"
            // Artista
            var artistas = MusicReplace.toLowerCase().replace("amv", "")
            var ArtsMusic = artistas.slice(0, artistas?.indexOf("-" || "·" || "_" || "|" || "."))

            var NewAge = ArtsMusic?.toLowerCase().trim().replace(/\s/g, "-").split("-" || "--")

            if (NewAge.length <= 1) {
                var ArtistDados = NewAge[0]
            } else {
                var ArtistDados = NewAge[0] + ' ' + NewAge[1]
            }

            // Música
            var MusicRenovada = MusicReplace.split("-" || "." || "_" || "·" || "|")

            if (MusicRenovada.length <= 1) {
                var Revolution = MusicRenovada[0]?.split("-" && "." && "_" && "·" || "|")
            } else {
                var Revolution = MusicRenovada[1]?.split("-" && "." && "_" && "·" || "|")
            }

            if (Revolution.length <= 1) {
                var MusicDados = Revolution[0]
            } else {
                var MusicDados = Revolution[1]
            }

            // const VagalumeLetra = async () => {
            //     var LINKVAGALUME = "https://api.vagalume.com.br/search.php" + "?art=" + ArtistDados + "&mus=" + MusicDados + `&apikey=${Key}`
            //     const respose = await fetch(LINKVAGALUME)
            //     const jsonData = await respose.json()
            //     Letra.innerText = jsonData?.mus?.[0]?.text
            //     if (jsonData?.mus?.[0]?.text === undefined || jsonData?.mus?.[0]?.text === "undefined") {
            //         Letra.innerHTML = `Letra desconhecida`
            //     }
            //     return Letra.innerText
            // }
            // VagalumeLetra()

            // const Vagalume = async () => {
            //     var LINKVAGALUME = "https://api.vagalume.com.br/search.php" + "?art=" + ArtistDados + "&mus=" + MusicDados + `&apikey=${Key}`
            //     const respose = await fetch(LINKVAGALUME)
            //     const jsonData = await respose.json()
            //     Dados.innerText = jsonData?.art?.name
            //     if (jsonData?.art?.name === undefined || jsonData?.art?.name === "undefined") {
            //         Dados.innerHTML = "Desconhecido"
            //     }
            //     return Dados.innerText;
            // }
            // Vagalume()

            var Id = i
            Dados.id = `Dados${Id}`
            Letra.id = `LetraMusic${Id}`
            Letra.className = `LetraMusic`

            // Promise.all([Vagalume(), VagalumeLetra()]).then((values) => {
            //     DadosList.push({
            //         "Autor": values[0],
            //         "Letra": values[1]
            //     })

            //     localStorage.setItem("Vagalume", JSON.stringify(DadosList))
            // });

            // if (localStorage.Vagalume) {
            //     var Apis = JSON.parse(localStorage.getItem("Vagalume"))
            //     Dados.innerText = Apis[i].Autor
            //     Letra.innerText = Apis[i].Letra
            // } else {
            //     Dados.innerText = "Desconhecido"
            //     Letra.innerText = "Letra Desconhecida"
            // }


                 // Imagens
                 Image.id = `Image${Id}`
                 Image.className = "Image"
                 fetch("/ThumbJson").then(function (response) {
                     response.json().then((datas) => {
                         for (var i = 0; i < datas.Imgs.length; i++) {
                             var Image = window.document.querySelector(`img#Image${i}`)
                             var ImagesPrincipal = document.querySelector("img#ImagesPrincipal")
                             var TPImage = document.querySelector("img#TPImage")
                             $("label.LabelPlayePause").on("click", function () {
                                 var Id = parseInt(($(this).attr("id")).replace("Labeis", ""))
                                 ImagesPrincipal.src = TPImage.src = datas.Imgs[Id]
                                 // Frente
                                 $(`button#Frente,button#FrenteP`).on("click", function () {
                                     if (Id < MinhasMusicas.Name_Music.length) {
                                         Id++
                                         ImagesPrincipal.src = TPImage.src = datas.Imgs[Id]
                                     } else {
                                         ImagesPrincipal.src = TPImage.src = datas.Imgs[Id = 0]
                                     }
                                 })
     
                                 ORIGINAL.addEventListener("ended", function () {
                                     Id++
                                     ImagesPrincipal.src = TPImage.src = datas.Imgs[Id]
                                 })
     
                                 // Trás
                                 $(`button#TrásP,buttonTrás`).on("click", function () {
                                     if (Id >= 0) {
                                         Id--
                                         ImagesPrincipal.src = TPImage.src = datas.Imgs[Id]
                                     } else {
                                         ImagesPrincipal.src = TPImage.src = datas.Imgs[Id = 0]
                                     }
                                 })
                             })
                         }
                         Image.src = datas.Imgs[0]
                     })
                 })
     


            // Caixa de Texto
            CaixadeTexto.id = `CaixaTexto`
            // ID Num
            IDNum.innerHTML = Id
            IDNum.id = "IDss"
            // Remove
            Remove.type = "submit"
            Remove.classList = i
            Remove.id = MinhasMusicas.Name_Music[i]
            // Edit
            Edit.type = "submit"
            Edit.classList = i
            Edit.id = MinhasMusicas.Name_Music[i]

            InputDiv.id = "InputDiv"
            // Titulo
            Titulo.innerHTML = MusicReplace
            array.push(MusicReplace)
            Titulo.id = `Titulos${Id}`
            s.id = `${Id}`
            // Box
            Box.id = `Boxs`
            // music
            music.id = `Music${Id}`
            // Play e Pause
            PlayePause.type = "checkbox"
            PlayePause.id = `PPause${Id}`
            // Icone
            LabelPlayePause.setAttribute("for", `PPause${Id}`)
            LabelPlayePause.id = `Labeis${Id}`
            LabelPlayePause.classList = "LabelPlayePause"
            // Search
            document.getElementById("Search").addEventListener("keyup", function () {
                var Filtar = document.getElementById("Search").value
                var BodyFiltar = document.getElementById("Musicas")
                var Linhas = BodyFiltar.getElementsByTagName("label")
                for (let position in Linhas) {
                    if (true === isNaN(position)) {
                        continue;
                    }
                    let ConteudoLinhas = Linhas[position].innerHTML

                    if (true === ConteudoLinhas.toLowerCase().includes(Filtar)) {
                        Linhas[position].style.display = ''
                    } else {
                        Linhas[position].style.display = "none"
                    }
                }
            })
            // Play e Pause Function
            var Contador = localStorage.getItem("Tocandas")
            if (Contador < 0 || Contador === null) {
                var count = 0
            } else {
                var count = Contador
            }
            // Recomeçar Function
            Recomeçar.addEventListener("click", function () {
                document.querySelectorAll('audio').forEach(el => el.currentTime = 0);
            })
            // Mais 5 Function
            Mais5.addEventListener("click", function () {
                document.querySelectorAll('audio').forEach(el => el.currentTime += 1);
            })
            // Menos 5 Function
            Menos5.addEventListener("click", function () {
                document.querySelectorAll('audio').forEach(el => el.currentTime -= 1);
            })
            // Volume Function
            Volume.addEventListener("change", function () {
                var VolumeValor = Volume.value
                document.querySelectorAll('audio').forEach(el => el.volume = VolumeValor);
            })
            // Pausar e Play Function
            var Pause2 = document.getElementById("Pausar2")
            var Play2 = document.getElementById("play2")
            Pause2.addEventListener("click", function () {
                document.querySelectorAll('audio').forEach(el => el.pause());
                Play2.style.display = "flex"
                Pause2.style.display = "none"
            })
            Play2.addEventListener("click", function () {
                document.querySelectorAll('audio').forEach(el => el.play());
                Play2.style.display = "none"
                Pause2.style.display = "flex"
            })
            // Remove Function
            Remove.addEventListener("click", Remover)
            Edit.addEventListener("click", Editar)
            function Remover() {
                location.reload()
                var value = this.id;
                var valueClass = this.className
                $.ajax({
                    url: '/RemoveFunc',
                    type: 'POST',
                    contentType: 'application/json',
                    data: JSON.stringify({ 'value': value, "Img": valueClass })
                });
            }

            // Editar Function
            function Editar() {
                var Id = this.className
                var Titulo = document.getElementById(`Titulos${Id}`).innerHTML
                var Artista = document.getElementById(`Dados${Id}`).innerHTML
                var Letra = document.getElementById(`LetraMusic${Id}`).innerHTML
                document.getElementById("MyEdit").style.display = "block"

                MyEdit_NameMusic.value = Titulo
                MyEdit_Artisc.value = Artista
                MyEdit_Letra.value = Letra

                Btn_Edit.classList = Id
                document.getElementById("Btn_Edit").addEventListener("click", EditPronto)
            }

            function EditPronto() {
                var Id = this.className
                if (localStorage.getItem("Editar")) {
                    EditList = JSON.parse(localStorage.getItem("Editar"))
                }

                EditList.push({
                    "Id": Id,
                    "Titulo": MyEdit_NameMusic.value,
                    "Artista": MyEdit_Artisc.value,
                    "Letra": MyEdit_Letra.value
                })

                localStorage.setItem("Editar", JSON.stringify(EditList))
            }

            if (localStorage.Editar) {
                function EditLoad() {
                    var Edit_Load = JSON.parse(localStorage.getItem("Editar"))
                    for (var j = 0; j < Edit_Load.length; j++) {
                        var Ids = Edit_Load[j].Id
                        document.querySelectorAll(`#Titulos${Ids}`).forEach(el => el.innerHTML = Edit_Load[j].Titulo)
                        document.querySelectorAll(`#Dados${Ids}`).forEach(el => el.innerHTML = Edit_Load[j].Artista)
                        document.querySelectorAll(`#LetraMusic${Ids}`).forEach(el => el.innerHTML = Edit_Load[j].Letra)
                    }
                }
                document.addEventListener("load", EditLoad())
            }
            // Velocidade
            var PlayBack = document.getElementById("PlayBack")
            document.getElementById("NormalPlayBack").addEventListener("click", function () {
                document.querySelectorAll('audio').forEach(el => el.playbackRate = 1)
                document.getElementById("PlayBack").value = "5"
            })
            PlayBack.addEventListener("change", function () {
                var ValorPlay = PlayBack.value
                document.querySelectorAll('audio').forEach(el => el.playbackRate = ValorPlay)
            })
            var NormalVolume = document.getElementById("NormalVolume")
            NormalVolume.addEventListener("click", function () {
                Volume.value = "0.5"
                document.querySelectorAll('audio').forEach(el => el.volume = "0.5");
            })
            // Mute
            MuteeDismute.addEventListener("click", function () {
                if (document.getElementById(this.id).checked == true) {
                    document.querySelectorAll('audio').forEach(el => el.muted = true);
                    BtnMute.style.display = "inline-block"
                    BtnVolume.style.display = "none"
                }
                else {
                    document.querySelectorAll('audio').forEach(el => el.muted = false);
                    BtnMute.style.display = "none"
                    BtnVolume.style.display = "inline-block"
                }
            })
            // Play e Pause Event
            document.getElementById("BtnPauseEvent").addEventListener("click", function () {
                ORIGINAL.pause()
                document.getElementById("BtnPauseEvent").style.display = "none"
                document.getElementById("BtnPlayEvent").style.display = "inline-block"
            })
            document.getElementById("BtnPlayEvent").addEventListener("click", function () {
                ORIGINAL.play()
                document.getElementById("BtnPauseEvent").style.display = "inline-block"
                document.getElementById("BtnPlayEvent").style.display = "none"
            })
            document.getElementById("BtnPlayEvent").addEventListener("click", function () {
                ORIGINAL.play()
            })
            document.getElementById("BtnPauseEvent").addEventListener("click", function () {
                ORIGINAL.pause()
            })
            var progressed = document.getElementById("progressed")
            var progress_bar = document.getElementById("progress_bar")

            ORIGINAL.ontimeupdate = function () {
                progressed.style.width = Math.floor(ORIGINAL.currentTime * 100 / ORIGINAL.duration) + "%";
            }

            progress_bar.onclick = function (e) {
                ORIGINAL.currentTime = ((e.offsetX / progress_bar.offsetWidth) * ORIGINAL.duration)
            }

            // Random Music
            Randomizando.addEventListener("click", function () {
                var MusicRandom = Math.floor(Math.random() * MinhasMusicas.Name_Music.length)
                ORIGINAL.src = `/music/${MinhasMusicas.Name_Music[MusicRandom]}`
                ORIGINAL.play()
                document.getElementById("TP_Name").innerHTML = MinhasMusicas.Name_Music[MusicRandom].replace(".mp3", "").replace(".m4a", "").replace(/[0-9]/g, "").replace("amv", "").replace("(", "").replace(")", "").replace("kbps", "")
            })
            // Doc Principal
            PlayePause.addEventListener("click", function () {
                localStorage.setItem("Tocandas", count)
                count++
                // Junção
                var MusicIDs = this.id.replace("PPause", '')
                var Junção = `/music/${MinhasMusicas.Name_Music[MusicIDs]}`
                // AddPlaylist
                if (localStorage.Playlist) {
                    document.getElementById("PlaylistHome").innerHTML = ""
                    var LocalPlaylist = localStorage.getItem("Playlist")
                    var SelectPlay = document.createElement("ol")
                    var PlaylistH1 = document.createElement("h1")
                    PlaylistH1.innerText = "Playlist Adicionar"
                    SelectPlay.append(PlaylistH1)
                    for (var Play = 0; Play < JSON.parse(LocalPlaylist).length; Play++) {
                        var OptionPlay = document.createElement("li")
                        var Option_Titulo = document.createElement("h1")
                        var Div_Disco = document.createElement("div")
                        Option_Titulo.innerText = JSON.parse(LocalPlaylist)[Play].Name
                        OptionPlay.id = MusicIDs
                        OptionPlay.className = Play
                        SelectPlay.id = "Playlist_List"
                        OptionPlay.style.background = RandomColor(6)
                        Div_Disco.id = "Div_Disco"
                        OptionPlay.addEventListener("click", function () {
                            alert("Música Adicionada com Sucesso")
                            var Edit;
                            if (localStorage.getItem("Playlist") == null) {
                                Edit = []
                            } else {
                                Edit = JSON.parse(localStorage.getItem("Playlist"))
                            }
                            Edit[this.className].Lista += this.id + ","
                            localStorage.setItem("Playlist", JSON.stringify(Edit))
                        })
                        OptionPlay.append(Div_Disco, Option_Titulo)
                        SelectPlay.append(OptionPlay)
                        document.getElementById("PlaylistHome").append(SelectPlay)
                    }
                }
                FecharPrincipal.addEventListener("click", function () {
                    document.getElementById("MusicaPrincipal").style.display = "none"
                    document.getElementById("Templete").style.display = "block"
                })
                if (document.getElementById(this.id).checked == true) {
                    ORIGINAL.src = Junção
                    ORIGINAL.play()
                    // Tempo da música
                    ORIGINAL.addEventListener("loadedmetadata", function () {
                        duration = ORIGINAL.duration
                    })
                    // Passar Próxima e Frente Event
                    document.getElementById("Frente").addEventListener("click", Frente)
                    document.getElementById("FrenteP").addEventListener("click", Frente)
                    ORIGINAL.addEventListener("ended", Frente)
                    // Trás Events
                    document.getElementById("TrásP").addEventListener("click", Tras)
                    document.getElementById("Trás").addEventListener("click", Tras)
                    // Frente function
                    function Frente() {
                        localStorage.setItem("Tocandas", count)
                        count++
                        if (MusicIDs < MinhasMusicas.Name_Music.length) {
                            MusicIDs++
                            ORIGINAL.src = `/music/${MinhasMusicas.Name_Music[MusicIDs]}`
                            document.querySelectorAll("#Playlist_List > li")
                                .forEach(el => el.id = `${MusicIDs}`)
                        } else {
                            MusicIDs++
                            ORIGINAL.src = `/music/${MinhasMusicas.Name_Music[MusicIDs = 0]}`
                            document.querySelectorAll("#Playlist_List > li").forEach(el => el.id = `${MusicIDs}`)
                        }
                        var BuscarMusicIds = MinhasMusicas.Name_Music[MusicIDs].replace(".mp3", "").replace(".m4a", "").replace(/[0-9]/g, "").replace("amv", "").replace("(", "").replace(")", "").replace("kbps", "")
                        document.getElementById("TextosPrincipal").innerHTML = BuscarMusicIds
                        document.getElementById("TP_Name").innerHTML = BuscarMusicIds
                        document.getElementById("ArtistaPrincipal").innerHTML = document.getElementById(`Dados${MusicIDs}`).innerText
                        document.getElementById("LetraMusics").innerHTML = document.getElementById(`LetraMusic${MusicIDs}`).innerText
                        ORIGINAL.play()
                    }
                    // Trás Function
                    function Tras() {
                        localStorage.setItem("Tocandas", count)
                        count++
                        if (MusicIDs >= 0) {
                            MusicIDs--
                            ORIGINAL.src = `/music/${MinhasMusicas.Name_Music[MusicIDs]}`
                            document.querySelectorAll("#Playlist_List > li").forEach(el => el.id = `${MusicIDs}`)
                        } else {
                            ORIGINAL.src = `/music/${MinhasMusicas.Name_Music[MusicIDs = 0]}`
                            document.querySelectorAll("#Playlist_List > li").forEach(el => el.id = `${MusicIDs}`)
                        }
                        var BuscarMusicIds = MinhasMusicas.Name_Music[MusicIDs].replace(".mp3", "").replace(".m4a", "").replace(/[0-9]/g, "").replace("amv", "").replace("(", "").replace(")", "").replace("kbps", "")
                        document.getElementById("TP_Name").innerHTML = BuscarMusicIds
                        document.getElementById("TextosPrincipal").innerText = BuscarMusicIds
                        document.getElementById("ArtistaPrincipal").innerHTML = document.getElementById(`Dados${MusicIDs}`).innerText
                        document.getElementById("LetraMusics").innerHTML = document.getElementById(`LetraMusic${MusicIDs}`).innerText
                        ORIGINAL.play()
                    }
                    var BuscarMusicIds = MinhasMusicas.Name_Music[MusicIDs].replace(".mp3", "").replace(".m4a", "").replace(/[0-9]/g, "").replace("amv", "").replace("(", "").replace(")", "").replace("kbps", "")
                    document.getElementById("MusicaPrincipal").style.display = "block";
                    const parent = MinhasMusicas.Name_Music[MusicIDs].replace(".mp3", "").replace(".m4a", "").replace(/[0-9]/g, "").replace("amv", "").replace("(", " ").replace(")", " ").replace("kbps", "").replace(/[()]/g, "")
                    const Author = document.getElementById(`Dados${MusicIDs}`).innerText
                    const LetraId = document.getElementById(`LetraMusic${MusicIDs}`).innerText
                    TextosPrincipal.innerText = parent
                    ArtistaPrincipal.innerHTML = Author
                    LetraMusics.innerHTML = LetraId
                    document.getElementById("TP_Name").innerHTML = BuscarMusicIds
                }
                else {
                    ORIGINAL.pause()
                    document.getElementById("MusicaPrincipal").style.display = "none"
                }
            })
            // Append
            InputDiv.append(Remove, Edit)
            CaixadeTexto.append(Titulo, Dados, Letra,InputDiv)
            Box.append(IDNum, PlayePause , Image, CaixadeTexto, music)
            LabelPlayePause.append(Box)
            Musicas.append(LabelPlayePause)
        }
    })

})

function Abrir_Player() {
    document.getElementById("MusicaPrincipal").style.display = "block";
}

// Background
if (localStorage.BackgroundEscolhido) {
    document.querySelector("body").style.backgroundImage = `url(${localStorage.getItem("BackgroundEscolhido")})`
}