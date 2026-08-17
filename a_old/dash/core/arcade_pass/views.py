from django.shortcuts import render
# from django.http import HttpResponse

# Create your views here.
def arcade(request):

    pass_price = 2.50
    token_per_pass = 40
    tokens_required_per_game = 10

    # use dict - for passing the output on same page
    context = {}

    # capture data from form 
    if request.method == 'POST':
        
        # 1. get user input
        cust_name = request.POST.get('customer_name')
        no_of_passes = int(request.POST.get('passes_bought'))

        # Process the data
        total_tokens = no_of_passes * token_per_pass
        total_cost = pass_price * no_of_passes
        games_available =  total_tokens//tokens_required_per_game

        result = f"""
     ===== ARCADE DAY PASS =====      

        Customer Name: {cust_name.title()} 
        Passes: {no_of_passes} 
        Tokens: {total_tokens} 
        Total Cost: ${total_cost:.2f} 
        Games Available: {games_available}
                """
        
        # 3. Add the result to the context dictionary
        context['result_output'] = result

        # return HttpResponse("success")
    return render(request, 'arcade-tracker.html', context)