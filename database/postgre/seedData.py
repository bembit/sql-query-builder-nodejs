import psycopg2
from datetime import datetime, timedelta
import random

# Connect to the PostgreSQL database
conn = psycopg2.connect(
    dbname='postgres',
    user='postgres',
    password='root',
    host='localhost',
    port='5432'
)
cursor = conn.cursor()

# Define data for the tables
departments = ['HR', 'Engineering', 'Sales', 'Marketing', 'Finance']
job_titles = ['Manager', 'Engineer', 'Salesperson', 'Marketer', 'Accountant']

# Insert Departments
for department_name in departments:
    cursor.execute('''
        INSERT INTO departments (department_name)
        VALUES (%s)
        RETURNING department_id;
    ''', (department_name,))
    department_id = cursor.fetchone()[0]

# Insert Employees
for i in range(1, 1001):  # 1000 employees
    first_name = f"FirstName{i}"
    last_name = f"LastName{i}"
    email = f"{first_name.lower()}.{last_name.lower()}@company.com"
    phone_number = f"+1-800-{i:04d}"
    hire_date = (datetime.now() - timedelta(days=random.randint(1, 3650))).strftime('%Y-%m-%d')
    job_title = random.choice(job_titles)
    department_id = random.randint(1, len(departments))
    salary = round(random.uniform(50000, 120000), 2)

    cursor.execute('''
        INSERT INTO employees (first_name, last_name, email, phone_number, hire_date, job_title, department_id, salary)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
        RETURNING employee_id;
    ''', (first_name, last_name, email, phone_number, hire_date, job_title, department_id, salary))
    employee_id = cursor.fetchone()[0]

# Insert Projects
for i in range(1, 101):  # 100 projects
    project_name = f"Project_{i}"
    start_date = (datetime.now() - timedelta(days=random.randint(1, 730))).strftime('%Y-%m-%d')
    end_date = (datetime.now() + timedelta(days=random.randint(1, 730))).strftime('%Y-%m-%d')
    department_id = random.randint(1, len(departments))

    cursor.execute('''
        INSERT INTO projects (project_name, start_date, end_date, department_id)
        VALUES (%s, %s, %s, %s)
        RETURNING project_id;
    ''', (project_name, start_date, end_date, department_id))
    project_id = cursor.fetchone()[0]

# Insert Employee Projects
for employee_id in range(1, 1001):
    for _ in range(random.randint(1, 3)):  # Each employee works on 1 to 3 projects
        project_id = random.randint(1, 100)
        assignment_date = (datetime.now() - timedelta(days=random.randint(1, 365))).strftime('%Y-%m-%d')
        
        cursor.execute('''
            INSERT INTO employee_projects (employee_id, project_id, assignment_date)
            VALUES (%s, %s, %s)
        ''', (employee_id, project_id, assignment_date))

# Commit the changes and close the connection
conn.commit()
print("Dummy data insertion complete.")
conn.close()
