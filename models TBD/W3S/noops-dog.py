# Normal OOPS
    # type hints -> type safety 

# class = blueprint -> complex ds 

class dog:

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

pet_1=dog("max","GR",5)

# accessible only-  when name is a PIA
# pubic instance attr
print(pet_1.name) 

print(f"""
    {pet_1.eat("fish")}
""")