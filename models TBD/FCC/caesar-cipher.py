# def caesar(text, shift):
def caesar(text, shift, encrypt = True):

    # create an if statement. 
    # For now, use True as the condition, 
    # and within the if statement body 
    # return the string Shift must be an integer value.

    if not isinstance(shift, int):
        return 'Shift must be an integer value.' # guard 1 = implemented guard clause

    if shift < 1 or shift > 25 :
        return "Shift must be an integer between 1 and 25."

    # checks if encrypt is not truthy. 
    #  function should encrypt the text passed 
    # to it (default behavior, encrypt=True), if it should decrypt an encrypted message.
    if not encrypt:
        shift = -shift


    alphabet = 'abcdefghijklmnopqrstuvwxyz'
    # shift = 3
    shifted_alphabet = alphabet[shift:] + alphabet[:shift]

    # text = 'Hello world'

    # str.maketrans = create a map of chars to be replaced
    # translation_table = str.maketrans(alphabet, shifted_alphabet)
    # print(translation_table)

    # Update your str.maketrans() call by concatenating to each argument the uppercase version of the argument itself.
    translation_table = str.maketrans(alphabet + alphabet.upper(), shifted_alphabet + shifted_alphabet.upper())
    # print(translation_table)
    
    #  .translate = add the chars over generated map-table
    return text.translate(translation_table)

# Return a caesar call passing in text and shift from both your new functions, 
# but make sure to pass in also False as the third argument for the decrypt function.
def encrypt (text,shift) :
    return caesar (text, shift)

def decrypt (text,shift) :
    return caesar (text, shift, False)

# encrypted_text = caesar('freeCodeCamp', 3)
encrypted_text = encrypt('freeCodeCamp', 3)
print(encrypted_text)

# Courage is found in unlikely places
# encrypted_text = 'Pbhentr vf sbhaq va hayvxryl cynprf.'
# decrypted_text = decrypt(encrypted_text,13)
# print(decrypted_text)
