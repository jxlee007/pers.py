#  we have 3 classes in this program
#  Email-5, User-1, Inbox - as complex DS

class Email:
#  In email class we have 5 params
    def __init__(
            self, 
            sender:str, 
            receiver:str, 
            subject:str, 
            body:str
        )-> None :
        
        # PIA - unique public instance attr 
        self.sender = sender
        self.receiver = receiver
        self.subject = subject
        self.body = body
        self.read = False

    # 
    def mark_as_read(self):
        self.read = True

    def display_full_email(self):
        self.mark_as_read()
        print('\n--- Email ---')
        print(f'From: {self.sender.name}')
        print(f'To: {self.receiver.name}')
        print(f'Subject: {self.subject}')
        print(f'Body: {self.body}')
        print('------------\n')

    # special dunder method
    def __str__(self):
        status = 'Read' if self.read else 'Unread'
        return f"[{status}] From: {self.sender.name} | Subject: {self.subject}"
        
class User:
# In User class, we have 1 param
# accesed by Email class
    def __init__(self, name):
        
        # user would have a name and inbox
        self.name = name
        # inbox will be able to send and recieve mails
        self.inbox = Inbox()

    # instance method to send email as User    
    def send_email(self, receiver, subject, body):
        email = Email(sender=self, receiver=receiver, subject=subject, body=body)
        receiver.inbox.receive_email(email)


class Inbox:
# In Inbox class
    def __init__(self):
        self.emails = []

    # instance method to recieve email in inbox
    def receive_email(self, email):
        self.emails.append(email)

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
        
