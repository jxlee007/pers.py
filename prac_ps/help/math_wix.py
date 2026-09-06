import random
import datetime
from typing import List

# Create a single class inside a dedicated math module (core_engine/math_wizard.py) 
# to absorb all scattered iterations of your numerical problems
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
    bubble_sort()       # manual
                        # 1 to N prime number 
    # py_15()            # Count word in str 
    # py_14_2            # use linear seaarch
    # py_14()            # largest and second largest without sort    
    # py_13()            # Str-ops : revrese and pailindrome    
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


def py_(): # Pending Prime to N - nested loop 
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


def py_16(): #count occurence of a elem          
    pass

def bubble_sort(): #manual 
    num_list = random.sample(range(500), 10)

    print(num_list)

    # ❌ for i in num_list: 
        # ❌ for j in num_list: 
    # ✔️ we run loop on indices/pointers = range(len(num_list)) = not on vals 
    # compare neighbours = j , j+1
    # innner loop = len(num_list) - 1 - i = -i saves operation  
    for i in range(len(num_list)): # for rotating i idx
        for j in range(len(num_list) - 1 - i): # for rotating j idx
            if num_list[j] > num_list[j + 1]: # if i greater than j 
            # if condition is true - j will stored in temp
                temp = num_list[j] 
                num_list[j] = num_list[j + 1]
                num_list[j + 1] = temp
                print( num_list[j+1], num_list[j], temp)
    print(num_list)


def py_15(): # count word in str 

    string = "largest and second largest without sort"

    count_words = string.split(" ")

    print(count_words)
    print(len(count_words))


def py__(): # Pending - 1st & 2nd largest using linear search 

    num_list = [ i for i in random.sample(range(500), 10)]

    largest_num = max(num_list)
    pass

def py_14(): # largest and second largest in list without sort 

    num_list = [i for i in random.sample(range(100), 10)] #choice take 1 arg and sample takes 2 args
    print(num_list, )
    print(f" Largest in list is : {max(num_list)}")
    largest_num = max(num_list)

    # to find second largest without sort -  use max and remove
    num_list.remove(largest_num)

    print(f" 2nd largest in list is : {max(num_list)} ")


def py_(): # Pending - Strops reverse, painlandrome, count vowels 

    str_input = input("Enter string: ")
    str_ops = int(input("Enter ur option: "))

    match str_ops:
        case 1: # check if palaindrome
            reverse =  str_input[::-1]
            if str_input == reverse:
                print("Input string is a palaindrome")
            else:
                print("Input string is not a palaindrome")
        case 2: # count vowels
            reverse =  str_input[::-1]

            vowel_dict = {  
                'a': 0,
                'e': 0,
                'i': 0,
                'o': 0,
                'u': 0
            }

            vowel = "aeiou"

            for i in str_input:
                if i in vowel:
                    if i == "a":
                        pass
                else:
                    print("no vowel found")
            

            print(f"Reverse:{ reverse }")
        case _:
            print("Invalid value")


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

"""
from operator import itemgetter # for dict comp
from typing import List, Optional, Any # for list

nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

# Do this 3 way:
# 1. Square all → [1, 4, 9, 16, ...]
# 2. Keep only even → [2, 4, 6, 8, 10]
# 3. Even AND square → [4, 16, 36, 64, 100]



# list is mutable
square = [x*x for x in nums]

even = [x for x in nums if x%2==0]

sq_even = [x*x for x in nums if x%2==0] 


# Dict comp - dict are mutable
students = {
    "Alice": 85,
    "Bob": 92,
    "Charlie": 78,
    "Diana": 88
}

# Do:
# 1. Get grade > 80 (list of names)
# 2. Name with highest score = my apporach is to sort and show last item of dict
# 3. Average grade (use sum())

#  Add key-val structure at the start
# template = key: val for key, val in dict.items() if val > 80
grade_above_80 = {name: grade for name, grade in students.items() if grade > 80}
# print("Student scored above 80 are:")

# # 2. Correct way to print: Loop through the new dictionary using .items()
# for name, grade in grade_above_80.items():
    # print(f"{name}")


# There are two approaches to solve the high value problem - without import needs lambda
# First approach is to use sorted method - Not efficient
    # sorted_by_vals = dict(sorted(dict.items(), key = itemgetter(1))) 
    # purpose - rearrange entire dataset - takes O(NlogN) time
    # output type - full dictionary - uses high memory
    
# Second is to use Max method - highly efficient
    # key, val = max(dict.items(), key=itemgetter(1) ))
    # purpose = scan data at once to find highest value - O(N)
    # output type - single tuple - no memory (just track variable)


name, grade = max( students.items(), key=itemgetter(1) )
# print(f"highest score = {name}: {grade}")


# 3 - To calculate the average grade using sum(), 
# maths formula: Total Sum of Scores ÷ Total Number of Students.
# Interview Requirements & Core Expectations
    # Isolate the Values: You must extract only the numeric grades from the dictionary, explicitly bypassing the student names.
    # Summation Mechanism: You need to use Python's built-in sum() function to calculate the total combined score of all those extracted grades.
    # Count Mechanism: You must use Python's built-in len() function to determine the total number of students in the dataset.
    # Float Division: You must use the true division operator (/) rather than floor division (//) to ensure the resulting average retains its decimal precision (e.g., 81.25 instead of 81).
    # ZeroDivisionError Prevention: You are expected to check that the dataset is not empty before dividing, protecting the application from crashing if there are zero students.

avg_grade = sum(students.values()) / len(students) 
# print(f"average grade: {avg_grade}")


# ✅ FIX 1: Explicitly specify what data type the list holds (e.g., int)
def remove_duplicates_from_list_keep_order(input_list: Optional[List[int]]) -> List[int]:

# ✅ FIX 2: Explicitly mark that the input can be Optional (can be a List OR None)
    ordered_list: List[int] = []

    # tracker = {}  # mistake - empty dict
    tracker: set[Any] = set() # got to know how to set type
    # set is unordered, unique and mutable

# implement graud clause for edge case
    # if isinstance  list == none # is used to check type of obj/data
    if input_list is None: # is None 
        return []

    for elem in input_list :
        if elem not in tracker:
        # tracker = elem.append() # mistake 
            tracker.add(elem)
            ordered_list.append(elem)

    # ✅ FIX 4: Explicitly returning the value satisfies "must return value on all code paths"
    return ordered_list

print(remove_duplicates_from_list_keep_order([1, 2, 2, 3, 1, 4]))  
"""