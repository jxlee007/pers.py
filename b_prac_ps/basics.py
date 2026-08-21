import re
import random
from typing import List, Tuple, Union, Dict, Any


# DO IT AGAIN


def main(): 
# kata-cws
    # print(kata_2( 'rock' , 'scissors'))
    # print(kata_1())   # reverse str

# scrimba 
    # arcade()
    # km_2_mi()
    # pit()
    # lemonbiz()
    # clean_str()
    # set_exe_1()
    # fncs_exe()
    # calc()
    # guess_game()

# brilliant 
    # login()

# mit
    # saving_for_house()
    # lost_in_forest()

# before_bsa
# Before Binary Search algo - refer 260726.md

# fcc
    # py basics
        # report_card()           
        # emp_profile_generator()
        # bill_splitter()  
        # mov_book_calc()
        # travel_weather()
        # apply_discount()
        # caesar_cipher()
        # rpg_char()

    # loop sequences
        # pin_extractor
        # print(number_pattern(12))

    # Dict & sets
        # med_data_valid()
        # user_config_manager()
    pass



# ------------------------------------------------

# Three Loop Questions:
    #1. What do I want to repeat?
    #  -> 
    #2. What do I want to change each time?
    #  -> index 
    #3. How long should we repeat?
    #  -> till 

# ------------------------------------------------

# FUTURE APPLICABLE LEARNINGS:
""" 
- Avoid the "Or" Trap: Python evaluates operands around 'or'/'and' independently. 
Always use explicit pairings (e.g., `p1 == 'rock' and p2 == 'scissors'`).
- Separate Logic from Presentation: Compute variables first, format f-strings last. 
Never nest complex inline if-else or raw strings inside f-string expressions.
- Prioritise Efficiency: Use direct boolean operations rather than continuous, 
heavy string parsing or multi-layered logical chaining at runtime.
"""

def kata_2(p1, p2): # rocks, paper, scissor 

    # 1. Handle Draw
    if p1 == p2:
        return "Draw!"
    
    # 2. Check explicitly if Player 1 wins
    p1_wins_with_rock     = (p1 == "rock" and p2 == "scissors")
    p1_wins_with_scissors = (p1 == "scissors" and p2 == "paper")
    p1_wins_with_paper    = (p1 == "paper" and p2 == "rock")
    
    # 3. Return the exact clean text required by the test cases
    if p1_wins_with_rock or p1_wins_with_scissors or p1_wins_with_paper:
        return "Player 1 won!"
    else:
        return "Player 2 won!"

    """ My approch 
    we want player 1 and 2 - gt from args
    on each player - need inputs
    
    if p1 == p2 :
        return f" '{p1}' , '{p2}' -->  'Draw!' "
    elif p1 or p2 == "rock" and p2 or p1  == "scissors":
        return f" '{p1}' , '{p2}' --> '{ 'Player 1' if p1 == 'rock' and p2 == 'scissors' else 'Player 2'} won!' "
    elif p1 or p2 == "scissors" and p2 or p1  == "paper":
        return f" '{p1}' , '{p2}' --> '{ 'Player 1' if p1 == 'scissors' and p2 == 'paper' else 'Player 2'} won!' "
    elif p1 or p2 == "paper" and p2 or p1  == "rock":
        return f" '{p1}' , '{p2}' --> '{ 'Player 1' if p1 == 'paper' and p2 == 'rock' else 'Player 2'} won!' "
    else:
        pass
    """


# FUTURE APPLICABLE LEARNINGS:
# 1. Be Explicit: Avoid `if a or b == 'x'`. Python reads `a` as standalone truthy.
# 2. Keep F-Strings Clean: No nested conditional calculations or quoted strings.
# 3. Separate Concerns: Isolate math/logical data operations from output string formatting.
# 4. CPU Friendliness: Simple boolean lookups run faster than active text evaluation.

def kata_1(): # reversed str 

    string = input("Enter str: ")
    return string[::-1]


# --------------------------------------------------


def lost_in_forest(): 
    print("Lost in forest")
    player_position = "😀"

    print("")
    print("****************************")
    print("****************************")
    print("")
    print(player_position)
    print("")
    print("****************************")
    print("****************************")

    where = input("To escape the forest. Go left or right ? : ")
    steps = int(input("How many steps: "))
    print(where, steps)

    while where == "right":
            print("There is no escape back")
            where = input("To escape the forest. Go left or right ? : ")
        
    while steps < 15:
            print("U need more steps of courage to escape the forest.")
            print(" Try Again")
            steps = int(input("How many steps: "))

    steps *= "  "

    print("")
    print("****************************")
    print("****************************")
    print("")
    print(f"{steps + player_position} ")
    print("")
    print("****************************")
    print("****************************")

    print("You got out of the lost forest")


def saving_for_house(): 
    # control flow 
    # bisection search

    # Assume portion_down_payment = 0.25 (25%)
    # amount_saved, which starts at $0

    """

    -------------------------------------------------------------------------------
    🔄 MILESTONE 4: THE TIME-STEP ENGINE (WHILE LOOP)
    -------------------------------------------------------------------------------
    Run a loop that simulates time moving month-by-month. 

    👉 LOOP CONDITION: Keep running as long as 'amount_saved' is strictly LESS THAN 
    your 'down_payment_target'.

    Inside the loop, perform these steps in this exact order at the end of each month:
    1. Calculate investment returns on current savings: 'amount_saved * (r / 12)'.
    2. Add both (a) the investment return and (b) your 'monthly_savings_contribution' 
    to your master 'amount_saved' balance.
    3. Increment your 'months' counter by 1.

    -------------------------------------------------------------------------------
    📤 MILESTONE 5: FINAL OUTPUT Verification
    -------------------------------------------------------------------------------
    Print the final calculated 'months' to the console matching this format:
    "Number of months: <calculated_integer>"

    🎯 VERIFICATION TEST CASES TO CHECK YOUR LOGIC:
    Test Case 1: 
    - Salary: 112000 | Save %: 0.17 | House Cost: 750000 
    - Expected Output -> Number of months: 97

    Test Case 2: 
    - Salary: 65000  | Save %: 0.20 | House Cost: 400000 
    - Expected Output -> Number of months: 79

    Test Case 3: 
    - Salary: 350000 | Save %: 0.3  | House Cost: 10000000 
    - Expected Output -> Number of months: 189
    """

    # P1
    # 1. 'yearly_salary'       -> The starting yearly salary.
    # 2. 'portion_saved'       -> Percent of salary saved monthly (as decimal, e.g., 0.1).
    # 3. 'cost_of_dream_home'  -> Total purchase cost of the dream house.

    # - 'portion_down_payment' -> The percentage of total cost needed (set to 0.25).
    # - 'r'                    -> Annual investment rate of return (set to 0.05).
    # - 'amount_saved'         -> Your current savings balance (starts at 0.0).
    # - 'months'               -> An integer counter to track elapsed time (starts at 0).

    yearly_salary = float(input("Enter your yearly salary: "))
    portion_saved = float(input("Enter the percent of your salary to save, as a decimal: "))
    cost_of_dream_home = float(input("Enter the cost of your dream home: "))
    portion_down_payment =  0.25 
    r =  0.05

    # P2
    # 1. 'down_payment_target' -> Multiply 'cost_of_dream_home' by 'portion_down_payment'.
    # 2. 'monthly_salary'      -> Derived from your 'yearly_salary'.
    # 3. 'monthly_savings_contribution' -> The fixed dollar amount saved from your salary every month.

    down_payment = cost_of_dream_home * portion_down_payment
    monthly_salary = yearly_salary/12
    monthly_savings_contribution = monthly_salary * portion_saved

    months = 0
    amount_saved = 0
    
    while amount_saved < down_payment:
        # Step 1: Calculate investment returns
        investment_return = amount_saved * (r / 12)
        
        # Step 2: Add investment return and monthly savings to balance
        amount_saved += investment_return + monthly_savings_contribution
        
        # Step 3: Increment months counter
        months += 1

    print(" Number of months:  ",months)


# --------------------------------------------------


def guess_game():  # while loop exe - guessing game 

    print('==== Guessing game ====') 
# Guess the correct number in 3 guesses. If you don’t get it right after 3 guesses you lose the game. 
# Give user input box: 1. To capture guesses, 
# print(and input boxes) 1. If user wins 2. If user loses

#Modification 1: number 1-100, tell user if guess is too high/low ,and let them have 5-10 guesses.

# difficulty about game become harder to play
    difficulty = int(input("Enter Difficulty lvl(1-10): "))
    win_answer = random.choice(range(difficulty*10)) # expands choice of num out of 100
    guess = 0
    attempts = 0
    hint = False

# P1 - raise the difficulty level
    if difficulty > 5 :
        attempts = 7
        hint = True
    elif difficulty > 2:
        attempts = 5
        hint = True
    else:
        attempts = 10
    print(f"\nTo guess u will get {attempts} {'attempts plus hints' if attempts == 5 else 'attempts'}")


# P3 while loop - run till condition is T and collapse when F
    #  my or approach was wrong
    #  took ai help - and found logical flaw in code and 
    while attempts != 0 and win_answer != guess:
        # print(win_answer)

        guess = int(input("enter ur guess: "))
        attempts -= 1
        print(f"Attempt remaining: {attempts}")

        # P4 - hint logic
        if hint == True:
            print(f"your ans is {'less then your guess' if win_answer < guess else 'more than you guess'}")

# P2
    if win_answer == guess:
        print("You won")
    else:
        print(f"You lost, answer was {win_answer} ")

    # Three Loop Questions:
    #1. What do I want to repeat?
    #  ->  capturing user input and update attempt available
    #2. What do I want to change each time?
    #  -> attempt available
    #3. How long should we repeat?
    #  -> 3 or 5 or 10 times
    #  -> difficulty - let user enter
    #       - 3 attempt - num less than 10
    #       - 5 attempt - num less than 50
    #       - 10 attempt - num is less than 100  + hints


# If-elif exes
def calc(): # Calculator with temp convertor using if-elif 
# Create a calculator which handles +,-,*,/ and outputs answer based on the mode/ operator used
# Hint: use 3 separate inputs 
# Bonus: Extend functionality with extra mode so it also does celsius to fahrenheit conversion
# formula is: temp in C*9/5 + 32 = temp in f
    print('Calculator with temp converter')
    print("""
    modes [ 0 = Temp converter, 1 = add, 2 = subtract , 3 = multiply, 4 = divide ]
    Note: In division num 1 = value and num 2 = divisor 
    """)

    mode = int(input("Enter operation to perform: "))

    if mode == 0:
        celsius = int(input("Enter temperature in celsius: "))
        print(f" {celsius}°C = {celsius*9/5 + 32}°F")

    elif 0 < mode < 5:    
        num_1 = int(input("Enter number 1: "))
        num_2 = int(input("Enter number 2: "))

        if mode == 1:
            print(f"{num_1} + {num_2} = {num_1 + num_2} ")
        elif mode == 2:
            print(f"{num_1} - {num_2} = {num_1 - num_2} ")
        elif mode == 3:
            print(f"{num_1} x {num_2} = {num_1 * num_2} ")
        elif mode == 4:
            print(f"{num_1} / {num_2} = {num_1 / num_2} ")
        else:
            pass
    else:
        print("Invalid operation")


# Comparisons and booleans
""" to see memory - print(id(a), id(b))

a=7
b=3
print('a == b is', a == b)
print('a != b is', a != b)
print('a > b is', a > b)
print('a < b is', a < b)
print('a >= b is', a >= b)
print('a <= b is', a <= b)
print('o in John is ','o' in 'John') #membership
print('o in John is ','o' not in 'John') #non membership
print('John is John ','John' is 'John') #identity
print('John is not John is ','John' is not 'John') # negative identity

"""


# named notation & return statements
"""  Profile(yob=1995,weight=83.5,height=192,eye_color="blue") 

greeting(age=27, name="brian",color="Blue")
---------------------------------------------------------------

def value_added_tax(amount):
    tax = amount * 0.25
    total_amount = amount * 1.25
    return [amount, tax, total_amount] # list
    return {amount, tax, total_amount} # set
    return f"{amount}, {tax}, {total_amount}" #str
    
price = value_added_tax(100)    
print(price, type(price))
"""


def fncs_exe():
    def greeting(name, age=28, color="red"):
        #Greets user with 'name' from 'input box' and 'age', if available, default age is used
        # print('Hello '  +  name + ', you are ' + str(age) +'!')
        print(f'Hello {name}, you are {age}!')

    name = input('Enter your name: ')
    age = int(input('Enter your age: '))
    color = input('Enter your fav color: ')
    # greeting(name, 32)
    # 1. Add new print statement - on a new line
    print(f' Hello {name.title()}, you will be {age + 1} years old next birthday !')
    print(f"We hear you like the color {color.lower()}!")
    #    which says 'We hear you like the color xxx! xxx is a string with color 
    # 2. extend the function with another  input parameter 'color', that defaults to 'red'
    # 3. Capture the color via an input box as variable:color 
    # 4. Change the 'You are xx!' text to say 'you will be xx+1 years old next birthday 
    #  adding 1 to the age
    # 5. Capitalize first letter of the 'name', and rest are small caps 
    # 6. Favorite color should be in lowercase 


def set_exe_1():  # Sets - Exercise
    #1. Check if ‘Eric’ and ‘John’ exist in friends
    #2. combine or add the two sets 
    #3. Find names that are in both sets
    #4. find names that are only in friends
    #5. Show only the names who only appear in one of the lists
    #6. Create a new cars-list without duplicates

    friends = {'John','Michael','Terry','Eric','Graham'}
    my_friends = {'Reg','Loretta','Colin','John','Graham'}
    cars =['900','420','V70','911','996','V90','911','911','S','328','900']


    print('Eric' and 'John' in friends )
    print(friends.union(my_friends))
    print(friends.intersection(my_friends))
    print(friends.difference(my_friends))

    new_cars = list(set(cars))
    print(new_cars)

    # Show only the names who only appear in one of the lists
    # symetric difference - ^
    print(friends ^ my_friends) 


#Tuples - faster Lists you can't change
"""
iterations and searches are faster
list methods work on tuple except modify once 
"""


def clean_str():
    csv = 'Eric,John,Michael,Terry,Graham:TerryG;Brian'
    friends_list = ['Exercise: fill me with names']
    # From the list above fill a list(friends_list) properly

    # update and need to store for results
    csv = csv.replace(':', ',')
    csv = csv.replace(';', ',')

    # with the names of all the friends. One per "slot"
    friends_list = csv.split(',')

    print(friends_list)

    # you may need to run same command several times
    # use print() statements to work your way through the exercise
    pass


# str - split and join
"""
split can be used to from str list  - split is performed on string
->  ' '.join(str_list) - join is performed on list
-> use + we can concatinate str_list
-> to remove space can use replace
"""


def lemonbiz():
    # instructions
    """ 
    Lists - Exercise
    Selling lemonade
    You sell lemonade over two weeks, the lists show number of lemonades sold per week
    Profit for each lemonde sold is 1.5$
    Add another day to week 2 list by capturing a number as input
    Combine the two lists into the list called 'sales'
    Calculate/ print how much you have earned on
    Best day
    Worst day
    Separately and in total
    # Hint: 3 prints in total
    """

    print("Business")

    sales_w1 = [7,3,42,19,15,35,9]
    sales_w2 = [12,4,26,10,7,28]
    # sales = []

    price = 1.5
    another_day = int(input("Enter sales of last day : "))

    sales_w2.append(another_day)

    sales = sales_w1 + sales_w2
    print(sales)

    # never directly store in variable  ->  sales = sales_w1.extend(sales_w2)
    # as it will result none 
    sales_w1.extend(sales_w2)
    # sales = sales_w1

    # task givers used sales.sort() 
    # to access first min and last max val
    best_day = max(sales)
    worst_day = min(sales)
    lifetime_sales = sum(sales)

    # print(f"""
    # Sales of lemonade biz
    # Best Day: Sold {best_day}, earned {best_day * price}$
    # Worst Day: Sold {worst_day}, earned {worst_day * price}$
    # Total sales: Sold {lifetime_sales} earned {lifetime_sales * price}$
    # """)


# list
""" 
list - - len, count, index 
sort(reverse=true) -> for list of nums or str
max, min - again works for both list of str as well as int  
sum
modify list
to add in list - can use append(val), insert(index/position, value ), specify index
list_1.extend(list_2) - merge to list together

to remove - remove(val), pop(idx) 
del list or del list[idx]
list.clear() - clears whole list

copy list - 
new_list = list_1[:] - slicing
new_list = list_1.copy() - fnc
new_list = list(list_1) - list constructor

"""


def pit():  # 🏁 Pit Stop Timing Optimizer 🔧

    # instructions
    """  
    1. Ask the user for the total race time in seconds.
    2. Ask how many pit stops were made.
    3. Ask for the average pit stop duration (in seconds).
    
    Then:
    - Calculate the total pit stop time.
    - Calculate the percentage of the race spent in the pits.
    - Round the percentage to 2 decimal places.
    
    Finally, print all of the following:
    - Total pit stop time in seconds
    - Percentage of race time spent in pits
    - A final message if pit time > 5% of the race: "You need a new pit crew. 🛠️"

    """

    print("🏁 Pit Stop Timing Optimizer 🔧")

    race_time = float(input("Enter the race time (in seconds): ")) # wrong - used int
    pit_stops = int(input("Enter the no. of pit stop's made: "))
    avg_duration = float(input("Enter average pit stop duration (in seconds): ")) # wrong - used int

    total_pit_stop_time = pit_stops * avg_duration
    race_spent_in_pits = (total_pit_stop_time/race_time) * 100

    print(f""" Pit Stop Timing Optimizer 🔧
    Based on input data:
        Total pit stop time in seconds: {total_pit_stop_time}
        Percentage of race time spent in pits : {race_spent_in_pits:.2f}
    """)

# optional feedback
    # if race_spent_in_pits > ((5/race_time)*100): wrong 
    if race_spent_in_pits > 5:
        print("You need a new pit crew. 🛠️")


# fstr and methods
""" 
def strings():
    name = 'TERRY'
    color = 'RED'
    print(f" [{name.capitalize()}] loves the color {color.lower()} ")

    # find and replace

"""


def second():
    pass


def km_2_mi():  # - Create a distance converter converting Km to miles 
# - Take two inputs from user: Their first name and the distance in km

# - Print: Greet user by name and show km, and mile values
# - 1 mile is 1.609 kilometers
# - hint: use correct types for calculating and print
# - Did you capitalize the name

    name = input("Enter your first name: ")
    kilometers = float(input("Enter the distance in kms: "))
    # str.title() - first letter of every word - edge-case handling
    # str.capitalize() - only frist letter of str 
    # not putting parantheses results to bound method err 
    # 2f is for decimal places - also rounds the figure
    # improv - never use comments in print as fstr treat them as text
    print(f"""
        Hello {name.title()} ! 
        {kilometers} kms = {(kilometers/1.609):.1f} miles
        """)


def arcade():    # 🕹️ Arcade Day Pass Tracker — Challenge Steps

# TASK
# To convert this file into a model logic
    # need to convert this program in to independent fnc
    # that handles input recieved from html via controller.py
    # then return the output to html via controller.py

    # 1) Create variables to store:
    #    - customer name
    #    - number of passes
    #    - tokens per pass
    #    - price per pass
    #    - tokens required per game

    customer_name = "John"
    no_of_passes = 5
    token_per_pass = 10
    pass_price = 2.00
    tokens_required_per_game = 1

    # 2) Calculate:
    #    - total tokens
    #    - total cost
    #    - games available  (use 'floor division' to get a whole number)

    total_tokens = no_of_passes * token_per_pass
    total_cost = pass_price * no_of_passes
    games_available =  total_tokens//tokens_required_per_game

    # 3) Print a summary with:
    #    - customer name
    #    - passes bought
    #    - total tokens
    #    - total cost
    #    - games available

    # print(f" {customer_name} bought {no_of_passes} pass/es giving him total {total_tokens} tokens for worth {total_cost}$ for {games_available} game/s" )

    print(
        f"""===== ARCADE DAY PASS ===== 
                Customer: {customer_name} 
                Passes: {no_of_passes} 
                Tokens: {total_tokens} 
                Total Cost: ${total_cost:.2f} 
                Games Available: {games_available}
        """)

# --------------------------------------------------


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

        username = "BosslAm"
        device = "iPhone 1934392"
        trusted_device = "iPhone_1934392U"
        device_ok = device == trusted_device
        code_ok = False
        face_id_ok = False
        touch_id_ok = False
        second_step_ok = code_ok or touch_id_ok or face_id_ok
        locked = False
        attempt_ok = True
        if attempt_ok and (not locked) and (second_step_ok ):
            print("Login successful")
        else:
            print("Login failed")

        if (not device_ok) and attempt_ok and (not locked) and second_step_ok :
            print("Trust this device?)

        pass




# ----------------------------------------------------
if __name__ == "__main__":
    main()


# my code - logic understainding was wrong

 
# def   apply_discount (price,discount) :
    
#    
#     if not isinstance(price, (int,float)):
#         # on T this will run
#         print ("The price should be a number.")
#     elif not isinstance(discount , (int,float)) :
#         print ("The discount should be a number.")
#     elif price <= 0 :
#         print ("The price should be greater than 0")
#     elif discount <= 0 or discount > 100 :
#         print("The discount should be between 0 and 100")
#     else :
#         print (price - discount)
# apply_discount (22,10) 


""" 
### Comparison & Troubleshooting

The main difference is that your new code uses `print` and `elif`, while the "passed" version uses `return` and `if`. In a coding lab or test, these differences are why a solution might "Fail."

#### Specific Problems with Original Code:

1. **print vs. return** (The biggest issue)
   - Instructions say the function should **return** a value.
   - `print` just shows text on the screen for a human.
   - `return` gives the answer back to the test script so it can use it.
   - **Result:** The test sees `None` coming from your function and marks it as **Failed**.

2. **The Math Logic**
   - **Your Code:** `price - discount`
   - **Scenario:** If price is 100 and discount is 20, it gives 80 (looks right for one case).
   - **The Problem:** The lab says the discount is a **percentage**.
   - **Example:** If price is 50 and discount is 20%, the answer should be 40.
   - **Your math:** 50 - 20 = 30 (Wrong).
   - **Correct Math:** `price * (1 - discount / 100)`

3. **Logic for "Zero"**
   - **Your Code:** `elif discount <= 0`
   - **Lab Rule:** "If discount is less than 0..."
   - **The Conflict:** The lab says a discount of 0 is allowed. Your code treats 0 as an error.
   - **Note:** It should only be an error if it's negative (`< 0`).

4. **if vs elif**
   - While `elif` works, using `if` with `return` is often cleaner for "Guard Clauses." Once a return happens, the function stops immediately.

#### Summary Table:

| Feature          | Your Current Code  | What the Lab Needs          |
|------------------|-------------------|----------------------------|
| Output           | `print()`         | `return`                   |
| Math             | `price - discount` | `price * (1 - discount/100)`|
| Zero Discount    | Error             | Allowed                    |
"""
