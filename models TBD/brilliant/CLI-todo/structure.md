This guide focuses on **what to build**, **how to think about it**, and **which Python concepts are being practiced** at each step.

# Final Mental Model

```text id="6w84q0"
User types command
        ↓
CLI interprets command
        ↓
TaskManager performs logic
        ↓
Task objects are updated
        ↓
Optional JSON storage saves changes
```

---

# Step 1 — Plan the Application Structure

## Goal

Separate responsibilities clearly.

## Concepts Covered

* Clean Architecture
* Separation of Concerns
* Modular Design

## Pseudocode

```text id="v5rqw4"
CREATE project files:

main.py
models.py
manager.py
decorators.py
storage.py
exceptions.py
```

```text id="0xck5q"
main.py
    Handles CLI interaction

models.py
    Defines Task object

manager.py
    Handles business logic

decorators.py
    Handles logging behavior

storage.py
    Handles JSON saving/loading

exceptions.py
    Stores custom exceptions
```

---

# Step 2 — Create the Task Model

## Goal

Represent one task as an object.

## Concepts Covered

* OOP (Classes & Objects)
* Dataclasses
* Type Hints
* Default Values

## Pseudocode

```text id="vux9m0"
DEFINE Task class

Task contains:
    id → integer
    title → string
    description → optional string
    completed → boolean default False
```

```text id="cww90v"
WHEN a task is created:
    Store all task information together
```

---

# Step 3 — Create TaskManager

## Goal

Centralize all task operations.

## Concepts Covered

* OOP
* Encapsulation
* Lists
* State Management

## Pseudocode

```text id="cv5n1u"
DEFINE TaskManager class

INSIDE constructor:
    CREATE empty task list
    CREATE next_id starting at 1
```

---

# Step 4 — Add Task Functionality

## Goal

Allow users to create tasks.

## Concepts Covered

* Methods
* Object Creation
* Appending to Lists
* Auto Increment IDs

## Pseudocode

```text id="xut19n"
FUNCTION add_task(title, description):

    CREATE new Task object

    ASSIGN current next_id

    ADD task to task list

    INCREMENT next_id

    RETURN success message
```

---

# Step 5 — List Tasks

## Goal

Display stored tasks cleanly.

## Concepts Covered

* Generators
* Iteration
* Yield Keyword

## Pseudocode

```text id="q8qvjb"
FUNCTION iter_tasks():

    FOR each task in task list:
        YIELD task
```

```text id="m4y1o6"
WHEN listing tasks:
    LOOP through generator
    PRINT task details
```

---

# Step 6 — Filter Completed vs Pending Tasks

## Goal

Show filtered task views.

## Concepts Covered

* List Comprehensions
* Boolean Logic
* Data Filtering

## Pseudocode

```text id="ul4djh"
FUNCTION get_completed_tasks():

    RETURN all tasks WHERE completed is True
```

```text id="6bxj49"
FUNCTION get_pending_tasks():

    RETURN all tasks WHERE completed is False
```

---

# Step 7 — Complete a Task

## Goal

Mark tasks as finished.

## Concepts Covered

* Searching Lists
* Conditional Logic
* Updating Object State

## Pseudocode

```text id="eqd61q"
FUNCTION complete_task(task_id):

    FIND matching task

    IF task exists:
        SET completed to True

    OTHERWISE:
        RAISE TaskNotFoundError
```

---

# Step 8 — Delete a Task

## Goal

Remove tasks safely.

## Concepts Covered

* List Manipulation
* Object Removal
* Error Handling

## Pseudocode

```text id="aggtfd"
FUNCTION delete_task(task_id):

    FIND matching task

    IF found:
        REMOVE task from list

    OTHERWISE:
        RAISE TaskNotFoundError
```

---

# Step 9 — Add a Logging Decorator

## Goal

Automatically log state-changing actions.

## Concepts Covered

* Decorators
* Higher-Order Functions
* Wrapping Functions
* Code Reuse

## Pseudocode

```text id="q1gll4"
DEFINE log_action decorator

WHEN wrapped function runs:
    PRINT log message
    EXECUTE original function
    RETURN result
```

```text id="fywy6q"
APPLY decorator to:

add_task
complete_task
delete_task
```

---

# Step 10 — Create Custom Exceptions

## Goal

Handle errors clearly.

## Concepts Covered

* Exception Classes
* Defensive Programming
* Clean Error Messages

## Pseudocode

```text id="s7j5mf"
DEFINE TaskNotFoundError
```

```text id="0c89rz"
RAISE TaskNotFoundError
    WHEN invalid task id is used
```

---

# Step 11 — Build the CLI Loop

## Goal

Continuously accept commands from users.

## Concepts Covered

* Infinite Loops
* Input Handling
* Command Parsing
* Control Flow

## Pseudocode

```text id="mh3lb7"
START application loop

WHILE app is running:

    GET user input

    IF command is "add":
        add task

    ELSE IF command is "list":
        show tasks

    ELSE IF command is "complete":
        complete task

    ELSE IF command is "delete":
        delete task

    ELSE IF command is "quit":
        stop loop

    OTHERWISE:
        print unknown command
```

---

# Step 12 — Add Error Handling in CLI

## Goal

Prevent crashes from bad input.

## Concepts Covered

* try/except
* ValueError
* Safe User Input
* User Experience

## Pseudocode

```text id="rz7w6q"
TRY:
    convert task id to integer

EXCEPT ValueError:
    PRINT friendly error message
```

```text id="0n9n08"
TRY:
    complete/delete task

EXCEPT TaskNotFoundError:
    PRINT task not found message
```

---

# Step 13 — Add JSON Persistence (Optional)

## Goal

Save tasks between app runs.

## Concepts Covered

* JSON
* File Handling
* Serialization
* Context Managers

## Pseudocode

```text id="8czq6r"
FUNCTION save_tasks():

    CONVERT task objects to dictionary format

    WRITE data to JSON file
```

```text id="rrq8ha"
FUNCTION load_tasks():

    READ JSON file

    CONVERT dictionaries back into Task objects

    RETURN loaded tasks
```

---

# Step 14 — Connect Persistence to App Startup/Exit

## Goal

Automatically restore previous tasks.

## Concepts Covered

* Program Lifecycle
* Integration
* Persistent State

## Pseudocode

```text id="n2n2lj"
ON app startup:
    LOAD saved tasks
```

```text id="q6f1af"
AFTER add/complete/delete:
    SAVE tasks automatically
```

---

# Final Learning Summary

| Step                | Main Concept        |
| ------------------- | ------------------- |
| Project structure   | Clean architecture  |
| Task model          | OOP + dataclasses   |
| TaskManager         | Encapsulation       |
| Add/list/delete     | CRUD operations     |
| Generators          | Lazy iteration      |
| List comprehensions | Filtering           |
| Decorators          | Function wrapping   |
| Exceptions          | Error handling      |
| CLI loop            | Control flow        |
| JSON storage        | Persistence         |
| Type hints          | Readability/tooling |

---