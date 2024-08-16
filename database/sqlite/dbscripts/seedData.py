import sqlite3
from datetime import datetime, timedelta
import random

# Connect to the SQLite database
conn = sqlite3.connect('../telecom_company.db')
cursor = conn.cursor()

# Define data for the tables
regions = ['London', 'Berlin', 'Paris', 'Rome', 'Madrid']
product_types = ['Mobile', 'Broadband']
account_statuses = ['Active', 'Inactive']
call_types = ['Incoming', 'Outgoing']
sms_types = ['Text', 'Multimedia']

# Insert Products
products = [
    ('Mobile Plan A', 'Mobile', 29.99, 'Basic mobile plan', '2023-01-01'),
    ('Mobile Plan B', 'Mobile', 49.99, 'Premium mobile plan', '2023-02-01'),
    ('Broadband Plan A', 'Broadband', 39.99, 'Basic broadband plan', '2023-03-01'),
    ('Broadband Plan B', 'Broadband', 59.99, 'Premium broadband plan', '2023-04-01')
]

for product in products:
    try:
        cursor.execute('''
            INSERT INTO products (product_name, product_type, price, description, launch_date)
            VALUES (?, ?, ?, ?, ?)
        ''', product)
    except sqlite3.IntegrityError:
        print(f"Product '{product[0]}' already exists.")

# Insert Customers
for i in range(1, 1001):  # 1000 customers
    first_name = f"FirstName{i}"
    last_name = f"LastName{i}"
    email = f"{first_name.lower()}.{last_name.lower()}@example.com"
    phone_number = f"+1-800-{i:04d}"
    date_of_birth = (datetime.now() - timedelta(days=random.randint(18*365, 65*365))).strftime('%Y-%m-%d')
    address = f"Address {i}"
    city = random.choice(['London', 'Berlin', 'Paris', 'Rome', 'Madrid'])
    country = 'Country'
    signup_date = (datetime.now() - timedelta(days=random.randint(1, 365))).strftime('%Y-%m-%d')
    account_status = random.choice(account_statuses)
    
    try:
        cursor.execute('''
            INSERT INTO customers (first_name, last_name, email, phone_number, date_of_birth, address, city, country, signup_date, account_status)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ''', (first_name, last_name, email, phone_number, date_of_birth, address, city, country, signup_date, account_status))
    except sqlite3.IntegrityError:
        print(f"Customer '{first_name} {last_name}' already exists.")

# Insert Customer Products
for customer_id in range(1, 1001):
    for _ in range(random.randint(1, 3)):  # 1 to 3 products per customer
        product_id = random.randint(1, len(products))
        start_date = (datetime.now() - timedelta(days=random.randint(1, 365))).strftime('%Y-%m-%d')
        end_date = (datetime.now() + timedelta(days=random.randint(1, 365))).strftime('%Y-%m-%d')
        status = random.choice(['Active', 'Inactive'])
        
        try:
            cursor.execute('''
                INSERT INTO customer_products (customer_id, product_id, start_date, end_date, status)
                VALUES (?, ?, ?, ?, ?)
            ''', (customer_id, product_id, start_date, end_date, status))
        except sqlite3.IntegrityError:
            print(f"Duplicate entry for customer {customer_id} and product {product_id}.")

# Insert Call Records
for customer_id in range(1, 1001):
    for _ in range(random.randint(1, 5)):  # 1 to 5 call records per customer
        call_start_time = (datetime.now() - timedelta(days=random.randint(1, 30))).strftime('%Y-%m-%d %H:%M:%S')
        call_end_time = (datetime.strptime(call_start_time, '%Y-%m-%d %H:%M:%S') + timedelta(minutes=random.randint(1, 60))).strftime('%Y-%m-%d %H:%M:%S')
        duration = (datetime.strptime(call_end_time, '%Y-%m-%d %H:%M:%S') - datetime.strptime(call_start_time, '%Y-%m-%d %H:%M:%S')).seconds // 60
        call_type = random.choice(call_types)
        call_initiation_region = random.choice(regions)
        call_destination_region = random.choice(regions)
        
        try:
            cursor.execute('''
                INSERT INTO call_records (customer_id, call_start_time, call_end_time, duration, call_type, call_initiation_region, call_destination_region)
                VALUES (?, ?, ?, ?, ?, ?, ?)
            ''', (customer_id, call_start_time, call_end_time, duration, call_type, call_initiation_region, call_destination_region))
        except sqlite3.IntegrityError:
            print(f"Duplicate call record for customer {customer_id}.")

# Insert SMS Records
for customer_id in range(1, 1001):
    for _ in range(random.randint(1, 5)):  # 1 to 5 SMS records per customer
        sms_time = (datetime.now() - timedelta(days=random.randint(1, 30))).strftime('%Y-%m-%d %H:%M:%S')
        sms_type = random.choice(sms_types)
        sms_initiation_region = random.choice(regions)
        sms_destination_region = random.choice(regions)
        sms_length = random.randint(10, 200)  # SMS length between 10 and 200 characters
        
        try:
            cursor.execute('''
                INSERT INTO sms_records (customer_id, sms_time, sms_type, sms_initiation_region, sms_destination_region, sms_length)
                VALUES (?, ?, ?, ?, ?, ?)
            ''', (customer_id, sms_time, sms_type, sms_initiation_region, sms_destination_region, sms_length))
        except sqlite3.IntegrityError:
            print(f"Duplicate SMS record for customer {customer_id}.")

# Insert Data Usage
for customer_id in range(1, 1001):
    for _ in range(random.randint(1, 3)):  # 1 to 3 data usage records per customer
        usage_date = (datetime.now() - timedelta(days=random.randint(1, 30))).strftime('%Y-%m-%d')
        data_used_mb = random.randint(100, 5000)  # Data usage between 100 MB and 5000 MB
        region = random.choice(regions)
        
        try:
            cursor.execute('''
                INSERT INTO data_usage (customer_id, usage_date, data_used_mb, region)
                VALUES (?, ?, ?, ?)
            ''', (customer_id, usage_date, data_used_mb, region))
        except sqlite3.IntegrityError:
            print(f"Duplicate data usage record for customer {customer_id}.")

# Commit the changes and close the connection
conn.commit()
print("Dummy data insertion complete.")
conn.close()
