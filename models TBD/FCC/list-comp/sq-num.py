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