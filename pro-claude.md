**Beginner (Python Basics)**

**1. Student Grade Calculator**
- Input student names and marks
- Calculate average, grade (A/B/C), pass/fail
- Save results to a file
- Skills: variables, loops, conditions, functions, file handling

**Intelligent Password Generator & Strength Checker**
The Build: 
Create a CLI tool that generates random passwords based on user criteria (length, symbols, numbers). 
Add a function that scores the password strength (weak/medium/strong).
Key Concepts: 
        random module, 
        string manipulation, 
        if/else conditions, 
        for loops, 
        functions.

Real-Job Skill: Input validation and security basics.

Portfolio Tip: Add a requirements.txt file (even if empty) to show you understand project structure.

**2. Expense Tracker (CLI)**
- Add, view, delete daily expenses
- Show total and category wise summary
- Save data to a text or CSV file
- Skills: 
        lists, 
        dictionaries, 
        loops, 
        file handling, 
        functions


#### 2. Automated Expense Tracker (CLI)
*   **The Build:** A program where users can add expenses (category, amount, date). The program calculates totals and averages.
*   **Key Concepts:** Lists, dictionaries, variables, arithmetic operations, functions for modularity.
*   **Real-Job Skill:** Managing state and data structures in memory.
*   **Portfolio Tip:** Use **List Comprehensions** to filter expenses (e.g., `sum([x['amount'] for x in expenses if x['category'] == 'Food'])`).

**3. Number Guessing Game**
- Computer picks random number
- User guesses, get hints (too high / too low)
- Track number of attempts
- Skills: 
        loops, 
        conditions, 
        functions, 
        random module

#### 3. Bulk File Renamer & Organizer

**The Build:** A script that scans a specific folder, finds files with specific extensions (e.g., `.jpg`, `.pdf`), and renames them sequentially or moves them into subfolders.

**Key Concepts:** `os` or `pathlib` modules, `while/for` loops, conditionals, string formatting.

**Real-Job Skill:** Automation and scripting (very common in DevOps and Backend roles).

**Portfolio Tip:** Add **Error Handling** (`try/except`) to handle cases where a file is open or permissions are denied.

---

**Intermediate (OOP Focus)**

**4. Bank Account System**
- Create Account, Deposit, Withdraw, Check Balance
- Multiple account types (Savings, Current)
- Skills: 
        classes, 
        objects, 
        methods, 
        inheritance

** Library Management System (OOP Basics)**

**The Build:** Create classes for `Book`, `Member`, and `Library`. Members can borrow and return books. Track due dates.

**Key Concepts:** Classes, Objects, `__init__`, methods, encapsulation (private variables for book status).

**Real-Job Skill:** Modeling real-world entities into code (Domain-Driven Design basics).

**Portfolio Tip:** Use **File Handling** to save the library state to a `.json` or `.csv` file so data isn't lost when the script stops.

**5. Library Management System**
- Books have title, author, availability
- Users can borrow and return books
- Admin can add or remove books
- Skills: 
        OOP, 
        inheritance, 
        encapsulation, 
        file handling

**5. Employee Payroll System (Inheritance & Polymorphism)**

**The Build:** Create a base class `Employee` and subclasses `Developer`, `Manager`, and `Intern`. Each has a different method for calculating pay (hourly vs. salary + bonus).

**Key Concepts:** Inheritance, `super()`, polymorphism (same method name `calculate_pay()` behaving differently).

**Real-Job Skill:** Writing scalable code where new employee types can be added without breaking existing code.

**Portfolio Tip:** Implement a `__str__` method to print employee details cleanly for the console.

**6. Employee Management System**
- Employee class with name, salary, department
- Manager class that extends Employee
- Calculate bonuses, promotions
- Skills: 
        OOP, 
        inheritance, 
        encapsulation, 
        error handling

**6. API Weather Dashboard with Robust Error Handling**

**The Build:** Fetch weather data from a free API (like OpenWeatherMap). Display it to the user. Handle cases where the city doesn't exist or the internet is down.

**Key Concepts:** `requests` library, JSON parsing, `try/except/finally`, specific exception types (`ConnectionError`, `HTTPError`).

**Real-Job Skill:** Third-party integration and building resilient applications that don't crash on failure.

**Portfolio Tip:** Create a custom Exception class (e.g., `CityNotFoundError`) to show advanced error handling understanding.

---

**Advanced (Decorators + Real World)**

**7. Function Performance Monitor (Decorators)**

**The Build:** Write a decorator `@timer` that calculates how long any function takes to run. Write another decorator `@logger` that logs function arguments to a text file every time it is called.

**Key Concepts:** Decorators, wrappers, `*args`, `**kwargs`, higher-order functions.

**Real-Job Skill:** Debugging, performance profiling, and aspect-oriented programming (logging/auth without cluttering logic).

**Portfolio Tip:** Apply these decorators to your previous projects (like the Expense Tracker) to log usage.

**7. Task Manager with Deadlines**
- Add tasks with priority and due date
- Mark complete, filter by status
- Decorator to log every action with timestamp
- Skills: 
        OOP, 
        decorators, 
        file handling, 
        list comprehensions

**8. Contact Book App**
- Store contacts with name, phone, email
- Search, update, delete contacts
- Export contacts to CSV file
- Skills: 
        OOP, 
        file handling, 
        error handling, 
        list comprehensions

**8. Data Cleaning Utility (List Comprehensions & Lambdas)**

**The Build:** Load a "dirty" dataset (a CSV with missing values or wrong formats). Clean it using one-liners. Remove duplicates, format dates, and filter outliers.

**Key Concepts:** List comprehensions, lambda functions, `map`/`filter`, file I/O.

**Real-Job Skill:** Data Engineering and Pre-processing (crucial for Data Science and Backend roles).

**Portfolio Tip:** Compare the code length of a standard loop vs. a list comprehension in your README to show efficiency awareness.

---

**Portfolio Level (Combines Everything)**

**9. Inventory Management System**
- Products with name, price, quantity, category
- Add stock, sell stock, low stock alerts
- Generate sales report saved to file
- Decorator to log every transaction
- Skills: 
        full OOP, 
        decorators, 
        error handling, 
        file handling, 
        list comprehensions
- **Why it matters** — Odoo is literally used for inventory in real companies

**9. Personal Contact Book with Search (OOP + Files + Search Logic)**

**The Build:** A full CRUD (Create, Read, Update, Delete) application. Store contacts in a file. Allow searching by name or phone number.

**Key Concepts:** Combining OOP (Contact Class), File Handling (Persistence), Loops (Search logic), Error Handling (File not found).

**Real-Job Skill:** Building a complete mini-application with persistent storage.

**Portfolio Tip:** Add a "Unit Test" file (`test_contact_book.py`) using the `unittest` module. This is a huge plus for employers.

**10. Mini Student Management System (CLI)**
- Register students, assign courses
- Record marks, calculate results
- Generate report cards saved to files
- Role based access (Admin vs Student)
- Skills: everything combined
- **Why it matters** — mirrors real Odoo module logic (records, roles, reports)

**10. Capstone: Automated Report Generator**

**The Build:** A script that reads multiple data files (sales, logs, users), processes the data using OOP structures, generates a summary, and emails it (or saves a PDF/Txt report) with a timestamp.

**Key Concepts:** **Everything.** OOP, Decorators (for logging the run), File Handling, Error Handling, List Comprehensions, Functions.

**Real-Job Skill:** End-to-end automation pipeline. This mimics a real business task (e.g., "Send me a sales report every Monday").

**Portfolio Tip:** Dockerize it (optional but impressive) or write a detailed `README.md` with installation instructions and screenshots.

---

**Suggested Order to Build**
```
1 → 2 → 3 → 4 → 5 → 6 → 7 → 8 → 9 → 10
```
Each project builds on the previous one. By project 9 and 10 you will think exactly like an Odoo developer.

---