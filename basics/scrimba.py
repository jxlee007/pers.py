# SCRIMS FORM SCRIMBA

import random


def main():
    # arcade()
    # km_2_mi()
    # pit()
    lemonbiz()
    # guess_game()
    # pass   


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


# OOPs approach 
# -> convert independent fnc into class
# -> create a PassReceipt class
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


# -------------------------
if __name__ == "__main__":
    main()