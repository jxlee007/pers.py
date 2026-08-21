# Fleet Flight Record - odoo project

"""
1. Imports go at the very top
2. Classes are defined at the module level
3. Main function ONLY handles execution logic
"""


# plan class
"""
Your constructor (__init__) must initialize and store the following hardcoded "fields" (attributes) to simulate an Odoo database record load:
    A worker registry field populated with your list of contact tuples.
    A country zone mapping field populated with the shipping country dictionary.
    Fixed tracking fields for a mock flight: number, destination, and distance.


Core Business Logic Methods
    compute_flight_profile(): 
        Read the internal flight data fields and log each value sequentially. 
        This mimics an Odoo compute function displaying a record's data.
        
    action_greet_partner(partner_name): 
        Accept a dynamic string input, concatenate it into a professional welcoming notification message, and print it out.
    
    check_country_zone(country_name): 
        Simulate an Odoo relational search. 
        Safely query the internal country data dictionary. Return its value if present, or output a fallback "Not found" string if the record does not exist.
        
    execute_batch_countdown(starting_count): 
        Run an automated batch execution sequence using a loop that prints the tracking number on each pass, decrementing down to zero.
        
    validate_parity_code(record_id): 
        Process an ID number check. Print "Yes" if the integer is perfectly even, and "No" if it is odd.
    
    compare_log_lengths(string_one, string_two):
        Compare two incoming text values and return the shorter string back to the system.
        
    verify_parking_availability(available_spaces): 
        Accept a live capacity input. 
        Return a success confirmation message 
        if spaces exist, or a clear capacity full fallback notice if spaces are empty or negative.
        
    search_partner_registry(target_name): 
        Iterate through your internal list of tuples. 
        If a dynamic name match is found within any tuple, print the custom formatted details and break early. 
        
        If the loop completes fully without a match, utilize a clean for-else fallback structure to print "Not Found".
    
    append_debug_suffix(raw_log): 
        Accept a log message string and print it with your custom hardcoded diagnostic alphanumeric termination string appended directly to the end.

    serialize_string_chars(input_text): 
        Take a text string, traverse its characters using a membership loop, and print each individual character separated by spaces.

    compute_dimension_metrics(dimension_side): 
        Create a localized mathematical method that calculates a 4x perimeter product and a squared area product, packaging and returning both distinct values simultaneously inside a single tuple.
"""

class fleet_flight_record():

    def __init__(self) -> None:

        # worker_registry
            contacts = [
            ('James', 42),
            ('Amy', 24),
            ('John', 31),
            ('Amanda', 63),
            ('Bob', 18)
            ]
        
        

        pass






def main():


    pass







# ------------------------
if __name__ == '__main__':
    main()

"""

def in_tuple():


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

def output(msg):
  print(msg + " fcuk")
    #   spam fcuk
    # arguments can be used as variables inside the function.

def transverse_str():
    op = "yalgar"

    for ch in op:
        print(ch,sep=" ")

    #transversing str using membership operator
    #usig sep() function

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


"""