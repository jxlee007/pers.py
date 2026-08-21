import datetime

#  we have 3 classes in this program
#  Email-5, User-1, Inbox - as complex DS

# Email
class Email:
#  In email class we have 5 params
    def __init__(
            self, 
            sender:str, 
            receiver:str, 
            subject:str, 
            body:str
        )-> None :
        
# Holds information like sender, receiver, subject, body
        # PIA - unique public instance attr 
        self.sender = sender
        self.receiver = receiver
        self.subject = subject
        self.body = body

        self.read = False
        self.timestamp = datetime.datetime.now()


    
    def mark_as_read(self):
        self.read = True
 
# Represents one email message
    def display_full_email(self):
        self.mark_as_read()
        print('\n--- Email ---')
        print(f'From: {self.sender.name}')
        print(f'To: {self.receiver.name}')
        print(f'Subject: {self.subject}')
        print(f"Received: {self.timestamp.strftime('%Y-%m-%d %H:%M')}")        
        print(f'Body: {self.body}')
        print('------------\n')

    # special dunder method - for convert email into readable str 
    def __str__(self):
        status = 'Read' if self.read else 'Unread'

        time = self.timestamp.strftime('%Y-%m-%d %H:%M')
        return f"[{status}] From: {self.sender.name} | Subject: {self.subject} | Time: {time}"


# User - Represents a person
class User:
# In User class, we have 1 param
# accesed by Email class - User has a Inbox
    def __init__(self, name):
        
# Has a name and an inbox
        self.name = name
        self.inbox = Inbox()

        # inbox will be able to send and recieve mails
        # obj relation - composition - Has a
 
    # instance method to send email as User    
    def send_email(self, receiver, subject, body):
        email = Email(sender=self, receiver=receiver, subject=subject, body=body)
        receiver.inbox.receive_email(email)
        # print(f'Email sent from {self.name} to {receiver.name}!\n')      
        # Fixed Version of your comment:
        print(f"Email sent from {email.sender.name} to {email.receiver.name}!\n")  

    #  make to learn how to borrow another classses methods
    def check_inbox(self):
        print(f"\n{self.name}'s Inbox:")
        self.inbox.list_emails()

    def read_email(self, index):
        self.inbox.read_email(index)

    def delete_email(self, index):
        self.inbox.delete_email(index)


# Inbox
class Inbox:
# In Inbox class
    def __init__(self):
# Holds the list of emails
        self.emails = []

    # instance method to recieve email in inbox
    def receive_email(self, email):
        self.emails.append(email)

# Represents a collection of emails
    # instance method to store recieved emails in inbox
    def list_emails(self):
        # validation - for empty inbox
        if not self.emails:
            print('Your inbox is empty.\n')
            return
        print('\nYour Emails:')
        #  using for loop to 
        for i, email in enumerate(self.emails, start=1):
            print(f'{i}. {email}')

    # instance method to unread and remove emails from inbox
    def read_email(self, index):
        if not self.emails:
            print('Inbox is empty.\n')
            return
        actual_index = index - 1

        # if actual_index < 0 or actual_index >= len(self.emails):
        if 0 < actual_index >= len(self.emails): # clean way of doing things
            print('Invalid email number.\n')
            return
        # to access actual email i need index and related val from emails list
        self.emails[actual_index].display_full_email()

    # same as read but for delete
    def delete_email(self, index):
        if not self.emails:
            print('Inbox is empty.\n')
            return
        actual_index = index - 1
        if actual_index < 0 or actual_index >= len(self.emails):
            print('Invalid email number.\n')
            return
        del self.emails[actual_index]
        print(f"Email deleted at {index} .\n ")
        




def main():

    alice = User("Alice")
    bob = User("Bob")

    alice.send_email(bob, "Hello", "Hi Bob, how are you?")

    alice.send_email(bob, "Hello 2", "Hi Bob, how are you?")
    alice.send_email(bob, "Hello 3", "Hi Bob, how are you?")
    alice.send_email(bob, "Hello 4", "Hi Bob, how are you?")
    alice.send_email(bob, "Hello 5", "Hi Bob, how are you?")

    # print(my_email_4.display_full_email())
    # print(len(bob.inbox.emails))
    # print(bob.inbox.delete_email(3))
    # print(bob.inbox.read_email(3))
    # bob.check_inbox()


    current_time = datetime.datetime.now()
    # print(current_time.strftime("%H:%M:%S"))

    tory = User("Tory")
    ramy = User("Ramy")

    ramy.send_email(tory, "Hello Tory", "just saying hello!")
    tory.send_email(ramy, "Re: Hello", "Hi Ramy, hope you are fine.")

    ramy.check_inbox()
    ramy.read_email(1)
    ramy.delete_email(1)
    ramy.check_inbox()



if __name__ == "__main__":
    main()