var Sidebar = document.getElementById("Sidebar")
var Check = document.getElementById("BtnSidebarCheck")
var EscolherBK = document.getElementById("EscolherBK")
Check.addEventListener("click", function () {
    if (Check.checked == true) {
        Sidebar.style.transform = "translate(0vh)"
    } else {
        Sidebar.style.transform = "translate(100vh)"
    }
    Sidebar.style.display = "block"
})
EscolherBK.addEventListener("click", function () {
    Sidebar.style.display = "none"
})
var hh = 0
var mm = 0
var ss = 0

if(localStorage.Tempo){
var hh = JSON.parse(localStorage.getItem("Tempo"))[0]
var mm = JSON.parse(localStorage.getItem("Tempo"))[1]
var ss = JSON.parse(localStorage.getItem("Tempo"))[2]
}
setInterval(function Timer() {
    ss++
    if (ss >= 60) {
        mm++
        ss = 0
    }
    if (mm >= 60) {
        hh++
        mm = 0
    }
    var ValorHtml = (hh < 10 ? "0" + hh : hh) + ":" + (mm < 10 ? "0" + mm : mm) + ":" + (ss < 10 ? "0" + ss : ss)
    var Valor = [hh,mm,ss]
    document.getElementById("Tempo").innerText = ValorHtml
    localStorage.setItem("Tempo", JSON.stringify(Valor))
}, 1000)