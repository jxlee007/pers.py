full_dot = '●'
empty_dot = '○'

def create_character(name) :
    
    if isinstance (name , str):
        return "The character name should be a string"

    if name == "" :
        return "The character should have a name" 

    if name.len > 10 :
        return "The character name is too long."

    if " " in name :
        return  "The character name should not contain spaces"

    # if not isinstance ((strength, intelligence, charisma) , int) :
    #     return "All stats should be integers"

create_character( "hi" )