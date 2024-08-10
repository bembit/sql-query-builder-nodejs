import sqlite3

# Connect to the SQLite database
conn = sqlite3.connect('../telecom_company.db')
cursor = conn.cursor()

# Retrieve the names of all tables in the database
cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
tables = cursor.fetchall()

# Loop through each table and delete all data
for table_name in tables:
    table_name = table_name[0]
    print(f"Deleting data from {table_name}...")
    cursor.execute(f"DELETE FROM {table_name};")

# Commit the changes to the database
conn.commit()

print("All data has been deleted from the database.")

# Close the connection
conn.close()
