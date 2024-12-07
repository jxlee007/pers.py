from pydantic import BaseModel, EmailStr
from typing import List, Optional

class Address(BaseModel):
    street: str
    city: str
    postal_code: str

class User(BaseModel):
    name: str
    email: EmailStr
    age: Optional[int] = None  # Default value is None
    address: Address

# Creating an instance of User
user_data = {
    "name": "John Doe",
    "email": "john.doe@example.com",
    "age": 30,
    "address": {
        "street": "123 Main St",
        "city": "Anytown",
        "postal_code": "12345"
    }
}

user = User(**user_data)
print(user)