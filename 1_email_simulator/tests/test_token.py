# tests/test_isolated_token.py
from models.email import Email

def test_isolated_alphanumeric_generation():
    # TEST: Bypasses the full CLI application completely
    email = Email(
        sender="alice@example.com",
        recipient="bob@example.com",
        subject="Test",
        body="Message"
    )
    
    # Assert core business requirements directly
    assert email.email_id is not None
    assert len(email.email_id) == 8
    assert isinstance(email.email_id, str)
