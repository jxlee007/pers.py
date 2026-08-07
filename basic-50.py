import random
import datetime

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
    # after scrimba lesson will approach the problem
                        # 1 to N prime number 
    py_13()            # Str-ops : revrese ,    
    # py_12()           # Count and sum of digits
    # py_11()           # Factorial
    # py_10()           # check prime number   
    # py_9()            # right triangle - pattern
    # py_8()            # Tables
    # py_7()            # Palaindrome num
    # py_6()            # Check leap year
    # py_5()            # largest or 3
    # print (py_4())    # reverse num
    # print (py_3())    # Swap without temp
    # print(py_2())     # Sum of N 
    # py_1()            # 1 to N 
    # print(py_1()) -> results None at the end of list in console
    pass


def py_(): # Prime to N - nested loop 
    """
    1. Eliminate 0, 1 or negetive
    2. get prime num
        - 
    3. add to list
    """

    n_num = int(input("Enter number: "))

    if n_num <= 1:
        return "Enter valid number for range"

    

    # list till n_num
    for val in range(3, n_num):
        # i - 3,4,5,6,7
        # i can be dividr by 2,3,4,5,6, 7
        # each i to divided by it small nums
        # i - 3 /2, 4/2, 5/2,3,4, 6/2, 7/2,3,4,5,6 
        # need to make divisor counter dynamic
        # maybe i need 2 loops - 1 for range, 2 - updating divisor
        pass


def py_13(): # Strops reverse, painlandrome, count vowels 

    print(f"""
    
    """)

    str_input = input("Enter string: ")
    str_ops = int(input("Enter ur option: "))

    match str_ops:
        case 1:
            pass
            # print(f"")
        case 2:
            pass
        case _:
            print("Invalid value")


    print(f"""
    {str_input}
    reverse: {str_input[::-1]}
    """)

def py_12(): # Count & sum of digits 

    print("Sum & Count of digits ")

    num = input(" Enter num: ")

    num = (list(num))

    val = 0

    for idx in num:
        val += int(idx)

    print(f" Sum of digits: {val} {type(val)}")
    print(f" Count of digits: {len(num)}")


def py_11(): # factorial 

    print("Factorial")

    num = int(input("Enter number: "))


    fact_counter = 1

    for i in range(1, num + 1): 
    # for i in range(2, num + 2): 
        # print(f" {fact_counter} ")
        fact_counter *=  i

    # print(fact_counter)
    #  can be done by using math module math.factorial(num)


def py_10(): # check if prime number 
    print("If Prime number")

    num = int(input("Enter number: "))
    
    if num <= 1 : # 1st pass - elminating 0, 1 or negetive vals
        print("Not a prime number")    
    # if num <= 0 or 1: wrong approach - logical shortcut bug - 1 is detected as truthy val
        # solution - if num <= 0 or num == 1:

    counter = 2

    # if num / counter == 0:  normal div results in float causing err
    if num % counter == 0: 
        for i in range(1, num + 1):
            counter += 1
 
        print(f" Not a prime number ")
    else:
        print(f"{num} is a prime")


def py_9(): # right triangle 

    # to print individual rows
    no_of_rows = int(input("Enter the number of rows: ")) + 1

    # as Increment counter 
    num_counter = 1
    sym = '*'

    for i in range(1, no_of_rows):
        print(f"{sym * num_counter}")
        num_counter += 1

    """ while approach 
        while num_counter < no_of_rows:

            # + didnt worked - * works
            print(f"{(i * num_counter)}")
            num_counter += 1
        
    """


def py_8(): # Multiplication table 

    print(" Multiplication table")
    table = int(input("Enter number: "))

    for count in range(1,11):
        print (f" {table} x {count} = {table * count} ")


def py_7():# check if num is palaindrome 

    print("if number is palaindrome")

    num = input("enter number: ")

    val = int(num[::-1])
    num = int(num)

    if val < 9:
        print(f"Input can't be a single digit num")
    elif num == val:
        print(f"{num} is a palaindrome")
    else:
        print(f"{num} is not a palaindrome")


def py_6(): # check leap year

    print("Check if Leap year")

    # leap_year = 2000 + 4
    #  every 4th year is leap 
    # count from 2000
    # add of 4 
    year = int(input("Enter year: "))

    if year % 4 == 0:
        print(f"{year} is a leap year")
    else:
        print(f"{year} is not a leap year")


def py_5(): # largest of 3 numbers

    print("Largest of 3 numbers")
    # take 3 inputs
    num_one = int(input("Enter num 1: "))
    num_two = int(input("Enter num 2: "))
    num_three = int(input("Enter num 3: "))

    if num_one > num_two and num_one > num_three:
        print("Num 1 is largest among 3")
    elif num_two > num_one and num_two > num_three:
        print("Num 2 is largest among 3")
    else:
        print("Num 3 is largest among 3 ")


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