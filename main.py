#Dependencies
from flask import *
import os , glob , json , webview , ctypes , random , sqlite3,requests,urllib.request
from pytube import Playlist,YouTube
from vagalume import lyrics
from winotify import Notification

app = Flask(__name__)
webview.create_window('Reproduction', app,resizable=True,width=1200,height=700 ,http_port=6969,js_api=True,minimized=True)

# Caminhos
Banco_de_Dados = "C:/Reproduction_Folder/API.db"
Diretorio = "C:\\Reproduction_Folder\\music"
Key = "666888f22b401b1859e2d405495c47ee"
Array = []
Musicas = []
Not_Exist = []
Remove_Exist = []

existe = os.path.exists("C:\\Reproduction_Folder")
if(existe == False):
    os.makedirs("C:\\Reproduction_Folder")
    Arquivo = open('C:/Reproduction_Folder/API.db','x',encoding="utf-8")

def removeCaracter(old,to_remove):
    new_string = old
    for x in to_remove:
        new_string = new_string.replace(x,'')
    return new_string

def Create_Table():
    DB = sqlite3.connect(Banco_de_Dados)
    cursor = DB.cursor()
    cursor.execute("""CREATE TABLE IF NOT EXISTS Musicas (id INTEGER PRIMARY key AUTOINCREMENT, titulo TEXT UNIQUE, Image BLOB , url TEXT,Letra TEXT,Artista TEXT)""")
    cursor.execute("""CREATE TABLE IF NOT EXISTS Playlist (id INTEGER PRIMARY key AUTOINCREMENT, titulo TEXT UNIQUE, Image BLOB , List BLOB)""")
    DB.commit()

def Adicionar_Musica(song_title,thumb,url,Letra,Artista,Name_Music):
    DB = sqlite3.connect(Banco_de_Dados)
    cursor = DB.cursor()
    if (Name_Music == "Playlist"):
            cursor.execute(f"""
                   INSERT OR IGNORE INTO {Name_Music} values 
                   (NULL,"{song_title}","{thumb}","{Artista}") 
                   """)
    else:
     cursor.execute(f"""
                   INSERT OR IGNORE INTO {Name_Music} values 
                   (NULL,"{song_title}","{thumb}","{url}","{Letra}","{Artista}") 
                   """)
    cursor.execute(f"""
                   delete from {Name_Music} where rowid not in
                   (select min(rowid) from {Name_Music}
                   group by titulo);
                   """)
    DB.commit()

def Edit(Nome,Image,Letra,Artista,Id):
    DB = sqlite3.connect(Banco_de_Dados)
    cursor = DB.cursor()
    cursor.execute(f"""
                   UPDATE Musicas SET titulo="{Nome}", Image="{Image}", Letra="{Letra}", Artista="{Artista}" WHERE id={Id}
                   """)
    DB.commit()
    return "",201

def remove_id(Name,Id,Name_Playlist):
    DB = sqlite3.connect(Banco_de_Dados)
    cursor = DB.cursor()
    dir_list = os.listdir("C:/Reproduction_Folder/music/")
    if (Name != "NULL"):
        os.remove(f"C:/Reproduction_Folder/music/{dir_list[Name]}")
    cursor.execute(f""" DELETE FROM {Name_Playlist} WHERE id={Id} """)
    DB.commit()
    return "",201

def Verification_Music():
    Musicas = []
    Banco_de_Dados = "C:/Reproduction_Folder/API.db"
    Folder = "C:/Reproduction_Folder/music"
    Quantidade_Pasta = os.listdir(Folder)
    DB = sqlite3.connect(Banco_de_Dados)
    cursor = DB.cursor()
    cursor.execute("SELECT titulo FROM Musicas")
    dados = cursor.fetchall()
    for j in Quantidade_Pasta:
            Musicas.append(j)    
            
    for i in dados:
            Musicas.append(i[0])
            for x in Musicas:
                if x == str(i[0]):
                    Musicas.remove(x)
                
    Quantidade = len(Musicas)
    del Musicas[Quantidade - 1]
    try:
        for y in Musicas:
            os.remove(f"C:/Reproduction_Folder/music/{y}")
            cursor.execute(f""" DELETE FROM Musicas WHERE titulo={y} """)
    except:
        return ""
    DB.commit()

    return "",201

def Delete_all():
    DB = sqlite3.connect(Banco_de_Dados)
    cursor = DB.cursor()
    # cursor.execute(f""" DROP TABLE Musicas """)
    cursor.execute(f""" DROP TABLE Playlist """)
    DB.commit()
    return "",201

def Add_Musicss(URl,Search):
    if(Search == "Youtube"):
        Content = [f"https://www.youtube.com/watch?v={URl.video_id}"]
    else:
        Content = URl
    for url in Content:
        yt = YouTube(url)
        music = yt.streams.filter(only_audio=True).first()
        out_file = music.download(output_path="C:/Reproduction_Folder/music")
        base,ext = os.path.splitext(out_file)
        Retornar = requests.get(f"https://api.vagalume.com.br/search.excerpt?apikey={Key}&q={yt.title}").json()
        for i in range(0,len(Retornar["response"]["docs"])):
            try:
                if(Retornar["response"]["docs"][i]["band"] == yt.author):
                    artist_name = Retornar["response"]["docs"][i]["band"]
                    song_name = Retornar["response"]["docs"][i]["title"]
                    result = lyrics.find(artist_name, song_name)
                else:
                    artist_name = Retornar["response"]["docs"][0]["band"]
                    song_name = Retornar["response"]["docs"][0]["title"]
                    result = lyrics.find(artist_name, song_name)
                Song_Title = str(base).replace("C:/Reproduction_Folder/music\\","") + ".mp4"
                Adicionar_Musica(Song_Title,yt.thumbnail_url,URl,result.song.lyric,result.artist.name,"Musicas") 
            except:
                Song_Title = str(base).replace("C:/Reproduction_Folder/music\\","") + ".mp4"
                Adicionar_Musica(Song_Title,yt.thumbnail_url,URl,"None","None","Musicas") 
        Monstrar = Notification(app_id="Reproduction",
                             title=yt.title,
                             msg="Música Baixada Com Sucesso",
                             duration="short",
                             icon="C:/Users/sustu/Pictures/Programmation/Projeto Principais/ReproductionAPP/static/Arquivos/Icon.png")
        Monstrar.show()

# Rotas
@app.route("/",methods=["GET","POST"])
def home():
    Create_Table()
    # Delete_all()
    Verification_Music()
    return render_template("Home.html")

@app.route("/Index",methods=["GET","POST"])
def index():
    return render_template("index.html")

@app.route("/Adicionar",methods=["GET","POST"])
def Add():
    return render_template("Adicionar.html")

@app.route("/Background",methods=["GET","POST"])
def Bk():
    return render_template("Backgrounds.html")

@app.route("/Playlist_Route",methods=["GET","POST"])
def Playlist_Route():
    return render_template("Playlist.html")

@app.route("/Config",methods=["GET","POST"])
def Sob():
    return render_template("Config.html")

@app.route("/BackgroundEscolha",methods=["GET","POST"])
def BackgroundEscolha():
    return render_template("BackgroundEscolha.html")

# Functions
@app.route("/AddPlaylistMusic",methods=["GET","POST"])
def AddPlaylistMusic():
    data = request.get_json()
    playlist_Gerar = f"https://music.youtube.com/playlist?list={str(data['value']).replace("list=","")[46:]}"
    Retornar = Playlist(playlist_Gerar)
    Add_Musicss(Retornar,"Playlist")
    return render_template("Adicionar.html")

@app.route("/AddMusic",methods=["POST","GET"])
def AddMusic():
    data = request.get_json()
    URl = str(data['value'])
    Retornar = YouTube(URl)
    Add_Musicss(Retornar,"Youtube")
    return render_template("Adicionar.html")

@app.route("/Removendo",methods=["GET","POST"])
def Remover():
    data = request.get_json()
    Id = str(data["value"])
    Name = int(data["Titulo"])
    remove_id(Name,Id,"Musicas")
    return "",201

@app.route("/Delete_All_Btn",methods=["GET","POST"])
def Delete_All_Btn():
    Delete_all()
    return "",201

@app.route("/Remove_Playlist_Btn",methods=["GET","POST"])
def Remove_Btn():
    data = request.get_json()
    Id = str(data["value"])
    remove_id("NULL",Id,"Playlist")
    return "",201

@app.route("/Extractor",methods=["GET","POST"])
def Extractor():
    data = request.get_json()
    Aceitar = [".mp4",".m4a",".mp3",".flac",".wav"]
    CaminhoAntigo = (rf"{data["value"]}").replace("\\", "/")
    for i in range(0,len(Aceitar)):
        for j in os.listdir(CaminhoAntigo):
            if j.endswith(Aceitar[i]):
                Caminho = f"C:/Reproduction_Folder/music/{j}"
                base = f"{CaminhoAntigo}/{j}"
                os.rename(base,Caminho)
    return "",201

@app.route("/Editar",methods=["GET","POST"])
def Editar():
    data = request.get_json()
    Id = str(data["value"])
    Nome = data["Nome"]
    Image = data["Image"]
    Letra = data["Letra"]
    Artista = data["Artista"]
    Edit(Nome,Image,Letra,Artista,Id)
    return render_template("index.html")

@app.route('/music/<path:filename>')
def MusicFolder(filename):
    return send_from_directory(Diretorio + "\\",filename)

@app.route("/PlaylistAdd",methods=["GET","POST"])
def PlaylistAdd():
    data = request.get_json()
    Titulo = data["Name"]
    Image = data["Image"]
    Array = data["MusicList"]
    Adicionar_Musica(Titulo,Image,"NULL","NULL",Array,"Playlist")
    return "",201

@app.route("/PlaylistSearch",methods=["GET","POST"])
def PlaylistSearch():
    try:
        db = sqlite3.connect(Banco_de_Dados)
        db.row_factory = sqlite3.Row
        cursor = db.cursor()
        cursor.execute(f"SELECT * FROM Playlist ")
        dados = cursor.fetchall()
        return jsonify([dict(row) for row in dados])
    except sqlite3.Error as e:
        return jsonify({'error': str(e)}), 500
    finally:
        db.close()

@app.route("/DadosMusic",methods=["GET","POST"])
def DadosMusic():
    try:
        db = sqlite3.connect(Banco_de_Dados)
        db.row_factory = sqlite3.Row
        cursor = db.cursor()
        cursor.execute(f"SELECT * FROM Musicas ")
        dados = cursor.fetchall()
        return jsonify([dict(row) for row in dados])
    except sqlite3.Error as e:
        return jsonify({'error': str(e)}), 500
    finally:
        db.close()

@app.route("/PlaylistItem",methods=["GET","POST"])
def PlaylistItem():
    data = request.get_json()
    DB = sqlite3.connect(Banco_de_Dados)
    cursor = DB.cursor()
    cursor.execute(f"""SELECT List FROM Playlist WHERE titulo='{data["Id"]}'""")
    dados = cursor.fetchall()
    Add = f'{str(dados)},{str(data["value"])}'
    Array.append(Add)
    for value in Array:
        cursor.execute("UPDATE Playlist SET List = ? WHERE titulo = ?",(f"{(removeCaracter(str(value),'",|\\'))}",str(data["Id"])))
        cursor.execute(" delete from Playlist where rowid not in(select min(rowid) from Playlist group by titulo);")
    DB.commit()
    return "",201

if __name__ == "__main__":
    # app.run(debug=True,port=6969)
    webview.start(private_mode=False,http_server=True)