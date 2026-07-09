# 🕹️ Arcade Day Pass Tracker — Challenge Steps


# 
# TASK
# To convert this file into a model logic
    # need to convert this program in to independent fnc
    # that handles input recieved from html via controller.py
    # then return the output to html via controller.py

# OOPs approach
    # convert independent fnc into class
    # create a PassReceipt class


#
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

#
# 2) Calculate:
#    - total tokens
#    - total cost
#    - games available  (use 'floor division' to get a whole number)

total_tokens = no_of_passes * token_per_pass
total_cost = pass_price * no_of_passes
games_available =  total_tokens//tokens_required_per_game

#
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