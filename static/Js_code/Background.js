var List = []
var IndexAtual = 0
var Image = document.createElement("img")

function Refresh() {
    location.reload(true)
}

function Retornar_Background(Id) {
    fetch("/Buscar").then((response) => response.json().then((dados) => {
        for (var i = 0; i < dados.length; i++) { List.push(dados[i].BackgroundEscolha) }

        List = [...new Set(List)]

        const Filter = List.filter(element => element !== null)

        Filter.forEach((element, index) => {
            if(index < 0){
                document.getElementById("Escolhas_BK").style.display = "none"
            }

            if (index === Id) {
                Image.id = Image.src = element

                Image.addEventListener("click", function () {
                    localStorage.setItem("Background", this.id)
                    Refresh()
                })

                Image.addEventListener("error", function () {
                    this.style.display = "none"
                })

                document.getElementById("BackgroundsC").append(Image)
            } else if (Id < 0 || Id >= Filter.length) {
                IndexAtual = 0
                Retornar_Background(0)
            }
        })
    }))
}

document.getElementById("Past_BK").addEventListener("click", function () {
    IndexAtual -= 1
    Retornar_Background(IndexAtual)
})

document.getElementById("Next_BK").addEventListener("click", function () {
    IndexAtual += 1
    Retornar_Background(IndexAtual)
})


Retornar_Background(IndexAtual)