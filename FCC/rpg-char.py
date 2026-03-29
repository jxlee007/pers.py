full_dot = '●'
empty_dot = '○'


def create_character(name, strength, intelligence, charisma) :
    
    if not isinstance (name , str):
        return "The character name should be a string."

    if name == "" :
        return "The character should have a name" 
    
    if name == "" :
        return "The character should have a name" 

    if len(name) > 10 :
        return "The character name is too long."

    if " " in name :
        return  "The character name should not contain spaces"
    
    # using list for validations
    stats = [strength, intelligence, charisma]

    # strict type checking approach for list 
    # items in list(stats)
    # is - type checking
    # for - iterate through list
    # in - membership operator
    # all - check if all items in list are true

    if not all (type(items) is int for items in stats) :
        return (" All stats should be integers")
    # note :  most efficient and common way is using isinstance - but it give boolean result henceforth used strict approach

    # how compare value in a list with condition
    # any used to handle negetive case - When create_character is called with a second, third and fourth argument that are all no less than 1 it should not return All stats should be no less than 1.
    if any(item < 1 for item in stats) :
        return "All stats should be no less than 1."

    if any(item > 4 for item in stats) :
        return "All stats should be no more than 4."

    #how todo numops on values of list
    if not sum(stats) == 7 :
        return "The character should start with 7 points"

    # solve simple - then co-join everything - but took much time 
    fill = [(item * full_dot) + (10 - item) * empty_dot for item in stats]


    return f"{name}\nSTR {fill[0]}\nINT {fill[1]}\nCHA {fill[2]}"


# alway use print to see result - py does not work like js
print (create_character("ren", 1, 3, 3))
