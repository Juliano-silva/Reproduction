#Dependencies
from flask import Flask,render_template,session,redirect,url_for,jsonify,request,send_from_directory
from pytube import YouTube
import os , glob , json , webview , ctypes , random , urllib.request
from winotify import Notification
import requests
# App stuff
app = Flask(__name__)
webview.create_window('Reproduction', app,resizable=True,width=1000,height=600 ,http_port=6969,js_api=True,minimized=True,on_top=True)
#Routers
Diretorio = r"C:\\Reproduction_Folder\\music"
Galeria = "C:\\Reproduction_Folder\\Imagens"

# Functions


existe = os.path.exists("C:\\Reproduction_Folder")
if(existe == False):
    os.makedirs("C:\\Reproduction_Folder")
    Arquivo = open('C:/Reproduction_Folder/db.json','x',encoding="utf-8")
    Arquivos = open('C:/Reproduction_Folder/Img.json','x',encoding="utf-8")
else:
    print("Arquivo Já Criado")

@app.route("/AddMusic",methods=["POST"])
def AddMusic():
    JsonImg = 'C:/Reproduction_Folder/Img.json'
    data = request.get_json()
    # Video Baixar URL
    yt = YouTube(str(data['value']))
    video = yt.streams.filter(only_audio=True).first()
    out_file = video.download(output_path="C:/Reproduction_Folder/music")
    base, ext = os.path.splitext(out_file)
    # Thumb Baixar URL
    Url_file = yt.thumbnail_url
    # Notificação
    Monstrar = Notification(app_id="Reproduction",
                       title=yt.title,
                       msg="Música Baixada Com Sucesso",
                       duration="short",
                       icon="C:\Reproduction_Folder\ReproductionIcon.jpg")
    Monstrar.show()
    new_file = base + '.mp3'
    os.rename(out_file, new_file)
    file = open(JsonImg)
    x = file.read()
    New_Dots = f',"{Url_file}"'
    finaldata = str(json.loads(x)).replace("]}",f'{New_Dots}]').replace("'",'"').replace('[,"','["')
    with open(JsonImg,"w") as img:
        img.write(finaldata + "}")

    print(yt.title + " has been successfully downloaded.")
    return render_template("Adicionar.html")


@app.route('/AddURL', methods=['POST'])
def AddUrl():
   datas = request.get_json()
   result = datas['value']
   ctypes.windll.user32.SystemParametersInfoW(20,0,result,0)
   Random = random.randint(0,100000)
   urllib.request.urlretrieve(result, Galeria + "\\" + f"{Random}.png")
   return '',201

@app.route("/RemoveFunc",methods=['POST'])
def Remover():
    datas = request.get_json()
    result = datas['value']
    Image = datas['Img']
    with open ("C:/Reproduction_Folder/Img.json",'r',encoding="utf-8") as my_json:
        data = json.load(my_json)
        delete = data['Imgs'][int(Image)]
    with open("C:/Reproduction_Folder/Img.json",'w',encoding="utf-8") as files:
        files.write(str(data).replace(delete,"").replace("'',","").replace("'",'"'))
    os.remove(Diretorio + "\\" + result)
    return '',201

@app.route('/music/<path:filename>')
def MusicFolder(filename):
    return send_from_directory(Diretorio + "\\",filename)

@app.route('/Fotos/<path:filename>')
def ImageFolder(filename):
    return send_from_directory(Galeria + "\\",filename)

@app.route("/ThumbJson",methods=["GET","POST"])
def Thumb():
    with open ("C:/Reproduction_Folder/Img.json",encoding="utf-8") as my_json:
        dados = json.load(my_json)
        return jsonify(dados)

@app.route("/DadosMusic",methods=["GET","POST"])
def Music():
    with open("C:/Reproduction_Folder/db.json",encoding="utf-8") as meu_json:
        dados = json.load(meu_json)
        return jsonify(dados)

# Rotas

@app.route("/",methods=["GET","POST"])
def home():
    return render_template("Home.html")

@app.route("/Index",methods=["GET","POST"])
def index():
    files = list(filter(os.path.isfile, glob.glob(Diretorio + "\\*"))) 
    files.sort(key=os.path.getctime) 
    Mural = list(filter(os.path.isfile, glob.glob(Galeria + "\\*"))) 
    Mural.sort(key=os.path.getctime) 
    with open('C:/Reproduction_Folder/db.json','w',encoding="utf-8") as arquivo:
        Escrito = str('{"Name_Music":' f"{files},'Galeria':{Mural}""}")
        arquivo.write(Escrito.replace("\\","").replace("C:Reproduction_Foldermusic","").replace("C:Reproduction_FolderImagens","").replace("'",'"'))
    return render_template("index.html")

@app.route("/Adicionar",methods=["GET","POST"])
def Add():
    return render_template("Adicionar.html")

@app.route("/Background",methods=["GET","POST"])
def Bk():
    return render_template("Backgrounds.html")

@app.route("/Playlist",methods=["GET","POST"])
def Playlist():
    return render_template("Playlist.html")

@app.route("/Config",methods=["GET","POST"])
def Sob():
    return render_template("Config.html")

@app.route("/BackgroundEscolha",methods=["GET","POST"])
def BackgroundEscolha():
    return render_template("BackgroundEscolha.html")

@app.route("/RotaAdd",methods=["GET","POST"])
def RotaAdd():
    return render_template("AdicionarRotas.html")

if __name__ == "__main__":
    # webview.start(debug=False,private_mode=False,http_server=True)
    app.run(debug=True,port=5052)