from flask import Flask, render_template

# app.py
# As im practicing MVC architecture
# I've named the file controller.py 
# In strict-oops approach - this file would work as OBJ CREATOR

# flask --app filename run --debug  # never-use-in-prod

app = Flask(__name__)


@app.route('/')
def hello():
    return 'Hello, World!'

@app.route('/arcade-pass', methods=['POST', 'GET'])
def arcade():
    # html input would be recieved using get request
    # py output will be send using post req
    return 'TBD'
# Step 1: Handle when the user first loads the page (GET request)
# Step 2: Handle when the user clicks "Get Receipt" (POST request)
    # Grab data from HTML using the exact 'name' attributes
    # Form inputs come as text, so convert numbers to integers
    
# Step 3: Run the business logic / math

# Step 4: Send the data back to the View (HTML)
    return render_template(
        # looks for the html file requested 
        'views/arcade-tracker.html', 
        name=customer_name,
        passes=passes_bought,
        tokens=total_tokens,
        total_cost=f"{calculated_cost:.2f}" # Formats to 2 decimal places
    )

