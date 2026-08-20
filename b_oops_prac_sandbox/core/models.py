import datetime


# The Data and State Layer - odoo arch
# Classes that hold fields/attributes and business methods 



# class = blueprint -> complex ds 

class dog:

    # class attr - shared 
    alias = 'pet'

    # fncs decide how class(complex-ds) behaves
    # instance attr can be created only in this fnc
    def __init__( #dunder method
        self, 
        name:str, 
        breed:str,
        age:int
    ) -> None:
        
        # var were data would be saved -> var = attr
        # this are known as instance attr -> unique 
        # Double underscores make attributes truly private ensuring STRICT ENCAPSULATION
        self.__name = name
        self.__breed = breed
        self.__age = age
    
    # as name not accessed outside of class
    # we use getter method to safely read the name
    def get_name(self)->str:
        return self.__name
    
    # setter method with validation
    
    
    def get_breed(self)->str:
        return self.__breed
    

    # fncs = instance methods
    # all saved instance attr can be accessed using self param 
    def bark(self)->str:
        return f"{self.__name} says Woof!"
    
    # always return with var not direct str
    def eat(self, food:str)->str:
        return f"{self.__name} is eating his fav {food} food"
    
    # dunder methods - special ones
    def __str__(self)->str:
        info = f"Im {self.__name} of {self.__breed} at {self.__age}"
        return info
    
    # if we use a fnc without self -> act as class attr
    # without self - instance methods use decorators


# login - brilliant 
class login(): # data record 

    def __init__(self, 
                username:str, 
                password: str
                ) -> None:
        
        self.username=username
        self.password=password
        self.locked = False




# FCC task de-construct email simulator
class Email:

    def __init__(
        self,
        sender:str,
        reciever:str,
        subject:str,
        body:str
    )-> None:

    # PIA - unique public instance attr
    self.sender=sender
    self.reciever=reciever
    self.subject=subject
    self.body=body

    self.read=False
    self.timestamp=datetime.datetime.now()


    

class User:


    def __init__(self, 
        name:str
    ) -> None:

        self.name=name
        self.inbox = Inbox()
# user has-an inbox = composition(strong ownership)

    
    pass

class Inbox:


    def __init__(self) -> None:

        self.email=[]

    pass