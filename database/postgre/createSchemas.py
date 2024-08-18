import psycopg2

# Connect to PostgreSQL database
conn = psycopg2.connect(
    dbname='postgres',
    user='postgres',
    password='root',
    host='localhost',
    port='5432'
)
cursor = conn.cursor()

# Create Departments Table without foreign key
cursor.execute('''
CREATE TABLE IF NOT EXISTS departments (
    department_id SERIAL PRIMARY KEY,
    department_name VARCHAR(100),
    manager_id INTEGER -- Foreign key will be added later
)
''')

# Create Employees Table without foreign key
cursor.execute('''
CREATE TABLE IF NOT EXISTS employees (
    employee_id SERIAL PRIMARY KEY,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    email VARCHAR(255),
    phone_number VARCHAR(20),
    hire_date DATE,
    job_title VARCHAR(100),
    department_id INTEGER,
    salary DECIMAL(10, 2) -- Foreign key will be added later
)
''')

# Create Projects Table
cursor.execute('''
CREATE TABLE IF NOT EXISTS projects (
    project_id SERIAL PRIMARY KEY,
    project_name VARCHAR(100),
    start_date DATE,
    end_date DATE,
    department_id INTEGER,
    FOREIGN KEY (department_id) REFERENCES departments(department_id)
)
''')

# Create Employee Projects Table (Many-to-Many relationship)
cursor.execute('''
CREATE TABLE IF NOT EXISTS employee_projects (
    employee_project_id SERIAL PRIMARY KEY,
    employee_id INTEGER,
    project_id INTEGER,
    assignment_date DATE,
    FOREIGN KEY (employee_id) REFERENCES employees(employee_id),
    FOREIGN KEY (project_id) REFERENCES projects(project_id)
)
''')

# Commit initial table creation
conn.commit()
print("Tables created successfully without foreign keys.")

# Step 2: Add Foreign Keys

# Add foreign key to Departments table
cursor.execute('''
ALTER TABLE departments
ADD CONSTRAINT fk_manager
FOREIGN KEY (manager_id)
REFERENCES employees(employee_id)
''')

# Add foreign key to Employees table
cursor.execute('''
ALTER TABLE employees
ADD CONSTRAINT fk_department
FOREIGN KEY (department_id)
REFERENCES departments(department_id)
''')

# Commit the changes and close connection
conn.commit()
print("Foreign keys added successfully!")
conn.close()