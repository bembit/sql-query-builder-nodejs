import psycopg2

# Connect to the PostgreSQL database
conn = psycopg2.connect(
    dbname='postgres',
    user='postgres',
    password='root',
    host='localhost',
    port='5432'
)
cursor = conn.cursor()

# Retrieve the names of all tables in the database
cursor.execute("""
SELECT table_name FROM information_schema.tables
WHERE table_schema = 'public'
AND table_type = 'BASE TABLE';
""")
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
