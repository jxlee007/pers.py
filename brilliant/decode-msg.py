# clue : str backward
message_one = "onaip si siht"

# clue : replace a with e
message_two = "tha bast avar krama hara"

# clue : repacle z wit r . c is noise 
message_three = "pczogczamming is czeally gczeat"

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
    # swap characters
    print(message_two[::1].replace("a","e"))

def four():
    print(message_three[::1].replace("cz","r"))

# Run the functions
# one()
# two()
# three()
# four()

# slicing is best 