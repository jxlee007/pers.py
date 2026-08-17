# Normal OOPS - type hints -> type safety 
# class = blueprint -> complex ds 

class Dog:

    # class attr - shared 
    alias = 'pet'

    # fncs decide how class(complex-ds) behaves
    # instance attr can be created only in this fnc
    # dunder methods - special ones
    def __init__( 
        self, 
        name:str, 
        breed:str,
        age:int
    ) -> None:
        
        # var were data would be saved -> var = attr
        # this are known as instance attr -> unique 
        # are publically accessible 

        self.name=name
        self.breed=breed
        self.age=age



    # fnc = instance methods
    # all saved instance attr can be accessed using self param 
    def bark(self)->str:
        action = f"{self.name} says Woof!"
        return action
        # print(f"{self.name} is barking")
    
    # always return with var not direct str
    def eat(self, food:str)->str:
        action = f"{self.name} is eating his fav {food} food"
        return action
    
    def __str__(self)->str:
        info = f"My name is {self.name} and im currently at {self.age}"
        return info
    
    # if we use a fnc without self -> act as class attr
    # an there use is mostly done throught decorators

        

# instance = obj -> implementation of ds/class on data to create  obj

pet_1=Dog("max","GR",5)

# accessible only-  when name is a PIA
# pubic instance attr
# print(pet_1.name) 

# print(f"""
#     {pet_1.eat("fish")}
# """)


# inheritance
class Employee:
    def __init__(self, name:str, age:int, salary:int) -> None:
        self.name=name
        self.age=age
        self.salary=salary

    def work(self):
        print(f"{self.name} is working")
        
class SoftwareDev(Employee):
    # extend
    def __init__(self, name: str, age: int, salary: int, level:int) -> None:
        super().__init__(name, age, salary)
        self.level=level
    pass

    def work(self):
        print(f"{self.name} is coding")

class Designer(Employee):
     # overide 
    def work(self):
        print(f"{self.name} is designing")
    
    

se = SoftwareDev("mac",24,40000, 3)
d = Designer("emily",20,60000)

# d.work()

# print(se.name)
# se.work()






# Polymorphism
# list of employees (hint as list of base class Employee)
employees: list[Employee] = [
    SoftwareDev("mac", 24, 40000, 3),
    Designer("emily", 20, 60000),
]

# Run the exact same method name on all of them
for emp in employees:
    emp.work()
