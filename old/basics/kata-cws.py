# codewars
def main():
    # print(kata_2( 'rock' , 'scissors'))
    # print(kata_1())   # reverse str





""" 
FUTURE APPLICABLE LEARNINGS:
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

# =====================================================================
# FUTURE APPLICABLE LEARNINGS:
# 1. Be Explicit: Avoid `if a or b == 'x'`. Python reads `a` as standalone truthy.
# 2. Keep F-Strings Clean: No nested conditional calculations or quoted strings.
# 3. Separate Concerns: Isolate math/logical data operations from output string formatting.
# 4. CPU Friendliness: Simple boolean lookups run faster than active text evaluation.
# =====================================================================


def kata_1(): # reversed str

    string = input("Enter str: ")
    return string[::-1]


# ----------------------------
if __name__ == '__main__':
    main()