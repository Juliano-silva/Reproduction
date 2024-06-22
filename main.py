#Dependencies
from flask import *
import os , glob , json , webview , ctypes , random , sqlite3,requests,urllib.request
from pytube import YouTube,Search
from vagalume import lyrics
from winotify import Notification


app = Flask(__name__)


# Caminhos
Banco_de_Dados = "C:/Reproduction_Folder/API.db"
Diretorio = "C:\\Reproduction_Folder\\music"
Key = "666888f22b401b1859e2d405495c47ee"
Array = []
Musicas = []
Not_Exist = []
Remove_Exist = []

DB = sqlite3.connect(Banco_de_Dados)
cursor = DB.cursor()
cursor.execute("""CREATE TABLE IF NOT EXISTS Musicas (id INTEGER PRIMARY key AUTOINCREMENT, titulo TEXT UNIQUE, Image BLOB , url TEXT,Letra TEXT,Artista TEXT)""")
DB.commit()

existe = os.path.exists("C:\\Reproduction_Folder")
if(existe == False):
    os.makedirs("C:\\Reproduction_Folder")
    Arquivo = open('C:/Reproduction_Folder/API.db','x',encoding="utf-8")
else:
    print("Existe")


# Functions
@app.route("/AddMusic",methods=["POST","GET"])
def AddMusic():
    data = request.get_json()
    # Video Baixar URL
    yt = YouTube(str(data['value']))
    music = yt.streams.filter(only_audio=True).first()
    out_file = music.download(output_path="C:/Reproduction_Folder/music")
    base,ext = os.path.splitext(out_file)

    DB = sqlite3.connect(Banco_de_Dados)
    cursor = DB.cursor()
    Retornar = requests.get(f"https://api.vagalume.com.br/search.excerpt?apikey={Key}&q={yt.title}").json()
    for i in range(0,len(Retornar["response"]["docs"])):
        if(Retornar["response"]["docs"][i]["band"] == yt.author):
            artist_name = Retornar["response"]["docs"][i]["band"]
            song_name = Retornar["response"]["docs"][i]["title"]
            result = lyrics.find(artist_name, song_name)
        else:
             artist_name = Retornar["response"]["docs"][0]["band"]
             song_name = Retornar["response"]["docs"][0]["title"]
             result = lyrics.find(artist_name, song_name)    
    cursor.execute(f"""
                   INSERT OR IGNORE INTO Musicas values 
                   (NULL,"{str(base).replace("C:/Reproduction_Folder/music\\","") + ".mp4"}","{yt.thumbnail_url}","{data["value"]}","{result.song.lyric}","{result.artist.name}") 
                   """)
    cursor.execute("""
                   delete from Musicas where rowid not in
                   (select min(rowid) from Musicas
                   group by titulo);
                   """)
    DB.commit()
    Monstrar = Notification(app_id="Reproduction",
                       title=yt.title,
                       msg="Música Baixada Com Sucesso",
                       duration="short",
                       icon="C:\Reproduction_Folder\ReproductionIcon.jpg")
    Monstrar.show()
    return render_template("Adicionar.html")

@app.route("/Removendo",methods=["GET","POST"])
def Remover():
    data = request.get_json()
    DB = sqlite3.connect(Banco_de_Dados)
    cursor = DB.cursor()
    Id = str(data["value"])
    Name = int(data["Titulo"])
    dir_list = os.listdir("C:/Reproduction_Folder/music/") 
    os.remove(f"C:/Reproduction_Folder/music/{dir_list[Name]}")
    cursor.execute(f""" DELETE FROM Musicas WHERE titulo={Id} """)
    DB.commit()
    
    return "",201

@app.route("/Remove_Playlist_Btn",methods=["GET","POST"])
def Remove_Btn():
    data = request.get_json()
    DB = sqlite3.connect(Banco_de_Dados)
    cursor = DB.cursor()
    Id = str(data["value"])
    cursor.execute(f""" DELETE FROM Playlist WHERE id={Id} """)
    DB.commit()
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
    DB = sqlite3.connect(Banco_de_Dados)
    cursor = DB.cursor()
    cursor.execute(f"""
                   UPDATE Musicas SET titulo="{Nome}", Image="{Image}", Letra="{Letra}", Artista="{Artista}" WHERE id={Id}
                   """)
    DB.commit()
    return render_template("index.html")

# Rotas
@app.route("/",methods=["GET","POST"])
def home():
    Folder = "C:/Reproduction_Folder/music"
    Dados = sqlite3.connect("C:/Reproduction_Folder/API.db")
    cursor = Dados.cursor()
    cursor.execute("SELECT titulo FROM Musicas ")
    dados_Execute = cursor.fetchall()

    for i in os.listdir(Folder):
        Not_Exist.append(i)
        
    for j in dados_Execute:
        if j[0] in Not_Exist:
            Not_Exist.remove(j[0])
    
    try:
        for i in Not_Exist:
            s = Search(i)
            NewUrl = str(s.results[0])
            CreateUrl = NewUrl.replace("<pytube.__main__.YouTube object: videoId=","").replace(">","")
            URLs = (f"https://www.youtube.com/watch?v={CreateUrl}")
            Buscar = YouTube(URLs)
            Retornar = requests.get(f"https://api.vagalume.com.br/search.excerpt?apikey={Key}&q={Buscar.title}").json()
            for i in range(0,len(Retornar["response"]["docs"])):
                if(Retornar["response"]["docs"][i]["band"] == Buscar.author):
                    artist_name = Retornar["response"]["docs"][i]["band"]
                    song_name = Retornar["response"]["docs"][i]["title"]
                    result = lyrics.find(artist_name, song_name)
                else:
                    artist_name = Retornar["response"]["docs"][0]["band"]
                    song_name = Retornar["response"]["docs"][0]["title"]
                    result = lyrics.find(artist_name, song_name)    
                    
    except:
        artist_name = Retornar["response"]["docs"][i]["band"]
        result = "Letra de Desconhecida"
        
    
    for i in dados_Execute:
        Remove_Exist.append(i[0])
        
    for j in os.listdir(Folder):
        if j in Remove_Exist:
            Remove_Exist.remove(j)
    
    try:
        for ms in Remove_Exist:
            cursor.execute(f""" DELETE FROM Musicas WHERE titulo="{ms}" """)
    except:
        return "",201

    try:
        cursor.execute(f"""
                   INSERT OR IGNORE INTO Musicas values 
                   (NULL,"{Buscar.title}.mp4","{Buscar.thumbnail_url}","{URLs}","{result}","{artist_name}") 
                   """)
        cursor.execute("""
                   delete from Musicas where rowid not in
                   (select min(rowid) from Musicas
                   group by titulo);
                   """)
    except:
        print("Nada")
    Dados.commit()
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

@app.route("/Playlist",methods=["GET","POST"])
def Playlist():
    return render_template("Playlist.html")

@app.route("/Config",methods=["GET","POST"])
def Sob():
    return render_template("Config.html")

@app.route("/BackgroundEscolha",methods=["GET","POST"])
def BackgroundEscolha():
    return render_template("BackgroundEscolha.html")


@app.route('/music/<path:filename>')
def MusicFolder(filename):
    return send_from_directory(Diretorio + "\\",filename)

@app.route("/PlaylistAdd",methods=["GET","POST"])
def PlaylistAdd():
    data = request.get_json()
    Titulo = data["Name"]
    Image = data["Image"]
    Array = data["MusicList"]
    DB = sqlite3.connect(Banco_de_Dados)
    cursor = DB.cursor()
    cursor.execute("""CREATE TABLE IF NOT EXISTS Playlist (id INTEGER PRIMARY key AUTOINCREMENT, titulo TEXT UNIQUE, Image BLOB , List BLOB)""")
    cursor.execute(f""" INSERT OR IGNORE INTO Playlist values (NULL,"{Titulo}","{Image}","{Array}")  """)
    DB.commit()
    return "",201


@app.route("/PlaylistItem",methods=["GET","POST"])
def PlaylistItem():
    data = request.get_json()
    DB = sqlite3.connect(Banco_de_Dados)
    cursor = DB.cursor()
    cursor.execute(f"""SELECT List FROM Playlist WHERE titulo='{data["Id"]}'""")
    dados = cursor.fetchall()
    Add = f'"{str(dados)}","{str(data["value"])}"'
    Array.append(Add)
    update_sql = "UPDATE Playlist SET List = ? WHERE titulo = ?"
    for value in Array:
        cursor.execute(update_sql,("[" + str(value).replace('"[""",',"").replace('["',"").replace("',)]","").replace('""[','').replace("|","").replace("||","").replace('""','"').replace("[]","").replace(r"\\","").replace("[('","").replace('"]"',"").replace(',"','","') + "]",str(data["Id"])))
        cursor.execute(" delete from Playlist where rowid not in(select min(rowid) from Playlist group by titulo);")
    DB.commit()
    return "",201

@app.route("/PlaylistSearch",methods=["GET","POST"])
def PlaylistSearch():
    try:
        db = sqlite3.connect(Banco_de_Dados)
        db.row_factory = sqlite3.Row
        cursor = db.cursor()
        cursor.execute("SELECT * FROM Playlist")
        dados = cursor.fetchall()
        return jsonify([dict(row) for row in dados])
    except sqlite3.Error as e:
        return jsonify({'error':str(e)}),500
    finally:
        db.close()

@app.route("/DadosMusic",methods=["GET","POST"])
def DadosMusic():
    try:
        db = sqlite3.connect(Banco_de_Dados)
        db.row_factory = sqlite3.Row
        cursor = db.cursor()
        cursor.execute("SELECT * FROM Musicas ")
        dados = cursor.fetchall()
        return jsonify([dict(row) for row in dados])
    except sqlite3.Error as e:
        return jsonify({'error': str(e)}), 500
    finally:
        db.close()


if __name__ == "__main__":
    app.run(debug=True,port=6969)

