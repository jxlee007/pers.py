# models/email.py
from dataclasses import dataclass, field
from datetime import datetime
import uuid

@dataclass
class Email:
    sender:str
    subject:str
    body: str
    recipient: str
    email_id: str | None = None
    timestamp: datetime | None = field(default_factory=datetime.now)

    """
    • __post_init__ is the location where the validation happens.
    (the engine room or stage) 
    • A Guard Clause is the design pattern that you write inside that location.
    (the specific if statement that exits or raises an error early) 

    """

    def __post_init__(self):
        """Initialize timestamp and email_id if not provided."""
        if self.timestamp is None:
            self.timestamp = datetime.now()
        if self.email_id is None:
            self.email_id = str(uuid.uuid4())[:8]

    def __repr__(self):
        return f"Email(from={self.sender}, to={self.recipient}, subject='{self.subject}')"

    def is_valid(self) -> bool:
        """Check if email has required fields."""
        return bool(self.sender and self.subject and self.body and self.recipient)

