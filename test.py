# test any code block

class Intro:
    def __init__(self, name, age):
        self.name = name
        self.age = age

    def sample_method(self):               
        print(f"{self.name.upper()} with age {self.age}")

p1 = Intro("jj",14)
p1.sample_method()