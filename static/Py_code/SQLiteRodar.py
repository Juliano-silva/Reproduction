import sqlite3,json,lyricsgenius,os
from static.Py_code.Script import * 

Key = "666888f22b401b1859e2d405495c47ee"
genius = lyricsgenius.Genius("AsX5ZvnafYQQiqgcIGRy7Dd1okxIP3J9DF5bPVTvLmSApYVQjqzKmhJwLnbWg5TQ")

Banco_de_Dados = "C:/Reproduction_Folder/API.db"
Diretorio = "C:/Reproduction_Folder/music"

List_Playlist = []

def Creater():
    DB = sqlite3.connect(Banco_de_Dados)
    cursor = DB.cursor()
    try:
        cursor.execute("""CREATE TABLE IF NOT EXISTS Musicas (id INTEGER PRIMARY key AUTOINCREMENT, Title TEXT UNIQUE, Thumb BLOB , url BLOB,Letter BLOB,Artist BLOB)""")
        cursor.execute("""CREATE TABLE IF NOT EXISTS Playlist (id INTEGER PRIMARY key AUTOINCREMENT, Title TEXT UNIQUE, Thumb BLOB , Itens BLOB)""")
        cursor.execute("""CREATE TABLE IF NOT EXISTS Config (id INTEGER PRIMARY key AUTOINCREMENT,BackgroundEscolha BLOB,Background BLOB,User BLOB,Quantidade BLOB,Pastas BLOB)""")
    except sqlite3.Error as e:
        print(e)
    DB.commit()

def Adicionar(Song_Title,Thumb,url,letter,artist):
    DB = sqlite3.connect(Banco_de_Dados)
    cursor = DB.cursor()
    cursor.execute(f""" INSERT OR IGNORE INTO Musicas values (NULL,?, ?, ?, ?, ?)""",(Song_Title,Thumb,url,letter,artist))
    
    cursor.execute(""" 
                   delete from Musicas where rowid not in
                   (select min(rowid) from Musicas
                   group by Title);
                   """)
    DB.commit()


def PlaylistAdd(Id,Title,Thumb):
    DB = sqlite3.connect(Banco_de_Dados)
    cursor = DB.cursor()

    cursor.execute(f""" INSERT OR IGNORE INTO Playlist values ( ? ,?, ?,?)""",(Id,Title,Thumb,""))
    
    cursor.execute(""" 
                   delete from Playlist where rowid not in
                   (select min(rowid) from Playlist
                   group by Title);
                   """)
    DB.commit()

def AddItemList(PlaylistTitle,PlaylistID,PlaylistItem):
    DB = sqlite3.connect(Banco_de_Dados)
    cursor = DB.cursor()
    cursor.execute(f"""SELECT Itens FROM Playlist WHERE Title='{PlaylistTitle}'""")
    dados = cursor.fetchall()

    nova_Entrada = {"ID":int(PlaylistID),
                    "Name":PlaylistItem}

    if(len(dados) <= 1):
        List_Playlist.append(nova_Entrada)
    else:
        List_Playlist.append(f"{dados},{nova_Entrada}")

    cursor.execute("UPDATE Playlist SET Itens=? WHERE Title=?",(f"{remover_caracter(str(List_Playlist),'",|\\').replace("'",'"')}",f"{PlaylistTitle}"))
    cursor.execute(""" delete from Playlist where rowid not in(select min(rowid) from Playlist group by Title); """)
    DB.commit()
    print(f"Item Adicionado na Playlist {PlaylistTitle}")
    return "",201

def Adicionar_Imagem(url):
      DB = sqlite3.connect(Banco_de_Dados)
      cursor = DB.cursor()

      cursor.execute(f"""
                     INSERT OR IGNORE INTO Config values 
                     (NULL,"{url}",NULL,NULL,NULL,NULL)
                     """)
      DB.commit()

def REMOVE_ALL():
    print("FOI")
    DB = sqlite3.connect(Banco_de_Dados)
    cursor = DB.cursor()
    cursor.execute(f""" DROP TABLE Musicas """)
    for pasta_atual, subpastas, arquivos in os.walk(Diretorio):
        for arquivo in arquivos:
            caminho_arquivo = os.path.join(pasta_atual, arquivo)
            os.remove(caminho_arquivo)
    cursor.execute(f""" DROP TABLE Playlist """)
    cursor.execute(f""" DROP TABLE Config """)
    DB.commit()
    return "",201

def Mostrar(SelectionText):
    try:
        db = sqlite3.connect(Banco_de_Dados)
        db.row_factory = sqlite3.Row
        cursor = db.cursor()
        cursor.execute(f"SELECT * FROM {SelectionText}")
        dados = cursor.fetchall()
        return ([dict(row) for row in dados])
    except sqlite3.Error as e:
        return json.loads({'error',str(e)}),500
    finally:
        db.close()
  

__all__ = ["Creater","Adicionar","Mostrar","REMOVE_ALL","Adicionar_Imagem","PlaylistAdd","AddItemList"]