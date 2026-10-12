# tests/test_isolated_timestamp.py
from datetime import datetime
from models.email import Email

def test_isolated_temporal_tracking():
    # TEST: Bypasses the full CLI application loops entirely
    email = Email(
        sender="alice@example.com",
        recipient="bob@example.com",
        subject="Test",
        body="Message"
    )
    
    # Assert core temporal requirements directly
    assert email.timestamp is not None
    assert isinstance(email.timestamp, datetime)