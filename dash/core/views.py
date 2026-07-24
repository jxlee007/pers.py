from django.shortcuts import render  #, HttpResponse
from datetime import date
# Request/Response logic (Logic layer)
# Create your views here.


# Setting up home page

def index(request):

    # Pass structural tracking parameters to your template if needed later
    context = {
      'project_title': "PY HUB"
    }

    # return HttpResponse(html_content)
    return render(request, 'index.html', context)

def minitools(request):
    return render(request,'minitools/home.html')


# MT 1 
def char_input(request):

    # use dict - for passing the output on same page
    context = {}
    current_year = date.today().year

    # capture data from form 
    if request.method == 'POST':

      # get user input
      user_name = request.POST.get('user_name')
      user_age = int(request.POST.get('user_age'))
      times = int(request.POST.get('number'))

      # Process data - calculate in which yr 
      age_left = 100 - user_age
      result = current_year + age_left

      final_msg = f"""
        Hi { user_name } of {user_age} ,
        You will be turning 100 years old in year {result} 
      """

      # print msg - str manipulation
      # multiplying a Str by an Int - uses a feature called Sequence Repetition
      output = final_msg * times
      

      # 3. Add the result to the context dictionary
      # in case if you want 2 var to pass 
        #- put it into 1 var or add separate to key
      context['result_output'] = output 
        # syntax: dict key access = var 
 


    return render(request, 'minitools/char-input.html', context)

# MT 2
def numops(request):

    # use dict - for passing the output on same page
    context = {}

    if request.method == 'POST':

        # 1. get inputs
        operation = int(request.POST.get('option'))
        num_a = int(request.POST.get('num1'))
        num_b = int(request.POST.get('num2'))


        # 2. use switchcase for multiple operations
        # to connect matchcase to context dict - add the context 
        # keep in mind while code - context['result'] = output
        match operation:

            case 1: # odd_even and divisiblilty check

                # SRP - Presence check pattern
                if num_b == 0:

                # P2. If the number is a multiple of 4, print out a different message 
                    if num_a % 4 == 0:
                        output = f"{num_a} is 4 multiple"
                        context['result'] = output
                # P1. Depending on whether the number is even or odd, 
                    elif num_a % 2 == 0:
                        output = f" {num_a} is even. "
                    # print out an appropriate message to the user
                        context['result'] = output
                    else:
                        output = f"{num_a} is odd."
                        context['result'] = output

                else:
                # P3. check if divides evenly into num
                # if num_a / num_b == type(int) : # wrong approach - divops results in float
                    if num_a % num_b == 0 : 
                        output = f"{num_a} is evenly divisible by {num_b}."
                        context['result'] = output
                    else:
                        output = f"{num_a} is not evenly divisible by {num_b}."
                        context['result'] = output


    
    return render(request, 'minitools/numops.html', context)