# Variables given
a , b = 5, 3

# Evaluates the comparison directly and assigns the boolean
result = a > b

# Uses the 'not' operator to invert the boolean directly
inverse_result = not result

msg='welcome to Python 101: Strings'

msg = f"{msg[18]} {msg[:7]} {msg[25:29]}{msg[7:10]}{msg[7:9] + msg[12:13] + msg[2:8:4]+ msg[25:26]}"
print(msg.title())
print(msg[::-1].title())