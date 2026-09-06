import random

def main(): # for code org
    # num_one_to_n()
    # sum_of_n_num()
    # msg(0, 5)
    # list()
    # print(firstLast())
    # elem_search()
    # sololearn_py
    induction()
    # recursion()
    
    pass


def recusion(): 
    def cache_coins(n):
        if n == 1:
            return 1
        return 2 * cache_coins(n — 1)
    total = cache_coins(5)
    # print(f"CacheCoins Day 5: {total}" )

    def stack_coins(n):
        if n == 1:
            return 1
        return n + stack_coins(n — 1)
    total = stack_coins(5)
    # print(f"stackCoins Day 5: {total}" )

    def queue_coins(n):
        # if block = constant
        if n == 1:
            return 5
        # logic = formula = base case * fnc(yesterday)
        return 2 * stack_coins(n — 1) + 5
    total = stack_coins(5)
    print(f"stackCoins Day 5: {total}" )


def induction():

    def cache_coins(final_day): 
        # an geometric/exponent pattern
        # doubles everyday
        day = 1
        total= 1
        while day < final_day :
            print(f"Day {day}: {total}")
            day += 1
            total *= 2
        return  total

    print(f"Day 10: {cache_coins(10)}")

    def stack_coins(final_day): # a constant 2nd difference/ quadratic pattern 
        day = 1
        total= 1
        while day < final_day :
            print(f"Day {day}: {total}")
            day += 1
            total += day
        return  total

    # print(f"Day 10: {stack_coins(10)}")

    def queue_coins(final_day):
        day = 1
        total = 5
        while day < final_day :
            print(f"Day {day}: {total}")
            day += 1
            total = 2 * total + 5
        return total

    # print(f"Day 10: {queue_coins(10)}")

        

def sololearn_py():
    c = ['$', '£', '€', '¥']
    print(c[1:-1])
    # print(c[-1:-3]) = []
    print(c[-3:-1])
    c[:2] = ['₣', '฿']
    print(c)


    vehicle = 'motorbike'
    # output bike using negetive slicing

    vehicle = 'airplane'
    # vehicle[:3] = 'water'
    print(vehicle)

    c = ['$', '£', '€', '¥']
    print(c[-2:])

    cart = ['lamp', 'candles', 'chair', 'carpet']
    print(cart[1:])

    color = 'pink'
    print(color[1:4])

    word = "run"
    word[0] = "f"
    print(word)
    

def firstLast():
    a = random.sample(range(30), 10)
    return (a,[a[0], a[-1]])


def elem_search():
    ordered_list = sorted(random.sample(range(500), 10))
    # our item is elem
    item = random.choice(ordered_list)

    # binary search imply
        # needs dynamic boundary
    # tried 
        # enmerate = false
        # divide by 2 = false
    # we take how bit list is and find the middle position by 2
    idx = int(len(ordered_list) / 2)

    position = ordered_list[idx]
    left = ordered_list[(idx - 1)]
    right = ordered_list[(idx + 1)]


    # if idx == item :
    #     print(f'found item {position} at {ordered_list(idx)} ')
    # elif left == item :
    #     print(f'found item {position} at {ordered_list.index(left)} ')
    # elif right == item:
    #     print(f'found item {position} at {ordered_list.index(right)} ')
    # else:
    #     print(f'{item} not found')

    print(ordered_list)


def list():
    n = int(input("How many numbers do you want to add? "))
    #  i + 1 to avoid 0 in list
    numbers = [i + 1 for i in range(n)]
    
    # for i in range(n):
    #     num = int(input(f"Enter number {i + 1}: "))
    #     numbers.append(num)

    print(numbers)


def msg(a: int = 5, b: int = 3):
    # Evaluates the comparison directly and assigns the boolean
    result = a > b
    # Uses the 'not' operator to invert the boolean directly
    inverse_result = not result
    print(inverse_result)

    text = "welcome to Python 101: Strings"
    decoded = f"{text[18]} {text[:7]} {text[25:29]}{text[7:10]}{text[7:9] + text[12:13] + text[2:8:4] + text[25:26]}"
    print(decoded)
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
        i += 1 # counter - to avoid infinite condition


def sum_of_n_num():
    n_user_input = int(input("Enter number want to sum: "))
        # num_list = list(input(f"Enter {n_user_input} numbers:"))
        # need to convert this input - for str to int list
        #  for list transformations - list comp is used
        #  BP - is to use map - perform good on large dataset
    nums_list = list(map(int, input(f"Enter {n_user_input} numbers:").split()))

    # if user add less num and enters - graud clause
    if len(nums_list) < n_user_input:
        print(f"need add {n_user_input} number's for sum")
        return

    total = sum(nums_list)
    print(total)




# -------------------------
if __name__ == "__main__":
    main()