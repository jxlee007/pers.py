# tests/test_isolated_lookup.py
from models import User, Email
from services.email_service import read_email

def test_isolated_targeted_id_lookup():
    # SETUP: Instantiate simple, mock records in complete isolation
    bob = User(name="Bob", email_address="bob@example.com")
    email1 = Email(sender="alice@example.com", recipient="bob@example.com", subject="Test 1", body="Msg 1")
    email2 = Email(sender="charlie@example.com", recipient="bob@example.com", subject="Test 2", body="Msg 2")
    
    # Force a known fixed tracking token on the second email
    email2.email_id = "4a7b2e1f"
    bob.inbox.extend([email1, email2])
    
    # PROCESS: Execute the business rule function directly without booting the CLI app
    result = read_email(bob, "4a7b2e1f")
    
    # OUTPUT: Assert the data layer reads match exactly
    assert result is not None
    assert result.sender == "charlie@example.com"
    assert result.subject == "Test 2"
