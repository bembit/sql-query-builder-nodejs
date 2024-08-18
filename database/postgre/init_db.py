# localhost postgre test script

import psycopg2
from psycopg2 import sql

# Replace these with your own details
db_name = "postgres"
user = "postgres"
password = "root"
host = "localhost"
port = "5432"

# Establish connection to PostgreSQL
try:
    connection = psycopg2.connect(
        dbname=db_name,
        user=user,
        password=password,
        host=host,
        port=port
    )

    connection.autocommit = True
    cursor = connection.cursor()

    # Create a new table
    create_table_query = sql.SQL("""
        CREATE TABLE IF NOT EXISTS employees (
            id SERIAL PRIMARY KEY,
            name VARCHAR(100),
            position VARCHAR(100),
            salary NUMERIC
        )
    """)
    cursor.execute(create_table_query)
    print("Table 'employees' created successfully.")

    # Insert data into the table
    insert_data_query = sql.SQL("""
        INSERT INTO employees (name, position, salary) VALUES
        ('John Doe', 'Manager', 75000),
        ('Jane Smith', 'Developer', 60000),
        ('Emily Davis', 'Designer', 50000)
    """)
    cursor.execute(insert_data_query)
    print("Data inserted successfully.")

except Exception as error:
    print(f"Error: {error}")

finally:
    # Close the cursor and connection
    if cursor:
        cursor.close()
    if connection:
        connection.close()
    print("PostgreSQL connection is closed.")
