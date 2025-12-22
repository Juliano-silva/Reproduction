#Dependencies
from flask import *
import os , glob , json , webview , ctypes , random , sqlite3,requests,urllib.request
from vagalume import lyrics
from winotify import Notification

# Dependencias Python File
from static.Py_code.SearchAPI import *
from static.Py_code.Add import *
from static.Py_code.SQLiteRodar import *


app = Flask(__name__)
webview.create_window('Reproduction', app,resizable=True,width=1200,height=700 ,http_port=6969,js_api=True,minimized=True)

# Caminhos
Banco_de_Dados = "C:/Reproduction_Folder/API.db"
Diretorio = "C:\\Reproduction_Folder\\music"
@app.route('/music/<path:filename>')
def MusicFolder(filename):
    return send_from_directory(Diretorio + "\\",filename)

# Rotas
@app.route("/",methods=["GET"])
def Home():
    Verificar_Download()
    return render_template("Home.html")

@app.route("/Index")
def Index():
    return render_template("index.html")

@app.route("/Playlist_Route")
def Playlist_Func():
    return render_template("Playlist.html")

@app.route("/Config")
def Configuration():
    return render_template("Config.html")

@app.route("/BackgroundEscolha")
def BackgroundEscolha():
    return render_template("BackgroundEscolha.html")

@app.route("/Adicionar")
def Adicionar():
    return render_template("Adicionar.html")

# Funções 

@app.route("/API",methods=["GET","POST"])
def Api_Py():
    return jsonify(Mostrar("Musicas"))

@app.route("/PlaylistBuscar",methods=["GET","POST"])
def PlaylistBuscar():
    return jsonify(Mostrar("Playlist"))

@app.route("/Buscar",methods=["GET","POST"])
def Buscar():
    return jsonify(Mostrar("Config"))

@app.route("/Add",methods=["GET","POST"])
def Add():
    data = request.get_json()
    URl = str(data['URL'])
    Type = str(data['Type'])

    if Type == "Music":
        Add_Musica(URl)
    elif Type == "Playlist":
        Add_Playlist(URl)
    elif Type == "Background":
        Background(URl)
    else:
        Background_FILE(URl)

    Mostrar = Notification(app_id="Reproduction_DELUXE",
                           title=f"Adicionado {Type} com Sucesso",
                           duration="short",
                           icon="C:/Users/sustu/Pictures/Programmation/Projeto Principais/ReproductionAPP/static/Arquivos/Icon.png")
    Mostrar.show()
    return "",205

@app.route("/AddPlaylist",methods=["GET","POST"])
def Playlistadd():
    data = request.get_json()
    PlaylistAdd(data["ID"],data["Title"],data["Thumb"])
    return "",201

@app.route("/PlaylistAppend",methods=["GET","POST"])
def PlaylistAppend():
    data = request.get_json()
    AddItemList(data["Title"],data["ID_Item"],data["ItemAdd"])
    return "",201


@app.route("/RemoveAll",methods=["GET","POST"]) 
def Removeall():
    REMOVE_ALL()
    return "",201

if __name__ == "__main__":
    app.run(debug=True,port=7485)