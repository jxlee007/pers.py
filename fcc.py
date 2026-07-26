#  FREE CODE CAMP 
import re #regex = regular expression

def main():
# py basics
    # report_card()           
    # emp_profile_generator()
    # bill_splitter()  
    # mov_book_calc()
    # travel_weather()
    # apply_discount()
    # caesar_cipher()
    # rpg_char()

# loop sequences
    # pin_extractor
    # print(number_pattern(12))

# Dict & sets
    # med_data_valid()
    # user_config_manager()

# OOPS
    # 


    pass


def user_config_manager():
    # CRUD - add,update, delete,view
    # for office - can be adapted for employees
    # employees can be the user
    # employee-user suggested new setting - or clean 

    def add_setting(settings, setting_tuple):

        key = setting_tuple[0].lower()
        value = setting_tuple[1].lower()
        
        if key in settings:
            return f"Setting '{key}' already exists! Cannot add a new setting with this name."
        settings[key] = value
        return f"Setting '{key}' added with value '{value}' successfully!"

    def update_setting(settings, setting_tuple):
        key = setting_tuple[0].lower()
        value = setting_tuple[1].lower()
        if key in settings:
            settings[key] = value
            return f"Setting '{key}' updated to '{value}' successfully!"
        return f"Setting '{key}' does not exist! Cannot update a non-existing setting."

    def delete_setting(settings, key):
        lowered_key = key.lower()
        if lowered_key in settings:
            del settings[lowered_key]
            return f"Setting '{lowered_key}' deleted successfully!"
        return "Setting not found!"

    def view_settings(settings):
        if not settings:
            return "No settings available."
        output = "Current User Settings:\n"
        for key, value in settings.items():
            output += f"{key.capitalize()}: {value}\n"
        return output

    # Requirement: Create test_settings dictionary with values
    test_settings = {
        "theme": "dark",
        "notifications": "enabled",
        "volume": "high"
    }


def med_data_valid():
    
    medical_records = [
        {
            'patient_id': 'P1001',
            'age': 34,
            'gender': 'Female',
            'diagnosis': 'Hypertension',
            'medications': ['Lisinopril'],
            'last_visit_id': 'V2301',
        },
        {
            'patient_id': 'p1002',
            'age': 47,
            'gender': 'male',
            'diagnosis': 'Type 2 Diabetes',
            'medications': ['Metformin', 'Insulin'],
            'last_visit_id': 'v2302',
        },
        {
            'patient_id': 'P1003',
            'age': 29,
            'gender': 'female',
            'diagnosis': 'Asthma',
            'medications': ['Albuterol'],
            'last_visit_id': 'v2303',
        },
        {
            'patient_id': 'p1004',
            'age': 56,
            'gender': 'Male',
            'diagnosis': 'Chronic Back Pain',
            'medications': ['Ibuprofen', 'Physical Therapy'],
            'last_visit_id': 'V2304',
        }
    ]


    # FNC-2
    def find_invalid_records(patient_id, age, gender, diagnosis, medications, last_visit_id) :

        constraints = {

            'patient_id': isinstance(patient_id, str) and re.fullmatch('p/d+', patient_id, re.IGNORECASE),
            # /d = special-sequence = decimal digits
            # append a + quantifier to your regex pattern to match one or more digits.
            # re.search('p/d+', patient_id, re.IGNORECASE)

            'age': isinstance(age, int) and age >= 18 ,

            'gender': isinstance(gender, str)  and  gender.lower() in ('male','female'),
            # gender == ('male','female') = wrong approach

            'diagnosis': isinstance(diagnosis, str) or diagnosis is None,

            # Practical use of list comprehension
            # TC approach = [isinstance(i, str) for i in medications]
            'medications': isinstance(medications, list) and all([isinstance(i , str) for i in medications]),
            # and for i in medications isinstance(i,str) ,  wrong approach
            # using all - when all are truthy = true either False

            'last_visit_id': isinstance(last_visit_id, str) and re.fullmatch("v\d+", last_visit_id , re.IGNORECASE)

        }

        # return if key , values in constraints.items() - wrong approach
        # not able to understand or solve below given problem . 
        # Now that your constraints dictionary is complete, 
        # you'll change the return statement of find_invalid_records 
        # to make it return a list of the invalid keys.
        # Using the list comprehension syntax, 
        # return a list that evaluates key for each key, value in constraints.items().
        return [key for key, value in constraints.items() if not value]
        # List comprehensions also accepts if clauses to filter out items from an iterable:
        # Since you want to return a list containing only invalid keys, 
        # add an if clause to your comprehension so that 
        # each key is added to the list only when value is falsy. 


    # FNC-1
    def validate(data) :
        # is_sequence = isinstance (data , list or tuple) = wrong syntax
        is_sequence = isinstance (data , (list, tuple))

        if not is_sequence:
            print("Invalid format: expected a list or tuple.")
            return False
            
        is_invalid = False # flag variable
        key_set = set(['patient_id', 'age', 'gender', 'diagnosis', 'medications', 'last_visit_id'])


        for index, dictionary in enumerate(data):
            if not isinstance (dictionary, dict):
                print(f"Invalid format: expected a dictionary at position {index}.")
                is_invalid = True
                continue # to handle Attributerr / Type err 

            # if data.keys() != key_set:
            if set(dictionary.keys()) != key_set:
                print(f"Invalid format: {dictionary} at position {index} has missing and/or invalid keys.")
                is_invalid = True
                continue

            # FNC-2
            invalid_records = find_invalid_records(**dictionary)
            
            # still dont understand logic
            for key in invalid_records:
                val = dictionary[key]
                print(f"Unexpected format '{key}: {val}' at position {index}.")
                is_invalid = True


        # if is_invalid == True : my approach
        if is_invalid:
            return False 

        print("Valid format.")
        return True


    # validate(medical_records)
    # print(find_invalid_records(**medical_records[0]))


    # 2. test the second conditional statement, add two items of your choice that are not dictionaries at the end of the medical_records list. 
    # You should see two validation messages printed to the terminal.

    # To test that everything is working correctly, 
    # try to comment out the age key from the first dictionary in medical_records.


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


def pin():
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


def rpg_char():
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


def caesar_cipher():
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


def apply_discount(price=100, discount=2.5):
    # 1. Check if price is a number (int or float)
    # isinstance is use to check datatype
    # tuple() is use to check both at once 
    if not isinstance(price, (int, float)):
        return "The price should be a number"
    
    # 2. Check if discount is a number (int or float)
    if not isinstance(discount, (int, float)):
        return "The discount should be a number"
    
    # 3. Check if price is greater than 0
    if price <= 0:
        return "The price should be greater than 0"
    
    # 4. Check if discount is between 0 and 100
    if discount < 0 or discount > 100:
        return "The discount should be between 0 and 100"
    
    # 5. Calculate the final price
    # Logic: price - (price * (discount / 100))
    final_price = price * (1 - (discount / 100))
    
    return final_price


def travel_weather():
    distance_mi = 5
    is_raining = True
    has_bike = False
    has_car = True
    has_ride_share_app = False 

    if not distance_mi:
        print(False)
    elif distance_mi <= 1:
        if not is_raining:
            print(True)
        else:
            print(False)
    elif distance_mi <= 6:
        if has_bike and not is_raining:
            print(True)
        else:
            print(False)
    else: # distance_mi > 6
        if has_car or has_ride_share_app:
            print(True)
        else:
            print(False)


def mov_book_calc(): # bool and conditionals
    base_price, age = 15, 21
    seat_type = 'Gold'
    show_time = 'Evening'

    if age > 17:
        print('User is eligible to book a ticket')
    elif age >= 21:
        print('User is eligible for Evening shows')
    else:
        print('User is not eligible for Evening shows')

    is_member = False
    is_weekend = False

    discount = 0
    if is_member and age >= 21:
        discount = 3
        print('User qualifies for membership discount')
    else:
        print('User does not qualify for membership discount')
    print('Discount:', discount)

    extra_charges = 0
    if is_weekend or show_time == 'Evening':
        extra_charges = 2
        print('Extra charges will be applied')
    else:
        print('No extra charges will be applied')
    print('Extra charges:', extra_charges)

    if age >= 21 or age >= 18 and (show_time != 'Evening' or is_member):
        print('Ticket booking condition satisfied')

        service_charges = 0
        if seat_type == 'Premium':
            service_charges = 5
        elif seat_type == 'Gold':
            service_charges = 3
        else:
            service_charges = 1
        print('Service charges:', service_charges)
        final_price = base_price + extra_charges + service_charges - discount
        print("Final price of ticket:", final_price)
        
    else:
        print('Ticket booking failed due to restrictions')


def bill_splitter(): # numops
    running_total = 0
    num_of_friends = 4

    appetizers = 37.89
    main_courses = 57.34
    desserts = 39.39
    drinks = 64.21

    running_total += appetizers + main_courses + desserts + drinks
    print('Total bill so far:', running_total)

    tip = running_total * 0.25
    print('Tip amount:', tip)

    running_total += tip
    print('Total with tip:', running_total)

    final_bill = running_total / num_of_friends
    print('Bill per person:', final_bill)

    print(f"Each person pays: {round(final_bill, 2)} ")


def emp_profile_generator(): # strings 
    first_name = 'John'
    last_name = 'Doe'
    full_name = first_name + ' ' + last_name
    address = '123 Main Street'
    address += ', Apartment 4B'
    employee_age = 28
    employee_info = full_name + ' is ' + str(employee_age) + ' years old'
    print(employee_info)

    # str concatenation
    experience_years = 5
    experience_info = 'Experience: ' + str(experience_years) + ' years'
    print(experience_info)

    # f-string
    position = 'Data Analyst'
    salary = 75000
    employee_card = f'Employee: {full_name} | Age: {employee_age} | Position: {position} | Salary: ${salary}'
    print(employee_card)

    # str slicing
    employee_code = 'DEV-2026-JD-001'

    department = employee_code[:3]
    print(department)

    year_code = employee_code[4:8]
    print(year_code)

    initials = employee_code[9:11]
    print(initials)

    id = employee_code[-3:]
    print(id)


def report_card():
    name = "bob"
    print("name: {name}")

    is_student = true 
    print("is_student: {is_student}")

    score = 90
    print("score: {score}")

    age = 20
    print("age: {age}")
    print(isinstance(age, int)) 


# --------------------
if __name__ == '__main__':
    main()


# my code - logic understainding was wrong

 
# def   apply_discount (price,discount) :
    
#    
#     if not isinstance(price, (int,float)):
#         # on T this will run
#         print ("The price should be a number.")
#     elif not isinstance(discount , (int,float)) :
#         print ("The discount should be a number.")
#     elif price <= 0 :
#         print ("The price should be greater than 0")
#     elif discount <= 0 or discount > 100 :
#         print("The discount should be between 0 and 100")
#     else :
#         print (price - discount)
# apply_discount (22,10) 


"""
### Comparison & Troubleshooting

The main difference is that your new code uses `print` and `elif`, while the "passed" version uses `return` and `if`. In a coding lab or test, these differences are why a solution might "Fail."

#### Specific Problems with Original Code:

1. **print vs. return** (The biggest issue)
   - Instructions say the function should **return** a value.
   - `print` just shows text on the screen for a human.
   - `return` gives the answer back to the test script so it can use it.
   - **Result:** The test sees `None` coming from your function and marks it as **Failed**.

2. **The Math Logic**
   - **Your Code:** `price - discount`
   - **Scenario:** If price is 100 and discount is 20, it gives 80 (looks right for one case).
   - **The Problem:** The lab says the discount is a **percentage**.
   - **Example:** If price is 50 and discount is 20%, the answer should be 40.
   - **Your math:** 50 - 20 = 30 (Wrong).
   - **Correct Math:** `price * (1 - discount / 100)`

3. **Logic for "Zero"**
   - **Your Code:** `elif discount <= 0`
   - **Lab Rule:** "If discount is less than 0..."
   - **The Conflict:** The lab says a discount of 0 is allowed. Your code treats 0 as an error.
   - **Note:** It should only be an error if it's negative (`< 0`).

4. **if vs elif**
   - While `elif` works, using `if` with `return` is often cleaner for "Guard Clauses." Once a return happens, the function stops immediately.

#### Summary Table:

| Feature          | Your Current Code  | What the Lab Needs          |
|------------------|-------------------|----------------------------|
| Output           | `print()`         | `return`                   |
| Math             | `price - discount` | `price * (1 - discount/100)`|
| Zero Discount    | Error             | Allowed                    |
"""