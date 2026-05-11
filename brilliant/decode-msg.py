print("decode-message")

# clue : str backward
message_one = "onaip si siht"

# clue : replace a with e
message_two = "tha bast avar krama hara"

# clue : repacle z wit r . c is noise 
message_three = "pczogczamming is czeally gczeat"

# clue - x hide a , y hide e
message = "bywxry thy yvyning rxin"

# practice for str indexing
# there are two possible ways = while loop or slicing(modern way)


def one():
    # reverse str using while loop
    mess = "this is piano"

    # starts fro last valid index
    i = len(mess) - 1
    while i >= 0:
        # second arg is to print str in same line
        print(mess[i], end="")
        i -= 1


def two():
    print(message_one[::-1])

def three():
    print(message_three[::1].replace("cz","r"))

def four(character):
    # swap characters
    for letter in character:
        if letter == "a":
            print("e", end="")
        else :
            print(letter, end="")
    # print(message_two[::1].replace("a","e")) # best-way

def replace_xy(character):
    if character == "x":
        return "a"
    elif character == "y":
        return "e"
    else :
        return character

# for letter in message:
#     print(replace_xy(letter), end="")

# Run the functions
# one()
# two()
# three()
# four(message_two)

# slicing is best 