var Body_Music = document.getElementById("Musicas");
var ORIGINAL_Music = document.getElementById("ORIGINAL");
var Search = document.getElementById("Search");
let Music_Play = document.getElementById("MusicaPrincipal");
var MusicBackgroud = document.getElementById("MusicBackgroud");

var Valor = 0
var TocadasGET = parseInt(localStorage.getItem("Tocadas"))

function Musicas_Tocadas(){
    if(localStorage.getItem("Tocadas")){
        Valor = TocadasGET+=1
        localStorage.setItem("Tocadas",Valor)
        
    }else{
        localStorage.setItem("Tocadas",Valor)
        console.log("Add 0");
    }
}


class Musicas {
    constructor(Id, Title, Thumb, Artist, Letter) {
        this.Id = Id, this.Title = Title, this.Thumb = Thumb, this.Artist = Artist, this.Letter = Letter
    }
}

function Cores(file) {
    MusicBackgroud.style.display = "block";
    MusicBackgroud.style.backgroundImage = `url(${file})`;
}

export function Event_Music(Id) {
    Music_Play.style.display = "block";
    Musicas_Tocadas()
    fetch("/API").then((response) => response.json().then((dados) => {
        dados.forEach(function (element, index) {            
            if (Id == element.id) {
                const Music = new Musicas(element.id, element.Title, element.Thumb, element.Artist, element.Letter);
                // Rodar a Música
                var Musica_Atual = Music.Title + ".mp3";
                ORIGINAL_Music.src = `/music/${Musica_Atual}`;
                ORIGINAL_Music.play();
                Music_Play.className = `${Music.Title}?.${Music.Id}`;

                Cores(Music.Thumb);

                var ThumbMax = String(Music.Thumb).replace("sddefault","maxresdefault")

                Music_Play.innerHTML = `   <button id="FecharPrincipal">✖</button>
                    <img src="${ThumbMax}"/>
                    <h1>${Music.Title}</h1>
                    <h6>${Music.Artist}</h6>
                    <button id="LetraMusicBtn"><img src="static/Arquivos/Icons_Player/Letra.png"/></button>
                    <button id="PlaylistAdd"><img src="static/Arquivos/Icons_Player/PlaylistAdd.png"/></button>
                    <div id="Box_progress">
                    <div class="progress_bar" id="progress_bar">
                                <div class="progressed" id="progressed"></div>
                            </div>
                        </div>
                    <div id="ControleMusical">
                    <img id="Past" src="static/Arquivos/Icons_Player/previous.png"/>
                    <img id="PlayPause" src="static/Arquivos/Icons_Player/Pause.png"/>
                    <img id="Next" src="static/Arquivos/Icons_Player/next.png"/>
                    </div>
                    <p>${Music.Letter}</p> `;

                InfoMini.innerHTML = `     
                <img src="${ThumbMax}"/>       
                    <h1>${Music.Title}</h1>
                    <h6>${Music.Artist}</h6>
                    <div id="Box_progressTP">
                    <div class="progress_bar" id="progress_barTP">
                                <div class="progressed" id="progressedTP"></div>
                            </div>
                        </div>
                    <div id="TP_Principal_Template">
                    <img id="Past" src="static/Arquivos/Icons_Player/previous.png"/>
                    <img id="PlayPause" src="static/Arquivos/Icons_Player/Pause.png"/>
                    <img id="Next" src="static/Arquivos/Icons_Player/next.png"/>
                    </div>
                `
            }
        });
        MusicOn(Id);
    })
    );
}

export function MusicOn(index) {
    var index_Atual = parseInt(index);

    // Barra de Progressão
    var progressed = document.getElementById("progressed");
    var progress_bar = document.getElementById("progress_bar");
    
    var progressed_TP = document.getElementById("progressedTP");
    var progress_bar_TP = document.getElementById("progress_barTP");




    ORIGINAL_Music.ontimeupdate = function () {
        progressed.style.width = Math.floor((ORIGINAL_Music.currentTime * 100) / ORIGINAL_Music.duration) + "%";
        progressed_TP.style.width = Math.floor((ORIGINAL_Music.currentTime * 100) / ORIGINAL_Music.duration) + "%";
    };


    if (progress_bar) {
        progress_bar.onclick = function (e) {
            ORIGINAL_Music.currentTime = (e.offsetX / progress_bar.offsetWidth) * ORIGINAL_Music.duration;
        };
    }

    if(progress_bar_TP){
        progress_bar_TP.onclick = function (e) {
            ORIGINAL_Music.currentTime = (e.offsetX / progress_bar_TP.offsetWidth) * ORIGINAL_Music.duration;
        };
    }

    // Fechar o Musicon
    document.getElementById("FecharPrincipal")?.addEventListener("click", function () {
        Music_Play.style.display = "none";
        MusicBackgroud.style.display = "none";
        InfoMini.style.display = "block"
    });

    // Commando MusicOn
    document.getElementById("Next")?.addEventListener("click", function () {
        Event_Music((index_Atual += 1));
    });

    ORIGINAL_Music.addEventListener("ended", function () {
        Event_Music((index_Atual += 1));
    });

    document.getElementById("Past")?.addEventListener("click", function () {
        Event_Music((index_Atual -= 1));
    });

    document.getElementById("PlayPause")?.addEventListener("click", function () {
        if (this.src == "http://127.0.0.1:7485/static/Arquivos/Icons_Player/Play.png") {
            this.src = "static/Arquivos/Icons_Player/Pause.png"
            ORIGINAL_Music.pause();
        } else {
            this.src = "static/Arquivos/Icons_Player/Play.png"
            ORIGINAL_Music.play();
        }
    });

    document.getElementById("PlaylistAdd")?.addEventListener("click", function () {
        Music_Play.innerHTML = ``;
        fetch("/PlaylistBuscar").then((response) => response.json().then((dados) => {
            dados.forEach(function (element, index) {
                var Caixa = document.createElement("div");
                Caixa.id = index;
                Caixa.innerHTML = `<div style="background-image: url(${element.Thumb});"></div><h1>${element.id}.${element.Title}</h1>`;

                Caixa.addEventListener("click", function () {   
                    var Music_Item_Id = String(Music_Play.className).split("?.")                                     
                    $.ajax({
                        url: "/PlaylistAppend",
                        type: "POST",
                        contentType: "application/json",
                        data: JSON.stringify({
                            Title: element.Title,
                            ID_Item: Music_Item_Id[1],
                            ItemAdd: Music_Item_Id[0],
                        }),
                    });
                });
                Music_Play.append(Caixa);
            });
        })
        );
    });
}

// Listar as Músicas
fetch("/API").then((response) =>
    response.json().then((dados) => {
        dados.forEach(function (element, index) {
            const Music = new Musicas(element.id, element.Title, element.Thumb, element.Artist, element.Letter);
            // Search
            if (Search) {
                Search.addEventListener("keyup", function () {
                    var Linhas = Body_Music.getElementsByTagName("label");
                    const value_Search = String(this.value).toLowerCase();
                    for (let position in Linhas) {
                        if (true == isNaN(position)) {
                            continue;
                        }

                        let ConteudoLinhas = Linhas[position].innerHTML;

                        if (true === ConteudoLinhas.toLowerCase().includes(value_Search)) {
                            Linhas[position].style.display = "";
                        } else {
                            Linhas[position].style.display = "none";
                        }
                    }
                });
            }

            var Caixa = document.createElement("label");
            Caixa.id = parseInt(Music.Id);
            var ThumbMin = String(Music.Thumb).replace("sddefault","mqdefault")
            Caixa.innerHTML = `
            <div id="Boxs">
            <h6>${index}</h6>
            <img src="${ThumbMin}"/>
            <div id="CaixaTexto">
            <h1>${Music.Title}</h1>
            <h4>${Music.Artist}</h4>
            </div>
            <button><img id="Editar_Func" src="static/Arquivos/Icons_Config/three-dots.png" /></button>
            </div>
            `;

            Caixa.addEventListener("click", () => {
                Event_Music(Caixa.id);
            });

            if (Body_Music) {
                Body_Music.append(Caixa);
            }
        });
    })
);
