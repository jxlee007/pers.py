import re #regex = regular expression

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



