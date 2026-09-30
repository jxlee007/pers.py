# models/user.py
from dataclasses import dataclass, field
from typing import List



"""
@decorators = code genrator wrappers

    handles boilerplate code 
        the __init__ constructor, 
        the __repr__ print layout, and 
        comparisons like __eq__.

"""
@dataclass

class User:
    name: str
    email_address: str 
    inbox: List[str] = field(default_factory=list[str]) 

    """    
    field - give variable a special behaviour
            field(repr=False) - to hide data on print likes password
            field(init=False) - to lock var prevent anyone from passing a value for it when they create the object
            field(default_factory=list) -   prevents the shared memory bug 

    defalut factorty - creates a complete independent unique copy 
    """
    




    """
    __post_init__ pre-defined special hook provided by Python’s dataclasses module
    Validate email address on creation.
    """
    def __post_init__(self):
        if "@" not in self.email_address:
            raise ValueError(f"Invalid email: {self.email_address}")


    """
    __repr__  is for Developers & Debuggers	
        Unambiguous description. 
        Tells you exactly how to recreate or debug the object.	
        eg User(name='Alice', id=402)
    __str__	 is for End Users & Clients	
        Readable description. 
        Clean, pretty, and user-friendly.	
        eg Welcome back, Alice!
    """
    # custom dunder method
    def __repr__(self):
        return f"User({self.name}, {self.email_address}, {len(self.inbox)} emails)"