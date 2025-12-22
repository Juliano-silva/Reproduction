import os,sqlite3
Banco_de_Dados = "C:/Reproduction_Folder/API.db"
Diretorio = "C:/Reproduction_Folder/music"
List_Diretorio = []
List_Banco = []


def remover_caracter(old,to_remove):
    new_string = old
    for x in to_remove:
        new_string.replace(x,'')
    return new_string

def Verificar_Download():
    try:
        DB = sqlite3.connect(Banco_de_Dados)
        cursor = DB.cursor()
        Itens = cursor.execute("SELECT * FROM Musicas")

        for i in range(0,len(os.listdir(Diretorio))):
            List_Diretorio.append(str(os.listdir(Diretorio)[i]).replace(".mp3",""))

        for j in Itens:
            List_Banco.append(j[1])    
            
        Diferent = list(set(List_Banco) ^ set(List_Diretorio))
        
        for x in Diferent:
            try:
                DB.execute(f""" DELETE FROM Musicas WHERE Title={x} """)
                DB.commit()
                os.remove(f"{Diretorio}/{x}.mp3")
            except:
                print("Não Foi encontrado o Arquivo")
            print("Todas as Músicas Foram Apagadas")
    except:
        print("Sem item para Remover")

__all__ = ["remover_caracter","Verificar_Download"]