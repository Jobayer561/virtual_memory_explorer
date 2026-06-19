import sqlite3

conn = sqlite3.connect("virtumem.db")
cursor = conn.cursor()

cursor.execute("SELECT * FROM simulation_results")

columns = [column[0] for column in cursor.description]
rows = cursor.fetchall()

for row in rows:
    print(dict(zip(columns, row)))

conn.close()