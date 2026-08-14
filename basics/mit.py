

def main():
    saving_for_house()
    # lost_in_forest()
    pass


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
    1. 'yearly_salary'       -> The starting yearly salary.
    2. 'portion_saved'       -> Percent of salary saved monthly (as decimal, e.g., 0.1).
    3. 'cost_of_dream_home'  -> Total purchase cost of the dream house.

    - 'portion_down_payment' -> The percentage of total cost needed (set to 0.25).
    - 'r'                    -> Annual investment rate of return (set to 0.05).
    - 'amount_saved'         -> Your current savings balance (starts at 0.0).
    - 'months'               -> An integer counter to track elapsed time (starts at 0).

    -------------------------------------------------------------------------------
    📊 MILESTONE 3: PRE-LOOP CALCULATIONS
    -------------------------------------------------------------------------------
    Before starting the time loop, calculate your static benchmarks:

    1. 'down_payment_target' -> Multiply 'cost_of_dream_home' by 'portion_down_payment'.
    2. 'monthly_salary'      -> Derived from your 'yearly_salary'.
    3. 'monthly_savings_contribution' -> The fixed dollar amount saved from your 
                                        salary every month.

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



    yearly_salary = float(input("Enter your yearly salary: "))
    portion_saved = float(input("Enter the percent of your salary to save, as a decimal: "))
    cost_of_dream_home = float(input("Enter the cost of your dream home: "))
    portion_down_payment =  0.25 

    down_payment = cost_of_dream_home/(0.25 * 100)

    r =  0.05

    amount_saved = 0

    months = amount_saved * (r/12)

    print(" Number of months ",months)

# -------------------------------------------
if __name__ == "__main__":
    main()