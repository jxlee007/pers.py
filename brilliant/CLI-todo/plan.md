Here’s a tight, step‑by‑step pseudocode plan you can follow while building the project.

***

## 1. Project and venv setup

1. Choose project folder name.  
2. In terminal, go to that folder.  
3. Create virtual environment using built‑in tool. [w3schools](https://www.w3schools.com/python/python_virtualenv.asp)
4. Activate virtual environment. [w3schools](https://www.w3schools.com/python/python_virtualenv.asp)
5. Initialize a requirements file (even if empty for now).  
6. Plan to install any future CLI or formatting packages inside this environment.

What do you want to name this project folder and the venv?  

***

## 2. Overall CLI app structure

1. Plan main entry file for running the app.  
2. Decide simple command style:  
   - add task  
   - list tasks  
   - complete task  
   - delete task  
   - quit app  
3. Decide how tasks will be stored at runtime (in memory list first).  
4. Optionally plan later persistence (file or json) as a separate layer.


***

## 3. Design Task class (OOP)

1. ✅ Define `Task` with attributes:  
   - unique id (int)  
   - title (string)  
   - optional description (string)  
   - completed flag (bool)  
2. ✅ Add initializer that sets these attributes from parameters. [stackoverflow](https://stackoverflow.com/questions/66597855/creating-todolist-using-python-oop) 
3. ✅ Add method to mark as completed. [FCC](https://www.freecodecamp.org/learn/python-v9/lecture-classes-and-objects/what-are-special-methods-and-what-are-they-used-for) 
4. ✅ Add method to convert task to serializable dict 
(for future save - recommended way for learning is to use dataclass[lvl-1] and industry standard is pydantic[lvl-2] ).  
5. ✅ Add method to display task as a formatted string.

***

## 4. Design TaskManager (OOP wrapper)

1. Define `TaskManager` that holds list of tasks.  
2. Add method to add a new task:  
   - create `Task` object  
   - append to internal list  
3. Add method to get task by id (returns `Task` or `None`).  
4. Add method to mark a task as completed using id.  
5. Add method to delete a task using id.  
6. Add method to return all tasks list.  
7. Add method to return only completed tasks list.  
8. Add method to return only pending tasks list.

***

## 5. Logging decorator

1. Plan a generic decorator `log_action` that: [rinaarts](https://rinaarts.com/declutter-python-code-with-error-handling-decorators/)
   - wraps any TaskManager method that changes state  
   - before call: print or record method name and arguments  
   - after call: print or record success message  
   - on exception: print or record error information  
2. Apply this decorator to:  
   - add task  
   - complete task  
   - delete task.

***

## 6. Generators for task iteration

1. Inside `TaskManager`, plan a generator method that yields tasks one by one. [stackoverflow](https://stackoverflow.com/questions/42531143/how-can-i-type-hint-a-generator-in-python-3)
2. Use generator for listing tasks instead of returning full list:  
   - iterate over internal list  
   - yield each task.  
3. Optionally create separate generator for:  
   - only completed tasks  
   - only pending tasks.

***

## 7. Comprehensions for filtering

1. In `TaskManager`, create methods that use list comprehensions: [realpython](https://realpython.com/ref/best-practices/pythonic-code/)
   - get all completed tasks from internal list  
   - get all pending tasks from internal list  
2. Each method:  
   - iterate over internal list in comprehension  
   - apply condition on `completed` attribute  
   - return new filtered list.

***

## 8. Type hints

1. Add type hints to `Task` attributes and methods: [teclado](https://teclado.com/30-days-of-python/python-30-day-28-type-hinting/)
   - id as integer  
   - title, description as strings  
   - completed as boolean  
   - methods returning `None`, `str`, or `dict`.  
2. Add type hints to `TaskManager` methods:  
   - list return types  
   - generator return types using appropriate typing helper. [stackoverflow](https://stackoverflow.com/questions/42531143/how-can-i-type-hint-a-generator-in-python-3)
3. Ensure main function parameters and return values are also annotated.

***

## 9. Error handling strategy

1. Define custom error messages for:  
   - invalid command  
   - missing task id  
   - non‑integer id  
   - task id not found  
2. In command parsing, wrap user input conversion (e.g., to int) in try/except. [realpython](https://realpython.com/ref/best-practices/pythonic-code/)
3. For each user action:  
   - validate input  
   - if invalid, show friendly message and continue loop  
4. In `TaskManager` methods, raise specific exceptions (or return `None`) for invalid operations and handle them in CLI layer.

***

## 10. CLI input loop

1. Create a main loop that runs until user chooses to quit.  
2. At the start of each iteration:  
   - display available commands  
   - read user input as a string  
3. Use conditional logic or a command dispatch map to call appropriate `TaskManager` method.  
4. After each action:  
   - show result or confirmation  
   - on exception, show error message and continue.  
5. When user chooses quit command:  
   - break loop  
   - print exit message.

***

## 11. Optional persistence layer (later)

1. Decide file (e.g., JSON) to store tasks.  
2. Add method in `TaskManager` to save all tasks to file:  
   - transform each task to a dict  
   - write list to file  
3. Add method to load tasks from file at startup:  
   - read file  
   - create `Task` objects and repopulate internal list  
4. Call load on startup and save on every state‑changing action or on exit.

***

## 12. Manual test plan

1. Start app in terminal.  
2. Add several tasks with different titles and descriptions.  
3. List tasks and verify generator iteration displays all tasks.  
4. Mark one task as complete.  
5. List only completed tasks (comprehension‑based filtering).  
6. List only pending tasks.  
7. Try invalid commands and ids to confirm error handling.  
8. Quit app and, if persistence enabled, restart and verify data.
