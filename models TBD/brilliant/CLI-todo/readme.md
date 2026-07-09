# CLI Todo App with OOP, Decorators, Generators

A simple Python command‑line to‑do application that showcases clean architecture and modern Python features: OOP, decorators, generators, comprehensions, type hints, error handling, and virtual environments. [linkedin](https://www.linkedin.com/pulse/create-to-do-list-cli-app-file-handling-python-guide-indradeep-halder-rkfkf)

***

## Features

- Add, list, complete, and delete tasks directly from the terminal. [github](https://github.com/SharpRhyme/todo-cli)
- `Task` and `TaskManager` classes for clear object‑oriented structure. [stackoverflow](https://stackoverflow.com/questions/26556795/how-to-structure-a-simple-command-line-based-python-project)
- Logging decorator to track state‑changing actions (add/complete/delete). [rinaarts](https://rinaarts.com/declutter-python-code-with-error-handling-decorators/)
- Generators for efficient task iteration. [stackoverflow](https://stackoverflow.com/questions/42531143/how-can-i-type-hint-a-generator-in-python-3)
- List comprehensions for concise task filtering (completed vs pending). [realpython](https://realpython.com/ref/best-practices/pythonic-code/)
- Type hints throughout for readability and tooling support. [blog.devgenius](https://blog.devgenius.io/writing-clear-and-readable-python-code-with-type-hints-5d390cf6b272)
- Explicit error handling for invalid input and missing tasks. [realpython](https://realpython.com/ref/best-practices/pythonic-code/)
- Uses `venv` to isolate dependencies. [github](https://github.com/rjhilario/python-venv/blob/main/README.md)

***

## Requirements

- Python 3.8+ installed. [w3schools](https://www.w3schools.com/python/python_virtualenv.asp)
- Git (optional, if you plan to version control the project). [stackoverflow](https://stackoverflow.com/questions/26556795/how-to-structure-a-simple-command-line-based-python-project)

***

## Setup

1. Clone or download the project into a folder of your choice. [github](https://github.com/SharpRhyme/todo-cli)
2. Open a terminal in the project root directory. [stackoverflow](https://stackoverflow.com/questions/26556795/how-to-structure-a-simple-command-line-based-python-project)
3. Create a virtual environment:  
   - `python -m venv .venv` (or any name you prefer). [github](https://github.com/rjhilario/python-venv/blob/main/README.md)
4. Activate the virtual environment:  
   - On macOS/Linux: `source .venv/bin/activate`  
   - On Windows (Command Prompt): `.venv\Scripts\activate.bat` [github](https://github.com/sherlock-project/sherlock/discussions/1060)
5. Install dependencies (if `requirements.txt` exists):  
   - `pip install -r requirements.txt` [github](https://github.com/rjhilario/python-venv/blob/main/README.md)

***

## Usage

1. Ensure the virtual environment is activated. [github](https://github.com/sherlock-project/sherlock/discussions/1060)
2. Run the CLI entry script, for example:  
   - `python main.py` or `python -m your_package_name` depending on structure. [trstringer](https://trstringer.com/easy-and-nice-python-cli/)
3. Follow on‑screen prompts to:  
   - Add a task (with title and optional description).  
   - List tasks (all, completed, or pending).  
   - Mark a task as completed using its id.  
   - Delete a task using its id. [github](https://github.com/naemazam/todo-python-cli)

Invalid commands, non‑integer ids, or missing tasks are handled gracefully with clear error messages so the app does not crash. [linkedin](https://www.linkedin.com/pulse/create-to-do-list-cli-app-file-handling-python-guide-indradeep-halder-rkfkf)

***

## Architecture

- `Task`  
  - Represents a single to‑do item (id, title, description, completed flag). [stackoverflow](https://stackoverflow.com/questions/66597855/creating-todolist-using-python-oop)
  - Methods for marking as completed and for display/serialization.  

- `TaskManager`  
  - Owns an in‑memory collection of `Task` objects.  
  - Methods to add, find, complete, delete, and list tasks. [stackoverflow](https://stackoverflow.com/questions/26556795/how-to-structure-a-simple-command-line-based-python-project)
  - Uses generators to iterate over tasks lazily and comprehensions to return filtered lists. [stackoverflow](https://stackoverflow.com/questions/42531143/how-can-i-type-hint-a-generator-in-python-3)

- Logging Decorator  
  - Wraps state‑changing `TaskManager` methods.  
  - Logs method name, arguments, and success or failure information. [rinaarts](https://rinaarts.com/declutter-python-code-with-error-handling-decorators/)

- Error Handling  
  - CLI layer validates user input and catches exceptions.  
  - User sees friendly messages instead of raw tracebacks. [linkedin](https://www.linkedin.com/pulse/create-to-do-list-cli-app-file-handling-python-guide-indradeep-halder-rkfkf)

- Type Hints  
  - All public methods and attributes are annotated to clarify expected types and support static analysis. [blog.devgenius](https://blog.devgenius.io/writing-clear-and-readable-python-code-with-type-hints-5d390cf6b272)

- (Optional) Persistence Layer  
  - Tasks can be serialized to and loaded from a file (for example JSON) to preserve data between runs. [github](https://github.com/naemazam/todo-python-cli)

***

## Development

- Recommended to use a dedicated virtual environment and keep dependencies listed in `requirements.txt`. [github](https://github.com/rjhilario/python-venv/blob/main/README.md)
- Code style can follow common Python conventions (PEP 8 and type‑hint friendly tools like `mypy` if desired). [blog.devgenius](https://blog.devgenius.io/writing-clear-and-readable-python-code-with-type-hints-5d390cf6b272)
