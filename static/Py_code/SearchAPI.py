import os
Diretorio = "C:\\Reproduction_Folder\\music"

def Musicas_Rodar():
    print("Olá")

def Retornar():
    return os.listdir(Diretorio)




__all__ = ["Retornar"]