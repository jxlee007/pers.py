# **WEEK 1 DAY 1 STARTER PACK**
## **Tuesday, Sept 30, 2026 - START NOW**

---

## **YOUR SCHEDULE TODAY (8 hours)**

```
TIME BREAKDOWN FOR TODAY:

0:00-1:00   Setup + understand
0:00-2:00   Code PROBLEM 1.1 (User dataclass)
2:00-3:00   Code PROBLEM 1.2 (Email dataclass)
3:00-4:00   BREAK
4:00-6:00   Code PROBLEM 1.3 (First tests + dispatcher stub)
6:00-7:00   Test everything, fix bugs
7:00-8:00   Answer communication checkpoints + REFLECT
```

---

## **STEP 1: CREATE FILES NOW**

Navigate to `1_email_simulator/` and create these files:

```bash
cd 1_email_simulator

# Models layer
echo. > models/user.py
echo. > models/email.py

# Services layer
echo. > services/email_service.py

# CLI layer
echo. > cli/dispatcher.py

# Tests layer
echo. > tests/test_models.py
echo. > tests/test_services.py

# Root level
echo. > requirements.txt
```

---

## **STEP 2: STARTER CODE TEMPLATES**

Copy these into your files EXACTLY:

### **File 1: `models/__init__.py`**
```python
# models/__init__.py
from .user import User
from .email import Email

__all__ = ["User", "Email"]
```

### **File 2: `models/user.py`**
```python
# models/user.py
from dataclasses import dataclass, field
from typing import List

@dataclass
class User:
    """Represents an email user in the system."""
    name: str
    email_address: str
    inbox: List = field(default_factory=list)
    
    def __post_init__(self):
        """Validate email address on creation."""
        if "@" not in self.email_address:
            raise ValueError(f"Invalid email: {self.email_address}")
    
    def __repr__(self):
        return f"User({self.name}, {self.email_address}, {len(self.inbox)} emails)"


# PROBLEM 1.1: YOUR TASK
# ✅ The User dataclass is above (DONE as example)
# ✅ You need to understand it:
#    - What does @dataclass do?
#    - What's field(default_factory=list)?
#    - Why __post_init__ validation?
#    - How does __repr__ work?
#
# ✅ After you understand, move to PROBLEM 1.2
```

### **File 3: `models/email.py`**
```python
# models/email.py
from dataclasses import dataclass
from datetime import datetime
from typing import Optional
import uuid

@dataclass
class Email:
    """Represents an email message."""
    sender: str                                    # Who sent it
    subject: str                                   # Email subject
    body: str                                      # Email content
    recipient: str                                 # Who received it
    timestamp: datetime = None                     # When sent
    email_id: str = None                          # Unique ID
    
    def __post_init__(self):
        """Initialize timestamp and email_id if not provided."""
        if self.timestamp is None:
            self.timestamp = datetime.now()
        if self.email_id is None:
            self.email_id = str(uuid.uuid4())[:8]  # Short ID
    
    def __repr__(self):
        return f"Email(from={self.sender}, to={self.recipient}, subject='{self.subject}')"
    
    def is_valid(self) -> bool:
        """Check if email has required fields."""
        return bool(self.sender and self.subject and self.body and self.recipient)


# PROBLEM 1.2: YOUR TASK
# ❌ The Email dataclass above has bugs intentionally
#
# YOUR JOBS:
# 1. Find the issues:
#    - Line 8: Default value for timestamp should NOT be None (use field())
#    - Line 9: Same issue for email_id
#    - Missing: Validate sender/recipient are valid emails
#
# 2. Fix them:
#    - Import field from dataclasses
#    - Use field(default_factory=...) pattern
#    - Add validation in __post_init__
#
# 3. Test it:
#    - Create 3 Email objects (see test file)
#    - Verify they work correctly
#
# 4. Communication checkpoint after you fix:
#    - "Why did you need field(default_factory)?"
#    - "What happens if you pass invalid sender?"
```

### **File 4: `services/__init__.py`**
```python
# services/__init__.py
from .email_service import send_email, check_inbox, read_email

__all__ = ["send_email", "check_inbox", "read_email"]
```

### **File 5: `services/email_service.py`**
```python
# services/email_service.py
"""
Pure functions for email operations.
These functions have NO side effects - they only compute.
"""

from models import User, Email
from typing import List, Optional


def send_email(sender: User, recipient: User, subject: str, body: str) -> Email:
    """
    Send an email from one user to another.
    
    Args:
        sender: User object of sender
        recipient: User object of recipient
        subject: Email subject line
        body: Email body content
    
    Returns:
        Email object that was created
    
    Raises:
        ValueError: If sender or recipient is None
        TypeError: If inputs are wrong type
    """
    # PROBLEM 1.3A: YOUR TASK
    # ❌ This function is a stub
    # Your job:
    # 1. Validate inputs (check they're User objects)
    # 2. Create Email object with sender.email_address, recipient.email_address
    # 3. Add email to recipient.inbox
    # 4. Return the created email
    #
    # Example:
    #   email = Email(
    #       sender=sender.email_address,
    #       recipient=recipient.email_address,
    #       subject=subject,
    #       body=body
    #   )
    #   recipient.inbox.append(email)
    #   return email
    pass


def check_inbox(user: User) -> List[Email]:
    """
    Get all emails in a user's inbox.
    
    Args:
        user: User object
    
    Returns:
        List of Email objects in inbox
    
    Raises:
        ValueError: If user is None
    """
    # PROBLEM 1.3B: YOUR TASK
    # ❌ This is a stub
    # Your job:
    # 1. Validate user is not None
    # 2. Return user.inbox (which is a list of Email objects)
    # 3. Handle edge case: empty inbox
    #
    # Hint: This should be ~3 lines
    pass


def read_email(user: User, email_id: str) -> Optional[Email]:
    """
    Read a specific email from user's inbox.
    
    Args:
        user: User object
        email_id: ID of email to read
    
    Returns:
        Email object if found, None if not found
    
    Raises:
        ValueError: If user is None or email_id is empty
    """
    # PROBLEM 1.3C: YOUR TASK
    # ❌ This is a stub
    # Your job:
    # 1. Validate user and email_id
    # 2. Search user.inbox for email with matching email_id
    # 3. Return email if found, None if not found
    #
    # Hint: Use a for loop or list comprehension
    # Example approach:
    #   for email in user.inbox:
    #       if email.email_id == email_id:
    #           return email
    #   return None
    pass
```

### **File 6: `cli/__init__.py`**
```python
# cli/__init__.py
from .dispatcher import MenuSystem

__all__ = ["MenuSystem"]
```

### **File 7: `cli/dispatcher.py`**
```python
# cli/dispatcher.py
"""
Menu dispatcher using dict-based routing instead of nested if/elif.
"""

from typing import Callable, Dict, List
from dataclasses import dataclass


@dataclass
class MenuItem:
    """Represents a single menu option."""
    key: str                    # "1", "2", etc
    label: str                  # "Send Email", "Check Inbox"
    handler: Callable           # Function to call


class MenuSystem:
    """
    Dispatch menu items to handlers based on user input.
    
    Example:
        menu = MenuSystem("Main Menu", [
            MenuItem("1", "Send Email", send_email_handler),
            MenuItem("2", "Check Inbox", check_inbox_handler),
            MenuItem("exit", "Exit", None),
        ])
        menu.run()
    """
    
    def __init__(self, title: str, items: List[MenuItem]):
        """
        Initialize menu system.
        
        Args:
            title: Title of menu
            items: List of MenuItem objects
        """
        self.title = title
        self.items = items
        # Create dispatch dict: key → handler
        self.dispatch = {item.key: item.handler for item in items}
    
    def display(self):
        """Print menu options to console."""
        print(f"\n{'='*50}")
        print(f"  {self.title}")
        print(f"{'='*50}")
        for item in self.items:
            print(f"  {item.key}. {item.label}")
        print(f"{'='*50}\n")
    
    def run(self):
        """
        Run the menu loop.
        Repeatedly:
        1. Display menu
        2. Get user input
        3. Execute handler
        4. Repeat until 'exit'
        """
        while True:
            self.display()
            choice = input("Select option (or 'exit' to quit): ").strip()
            
            if choice == "exit":
                print("Goodbye!")
                break
            
            handler = self.dispatch.get(choice)
            if handler:
                handler()
            else:
                print("❌ Invalid choice. Try again.")


# PROBLEM 1.4: UNDERSTAND THIS
# ❌ The MenuSystem class is complete (don't modify)
# Your job: UNDERSTAND why this is better than if/elif
#
# Compare:
# BAD (if/elif):
#   if choice == "1":
#       send_email_handler()
#   elif choice == "2":
#       check_inbox_handler()
#   elif choice == "3":
#       read_email_handler()
#   # Now add feature 4? Add elif! Scale to 20? 20 elif blocks!
#
# GOOD (dispatcher):
#   dispatch = {"1": send_email_handler, "2": check_inbox_handler, ...}
#   dispatch[choice]()
#   # Add feature 4? Add 1 line to items list. Scale to 20? Still just add to list!
#
# After you understand, move to TESTS
```

### **File 8: `tests/test_models.py`**
```python
# tests/test_models.py
"""
Unit tests for models (User and Email dataclasses).
"""

import pytest
from datetime import datetime
from models import User, Email


class TestUser:
    """Tests for User dataclass."""
    
    def test_user_creation(self):
        """Test creating a valid user."""
        # PROBLEM 1.5A: Write this test
        # Create a user: name="Alice", email="alice@example.com"
        # Assert: user.name == "Alice"
        # Assert: user.email_address == "alice@example.com"
        # Assert: user.inbox == [] (empty list)
        
        # Template:
        # user = User(name="Alice", email_address="alice@example.com")
        # assert user.name == "Alice"
        # assert user.email_address == "alice@example.com"
        # assert user.inbox == []
        pass
    
    def test_user_invalid_email(self):
        """Test that user creation fails with invalid email."""
        # PROBLEM 1.5B: Write this test
        # Try to create user with email="alice_no_at_sign"
        # Assert: ValueError is raised
        #
        # Template:
        # with pytest.raises(ValueError):
        #     User(name="Alice", email_address="alice_no_at_sign")
        pass
    
    def test_user_repr(self):
        """Test string representation of user."""
        # PROBLEM 1.5C: Write this test
        # Create user, convert to string
        # Assert string contains "Alice" and email
        pass


class TestEmail:
    """Tests for Email dataclass."""
    
    def test_email_creation(self):
        """Test creating a valid email."""
        # PROBLEM 1.6A: Write this test
        # Create email with:
        #   sender="alice@example.com"
        #   recipient="bob@example.com"
        #   subject="Hello"
        #   body="This is a test"
        #
        # Assert: email.sender == "alice@example.com"
        # Assert: email.timestamp is not None (auto-filled)
        # Assert: email.email_id is not None (auto-filled)
        pass
    
    def test_email_timestamp_auto(self):
        """Test that timestamp is auto-filled."""
        # PROBLEM 1.6B: Write this test
        # Create email without providing timestamp
        # Assert: timestamp was auto-filled with datetime.now()
        pass
    
    def test_email_is_valid(self):
        """Test email validation."""
        # PROBLEM 1.6C: Write this test
        # Create valid email, call is_valid()
        # Assert: is_valid() returns True
        #
        # Then create email with empty sender
        # Assert: is_valid() returns False
        pass


# PROBLEM 1.7: RUN TESTS
# After you write the test functions above:
# Run: pytest tests/test_models.py -v
# All tests should FAIL (they're stubs)
# That's OK! Next step is to implement models
```

### **File 9: `tests/test_services.py`**
```python
# tests/test_services.py
"""
Unit tests for email service functions.
"""

import pytest
from models import User, Email
from services import send_email, check_inbox, read_email


class TestEmailService:
    """Tests for email service functions."""
    
    @pytest.fixture
    def users(self):
        """Create test users."""
        # PROBLEM 1.8A: Write this fixture
        # Return:
        # alice = User(name="Alice", email_address="alice@example.com")
        # bob = User(name="Bob", email_address="bob@example.com")
        # return {"alice": alice, "bob": bob}
        pass
    
    def test_send_email(self, users):
        """Test sending an email."""
        # PROBLEM 1.8B: Write this test
        # Use users["alice"] and users["bob"]
        # Call send_email(alice, bob, "Hello", "Test message")
        # Assert: returned email has correct sender/recipient
        # Assert: email added to bob's inbox
        # Assert: bob.inbox length increased by 1
        pass
    
    def test_send_email_invalid_inputs(self, users):
        """Test that send_email validates inputs."""
        # PROBLEM 1.8C: Write this test
        # Try send_email(None, users["bob"], "Hi", "Message")
        # Assert: ValueError is raised
        pass
    
    def test_check_inbox(self, users):
        """Test checking inbox."""
        # PROBLEM 1.8D: Write this test
        # Send 3 emails to bob
        # Call check_inbox(bob)
        # Assert: returned list has 3 emails
        # Assert: order is correct (first sent = first in list)
        pass
    
    def test_read_email(self, users):
        """Test reading a specific email."""
        # PROBLEM 1.8E: Write this test
        # Send 1 email from alice to bob
        # Get the email_id from that email
        # Call read_email(bob, email_id)
        # Assert: correct email is returned
        # Assert: read_email(bob, "invalid") returns None
        pass
```

### **File 10: `requirements.txt`**
```
pytest==7.4.0
python-dateutil==2.8.2
```

### **File 11: `main.py`**
```python
# main.py
"""
Entry point for email simulator.
"""

from models import User, Email
from services import send_email, check_inbox, read_email
from cli import MenuSystem, MenuItem


def handle_send_email():
    """Handler: Send an email."""
    print("\n📧 SEND EMAIL")
    # TODO: Implement in Week 2
    print("(Not implemented yet)")


def handle_check_inbox():
    """Handler: Check inbox."""
    print("\n📬 CHECK INBOX")
    # TODO: Implement in Week 2
    print("(Not implemented yet)")


def handle_read_email():
    """Handler: Read an email."""
    print("\n📖 READ EMAIL")
    # TODO: Implement in Week 2
    print("(Not implemented yet)")


def main():
    """Main entry point."""
    menu = MenuSystem(
        title="EMAIL SIMULATOR",
        items=[
            MenuItem("1", "Send Email", handle_send_email),
            MenuItem("2", "Check Inbox", handle_check_inbox),
            MenuItem("3", "Read Email", handle_read_email),
        ]
    )
    menu.run()


if __name__ == "__main__":
    main()
```

### **File 12: `_ARCHITECTURE.md`**
```markdown
# Email Simulator Architecture

## Design Decisions

### Separation of Concerns
- **models/**: Data structures only (User, Email dataclasses)
- **services/**: Business logic only (send_email, check_inbox, read_email)
- **cli/**: User interface only (MenuSystem dispatcher)
- **main.py**: Wiring (creates objects, starts menu)

### Why This Matters
- Models can be tested without running CLI
- Services can be tested without touching UI
- UI can be swapped (CLI → Web → API)

### Dispatcher Pattern
Instead of nested if/elif:
```python
# ❌ Bad (scales poorly)
if choice == "1":
    send_email()
elif choice == "2":
    check_inbox()
# Add feature? Add elif!

# ✅ Good (scales infinitely)
dispatch = {"1": send_email, "2": check_inbox}
dispatch[choice]()
# Add feature? Add 1 line to dict!
```

## Dataclasses
- `User`: Represents email account
  - Validation: email must contain "@"
  - Auto-generated: None (simple)
  
- `Email`: Represents email message
  - Validation: sender/recipient must be valid emails
  - Auto-generated: timestamp, email_id

## Pure Functions
- `send_email()`: No side effects, returns Email
- `check_inbox()`: No side effects, returns List[Email]
- `read_email()`: No side effects, returns Email or None

## Testing Strategy
- Models: Test dataclass validation
- Services: Test each function independently
- CLI: Manual testing (not automated in Week 1)
```

### **File 13: `README.md`**
```markdown
# Email Simulator

A simple email system built to demonstrate clean architecture.

## Structure
```
1_email_simulator/
├── models/        # Data structures (User, Email)
├── services/      # Business logic (send, check, read)
├── cli/           # User interface (menu dispatcher)
├── tests/         # Unit tests
└── main.py        # Entry point
```

## Getting Started

### Install dependencies
```bash
pip install -r requirements.txt
```

### Run tests
```bash
pytest tests/ -v
```

### Run the app
```bash
python main.py
```

## Week 1 Goals
- [ ] Implement User dataclass (models/user.py)
- [ ] Implement Email dataclass (models/email.py)
- [ ] Implement email service functions (services/email_service.py)
- [ ] Write 15+ unit tests (tests/test_*.py)
- [ ] All tests passing
- [ ] Understand MenuSystem dispatcher pattern

## Design Principles
- **Separation of Concerns**: Models, Services, CLI are independent
- **Pure Functions**: Services have no side effects
- **Testability**: Each layer tests in isolation
- **Simplicity**: No unnecessary complexity
```

---

## **STEP 3: PROBLEMS FOR TODAY**

### **PROBLEM 1.1: Fix User Dataclass** (30 min)

```python
# Current file: models/user.py

YOUR TASK:
1. Read the existing User class (it's already in the file template above)
2. Run: pytest tests/test_models.py::TestUser::test_user_creation -v
3. Watch it PASS (User class is complete)
4. Answer checkpoint questions:
   - "What does @dataclass do?"
   - "Why use field(default_factory=list)?"
   - "What validates email has @?"

TIME: 30 min
EXPECTED: Test passes, you understand the code
```

---

### **PROBLEM 1.2: Fix Email Dataclass** (60 min)

```python
# Current file: models/email.py

YOUR TASK:
1. Review Email class (see template above)
2. IDENTIFY BUGS:
   - Line 8: timestamp = None ❌ (should use field())
   - Line 9: email_id = None ❌ (should use field())
   - Missing: Validate sender/recipient have "@"

3. FIX THE BUGS:
   - Import: from dataclasses import field
   - Change: timestamp: datetime = field(default_factory=datetime.now)
   - Change: email_id: str = field(default_factory=lambda: str(uuid.uuid4())[:8])
   - Add in __post_init__: Validate sender/recipient
   
4. Write validation:
   if "@" not in self.sender:
       raise ValueError(f"Invalid sender: {self.sender}")
   if "@" not in self.recipient:
       raise ValueError(f"Invalid recipient: {self.recipient}")

5. Run tests: pytest tests/test_models.py::TestEmail -v
6. All should PASS

TIME: 60 min
EXPECTED: Email class fixed, tests pass, you understand defaults
```

---

### **PROBLEM 1.3: Implement Service Functions** (90 min)

```python
# Current file: services/email_service.py

YOUR TASKS:

PROBLEM 1.3A: Implement send_email() (30 min)
  1. Validate sender and recipient are User objects
  2. Validate they're not None
  3. Create Email object with:
     - sender.email_address
     - recipient.email_address  
     - subject
     - body
  4. Add email to recipient.inbox
  5. Return email
  
  Expected result:
  def send_email(sender: User, recipient: User, subject: str, body: str) -> Email:
      if sender is None or recipient is None:
          raise ValueError("Sender and recipient required")
      if not isinstance(sender, User) or not isinstance(recipient, User):
          raise TypeError("Must be User objects")
      
      email = Email(
          sender=sender.email_address,
          recipient=recipient.email_address,
          subject=subject,
          body=body
      )
      recipient.inbox.append(email)
      return email

PROBLEM 1.3B: Implement check_inbox() (20 min)
  1. Validate user is not None
  2. Return user.inbox
  3. Handle empty inbox gracefully
  
  Expected result:
  def check_inbox(user: User) -> List[Email]:
      if user is None:
          raise ValueError("User required")
      return user.inbox

PROBLEM 1.3C: Implement read_email() (30 min)
  1. Validate user and email_id
  2. Search inbox for matching email_id
  3. Return email if found, None if not
  
  Expected result:
  def read_email(user: User, email_id: str) -> Optional[Email]:
      if user is None:
          raise ValueError("User required")
      if not email_id:
          raise ValueError("Email ID required")
      
      for email in user.inbox:
          if email.email_id == email_id:
              return email
      return None

TIME: 90 min
EXPECTED: All 3 functions implemented, logic correct
```

---

### **PROBLEM 1.4: Write Tests** (90 min)

```python
# Current file: tests/test_models.py and tests/test_services.py

YOUR TASKS:

PROBLEM 1.5A: test_user_creation() (15 min)
  Create user, assert properties

PROBLEM 1.5B: test_user_invalid_email() (15 min)
  Try invalid email, assert ValueError

PROBLEM 1.6A: test_email_creation() (15 min)
  Create email, assert properties

PROBLEM 1.6B: test_email_timestamp_auto() (15 min)
  Assert timestamp was auto-filled

PROBLEM 1.8A: Create @pytest.fixture for users (15 min)
  Create alice and bob users

PROBLEM 1.8B: test_send_email() (15 min)
  Send email, assert bob's inbox updated

PROBLEM 1.8C: test_check_inbox() (15 min)
  Send emails, check inbox returns correct list

TIME: 90 min
EXPECTED: 8+ tests written and passing

RUN TESTS:
pytest tests/ -v
All should PASS ✅
```

---

## **STEP 4: COMMUNICATION CHECKPOINTS**

After you finish coding, ANSWER these questions (write your answers):

### **Checkpoint 1: User Dataclass**
```
1. "Why use @dataclass instead of writing __init__ manually?"
   Your answer: _______________

2. "What does field(default_factory=list) do?"
   Your answer: _______________

3. "What happens if you pass an invalid email to User()?"
   Your answer: _______________
```

### **Checkpoint 2: Email Dataclass**
```
1. "Why did you need field(default_factory=...) for timestamp?"
   Your answer: _______________

2. "What's the difference between:
      timestamp = None
      vs
      timestamp = field(default_factory=datetime.now)"
   Your answer: _______________

3. "What validation did you add to Email?"
   Your answer: _______________
```

### **Checkpoint 3: Service Functions**
```
1. "Why are send_email, check_inbox, read_email called 'pure functions'?"
   Your answer: _______________

2. "What happens if I call send_email(None, bob, 'Hi', 'msg')?"
   Your answer: _______________

3. "If you had 1 million emails in inbox, would check_inbox() still work fast?"
   Your answer: _______________
   (Hint: What's the time complexity?)
```

### **Checkpoint 4: Tests**
```
1. "Why test models separately from services?"
   Your answer: _______________

2. "What edge cases did you test for send_email()?"
   Your answer: _______________

3. "If you add a new User field, what tests break?"
   Your answer: _______________
```

### **Checkpoint 5: Overall Architecture**
```
1. "Walk me through sending an email: alice sends to bob"
   Your answer: _______________

2. "Why is dispatcher pattern better than if/elif?"
   Your answer: _______________

3. "What would change if you added a 4th menu option?"
   Your answer: _______________
```

---

## **STEP 5: TODAY'S SCHEDULE (8 hours)**

```
0:00-0:30   Read all starter code above
0:30-1:00   Create files + understand structure
1:00-2:00   PROBLEM 1.1: User dataclass + tests ✅
2:00-3:00   PROBLEM 1.2: Email dataclass + validation
3:00-4:00   BREAK + lunch
4:00-5:30   PROBLEM 1.3: Implement send_email, check_inbox, read_email
5:30-6:30   PROBLEM 1.4: Write 8+ unit tests
6:30-7:00   Run all tests: pytest tests/ -v
7:00-8:00   Answer 5 communication checkpoints + REFLECT
```

---

## **BEFORE YOU CODE: SETUP CHECK**

```bash
# Navigate to project
cd A:\SAAS\personal.py\1_email_simulator

# Verify structure
dir

# Should show:
# - cli/ (with __init__.py)
# - models/ (with __init__.py)
# - services/ (with __init__.py)
# - tests/ (with __init__.py)
# - main.py
# - requirements.txt
# - README.md
# - _ARCHITECTURE.md

# Install dependencies
pip install -r requirements.txt

# Run test (will fail, that's OK)
pytest tests/ -v
# Should show many FAILs (functions not implemented yet)
```

---

## **CRITICAL RULES FOR TODAY**

```
✅ DO:
   - Write ALL code yourself (no copy-paste from answers)
   - Run tests frequently (pytest)
   - Read error messages carefully
   - Ask yourself: "Why does this work?"
   - Take breaks every 60 min

❌ DON'T:
   - Use AI to write code for you
   - Skip understanding the "why"
   - Copy-paste without reading
   - Ignore test failures
   - Work more than 8 hours today
```

---

## **SUBMIT PROOF (After you finish)**

Reply with:

```
✅ Completed (copy-paste into reply):

# Week 1 Day 1 Status
Date: Sept 30, 2026
Time spent: __ hours
Problems completed: 1.1, 1.2, 1.3, 1.4 (check all)

## Code Summary
- models/user.py: ✅ (implemented + tested)
- models/email.py: ✅ (implemented + tested)
- services/email_service.py: ✅ (3 functions implemented)
- tests/test_models.py: ✅ (__ tests written)
- tests/test_services.py: ✅ (__ tests written)

## Test Results
pytest output: (paste here)
Expected: All tests PASS ✅

## Communication Checkpoints
1. User dataclass: [your answer]
2. Email dataclass: [your answer]
3. Service functions: [your answer]
4. Tests: [your answer]
5. Overall architecture: [your answer]

## Reflections
- Hardest part today: ___
- What I learned: ___
- Questions: ___
- Confidence level (1-10): ___
```