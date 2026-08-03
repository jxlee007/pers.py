

# module
class Numbers:

    def __init__(self, user_input: int) -> int:
        self.user_input = user_input

# Mutator 1: Return 1 to N val
    def one_to_n(self):
        i = 0
        # preferred odoo - robust and usable over while
        for i in range(1, self.user_input + 1):
            print(i)

# Mutator 2: Return sum of N numbers 
    def sum_of_n(self):
        # need list of int to handle multiple integers
        n_numbers = [ i+1 for i in range(self.user_input) ] 
        i = 0

        for i in n_numbers:
            i += i

        return i
    





# logic
def main():
    py_1()
    pass


def py_2(): # Sum of N numbers 


    pass


def py_1():  # Print num 1 to N 

    

    user_input = int(input("Enter number: "))

    num_obj = Numbers(user_input) # instansiate obj

    num_obj.one_to_n() 

    # i = 0
    # # for loop - preferred odoo - robust & reusable
    # for i in range(1, user_input):
    #     print(i)

    """
        while i < user_input:
            i += 1
            print(i)

            # return i
    -> my return approach doest work bcoz 
    whenever a program 1st encounters return - even in loop
    it ends and exit the fnc - not giving chance to loop to rerun
    """    


# ------------------------
if __name__ == "__main__":
    main()