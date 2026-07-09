# Defines Task object

from dataclasses import dataclass, asdict

@dataclass
class Task:
# old way
    # def __init__(self, unique_id: int, title: str, description: str, completed ):  

# new way = to use dataclass
    # NON-DEFAULTS (Must be first)
    id: int                       # Required Field -> no input results in Type-err 
    title: str                    # Required Field -> no input results in Type-err 
    
    # DEFAULTS (Must be last)
    completed: bool = False       # Default value (must follow non-defaults)
    description: str | None = None # Optional with a default of None

# Add method to mark as completed.
    def mark_as_completed(self):
        if self.completed == True:
            return f"{self.title} task is completed"

# Add method to convert task to serializable dict 
    def to_dict(self) -> dict:
        """Converts the task instance into a serializable dictionary."""
        return asdict(self)

# Add method to display task as a formatted string.
    def display(self) -> str:
        # Check status icon
        status = "[x]" if self.completed else "[ ]"
        
        # Handle optional description (The code you asked for)
        clean_desc = self.description if self.description is not None else "No description"
        
        return f"{status} ID: {self.id} | {self.title}\n    Details: {clean_desc}"


t = Task(1, "Buy Milk", completed = True )
print(t.display())
# print(t.mark_as_completed())

