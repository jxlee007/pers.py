def add_setting(settings, setting_tuple):

    key = setting_tuple[0].lower()
    value = setting_tuple[1].lower()
    
    if key in settings:
        return f"Setting '{key}' already exists! Cannot add a new setting with this name."
    settings[key] = value
    return f"Setting '{key}' added with value '{value}' successfully!"

def update_setting(settings, setting_tuple):
    key = setting_tuple[0].lower()
    value = setting_tuple[1].lower()
    if key in settings:
        settings[key] = value
        return f"Setting '{key}' updated to '{value}' successfully!"
    return f"Setting '{key}' does not exist! Cannot update a non-existing setting."

def delete_setting(settings, key):
    lowered_key = key.lower()
    if lowered_key in settings:
        del settings[lowered_key]
        return f"Setting '{lowered_key}' deleted successfully!"
    return "Setting not found!"

def view_settings(settings):
    if not settings:
        return "No settings available."
    output = "Current User Settings:\n"
    for key, value in settings.items():
        output += f"{key.capitalize()}: {value}\n"
    return output

# Requirement: Create test_settings dictionary with values
test_settings = {
    "theme": "dark",
    "notifications": "enabled",
    "volume": "high"
}
