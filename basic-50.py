import random

# module
class Numbers:

    def __init__(self, user_input: int) -> int:
        self.user_input = user_input

# Mutator 1: Return 1 to N val
    def one_to_n(self) -> int: 
        i = 0
        # preferred odoo - robust and usable over while
        for i in range(1, self.user_input + 1):
            print(i)

# Mutator 2: Return sum of N numbers 
    def sum_of_n(self) -> int: 
        # need list of int to handle multiple integers
        n_numbers = [ i+1 for i in range(self.user_input) ]

        # odoo prefered - use sum method 
        sum_of_n = sum(n_numbers)

        return sum_of_n

# Mutator 3: return reverse of num 
    def reverse_num(self)-> int :
    # can take user input or random choice 
    # if user_input == 0: use random choice
    # for single digit it add 0 behind - by multipling by 10
    # else reverse
        
        if self.user_input == 0:
            val = str(random.choice(range(100000)))
            print(f"Your random num is {val}")
            return f"Output: {int(val[::-1])} "
        elif 1 <= self.user_input <= 9 :
            val = self.user_input * 10
            return f"Output: {int(val)} "
        else:
            val = str(self.user_input)
            return f"Output: {int(val[::-1])} "
    







# logic
def main():
    print (py_4())
    # print (py_3())
    # print(py_2())
    # py_1()
    # print(py_1()) -> results None at the end of list in console
    pass


def py_4(): # reverse number 
    print("""Reverse Number 
    0 = random number""")

    user_input = int(input("Enter number: "))

    num_obj = Numbers(user_input) # instansiate obj
    
    return num_obj.reverse_num()


def py_3(): # Swap two numbers, no temp 

    a,b = 5,3
    b,a = a,b
    return a,b


def py_2(): # Sum of N numbers 

    print("Sum of N numbers")

    user_input = int(input("Enter number: "))

    num_obj = Numbers(user_input) # instansiate obj

    return num_obj.sum_of_n()

    # val = 0
    # for val in n_numbers:
    #     val += val 
    # print(val)


def py_1():  # Print num 1 to N 

    print("1 to N numbers")

    user_input = int(input("Enter number: "))

    num_obj = Numbers(user_input) # instansiate obj

    return num_obj.one_to_n() 

    # i = 0
    # # for loop - preferred odoo - robust & reusable
    # for i in range(1, user_input):
    #     print(i)

    """
        while i < user_input:
            i += 1
            print(i)

            # return i
    -> my return approach doest work bcoz 
    whenever a program 1st encounters return - even in loop
    it ends and exit the fnc - not giving chance to loop to rerun
    """    


# ------------------------
if __name__ == "__main__":
    main()