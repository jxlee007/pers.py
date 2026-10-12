# tests/test_isolated_accessor.py
from models import User, Email
from services.email_service import check_inbox

def test_isolated_lazy_memory_read():
    # SETUP: Instantiate simple, mock records in complete isolation
    bob = User(name="Bob", email_address="bob@example.com")
    mock_email = Email(sender="alice@example.com", recipient="bob@example.com", subject="Test", body="Msg")
    bob.inbox.append(mock_email)
    
    # PROCESS: Execute the business rule function directly without booting the CLI app
    retrieved_inbox = check_inbox(bob)
    
    # OUTPUT: Assert the data layer reads match exactly
    assert len(retrieved_inbox) == 1
    assert retrieved_inbox[0].subject == "Test"
