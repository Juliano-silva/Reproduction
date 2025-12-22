import {Event_Music} from "./script.js"
var BodyPlaylist = document.getElementById("Playlist")

class Playlist{
    constructor(Id,Title,Thumb){
        this.Id = Id
        this.Title = Title
        this.Thumb = Thumb
    }
}

function Carregar_Playlist(){
    var Adicionar = document.createElement("button")
    Adicionar.innerText = "+"
    Adicionar.addEventListener("click",function(){
        document.getElementById("PlaylistForm").style.display = "block"
    })

    fetch("/PlaylistBuscar").then((response) => response.json().then((dados) => {
        dados.forEach(function (element, index) {
            var Caixa = document.createElement("div")
            Caixa.id = "PlaylistBox"            

            Caixa.innerHTML = `
            <div style="background-image: url(${element.Thumb});"></div>            `

            Caixa.addEventListener("click",function(){
                BodyPlaylist.innerHTML = ""

                BodyPlaylist.innerHTML = ` 
                <img src="${element.Thumb}"/>
                <h1>${element.Title}</h1>
                <div id="Itens_Playlist"></div>
                `

                var Itens_Json = JSON.parse(element.Itens)

                for(var i = 0 ; i < Itens_Json.length; i++){                    
                    var Title = document.createElement("h1")
                    Title.innerText = `${i+1}. ${Itens_Json[i].Name}`
                    Title.id = Itens_Json[i].ID

                    Title.addEventListener("click",function(){                        
                        Event_Music(this.id)
                    })

                    document.getElementById("Itens_Playlist").append(Title)
                }

            })

            BodyPlaylist.append(Caixa)
        })
    }))

    BodyPlaylist.append(Adicionar)


    document.getElementById("SalvarPlaylist").addEventListener("click",function(){
        
        const Playlists = new Playlist(2,document.getElementById("Title").value,document.getElementById("Thumb").value)

        $.ajax({
            url: "/AddPlaylist",
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify({
                ID: Playlists.Id,
                Title: Playlists.Title,
                Thumb: Playlists.Thumb
            }),
        })
    })
}



Carregar_Playlist()