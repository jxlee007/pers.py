def number_pattern(n):
    if not type(n) == int:
        return "Argument must be an integer value."
    elif n < 1:
        return "Argument must be an integer greater than 0."
    else:
        # before using variable in loop its imp to declare it 
        result = ""
        # my logic same - differ approach without join - filing due to TC
        for i in range (1, n+1) :
            result += str(i) + " "
        return result

        # test-case success scenario 
        # last_line = ' '.join(str(j) for j in range(1, n + 1))
    # return last_line

print(number_pattern(12))