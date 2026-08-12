# Brilliant tutorials
import random



def main():
    # one()
    # two()
    # three()
    # four(message_two)
    # print("decode-message")
    login()
    pass

def login():
    print("Login demo")
    # make program work on boolean value

    username = "Deputy"
    password = 910111213

    print(username)
    entered_password = int(input("Enter password: "))

    failed_logins = 0

    if entered_password == password:
        print("Successful Login")
    else:
        print('Wrong password')
        failed_logins += 1

    reset_code = 0

    Locked = False
    if failed_logins >= 5:
        print("Account Locked")
        reset_code = random.randint(99999, 100000)
        print("Reset code sent to your console: ", reset_code)

        Locked = True
        code_entered = int(input("Enter Reset Code: "))

        if code_entered != reset_code:
            print('Invalid reset code')
        else:
            new_password = int(input("Enter new password: "))
            cnf_password = int(input("Confirm password: "))

            if cnf_password != new_password:
                print("Confirmed password is not same as new password" )
                pwd_changed = False
            else:
                password = new_password
                pwd_changed = True
                print("Password updated")


        if pwd_changed:
            print("Acc unlocked")
            Locked = False
        else: 
            print(' ')



    else:
        print(failed_logins)



def strops():

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

# slicing is best 



# ------------------------
if __name__ == '__main__':
    main()