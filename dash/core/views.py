from django.shortcuts import render  #, HttpResponse

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
