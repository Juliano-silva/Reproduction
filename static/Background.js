
var array = []
// URL
function Salvar() {
  location.reload()
  var value = document.getElementById('BackgroundsText').value;
  $.ajax({
    url: '/AddURL',
    type: 'POST',
    contentType: 'application/json',
    data: JSON.stringify({ 'value': value })
  });
  if (localStorage.Nota) {
    array = JSON.parse(localStorage.getItem('Nota'));
  }
  var BackgroundsLinks = document.getElementById("BackgroundsText").value
  array.push(BackgroundsLinks)
  localStorage.Nota = JSON.stringify(array)
  document.getElementById('BackgroundsText').value = ""
}
// File
function previewFile() {
  if (localStorage.Nota) {
    array = JSON.parse(localStorage.getItem('Nota'));
  }
  var file = document.getElementById("BackgroundsFile").files[0]
  var reader = new FileReader();
  reader.onloadend = function () {
    var Resultado = reader.result
    array.push(Resultado)
    localStorage.Nota = JSON.stringify(array)
    location.reload()
  }
  if (file) {
    reader.readAsDataURL(file);
  } else {
    preview.src = "";
  }
}

// Os Dois
if (localStorage.Nota) {
  function Localizar() {
    var LocalBK = localStorage.getItem("Nota")
    var BKCORPO = document.getElementById("BackgroundsC")
    var JSONBK = JSON.parse(LocalBK).length
    for (var i = 0; i < JSONBK; i++) {
      var imgBKM = document.createElement("div")
      imgBKM.style.backgroundImage = `url('${JSON.parse(LocalBK)[i]}')`
      imgBKM.id = `IMGSidebar${i}`
      imgBKM.className = "Image_Background_Escolhas"
      BKCORPO?.append(imgBKM)
      imgBKM.addEventListener("click", function () {
        var IDBK = this.id.replace("IMGSidebar", "")
        var NewVersion = JSON.parse(LocalBK)[IDBK]
        localStorage.setItem("BackgroundEscolhido", NewVersion)
        location.reload()
      })
    }
    var EscolhaBK = localStorage.getItem("BackgroundEscolhido")
    document.querySelector("body").style.backgroundImage = `url(${EscolhaBK})`
  }

  document.onload = Localizar()
}