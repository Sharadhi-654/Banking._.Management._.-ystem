/**
 * db_simulator.js
 * In-memory Database Simulator for Banking Management System
 * Enforces schema constraints, primary keys, foreign keys, triggers, and stored procedures.
 */

class BankingDB {
    constructor() {
        this.resetDatabase();
    }

    resetDatabase() {
        // Core tables
        this.tables = {
            Customer: [],
            Branch: [],
            Account: [],
            Transaction: [],
            Loan: [],
            Employee: []
        };

        // SQL Logs history
        this.sqlLogs = [];
        
        // Load default seed data
        this.seed();
    }

    logSQL(sqlText, status = 'SUCCESS', errorMsg = '') {
        this.sqlLogs.push({
            timestamp: new Date().toLocaleTimeString(),
            sql: sqlText,
            status: status,
            error: errorMsg
        });
        // Dispatch event for UI updating
        window.dispatchEvent(new CustomEvent('sql-logged', { detail: { sql: sqlText, status, error: errorMsg } }));
    }

    seed() {
        this.logSQL("-- Initializing database schema and seeding data...");

        // Insert Branches
        const branches = [
            { branch_id: 101, branch_name: 'Main Branch', location: 'Udupi' },
            { branch_id: 102, branch_name: 'City Branch', location: 'Mangalore' }
        ];
        branches.forEach(b => {
            this.tables.Branch.push(b);
            this.logSQL(`INSERT INTO Branch VALUES (${b.branch_id}, '${b.branch_name}', '${b.location}');`);
        });

        // Insert Customers
        const customers = [
           
    { customer_id: 1, name: 'Ananya', phone: '9880123456', address: 'Bangalore' },
    { customer_id: 2, name: 'Vikram', phone: '9448765432', address: 'Mysore' },
    { customer_id: 3, name: 'Prerna', phone: '9113546789', address: 'Mangalore' },
    { customer_id: 4, name: 'Rohit', phone: '8123987654', address: 'Udupi' },
    { customer_id: 5, name: 'Sneha', phone: '7022345610', address: 'Hubli' },
    { customer_id: 6, name: 'Darshan', phone: '9900112233', address: 'Belgaum' },
    { customer_id: 7, name: 'Kavya', phone: '9845098765', address: 'Manipal' },
    { customer_id: 8, name: 'Sanjay', phone: '8861234567', address: 'Shimoga' },
    { customer_id: 9, name: 'Megha', phone: '7349123456', address: 'Dharwad' },
    { customer_id: 10, name: 'Aditya', phone: '9108765432', address: 'Gokarna' }

        ];
        customers.forEach(c => {
            this.tables.Customer.push(c);
            this.logSQL(`INSERT INTO Customer VALUES (${c.customer_id}, '${c.name}', '${c.phone}', '${c.address}');`);
        });

        // Insert Accounts
        const accounts = [
           
    { account_id: 1001, customer_id: 1, branch_id: 101, account_type: 'Savings', balance: 65000.00 },
    { account_id: 1002, customer_id: 2, branch_id: 102, account_type: 'Current', balance: 45000.00 },
    { account_id: 1003, customer_id: 3, branch_id: 103, account_type: 'Savings', balance: 90000.00 },
    { account_id: 1004, customer_id: 4, branch_id: 104, account_type: 'Savings', balance: 12500.00 },
    { account_id: 1005, customer_id: 5, branch_id: 105, account_type: 'Current', balance: 150000.00 }

        ];
        accounts.forEach(a => {
            this.tables.Account.push(a);
            this.logSQL(`INSERT INTO Account VALUES (${a.account_id}, ${a.customer_id}, ${a.branch_id}, '${a.account_type}', ${a.balance});`);
        });

        // Insert Transactions
        // Note: We bypass trigger validation during initial seeding to insert exact historical balances
        const transactions = 
           
   [
    { transaction_id: 1, account_id: 1001, transaction_type: 'Deposit', amount: 10000.00, transaction_date: '2026-05-01' },
    { transaction_id: 2, account_id: 1002, transaction_type: 'Withdrawal', amount: 5000.00, transaction_date: '2026-05-05' },
    { transaction_id: 3, account_id: 1003, transaction_type: 'Deposit', amount: 20000.00, transaction_date: '2026-05-08' },
    { transaction_id: 4, account_id: 1004, transaction_type: 'Withdrawal', amount: 2500.00, transaction_date: '2026-05-12' },
    { transaction_id: 5, account_id: 1005, transaction_type: 'Deposit', amount: 50000.00, transaction_date: '2026-05-15' }
];
        
        transactions.forEach(t => {
            this.tables.Transaction.push(t);
            this.logSQL(`INSERT INTO Transaction VALUES (${t.transaction_id}, ${t.account_id}, '${t.transaction_type}', ${t.amount}, '${t.transaction_date}');`);
        });

        // Insert Loans
        const loans = [
           
    { loan_id: 201, customer_id: 1, amount: 500000.00, loan_type: 'Home Loan', status: 'Approved' },
    { loan_id: 202, customer_id: 2, amount: 100000.00, loan_type: 'Education Loan', status: 'Pending' },
    { loan_id: 203, customer_id: 3, amount: 250000.00, loan_type: 'Car Loan', status: 'Approved' },
    { loan_id: 204, customer_id: 6, amount: 75000.00, loan_type: 'Personal Loan', status: 'Rejected' }

        ];
        loans.forEach(l => {
            this.tables.Loan.push(l);
            this.logSQL(`INSERT INTO Loan VALUES (${l.loan_id}, ${l.customer_id}, ${l.amount}, '${l.loan_type}', '${l.status}');`);
        });

        // Insert Employees
        const employees = [
           
    { employee_id: 301, name: 'Arjun', branch_id: 101, role: 'Manager' },
    { employee_id: 302, name: 'Deepa', branch_id: 102, role: 'Cashier' },
    { employee_id: 303, name: 'Karthik', branch_id: 103, role: 'Clerk' },
    { employee_id: 304, name: 'Priya', branch_id: 104, role: 'Assistant Manager' },
    { employee_id: 305, name: 'Manoj', branch_id: 105, role: 'Loan Officer' }

        ];
        employees.forEach(e => {
            this.tables.Employee.push(e);
            this.logSQL(`INSERT INTO Employee VALUES (${e.employee_id}, '${e.name}', ${e.branch_id}, '${e.role}');`);
        });

        this.logSQL("-- Database initialization complete.");
    }

    // CRUD Helper: Insert into arbitrary table with validation
    insertRow(tableName, data) {
        const sqlVals = Object.values(data).map(val => typeof val === 'string' ? `'${val}'` : val).join(', ');
        const sqlText = `INSERT INTO ${tableName} VALUES (${sqlVals});`;

        try {
            if (!this.tables[tableName]) {
                throw new Error(`Table ${tableName} does not exist.`);
            }

            // Convert string inputs to correct types
            const cleanData = { ...data };
            
            // Primary key validation & type enforcement
            if (tableName === 'Customer') {
                cleanData.customer_id = parseInt(cleanData.customer_id);
                if (isNaN(cleanData.customer_id)) throw new Error("Customer ID must be a valid integer.");
                if (this.tables.Customer.some(c => c.customer_id === cleanData.customer_id)) {
                    throw new Error(`Duplicate entry: Customer with ID ${cleanData.customer_id} already exists.`);
                }
            } else if (tableName === 'Branch') {
                cleanData.branch_id = parseInt(cleanData.branch_id);
                if (isNaN(cleanData.branch_id)) throw new Error("Branch ID must be a valid integer.");
                if (this.tables.Branch.some(b => b.branch_id === cleanData.branch_id)) {
                    throw new Error(`Duplicate entry: Branch with ID ${cleanData.branch_id} already exists.`);
                }
            } else if (tableName === 'Account') {
                cleanData.account_id = parseInt(cleanData.account_id);
                cleanData.customer_id = parseInt(cleanData.customer_id);
                cleanData.branch_id = parseInt(cleanData.branch_id);
                cleanData.balance = parseFloat(cleanData.balance);
                
                if (isNaN(cleanData.account_id)) throw new Error("Account ID must be a valid integer.");
                if (isNaN(cleanData.balance)) throw new Error("Balance must be a number.");
                
                // FK constraints
                if (!this.tables.Customer.some(c => c.customer_id === cleanData.customer_id)) {
                    throw new Error(`Foreign key constraint fails: Customer ${cleanData.customer_id} does not exist.`);
                }
                if (!this.tables.Branch.some(b => b.branch_id === cleanData.branch_id)) {
                    throw new Error(`Foreign key constraint fails: Branch ${cleanData.branch_id} does not exist.`);
                }
                if (this.tables.Account.some(a => a.account_id === cleanData.account_id)) {
                    throw new Error(`Duplicate entry: Account with ID ${cleanData.account_id} already exists.`);
                }
            } else if (tableName === 'Transaction') {
                cleanData.transaction_id = parseInt(cleanData.transaction_id);
                cleanData.account_id = parseInt(cleanData.account_id);
                cleanData.amount = parseFloat(cleanData.amount);
                
                if (isNaN(cleanData.transaction_id)) throw new Error("Transaction ID must be a valid integer.");
                if (isNaN(cleanData.amount) || cleanData.amount <= 0) throw new Error("Transaction amount must be greater than zero.");
                
                // FK constraint
                const account = this.tables.Account.find(a => a.account_id === cleanData.account_id);
                if (!account) {
                    throw new Error(`Foreign key constraint fails: Account ${cleanData.account_id} does not exist.`);
                }
                if (this.tables.Transaction.some(t => t.transaction_id === cleanData.transaction_id)) {
                    throw new Error(`Duplicate entry: Transaction with ID ${cleanData.transaction_id} already exists.`);
                }

                // --- TRIGGER 1: BEFORE INSERT ON Transaction (Minimum Balance Check) ---
                if (cleanData.transaction_type === 'Withdrawal') {
                    if (account.balance - cleanData.amount < 1000) {
                        throw new Error("SQLSTATE '45000': Minimum balance should be maintained");
                    }
                }
            } else if (tableName === 'Loan') {
                cleanData.loan_id = parseInt(cleanData.loan_id);
                cleanData.customer_id = parseInt(cleanData.customer_id);
                cleanData.amount = parseFloat(cleanData.amount);
                
                if (isNaN(cleanData.loan_id)) throw new Error("Loan ID must be a valid integer.");
                if (isNaN(cleanData.amount)) throw new Error("Loan amount must be a number.");
                
                // FK constraint
                if (!this.tables.Customer.some(c => c.customer_id === cleanData.customer_id)) {
                    throw new Error(`Foreign key constraint fails: Customer ${cleanData.customer_id} does not exist.`);
                }
                if (this.tables.Loan.some(l => l.loan_id === cleanData.loan_id)) {
                    throw new Error(`Duplicate entry: Loan with ID ${cleanData.loan_id} already exists.`);
                }
            } else if (tableName === 'Employee') {
                cleanData.employee_id = parseInt(cleanData.employee_id);
                cleanData.branch_id = parseInt(cleanData.branch_id);
                
                if (isNaN(cleanData.employee_id)) throw new Error("Employee ID must be a valid integer.");
                
                // FK constraint
                if (!this.tables.Branch.some(b => b.branch_id === cleanData.branch_id)) {
                    throw new Error(`Foreign key constraint fails: Branch ${cleanData.branch_id} does not exist.`);
                }
                if (this.tables.Employee.some(e => e.employee_id === cleanData.employee_id)) {
                    throw new Error(`Duplicate entry: Employee with ID ${cleanData.employee_id} already exists.`);
                }
            }

            // Insert details
            this.tables[tableName].push(cleanData);

            // --- TRIGGER 2: AFTER INSERT ON Transaction (Update balance) ---
            if (tableName === 'Transaction') {
                const acc = this.tables.Account.find(a => a.account_id === cleanData.account_id);
                if (cleanData.transaction_type === 'Deposit') {
                    acc.balance += cleanData.amount;
                } else if (cleanData.transaction_type === 'Withdrawal') {
                    acc.balance -= cleanData.amount;
                }
            }

            this.logSQL(sqlText, 'SUCCESS');
            return { success: true };
        } catch (e) {
            this.logSQL(sqlText, 'ERROR', e.message);
            throw e;
        }
    }

    // CRUD Helper: Delete from table with restricted checks
    deleteRow(tableName, keyName, keyValue) {
        const sqlText = `DELETE FROM ${tableName} WHERE ${keyName} = ${keyValue};`;
        try {
            const val = parseInt(keyValue);
            
            // Check references (RESTRICT behavior)
            if (tableName === 'Customer') {
                if (this.tables.Account.some(a => a.customer_id === val)) {
                    throw new Error("Cannot delete customer: they have active accounts.");
                }
                if (this.tables.Loan.some(l => l.customer_id === val)) {
                    throw new Error("Cannot delete customer: they have outstanding loans.");
                }
            } else if (tableName === 'Branch') {
                if (this.tables.Account.some(a => a.branch_id === val)) {
                    throw new Error("Cannot delete branch: accounts are assigned to this branch.");
                }
                if (this.tables.Employee.some(e => e.branch_id === val)) {
                    throw new Error("Cannot delete branch: employees work at this branch.");
                }
            } else if (tableName === 'Account') {
                if (this.tables.Transaction.some(t => t.account_id === val)) {
                    throw new Error("Cannot delete account: transactions exist for this account.");
                }
            }

            const initialLength = this.tables[tableName].length;
            this.tables[tableName] = this.tables[tableName].filter(row => row[keyName] !== val);
            
            if (this.tables[tableName].length === initialLength) {
                throw new Error(`Record with ${keyName} = ${keyValue} not found.`);
            }

            this.logSQL(sqlText, 'SUCCESS');
            return { success: true };
        } catch (e) {
            this.logSQL(sqlText, 'ERROR', e.message);
            throw e;
        }
    }

    // --- PROCEDURES ---

    // Procedure 1: Transfer Funds
    transferFunds(fromAcc, toAcc, amount) {
        const sqlText = `CALL TransferFunds(${fromAcc}, ${toAcc}, ${amount});`;
        try {
            fromAcc = parseInt(fromAcc);
            toAcc = parseInt(toAcc);
            amount = parseFloat(amount);

            if (isNaN(fromAcc) || isNaN(toAcc) || isNaN(amount)) {
                throw new Error("Invalid parameters. Account IDs and amount must be numeric.");
            }
            if (amount <= 0) {
                throw new Error("Transfer amount must be greater than zero.");
            }

            const sourceAcc = this.tables.Account.find(a => a.account_id === fromAcc);
            const destAcc = this.tables.Account.find(a => a.account_id === toAcc);

            if (!sourceAcc) throw new Error(`Source Account ${fromAcc} does not exist.`);
            if (!destAcc) throw new Error(`Destination Account ${toAcc} does not exist.`);
            if (sourceAcc.account_id === destAcc.account_id) throw new Error("Source and destination accounts must be different.");

            // Enforce transfer limits/triggers. We check the balance beforehand
            // We simulate: UPDATE Account SET balance = balance - amt WHERE account_id = fromAcc;
            // But we must respect the minimum balance of 1000!
            if (sourceAcc.balance - amount < 1000) {
                throw new Error(`Insufficient funds: Transfer would drop source account ${fromAcc} below the minimum balance of 1000.`);
            }

            // Perform updates
            sourceAcc.balance -= amount;
            destAcc.balance += amount;

            // Also insert dummy transactions for history and trigger visualization
            const txId1 = this.tables.Transaction.length ? Math.max(...this.tables.Transaction.map(t => t.transaction_id)) + 1 : 1;
            const txId2 = txId1 + 1;
            const dateStr = new Date().toISOString().split('T')[0];

            this.tables.Transaction.push({
                transaction_id: txId1,
                account_id: fromAcc,
                transaction_type: 'Withdrawal',
                amount: amount,
                transaction_date: dateStr
            });
            this.tables.Transaction.push({
                transaction_id: txId2,
                account_id: toAcc,
                transaction_type: 'Deposit',
                amount: amount,
                transaction_date: dateStr
            });

            this.logSQL(sqlText, 'SUCCESS');
            return {
                success: true,
                message: `Transferred ${amount.toFixed(2)} from Account ${fromAcc} to Account ${toAcc} successfully.`
            };
        } catch (e) {
            this.logSQL(sqlText, 'ERROR', e.message);
            throw e;
        }
    }

    // Procedure 2: Calculate Monthly Interest
    calculateInterest() {
        const sqlText = `CALL CalculateInterest();`;
        try {
            let affectedCount = 0;
            const listBefore = JSON.parse(JSON.stringify(this.tables.Account));

            this.tables.Account.forEach(acc => {
                if (acc.account_type === 'Savings') {
                    acc.balance += (acc.balance * 0.02);
                    affectedCount++;
                }
            });

            this.logSQL(sqlText, 'SUCCESS');
            return {
                success: true,
                message: `Interest calculated successfully for ${affectedCount} Savings accounts.`,
                listBefore,
                listAfter: this.tables.Account
            };
        } catch (e) {
            this.logSQL(sqlText, 'ERROR', e.message);
            throw e;
        }
    }

    // --- PRE-DEFINED QUERIES ---

    runPredefinedQuery(index) {
        let results = [];
        let columns = [];
        let sql = '';
        let title = '';

        switch (index) {
            case 1:
                title = "Retrieve all customers";
                sql = "SELECT * FROM Customer;";
                columns = ['customer_id', 'name', 'phone', 'address'];
                results = this.tables.Customer.map(c => ({ ...c }));
                break;

            case 2:
                title = "Display accounts with balance greater than 50000";
                sql = "SELECT * FROM Account WHERE balance > 50000;";
                columns = ['account_id', 'customer_id', 'branch_id', 'account_type', 'balance'];
                results = this.tables.Account.filter(a => a.balance > 50000).map(a => ({ ...a }));
                break;

            case 3:
                title = "Display transaction details with account information (2-table INNER JOIN)";
                sql = `SELECT t.transaction_id, t.transaction_type, t.amount, a.account_id, a.account_type\nFROM Transaction t\nINNER JOIN Account a\nON t.account_id = a.account_id;`;
                columns = ['transaction_id', 'transaction_type', 'amount', 'account_id', 'account_type'];
                results = [];
                this.tables.Transaction.forEach(t => {
                    const a = this.tables.Account.find(acc => acc.account_id === t.account_id);
                    if (a) {
                        results.push({
                            transaction_id: t.transaction_id,
                            transaction_type: t.transaction_type,
                            amount: t.amount,
                            account_id: a.account_id,
                            account_type: a.account_type
                        });
                    }
                });
                break;

            case 4:
                title = "Display customer, account, and branch details (3-table JOIN)";
                sql = `SELECT c.name, a.account_id, b.branch_name, b.location\nFROM Customer c\nJOIN Account a\nON c.customer_id = a.customer_id\nJOIN Branch b\nON a.branch_id = b.branch_id;`;
                columns = ['name', 'account_id', 'branch_name', 'location'];
                results = [];
                this.tables.Account.forEach(a => {
                    const c = this.tables.Customer.find(cust => cust.customer_id === a.customer_id);
                    const b = this.tables.Branch.find(br => br.branch_id === a.branch_id);
                    if (c && b) {
                        results.push({
                            name: c.name,
                            account_id: a.account_id,
                            branch_name: b.branch_name,
                            location: b.location
                        });
                    }
                });
                break;

            case 5:
                title = "Count number of accounts per branch (GROUP BY)";
                sql = `SELECT branch_id, COUNT(account_id) AS total_accounts\nFROM Account\nGROUP BY branch_id;`;
                columns = ['branch_id', 'total_accounts'];
                
                const counts = {};
                this.tables.Account.forEach(a => {
                    counts[a.branch_id] = (counts[a.branch_id] || 0) + 1;
                });
                results = Object.keys(counts).map(bid => ({
                    branch_id: parseInt(bid),
                    total_accounts: counts[bid]
                }));
                break;

            case 6:
                title = "Display branches having total deposits greater than 1,00,000 (HAVING)";
                sql = `SELECT branch_id, SUM(balance) AS total_deposit\nFROM Account\nGROUP BY branch_id\nHAVING SUM(balance) > 100000;`;
                columns = ['branch_id', 'total_deposit'];

                const sumBalance = {};
                this.tables.Account.forEach(a => {
                    sumBalance[a.branch_id] = (sumBalance[a.branch_id] || 0) + a.balance;
                });
                results = Object.keys(sumBalance)
                    .map(bid => ({
                        branch_id: parseInt(bid),
                        total_deposit: sumBalance[bid]
                    }))
                    .filter(row => row.total_deposit > 100000);
                break;

            case 7:
                title = "Retrieve customers whose account balance is greater than the average account balance (Subquery)";
                sql = `SELECT c.name, a.balance\nFROM Customer c\nJOIN Account a\nON c.customer_id = a.customer_id\nWHERE a.balance > (\n    SELECT AVG(balance)\n    FROM Account\n);`;
                columns = ['name', 'balance'];

                const avgBalance = this.tables.Account.reduce((sum, a) => sum + a.balance, 0) / this.tables.Account.length;
                results = [];
                this.tables.Account.forEach(a => {
                    if (a.balance > avgBalance) {
                        const c = this.tables.Customer.find(cust => cust.customer_id === a.customer_id);
                        if (c) {
                            results.push({
                                name: c.name,
                                balance: a.balance
                            });
                        }
                    }
                });
                break;

            case 8:
                title = "Retrieve customers whose total transaction amount exceeds that of a specific customer (Correlated Subquery)";
                sql = `SELECT c.name, SUM(t.amount) AS total_transaction\nFROM Customer c\nJOIN Account a\nON c.customer_id = a.customer_id\nJOIN Transaction t\nON a.account_id = t.account_id\nGROUP BY c.customer_id, c.name\nHAVING SUM(t.amount) > (\n    SELECT SUM(t2.amount)\n    FROM Customer c2\n    JOIN Account a2\n    ON c2.customer_id = a2.customer_id\n    JOIN Transaction t2\n    ON a2.account_id = t2.account_id\n    WHERE c2.customer_id = 1\n);`;
                columns = ['name', 'total_transaction'];

                // 1. Calculate sum of transaction amount for customer 1
                let limitVal = 0;
                this.tables.Account.forEach(a => {
                    if (a.customer_id === 1) {
                        this.tables.Transaction.forEach(t => {
                            if (t.account_id === a.account_id) {
                                limitVal += t.amount;
                            }
                        });
                    }
                });

                // 2. Sum for all other customers
                const custSums = {};
                this.tables.Customer.forEach(c => {
                    custSums[c.customer_id] = { name: c.name, sum: 0 };
                    // Find all accounts
                    const userAccounts = this.tables.Account.filter(a => a.customer_id === c.customer_id);
                    userAccounts.forEach(a => {
                        const userTxs = this.tables.Transaction.filter(t => t.account_id === a.account_id);
                        userTxs.forEach(t => {
                            custSums[c.customer_id].sum += t.amount;
                        });
                    });
                });

                results = Object.keys(custSums)
                    .map(cid => ({
                        name: custSums[cid].name,
                        total_transaction: custSums[cid].sum
                    }))
                    .filter(row => row.total_transaction > limitVal);
                break;

            case 9:
                title = "Display all customers including those without accounts (LEFT JOIN)";
                sql = `SELECT c.name, a.account_id\nFROM Customer c\nLEFT JOIN Account a\nON c.customer_id = a.customer_id;`;
                columns = ['name', 'account_id'];

                results = [];
                this.tables.Customer.forEach(c => {
                    const accs = this.tables.Account.filter(a => a.customer_id === c.customer_id);
                    if (accs.length === 0) {
                        results.push({ name: c.name, account_id: 'NULL' });
                    } else {
                        accs.forEach(a => {
                            results.push({ name: c.name, account_id: a.account_id });
                        });
                    }
                });
                break;

            case 10:
                title = "Retrieve accounts with no transactions (NOT EXISTS)";
                sql = `SELECT *\nFROM Account a\nWHERE NOT EXISTS (\n    SELECT *\n    FROM Transaction t\n    WHERE t.account_id = a.account_id\n);`;
                columns = ['account_id', 'customer_id', 'branch_id', 'account_type', 'balance'];

                results = this.tables.Account.filter(a => {
                    return !this.tables.Transaction.some(t => t.account_id === a.account_id);
                }).map(a => ({ ...a }));
                break;

            default:
                throw new Error("Invalid query index.");
        }

        this.logSQL(sql, 'SUCCESS');
        return {
            title,
            sql,
            columns,
            rows: results
        };
    }

    // A parser that handles basic SELECT statements so users can run simple custom queries
    executeSQL(queryText) {
        const normalized = queryText.trim().replace(/\s+/g, ' ');
        const upper = normalized.toUpperCase();

        if (upper.startsWith('SELECT ')) {
            return this.evaluateSelectSQL(normalized);
        } else if (upper.startsWith('INSERT INTO ')) {
            return this.evaluateInsertSQL(normalized);
        } else if (upper.startsWith('UPDATE ')) {
            return this.evaluateUpdateSQL(normalized);
        } else if (upper.startsWith('DELETE FROM ')) {
            return this.evaluateDeleteSQL(normalized);
        } else if (upper.startsWith('CALL ')) {
            return this.evaluateCallSQL(normalized);
        } else {
            throw new Error("Unsupported SQL command. This simulator supports basic SELECT, INSERT, UPDATE, DELETE, and CALL statements.");
        }
    }

    evaluateSelectSQL(sql) {
        // We will match a few standard query styles for convenience
        // Otherwise, run pre-defined indices if typed directly
        const clean = sql.trim().replace(/;$/, '');
        const upper = clean.toUpperCase();

        // Check if user is typing one of the prompt's queries exactly
        if (upper.includes("FROM CUSTOMER") && !upper.includes("JOIN") && !upper.includes("WHERE")) {
            return this.runPredefinedQuery(1);
        }
        if (upper.includes("FROM ACCOUNT") && upper.includes("BALANCE > 50000") && !upper.includes("JOIN")) {
            return this.runPredefinedQuery(2);
        }
        if (upper.includes("INNER JOIN ACCOUNT") || (upper.includes("JOIN ACCOUNT") && upper.includes("TRANSACTION"))) {
            return this.runPredefinedQuery(3);
        }
        if (upper.includes("CUSTOMER C") && upper.includes("ACCOUNT A") && upper.includes("BRANCH B")) {
            return this.runPredefinedQuery(4);
        }
        if (upper.includes("COUNT(ACCOUNT_ID)") && upper.includes("GROUP BY BRANCH_ID") && !upper.includes("HAVING")) {
            return this.runPredefinedQuery(5);
        }
        if (upper.includes("SUM(BALANCE)") && upper.includes("HAVING")) {
            return this.runPredefinedQuery(6);
        }
        if (upper.includes("AVG(BALANCE)") && !upper.includes("TRANSACTION")) {
            return this.runPredefinedQuery(7);
        }
        if (upper.includes("LIMIT") || (upper.includes("HAVING") && upper.includes("C2.CUSTOMER_ID = 1"))) {
            return this.runPredefinedQuery(8);
        }
        if (upper.includes("LEFT JOIN")) {
            return this.runPredefinedQuery(9);
        }
        if (upper.includes("NOT EXISTS")) {
            return this.runPredefinedQuery(10);
        }

        // Generic SELECT statement parser (extremely basic subset of SQL for UI search)
        // SELECT * FROM Table [WHERE Column = Value]
        const selectRegex = /^SELECT\s+(.+?)\s+FROM\s+(\w+)(?:\s+WHERE\s+(.+?))?$/i;
        const match = clean.match(selectRegex);

        if (!match) {
            throw new Error("Complex custom SQL syntax not parsed. Please use the Query Builder or type basic queries like 'SELECT * FROM Customer' or 'SELECT * FROM Account WHERE balance > 50000'.");
        }

        const columnsStr = match[1].trim();
        const tableNameRaw = match[2].trim();
        const whereClause = match[3] ? match[3].trim() : null;

        // Check if table exists (case insensitive)
        const tableName = Object.keys(this.tables).find(t => t.toLowerCase() === tableNameRaw.toLowerCase());
        if (!tableName) {
            throw new Error(`Table '${tableNameRaw}' not found in database.`);
        }

        let dataset = this.tables[tableName].map(row => ({ ...row }));

        // Evaluate where clause
        if (whereClause) {
            // E.g. balance > 50000, customer_id = 1, address = 'Udupi'
            const opMatch = whereClause.match(/(\w+)\s*(=|>|<|>=|<=|!=)\s*(.+)/);
            if (!opMatch) {
                throw new Error("Invalid WHERE clause. Supported formats: 'column = value', 'column > value', etc.");
            }

            const colName = Object.keys(dataset[0] || {}).find(k => k.toLowerCase() === opMatch[1].toLowerCase());
            if (!colName) {
                throw new Error(`Column '${opMatch[1]}' not found in table '${tableName}'.`);
            }

            const op = opMatch[2];
            let val = opMatch[3].trim().replace(/^['"]|['"]$/g, ''); // strip quotes
            
            // Try parsing numbers
            const numVal = parseFloat(val);
            const isNumeric = !isNaN(numVal);

            dataset = dataset.filter(row => {
                const rowVal = row[colName];
                const compareVal = isNumeric && typeof rowVal === 'number' ? numVal : val;

                if (op === '=') return String(rowVal) === String(compareVal);
                if (op === '>') return rowVal > compareVal;
                if (op === '<') return rowVal < compareVal;
                if (op === '>=') return rowVal >= compareVal;
                if (op === '<=') return rowVal <= compareVal;
                if (op === '!=') return String(rowVal) !== String(compareVal);
                return false;
            });
        }

        // Columns filtering
        let columns = [];
        if (columnsStr === '*') {
            columns = dataset.length > 0 ? Object.keys(dataset[0]) : ['No Data'];
        } else {
            columns = columnsStr.split(',').map(c => c.trim());
        }

        const rows = dataset.map(row => {
            const newRow = {};
            columns.forEach(col => {
                const actualCol = Object.keys(row).find(k => k.toLowerCase() === col.toLowerCase());
                newRow[col] = actualCol ? row[actualCol] : null;
            });
            return newRow;
        });

        this.logSQL(sql + ";", 'SUCCESS');
        return {
            title: `Custom SELECT query on ${tableName}`,
            sql: sql + ";",
            columns,
            rows
        };
    }

    evaluateInsertSQL(sql) {
        // e.g. INSERT INTO Customer VALUES (5, 'Name', 'Phone', 'Address')
        const insertRegex = /^INSERT\s+INTO\s+(\w+)\s+VALUES\s*\((.+)\)$/i;
        const match = sql.trim().replace(/;$/, '').match(insertRegex);

        if (!match) {
            throw new Error("Invalid INSERT statement format. Use: INSERT INTO <table> VALUES (val1, val2, ...);");
        }

        const tableRaw = match[1].trim();
        const valsStr = match[2].trim();

        const tableName = Object.keys(this.tables).find(t => t.toLowerCase() === tableRaw.toLowerCase());
        if (!tableName) {
            throw new Error(`Table '${tableRaw}' not found.`);
        }

        // Parse CSV values respecting strings
        const values = [];
        let current = '';
        let inQuotes = false;
        let quoteChar = '';

        for (let i = 0; i < valsStr.length; i++) {
            const char = valsStr[i];
            if ((char === "'" || char === '"') && (i === 0 || valsStr[i - 1] !== '\\')) {
                if (!inQuotes) {
                    inQuotes = true;
                    quoteChar = char;
                } else if (char === quoteChar) {
                    inQuotes = false;
                } else {
                    current += char;
                }
            } else if (char === ',' && !inQuotes) {
                values.push(current.trim());
                current = '';
            } else {
                current += char;
            }
        }
        values.push(current.trim());

        // Map values to fields
        // Sample fields:
        const schema = {
            Customer: ['customer_id', 'name', 'phone', 'address'],
            Branch: ['branch_id', 'branch_name', 'location'],
            Account: ['account_id', 'customer_id', 'branch_id', 'account_type', 'balance'],
            Transaction: ['transaction_id', 'account_id', 'transaction_type', 'amount', 'transaction_date'],
            Loan: ['loan_id', 'customer_id', 'amount', 'loan_type', 'status'],
            Employee: ['employee_id', 'name', 'branch_id', 'role']
        };

        const fields = schema[tableName];
        if (values.length !== fields.length) {
            throw new Error(`Column count mismatch. Table '${tableName}' requires ${fields.length} values, but ${values.length} were provided.`);
        }

        const data = {};
        fields.forEach((field, idx) => {
            let val = values[idx];
            // Remove outer quotes if any
            if (val.startsWith("'") && val.endsWith("'")) val = val.substring(1, val.length - 1);
            if (val.startsWith('"') && val.endsWith('"')) val = val.substring(1, val.length - 1);
            
            data[field] = val;
        });

        // Use standard insert method (which will execute triggers and constraints)
        const insertRes = this.insertRow(tableName, data);
        return {
            success: true,
            message: `1 row inserted successfully into ${tableName}.`,
            affectedRows: 1
        };
    }

    evaluateUpdateSQL(sql) {
        // Simple update: UPDATE Account SET balance = balance - 5000 WHERE account_id = 1001;
        // Or: UPDATE Account SET balance = balance + 5000 WHERE account_id = 1002;
        const clean = sql.trim().replace(/;$/, '');
        const updateRegex = /^UPDATE\s+(\w+)\s+SET\s+(.+?)(?:\s+WHERE\s+(.+))?$/i;
        const match = clean.match(updateRegex);

        if (!match) {
            throw new Error("Complex UPDATE syntax not supported. Supported format: UPDATE Account SET balance = balance + 5000 WHERE account_id = 1002;");
        }

        const tableRaw = match[1].trim();
        const setClause = match[2].trim();
        const whereClause = match[3] ? match[3].trim() : null;

        const tableName = Object.keys(this.tables).find(t => t.toLowerCase() === tableRaw.toLowerCase());
        if (!tableName) {
            throw new Error(`Table '${tableRaw}' not found.`);
        }

        // Parse SET
        const setMatch = setClause.match(/(\w+)\s*=\s*(.+)/);
        if (!setMatch) throw new Error("Invalid SET clause.");
        const setColRaw = setMatch[1].trim();
        const setExpr = setMatch[2].trim();

        // Parse WHERE
        if (!whereClause) {
            throw new Error("WHERE clause is required in UPDATE to prevent full table updates in this simulator.");
        }
        const whereMatch = whereClause.match(/(\w+)\s*=\s*(.+)/);
        if (!whereMatch) throw new Error("Invalid WHERE clause. Must be 'column = value'.");
        const whereColRaw = whereMatch[1].trim();
        let whereVal = whereMatch[2].trim().replace(/^['"]|['"]$/g, '');

        // Find actual column names
        const columns = this.tables[tableName].length > 0 ? Object.keys(this.tables[tableName][0]) : [];
        const setCol = columns.find(c => c.toLowerCase() === setColRaw.toLowerCase());
        const whereCol = columns.find(c => c.toLowerCase() === whereColRaw.toLowerCase());

        if (!setCol) throw new Error(`Column '${setColRaw}' not found.`);
        if (!whereCol) throw new Error(`Column '${whereColRaw}' not found.`);

        let affectedCount = 0;
        this.tables[tableName].forEach(row => {
            if (String(row[whereCol]) === String(whereVal)) {
                // Evaluate expression
                // Support formats like: balance + 100, balance - 50, 45000
                let newVal;
                if (setExpr.toLowerCase().startsWith(`${setCol.toLowerCase()}`)) {
                    const opMatch = setExpr.substring(setCol.length).trim().match(/^([+-/*])\s*(.+)/);
                    if (opMatch) {
                        const op = opMatch[1];
                        const factor = parseFloat(opMatch[2]);
                        if (op === '+') newVal = row[setCol] + factor;
                        if (op === '-') newVal = row[setCol] - factor;
                        if (op === '*') newVal = row[setCol] * factor;
                        if (op === '/') newVal = row[row[setCol]] / factor;
                    }
                } else {
                    newVal = parseFloat(setExpr);
                    if (isNaN(newVal)) newVal = setExpr.replace(/^['"]|['"]$/g, '');
                }

                // If balance updates on account, simulate constraint checks
                if (tableName === 'Account' && setCol === 'balance') {
                    if (newVal < 1000) {
                        throw new Error(`Constraint violation: Balance of Account ${row.account_id} cannot drop below 1000.`);
                    }
                }

                row[setCol] = newVal;
                affectedCount++;
            }
        });

        this.logSQL(clean + ";", 'SUCCESS');
        return {
            success: true,
            message: `UPDATE query execution complete. ${affectedCount} rows affected.`,
            affectedRows: affectedCount
        };
    }

    evaluateDeleteSQL(sql) {
        // e.g. DELETE FROM Customer WHERE customer_id = 5;
        const clean = sql.trim().replace(/;$/, '');
        const deleteRegex = /^DELETE\s+FROM\s+(\w+)\s+WHERE\s+(\w+)\s*=\s*(.+)$/i;
        const match = clean.match(deleteRegex);

        if (!match) {
            throw new Error("Invalid DELETE statement format. Use: DELETE FROM <table> WHERE <key> = <val>;");
        }

        const tableRaw = match[1].trim();
        const keyRaw = match[2].trim();
        const valRaw = match[3].trim().replace(/^['"]|['"]$/g, '');

        const tableName = Object.keys(this.tables).find(t => t.toLowerCase() === tableRaw.toLowerCase());
        if (!tableName) {
            throw new Error(`Table '${tableRaw}' not found.`);
        }

        const delRes = this.deleteRow(tableName, keyRaw, valRaw);
        return {
            success: true,
            message: `Row with ${keyRaw} = ${valRaw} deleted successfully from ${tableName}.`,
            affectedRows: 1
        };
    }

    evaluateCallSQL(sql) {
        // e.g. CALL TransferFunds(1001, 1002, 5000);
        // e.g. CALL CalculateInterest();
        const clean = sql.trim().replace(/;$/, '');
        const callRegex = /^CALL\s+(\w+)(?:\((.+)\))?$/i;
        const match = clean.match(callRegex);

        if (!match) {
            throw new Error("Invalid CALL syntax. Use: CALL ProcedureName(arg1, arg2, ...);");
        }

        const procName = match[1].trim();
        const argsStr = match[2] ? match[2].trim() : '';

        const args = argsStr ? argsStr.split(',').map(a => a.trim().replace(/^['"]|['"]$/g, '')) : [];

        if (procName.toLowerCase() === 'transferfunds') {
            if (args.length !== 3) {
                throw new Error("Procedure 'TransferFunds' requires 3 arguments: fromAcc, toAcc, amount");
            }
            const res = this.transferFunds(args[0], args[1], args[2]);
            return {
                success: true,
                message: res.message
            };
        } else if (procName.toLowerCase() === 'calculateinterest') {
            const res = this.calculateInterest();
            return {
                success: true,
                message: res.message
            };
        } else {
            throw new Error(`Unknown stored procedure: ${procName}. Available: TransferFunds, CalculateInterest.`);
        }
    }
}

// Instantiate and expose globally
window.db = new BankingDB();
