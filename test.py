# Variables given
a , b = 5, 3

# Evaluates the comparison directly and assigns the boolean
result = a > b

# Uses the 'not' operator to invert the boolean directly
inverse_result = not result

msg='welcome to Python 101: Strings'

msg = f"{msg[18]} {msg[:7]} {msg[25:29]}{msg[7:10]}{msg[7:9] + msg[12:13] + msg[2:8:4]+ msg[25:26]}"
# print(msg.title())
# print(msg[::-1].title())

def num_one_to_n():
    user_input = int(input("enter number:"))
    # added + 1 to resolve issue of missing nth number
    num = user_input + 1
    # is added to maintain order of 1 to n
    i = 1
    
    

    # prints n to 1 - we need 1 to n
    # while user_input != 0:
    #     print(user_input)
    #     user_input -=  1 # counter

    # print 1 to n but misses nth num 
    while i != num: # as we dont know num of iterations
        print(i)
        i +=  1 # counter - to avoid infinite condition
    
        

# num_one_to_n()   

def sum_of_n_num():
    n_user_input = int(input('Enter number want to sum: '))
    # num_list = list(input(f"Enter {n_user_input} numbers:"))
    # need to convert this input - for str to int list
    #  for list transformations - list comp is used
    #  BP - is to use map - perform good on large dataset
    nums_list = list(map(int, input(f"Enter {n_user_input} numbers:").split()))

    # if user add less num and enters - graud clause
    if len(nums_list) < n_user_input:
        print(f"need add {n_user_input} number's for sum")

    # sum = [i for i in nums_list]
    i = nums_list.pop
    i

    print(sum)
    # print(nums_list)
        
    
    # 

# sum_of_n_num()

numbers = []
n = int(input("How many numbers do you want to add? "))

for i in range(n):
    num = int(input(f"Enter number {i+1}: "))
    numbers.append(num)

numbers.

print(numbers)
