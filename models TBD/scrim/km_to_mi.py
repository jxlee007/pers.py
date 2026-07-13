# - Create a distance converter converting Km to miles
# - Take two inputs from user: Their first name and the distance in km
# - Print: Greet user by name and show km, and mile values
# - 1 mile is 1.609 kilometers
# - hint: use correct types for calculating and print
# - Did you capitalize the name


name = input("Enter your first name: ")
kilometers = float(input("Enter the distance in kms: "))

    # str.title() - first letter of every word - edge-case handling
    # str.capitalize() - only frist letter of str 
    # not putting parantheses results to bound method err 
    # 2f is for decimal places - also rounds the figure
    # improv - never use comments in print as fstr treat them as text
print(f"""
    Hello {name.title()} ! 
    {kilometers} kms = {(kilometers/1.609):.1f} miles
    """)