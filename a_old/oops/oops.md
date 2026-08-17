Here is your refreshing toolkit. Each topic contains a clear explanation paired with a focused code exercise specifically designed to fix your blind spots before you dive back into your FreeCodeCamp (FCC) challenge.
------------------------------
## Topic 1: Parameters vs. Attributes (Input vs. State)

* The Refresh: Parameters are the variables in the method definition line def __init__(self, x, y):. They are temporary inputs that exist only while that specific method runs. Attributes are prefaced with self., storing data permanently on the object's instance memory state. They do not need to match 1:1 with the parameters.

## Code Exercise:

class SmartLight:
    # 1. 'brightness_input' is a parameter. It disappears after __init__ finishes.
    def __init__(self, brightness_input: int) -> None:
        
        # 2. These two are instance attributes (saved state variables)
        self.brightness: int = brightness_input 
        self.is_on: bool = False # This attribute has NO matching parameter!
# Test it outliving_room_light = SmartLight(brightness_input=80)
print(living_room_light.brightness) # Outputs: 80
print(living_room_light.is_on)      # Outputs: False

------------------------------
## Topic 2: Object Relationships (Composition vs. Dependency)

* The Refresh: Classes rarely live in isolation; they interact.
* Composition ("Has-A" relationship): When a class creates an instance of another class inside its __init__. If the main object dies, the internal object dies too.
   * Dependency ("Uses-A" relationship): When a class temporarily accepts or creates another object inside a normal method just to get a job done.

## Code Exercise:

class Battery:
    def __init__(self) -> None:
        self.charge: int = 100
class Phone:
    def __init__(self) -> None:
        # COMPOSITION: A Phone 'Has-A' Battery. 
        # The Phone class instantiates the Battery itself.
        self.battery = Battery() 

    # DEPENDENCY: A Phone 'Uses-A' Charger object to do a specific action.
    def plug_into_charger(self, charger_object) -> None:
        charger_object.charge_up(self.battery) 

------------------------------
## Topic 3: Dot-Chaining Expressions (obj.attr.sub_attr)

* The Refresh: When reading long dot-chains like receiver.inbox.receive_email(), stop and ask yourself: "What exact data type does this specific word return?" evaluating left-to-right.

## Code Exercise:
Let's break down your FCC dot chain expression step-by-step:

# The expression: receiver.inbox.receive_email(email)
# Step 1: 'receiver' is an instance variable holding a [User] object.# Step 2: 'receiver.inbox' accesses the attribute inside User, returning an [Inbox] object.# Step 3: '.receive_email(email)' calls an instance method belonging to that [Inbox] object.

Another example from your code: self.sender.name

# Step 1: 'self' is the current [Email] object.# Step 2: 'self.sender' is an attribute on Email holding a [User] object.# Step 3: 'self.sender.name' grabs the string 'name' attribute from inside that [User] object.

------------------------------
## Topic 4: Implicit Magic Method Invocations

* The Refresh: You don't call dunder (double underscore) methods like __str__ directly. Instead, you perform a native Python action, and Python triggers the dunder method implicitly behind the scenes.

## Code Exercise:

class Product:
    def __init__(self, title: str) -> None:
        self.__title: str = title

    # This defines what happens when the object is turned into a string
    def __str__(self) -> str:
        return f"Product Title: {self.__title}"
item = Product("Mechanical Keyboard")
# IMPLICIT TRIGGER: You pass 'item' (the object) into print().# Python intercept this and executes item.__str__() automatically.
print(item) # Outputs: Product Title: Mechanical Keyboard