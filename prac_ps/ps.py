

# CODE QUALITY
# ASK CLARIFY Qs to understand problem
# communicate process


def main():

# LC QUEST
# arrays
    # array_concat([1,2,1])
    # array_shuffle([7,5,9,7,5,8,10,4,3,3,2,5,9,10], 7)

# paterns
# sliding window
    # fix_window_slider([])
    frame_scanner()


# BRILLIANT RECURSION
    # induction()
    # recursion()






    pass


def max_consecutive_ones():
    # we have a binary array

    pass

def


def fix_window_slider(nums):
    # Calculate the sum of every adjacent pair of numbers in a list

    print("fix_window_slider")

    input = nums

    right = 0
    left = 1

    output = []

    # Only 1 item 
    if len(input) == 1:
        input.append(0)

    if len(input) == 0:
        print("Empty list")

    # -1 to avoid num2 index err
    for i in range(len(input) - 1):

        num1 = input[right]
        num2 = input[left]

        output.append(num1 + num2)

        right += 1
        left += 1


    # Only 2 items
    if len(input) == 2:
        output.pop()

    print(f"stdin len:  {len(input)} ")
    print(f"stdout len: {len(output)}")

    print(output)
        


    
    """  hints
    Input-Scenario Sample-stdin Expected-stdout Reason 
    Only 2 items    5 12           17           Only one adjacent pair exists.
    Only 1 item     7           (Empty output)  A pair requires at least two elements.
    Empty list     (Blank)      (Empty output)  No pairs can be formed.

    TC 1 
        stdin  - 1 3 5 7 9
        stdout - 4 8 12 16

    TC 2
        stdin  - 5 -2 3 0 -5
        stdout - 3 1 3 -5

    TC 3 
        stdin  - 10, 20, 30, 40
        stdout - 30, 50, 70

    """


def array_shuffle(nums,n): 

    # my initial approach was to find number in list to split
    # correct approch is to find index in list to to split


    """
    make left half
    make right half
    make empty result

    repeat n times:
        take one item from left
        take one item from right
        add both to result

    return result
    """

    # original list
    num1 = nums

    # shuffle_index = n
    length = len(num1)
    shuffle_index = length // 2



# split list from nth term
    # find shuffle number in list
    position = shuffle_index

    # create 2 list using slice
    left = num1[:position] # before
    right = num1[position:] # after

    print(left, right)

# use loop to add elem from num 2 to num 1
    element = 0
    new = []

    for i in range(len(num1)):

        # expected shuffle pattern

        # if any list is empty
        if len(left) != 0 :
        # go through each elem of list 1 
            start_left = left.pop(element)
            new.append(start_left)

        if len(right) != 0 :
        # insert each elem from list 2 after each elem of list 1
            start_right = right.pop(element)
            new.append(start_right)


        

    print(new)


def array_concat(nums): 

    num1 = nums
    num2 = nums

    print(num1+num2)


def recursion(): 
    print("RECURSION") 
    def cache_coins(n):
        if n == 1:
            return 1
        return 2 * cache_coins(n - 1)
    total = cache_coins(5)
    print(f"CacheCoins Day 5: {total}" )

    def stack_coins(n):
        if n == 1:
            return 1
        return n + stack_coins(n - 1)
    total = stack_coins(5)
    print(f"StackCoins Day 5: {total}" )

    def queue_coins(n):
        # if block = constant
        if n == 1:
            return 5
        # logic = formula = base case * fnc(yesterday)
        return 2 * queue_coins(n - 1) + 5
    total = queue_coins(5)
    print(f"QueueCoins Day 5: {total}" )


def induction(): #THINKING 

    print("INDUCTION")

    def cache_coins(final_day): # geometric/exponent pattern

        print("CacheCoins: doubles the previous(n-1) day’s amount ")
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

        print("StackCoins: adds the current day(n) number to the previous total.")

        day = 1
        total= 1
        while day < final_day :
            print(f"Day {day}: {total}")
            day += 1
            total += day
        return  total

    print(f"Day 10: {stack_coins(10)}")

    def queue_coins(final_day):

        print("QueueCoins: doubles the previous amount and adds 5")

        day = 1
        total = 5
        while day < final_day :
            print(f"Day {day}: {total}")
            day += 1
            total = 2 * total + 5
        return total

    print(f"Day 10: {queue_coins(10)}")


# ----------------------------
if __name__ == "__main__":
    main()