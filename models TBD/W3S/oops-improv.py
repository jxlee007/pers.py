from typing import Any
# for practice
# params vs attr
#  obj relationships - composition vs dependency


class SmartLight:
    def __init__(self, brightness_input:int) -> None:
        
        self.brightness_input: int = brightness_input
        self.is_on: bool = False # no param

living_room_light = SmartLight(80)

print(living_room_light.brightness_input) # Outputs: 80 
print(living_room_light.is_on) # Outputs: False


# composition - has-A
# In Code: One class creates the other right inside its __init__.
# Class A creates Class B inside itself → Composition (Strong Bond / Ownership).

class Engine:
    pass

class Car:
    # COMPOSITION: The Car creates the Engine.
    # If this Car instance is deleted, the Engine is deleted too.
    # self.engine = Engine() 

    # DEPENDENCY INJECTION: We pass the Engine into __init__
    # The Car USES this engine, but it didn't CREATE it. 
    # If the Car gets crushed, this Engine object can still exist outside!
    def __init__(self, engine_built_somewhere_else: Engine) -> None:
        self.engine = engine_built_somewhere_else




# dependency  - use-A
# In Code: A class accepts another object as a temporary input parameter inside a normal method.
#  Class A is handed Class B from the outside to use it → Dependency (Loose Bond / Temporary Use)
class Wrench:
    pass

class Mechanic:
    # DEPENDENCY: The mechanic doesn't "own" the wrench permanently.
    # It is just passed in as a temporary tool to get a job done.
    def fix_car(self, wrench_tool: Wrench):
        print("Using the wrench to fix the car...")

class Battery:
# Battery is main obj
    def __init__(self) -> None:
        self.charge: int = 100

class Charger:
    # Simple Charger type so Pylance knows what methods/params exist.
    def charge_up(self, battery: Battery) -> None:
        # simplistic charging logic
        battery.charge = min(100, battery.charge + 20)

class Phone:
#  Phone is example of internal logic
#  Phone Has-A battery - battery dies phone dies

    # obj relationship = composition
    # Class A creates Class B inside itself → Composition (Strong Bond / Ownership).
    def __init__(self) -> None:
        self.Battery = Battery()

    # DEPENDENCY: A Phone 'Uses-A' Charger object to do a specific action.
    # Class A is handed Class B from the outside to use it → Dependency (Loose Bond / Temporary Use)
    def plug_into_charger(self, charger_object: Charger) -> None:
        charger_object.charge_up(self.Battery)
        
