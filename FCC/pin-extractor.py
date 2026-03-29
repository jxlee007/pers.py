def pin_extractor(poems):
    
    secret_codes = []

    for poem in poems :
    # slipt into list of lines
        lines = poem.split('\n')
        secret_code = ''
    # create a loop over lines that uses line as loop variable. 
    # Inside the loop, print line.
        for line_index,line in enumerate(lines) :
            # print(line)
            # print(line_index, line)
        # separate the line of the poem into a list of words
            words = line.split(" ")
        # print(words)
        # print(line_index, words)
            if len(words) > line_index:
                secret_code += str(len(words[line_index]))
            else:
                secret_code += '0'
            secret_codes.append(secret_code)




poem = """Stars and the moon
shine in the sky
white and bright
until the end of the night"""

poem2 = 'The grass is green\nhere and there\nhoping for rain\nbefore it turns yellow'

poem3 = 'There\nonce\nwas\na\ndragon'

poems = [poem, poem2, poem3]

print(pin_extractor(poems))