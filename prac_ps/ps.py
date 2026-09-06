

# CODE QUALITY
# ASK CLARIFY Qs to understand problem
# communicate process


def main():
    # array_concat([1,2,1])
    array_shuffle([7,5,9,7,5,8,10,4,3,3,2,5,9,10], 7)

    pass


# LC QUEST
    # arrays
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


# ----------------------------
if __name__ == "__main__":
    main()