from django.shortcuts import render, HttpResponse

# Request/Response logic (Logic layer)
# Create your views here.


# Setting up home page

def index(request):
    html_content = """

    <h1>Python Projects</h1>

    <ol>
      <li> Add all Python programs </li>
      <li> update them with input handling </li>
      <li> integrate them with HTML </li>
      <li> html should show the output </li>
      <li> NTW robust code - handle errors using try-catch blocks </li>
      <li> NTW reusable code - separating logic - using fncs </li>
      <li> should be deployable</li>
      <li> needs requirements.txt</li>
      <li> Convert prac-scripts int fncs - reusable code </li>
      
      <!-- <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li> -->
      
    </ol>

    <ul>
      <li> <a href="chmod.html">Chmod Tool()</a> </li>
    </ul>


    """   
    return HttpResponse(html_content)
