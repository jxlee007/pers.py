import datetime


# The Data and State Layer - odoo arch
# Classes that hold fields/attributes and business methods 


# 1. initialize the classes with needed params
# 2. define methods/fncs with needed params
    # classify them as mutators(setters), accessors(getters) or helper
    # define obj relations


# class = blueprint -> complex ds 
# params/nouns/datafields

class dog:

    # class attr - shared 
    alias = 'pet'

    # fncs decide how class(complex-ds) behaves
    # instance attr can be created only in this fnc
    def __init__( #dunder method
        self, 
        name:str, 
        breed:str,
        age:int
    ) -> None:
        
        # var were data would be saved -> var = attr
        # this are known as instance attr -> unique 
        # Double underscores make attributes truly private ensuring STRICT ENCAPSULATION
        self.__name = name
        self.__breed = breed
        self.__age = age
    
    # as name not accessed outside of class
    # we use getter method to safely read the name
    def get_name(self)->str:
        return self.__name
    
    # setter method with validation
    
    
    def get_breed(self)->str:
        return self.__breed
    

    # fncs = instance methods
    # all saved instance attr can be accessed using self param 
    def bark(self)->str:
        return f"{self.__name} says Woof!"
    
    # always return with var not direct str
    def eat(self, food:str)->str:
        return f"{self.__name} is eating his fav {food} food"
    
    # dunder methods - special ones
    def __str__(self)->str:
        info = f"Im {self.__name} of {self.__breed} at {self.__age}"
        return info
    
    # if we use a fnc without self -> act as class attr
    # without self - instance methods use decorators


# login - brilliant 
class login(): # data record 

    def __init__(self, 
                username:str, 
                password: str
                ) -> None:
        
        self.username=username
        self.password=password
        self.locked = False




# FCC task de-construct email simulator
class Email: 

    def __init__(
        self,
        sender:str,
        receiver:str,
        subject:str,
        body:str
    )-> None:

        # PIA - unique public instance attr
        self.sender=sender
        self.receiver=receiver
        self.subject=subject
        self.body=body

        self.read=False
        self.timestamp=datetime.datetime.now()


    # MUTATOR 1
    def mark_as_read(self): #SETTER
        self.read = True


    # ACCESSOR 2 & HELPER 1
    def display_full_email(self):
        self.mark_as_read()

        formatted_time = self.timestamp.strftime('%Y-%m-%d %H:%M')

# Build the entire str into single var
        email_view = (
            f"\n--- Email ---\n"
            f"From: {self.name}\n"
            f"To: {self.receiver}\n"
            f"Subject: {self.subject}\n"
            f"Received: {formatted_time}\n"
            f"Body: {self.body}\n"
            f"------------\n"
        )
        return email_view

    """ print not allowed in models    
            print('\n--- Email ---')
            print(f'From: {self.sender.name}')
            print(f'To: {self.receiver.name}')
            print(f'Subject: {self.subject}')
            print(f"Received: {self.timestamp.strftime('%Y-%m-%d %H:%M')}")        
            print(f'Body: {self.body}')
            print('------------\n')
    """


    # MUTATOR 5
    def __str__(self):
        status = 'Read' if self.read else 'Unread'

        time = self.timestamp.strftime('%Y-%m-%d %H:%M')
        return f"[{status}] From: {self.sender.name} | Subject: {self.subject} | Time: {time}"



class User: 


    def __init__(self, 
        name:str
    ) -> None:

        self.name=name
        self.inbox = Inbox()
# user has-an inbox = composition(strong ownership)

    # MUTATOR 2
    def send_email(self, receiver, subject, body):

        email = Email(sender=self, receiver=receiver, subject=subject, body=body )

        receiver.inbox.receive_email(email)

        return f"Email sent from {email.sender.name} to {email.receiver.name}!\n"

    # HELPER 2
    def check_inbox(self):
        header = f"\n{self.name}'s Inbox:"
        inbox_content = self.inbox.list_emails()

        return f'{header}\n{inbox_content}'

    # HELPER 3
    def read_email(self, index):
        self.inbox.read_email(index)

    # HELPER 4
    def delete_email(self, index):
        self.inbox.delete_email(index)



class Inbox: 


    def __init__(self) -> None:
        self.emails=[]

    # MUTATOR 2
    def receive_email(self, email):
        self.emails.append(email)


    # ACCESSOR 1
    def list_emails(self):
        # validation - for empty inbox state
        if not self.emails:
            return f'Your inbox is empty.\n'
        output_lines = ['\nYour Emails:']

        #  using for loop to 
        for i, email in enumerate(self.emails, start=1):
            # print(f'{i}. {email}')
            output_lines.append(f"{i}. {email}")

        # 4. Join all the structural lines together with a newline character (\n)
        return "\n".join(output_lines) + "\n"


    # MUTATOR 3 + HELPER
    def read_email(self, index):
        if not self.emails:
            return 'Inbox is empty.\n'
        actual_index = index - 1

        # clean way of doing things
        if 0 < actual_index >= len(self.emails): 
            return 'Invalid email number.\n'
            
        # to access actual email i need index and related val from emails list
        self.emails[actual_index].display_full_email()


    # MUTATOR 4
    def delete_email(self, index):
        if not self.emails:
            return 'Inbox is empty.\n'
        actual_index = index - 1

        if actual_index < 0 or actual_index >= len(self.emails):
            print('Invalid email number.\n')
            return

        del self.emails[actual_index]
        return f"Email deleted at {index} .\n "



    pass