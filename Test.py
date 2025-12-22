import os,sqlite3
Musicas = []
Banco_de_Dados = "C:/Reproduction_Folder/API.db"
Folder = "C:/Reproduction_Folder/music"
Quantidade_Pasta = os.listdir(Folder)
DB = sqlite3.connect(Banco_de_Dados)
cursor = DB.cursor()
cursor.execute("SELECT titulo FROM Musicas")
dados = cursor.fetchall()
# Banco de Dados


# Pasta
for j in Quantidade_Pasta:
    Musicas.append(j)

for i in dados:
    Musicas.append(i[0])


for i in dados:
    for x in Musicas:
        if x == str(i[0]):
            Musicas.remove(x)
            Quantidade = len(Musicas)

    
del Musicas[Quantidade - 1]



for y in Musicas:
    os.remove(f"C:/Reproduction_Folder/music/{y}")
    cursor.execute(f""" DELETE FROM Musicas WHERE titulo={y} """)

DB.commit()