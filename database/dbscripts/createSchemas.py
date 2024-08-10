import sqlite3

# Connect to SQLite database (or create it if it doesn't exist)
conn = sqlite3.connect('../telecom_company.db')
cursor = conn.cursor()

# Create tables

# Customers Table
cursor.execute('''
CREATE TABLE IF NOT EXISTS customers (
    customer_id INTEGER PRIMARY KEY,
    first_name TEXT,
    last_name TEXT,
    email TEXT,
    phone_number TEXT,
    date_of_birth DATE,
    address TEXT,
    city TEXT,
    country TEXT,
    signup_date DATE,
    account_status TEXT
)
''')

# Products Table
cursor.execute('''
CREATE TABLE IF NOT EXISTS products (
    product_id INTEGER PRIMARY KEY,
    product_name TEXT,
    product_type TEXT,
    price DECIMAL,
    description TEXT,
    launch_date DATE
)
''')

# Customer Products Table
cursor.execute('''
CREATE TABLE IF NOT EXISTS customer_products (
    customer_product_id INTEGER PRIMARY KEY,
    customer_id INTEGER,
    product_id INTEGER,
    start_date DATE,
    end_date DATE,
    status TEXT,
    FOREIGN KEY(customer_id) REFERENCES customers(customer_id),
    FOREIGN KEY(product_id) REFERENCES products(product_id)
)
''')

# Call Records Table
cursor.execute('''
CREATE TABLE IF NOT EXISTS call_records (
    call_id INTEGER PRIMARY KEY,
    customer_id INTEGER,
    call_start_time DATETIME,
    call_end_time DATETIME,
    duration INTEGER,
    call_type TEXT,
    call_initiation_region TEXT,
    call_destination_region TEXT,
    FOREIGN KEY(customer_id) REFERENCES customers(customer_id)
)
''')

# SMS Records Table
cursor.execute('''
CREATE TABLE IF NOT EXISTS sms_records (
    sms_id INTEGER PRIMARY KEY,
    customer_id INTEGER,
    sms_time DATETIME,
    sms_type TEXT,
    sms_initiation_region TEXT,
    sms_destination_region TEXT,
    sms_length INTEGER,
    FOREIGN KEY(customer_id) REFERENCES customers(customer_id)
)
''')

# Data Usage Table
cursor.execute('''
CREATE TABLE IF NOT EXISTS data_usage (
    usage_id INTEGER PRIMARY KEY,
    customer_id INTEGER,
    usage_date DATE,
    data_used_mb DECIMAL,
    region TEXT,
    FOREIGN KEY(customer_id) REFERENCES customers(customer_id)
)
''')

# Commit changes and close connection
conn.commit()
print("Tables created successfully!")
conn.close()
