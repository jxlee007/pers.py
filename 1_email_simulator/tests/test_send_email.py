# tests/test_isolated_services.py
from models import User
from services.email_service import send_email

def test_isolated_atomic_dispatch():
    # SETUP: Instantiate simple, mock records in complete isolation
    alice = User(name="Alice", email_address="alice@example.com")
    bob = User(name="Bob", email_address="bob@example.com")
    
    # PROCESS: Execute the business rule function directly without booting the CLI app
    computed_email = send_email(alice, bob, "Isolated Test", "Direct verification proof.")
    
    # OUTPUT: Assert the state mutations directly on the isolated collections
    assert computed_email.subject == "Isolated Test"
    assert len(bob.inbox) == 1
    assert bob.inbox[0] == computed_email
