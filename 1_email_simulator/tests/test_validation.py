# test_validation_standalone.py
import pytest
from models.user import User

def test_isolated_email_enforcement():
    # TEST: Bypasses the full app entirely to assert your core business rule directly
    with pytest.raises(ValueError):
        User(name="Alice", email_address="malformed_string_without_at_sign")
