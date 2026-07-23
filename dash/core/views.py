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
      output = final_msg * times
      

      # 3. Add the result to the context dictionary
      # in case if you want 2 var to pass
      context['result_output'] = output 


    return render(request, 'minitools/char-input.html', context)