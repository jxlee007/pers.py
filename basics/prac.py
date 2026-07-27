

def main():
    # hello()
    # output()
    # flight_tracker()
    # reply()
    # nef()
    # timer()
    # even()
    # short_str()
    # smart_park()
    # in_tuple()

    pass

def mathops():
    # created self defined functions
    def calc(x):
        #your code goes here
        #using tuple for returning value p&a
        return (x*4,x*x)
        
    side = int(input())
    p, a = calc(side)

    print("Perimeter: " + str(p))
    print("Area: " + str(a))

def in_tuple():
    contacts = [
    ('James', 42),
    ('Amy', 24),
    ('John', 31),
    ('Amanda', 63),
    ('Bob', 18)
    ]

    name = input()

    for x in contacts:
        if name in x:
            print (str(x[0]) +" is "+ str(x[1]))
            break
    else:
        print("Not Found")
    # using tuples in list
    # not my logic
    # need great help


def smart_park():
    # Take the number of available spaces as an input
    spaces = int(input())

    # Display message if spaces are available
    if spaces > 0:
        print("Available spaces")

    # Display a different message if spaces are not available
    else:
        print("Sorry, the parking lot is full")


def short_str():
    x = str(input())
    y = str(input())

    # x = Shortest_string(x,y)
    if len(x) <= len(y):
        return x
    else:
        return y
    
    print(x + " is the shortest string.")


def transverse_str():
    op = "yalgar"

    for ch in op:
        print(ch,sep=" ")

    #transversing str using membership operator
    #usig sep() function


def even(x): 
   if x%2 == 0:           
    print ("Yes")
   else:
    print("No")


def timer():
    # take the number as input
    number = int(input())

    #use a while loop for the countdown
    while number >= 0:
        print (number)
        number = number - 1


def nef():
    data = {
        'Singapore': 1,
        'Ireland': 6,
        'United Kingdom': 7,
        'Germany': 27,
        'Armenia': 34,
        'United States': 17,
        'Canada': 9,
        'Italy': 74
    }

    choice = input()
    print (data.get(choice,"Not found"))
    #using get function
    #using dictionary


def reply():
    # Take the name as input
    name = input()

    # Use concatenation to join 2 strings
    message = "Nice to meet you, "  + name

    # Display the message to the user
    print(message)


def flight_tracker():
    # Storing the flight number
    flight_n = "BA0117"

    # Storing the flight information
    destination = "New York"
    distance = 1580

    print(flight_n)
    print(destination)
    print(distance)


def hello():
    print ("hi")
# while doing i am happy
# to call function for output no print is needed
#-----------------------------------------------------------------------
# here first i declared the function
# then inside paranthesis of function taken a variable
def output(msg):
  print(msg + " fcuk")
output("spam")
#spam fcuk
# arguments can be used as variables inside the function.


# ------------------------
if __name__ == '__main__':
    main()