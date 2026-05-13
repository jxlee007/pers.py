#  Handles business logic
from models import Task
from dataclasses import dataclass, field
from typing import List, Optional


@dataclass
class TaskManager:

# old-way 
# practical for heavy database connections, configuration states, or complex networking logic 
    # def __init__(self):
        # self.tasks = list[Task] = []  # The primary list encapsulation

# new-way
    # Safely creates a unique empty list for every new manager instance
    tasks: List[Task] = field(default_factory=list) 
    # Your internal list that holds all task objects


# With type hints (Recommended for clean code)
    def add_task(self, title: str, description: str) -> str:

        # ASSIGN and INCREMENT new_id
        new_id = len(self.tasks) + 1

        # CREATE new Task object
        new_task = Task(id=new_id, title=title)
        
        # ADD task to task list
        self.tasks.append(new_task)

        # success
        return f"Success: Task {title} created with ID {new_id}"

# Add method to get task by id (returns `Task` or `None`).  
    def get_task_by_id(self, task_id: int) -> Optional[Task]:
        # Optional[Task] The signature clearly warns you about the two possible outcomes

        for task in self.tasks:
            if task_id == task_id:
                return f"found it: {task} "

        return None  # Only reached if no ID matched

# Add method to mark a task as completed using id. 
    def mark_completed_by_id(self, task_id: int ):
        
        # use existing lookup method
        task = self.get_task_by_id(task_id)

        if task is not None:
                task.completed = True
                return f"Task with ID {task_id} completed successfully."
                
        return f"Error: Task with ID {task_id} was not found."

#  Add method to delete a task using id.  
    def del_task_by_id(self, task_id: int) -> str:
        # str is what you expect a output
        
        # use existing lookup method
        task = self.get_task_by_id(task_id)

        if task is not None:
            self.tasks.remove(task)
            return f"Task with ID {task_id} deleted successfully."
        
        return f"Error: Task with ID {task_id} was not found."

# Add method to return all tasks list.  
    def get_all_task(self) -> List:
        return self.tasks

# Add method to return only completed tasks list.  
    def get_list_of_completed_task(self) -> List:
        return [task for task in self.tasks if task.completed == True]

# Add method to return only pending tasks list.  
    def get_list_of_pending_task(self) -> List:
        return [task for task in self.tasks if not task.completed]







