Bank Management System
📌 Project Overview

 Bank Management System is a frontend-based DBMS project developed using HTML, CSS, and JavaScript. It simulates real-world banking operations and demonstrates core Database Management System concepts such as CRUD Operations, SQL Queries, Stored Procedures, and Triggers through an interactive banking dashboard.

The application provides a user-friendly interface for managing customers, branches, accounts, transactions, loans, and employees without requiring a backend database.

🎯 Objectives
Demonstrate DBMS concepts in a banking environment.
Manage banking records through a graphical interface.
Simulate SQL operations using JavaScript.
Provide visual analytics through charts and dashboards.
Implement CRUD operations on multiple banking entities.
🛠️ Technologies Used
Technology	Purpose
HTML5	Structure and Layout
CSS3	Styling and Responsive Design
JavaScript (ES6)	Business Logic and Data Handling
Chart.js	Dashboard Analytics & Graphs
Local Storage	Simulated Database Storage
Font Awesome	Icons
📂 Database Tables
Customer

Stores customer information.

Field	Description
customer_id	Unique Customer ID
name	Customer Name
phone	Contact Number
address	Customer Address
Branch

Stores bank branch details.

Field	Description
branch_id	Unique Branch ID
branch_name	Branch Name
location	Branch Location
Account

Stores account information.

Field	Description
account_id	Unique Account ID
customer_id	Customer Reference
branch_id	Branch Reference
account_type	Savings/Current
balance	Account Balance
Transaction

Stores transaction details.

Field	Description
transaction_id	Unique Transaction ID
account_id	Account Reference
transaction_type	Credit/Debit
amount	Transaction Amount
transaction_date	Transaction Date
Loan

Stores loan information.

Field	Description
loan_id	Unique Loan ID
customer_id	Customer Reference
loan_type	Loan Category
amount	Loan Amount
status	Approved/Pending
Employee

Stores employee details.

Field	Description
employee_id	Unique Employee ID
branch_id	Branch Reference
employee_name	Employee Name
designation	Employee Role

✨ Features
Dashboard
Banking Analytics Dashboard
Customer Statistics
Account Statistics
Loan Statistics
Transaction Statistics
Interactive Graphs
Database Operations
Create Records
Read Records
Update Records
Delete Records
Query Execution
SQL Query Simulation
Query Result Display
Database Table Viewer
Stored Procedures
Interest Calculation
Account Balance Updates
Banking Operations Automation
Trigger Simulation
Transaction Logging
Automatic Status Updates
Database Event Tracking
SQL Console
Execute Custom Queries
View Query Logs
Error Handling Simulation
📊 Dashboard Analytics

The dashboard displays:

Total Customers
Total Accounts
Total Transactions
Total Loans
Branch-wise Deposits
Loan Distribution Analysis
🚀 How to Run
Download or Clone the Repository
git clone https://sharadhi-654.github.io/Banking._.Management._.-ystem/
Open the Project Folder
Run
index.html

in any modern web browser.

No server or database installation is required.

📁 Project Structure
Karavali-Bank-Management-System/
│
├── index.html
├── style.css
├── script.js
├── README.md
│
└── assets/
    ├── images/
    └── icons/
