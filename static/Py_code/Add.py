import os,requests,lyricsgenius
from pytubefix import YouTube,Playlist
from static.Py_code.SQLiteRodar import *
from static.Py_code.Script import *
from winotify import Notification


Key = "666888f22b401b1859e2d405495c47ee"
genius = lyricsgenius.Genius("AsX5ZvnafYQQiqgcIGRy7Dd1okxIP3J9DF5bPVTvLmSApYVQjqzKmhJwLnbWg5TQ")
Diretorio = "C:\\Reproduction_Folder\\music"


Creater()

def Add_Musica(url):
    yt = YouTube(url)
    Title = yt.title
    music = yt.streams.filter(only_audio=True).first()
    music.download(output_path="C:/Reproduction_Folder/music",filename=f"{Title}.mp3")

    Title_Letter = remover_caracter(str(Title),'",|[]}{-\\')
    Author_Letter = remover_caracter(str(yt.author),'",|-[]}{\\')


    try:
        letter = genius.search_song(f"{Author_Letter}", f"{Title_Letter}")
    except:
        letter = "Letra"
    
    Adicionar(str(Title),yt.thumbnail_url,yt.watch_url,letter,yt.author)    
    Mostrar = Notification(app_id="Reproduction_DELUXE",
                           title=f"{Title}",
                           duration="short",
                           icon=f"{yt.thumbnail_url}")
    Mostrar.show()

    

def Add_Playlist(url):
    play_music = Playlist('https://music.youtube.com/watch?v=tCHQXRmMnb4&list=PLJeVzGOQTXG8cTjHa_facpENaLENXAjEp')
    for music in play_music.videos:
        music.streams.filter(only_audio=True).first().download(output_path="C:/Reproduction_Folder/music",filename=f"{music.title}.mp3")
        
        Title_Letter = remover_caracter(str(music.title),'",|[]}{-\\')
        Author_Letter = remover_caracter(str(music.author),'",|-[]}{\\')
                                         
        try:
            letter = genius.search_song(f"{Author_Letter}", f"{Title_Letter}")
        except:
            letter = "Letra"

        Adicionar(str(music.title),music.thumbnail_url,music.watch_url,letter,music.author)
        Mostrar = Notification(app_id="Reproduction_DELUXE",
                           title=f"{music.title}",
                           duration="short",
                           icon=f"{music.thumbnail_url}")
        Mostrar.show()
    return "",205

def Background(url):
    Adicionar_Imagem(url)
    return "",205

def Background_FILE(url):
    Adicionar_Imagem(url)
    return "",205