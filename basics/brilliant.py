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
    """
Hey coder! Welcome to your interactive solo project. Today, we are building a 
secure Login Gate. We'll use a "State Machine" design—meaning our program's 
entire behavior changes depending on how global variable dials are flipped!

Follow the milestones below. Fix the code step-by-step as you read.

-------------------------------------------------------------------------------
⚡ MILESTONE 1: SET THE SCENE (THE PERSISTENCE LAYER)
-------------------------------------------------------------------------------
Before we build the loops, we need memory that doesn't clear out every time 
the code runs. 

👉 YOUR TURN: Create 3 variables right below this comment:
   1. 'stored_password' -> set it to any number you want.
   2. 'login_attempts' -> set to 0 (to track consecutive failures).
   3. 'is_locked' -> set to False (a boolean flag tracking system status).

Logic Check: If we placed these variables INSIDE our loop, 
   what would happen to our 'login_attempts' counter every time the loop reset?

-------------------------------------------------------------------------------
🔄 MILESTONE 2: THE CONTINUOUS ENGINE
-------------------------------------------------------------------------------
Real login panels don't just run once and quit. They run forever until someone 
gets inside.

👉 YOUR TURN: Wrap the rest of this entire application inside a 'while True' 
   loop. This creates our infinite loop engine.

-------------------------------------------------------------------------------
🔀 MILESTONE 3: CHOOSE YOUR PATH (THE MASTER STATE EVALUATOR)
-------------------------------------------------------------------------------
Every single time the loop spins, the program must make a crucial decision: 
Are we dealing with a normal user, or a locked-out hacker?

👉 YOUR TURN: Set up a master conditional block:
   - IF 'is_locked' is currently True -> Head over to [PATHWAY A]
   - ELSE (it is False) -> Head over to [PATHWAY B]

-------------------------------------------------------------------------------
🛡️ PATHWAY A: THE LOCKDOWN & RANDOM OTP GENERATOR
-------------------------------------------------------------------------------
The user hit too many wrong guesses. We have hijacked their terminal!

👉 YOUR TURN: Inside this block, write the following logic:
   1. Print a warning message like "🚨 SYSTEM LOCKED! 🚨"
   2. Generate a secure, strictly 6-digit verification code.
      - 🧠 Brilliant Math Puzzle: What are the exact integer boundaries you 
        must pass to 'random.randint()' to guarantee Python NEVER picks a 
        5-digit number (like 99,999) or a 7-digit number (like 1,000,000)?
   3. Print this verification code directly to the console.
   4. Ask the user to input the code they see.
   5. Evaluate their entry:
      - IF code matches: Prompt them for a 'new_password' and a 'confirm_password'.
        * IF passwords match: Update 'stored_password', reset 'login_attempts' 
          to 0, and turn 'is_locked' back to False!
        * ELSE: Print "Mismatch! Still locked."
      - ELSE: Print "Wrong code. Try again."

-------------------------------------------------------------------------------
🔑 PATHWAY B: THE NORMAL LOGIN (THE THRESHOLD TRAP)
-------------------------------------------------------------------------------
The account is open. Let them try to guess the password.

👉 YOUR TURN: Inside this block, write the following logic:
   1. Ask the user to input their password guess.
   2. IF the guess matches 'stored_password':
      - Print "🎉 Access Granted!"
      - Use 'break' to shut down the infinite loop and end the program.
   3. ELSE (Wrong guess):
      - Print "❌ Incorrect!"
      - Increment 'login_attempts' by exactly 1.
      - 🚨 THE TRAP: Immediately check if 'login_attempts' has reached 5.
        If it has, print a lockout warning and instantly flip 'is_locked' to True.

==============================================================================

2FA

Now let's tie it all together. 
Let users log in only if they pass all checks: account unlocked, password correct, and code correct.
username = "EmilyVP"
password = "Safety1st!"
locked = False

attempt = "Safety1st!"
code_sent = 836027
code_entered = 836027
if locked == False and attempt == password and code_entered == code_sent:
    print ("✅ Login successful")
else: 
    print ("❌ Login failed")

    """


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

    username = "EmilyVP"
    password = "Safety1st!"
    locked = False

    attempt = "Safety1st!"
    code_sent = 836027
    code_entered = 836027

    # storing boolean vals
    unlocked = locked == False
    attempt_ok = attempt == password
    code_ok = code_entered == code_sent

    login_success = unlocked and attempt_ok and code_ok

    if login_success :
        print ("✅ Login successful")
    else: 
        print ("❌ Login failed")



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