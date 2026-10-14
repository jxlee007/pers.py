# Filter numbers: let's filter out positive even numbers from the list below
numbers = [-8, -7, -3, -1, 0, 1, 3, 4, 5, 7, 6, 8, 10]

negative_nums = [i for i in numbers if i <= 0] 
# print(negative_nums)


# Flatten the following list of lists of lists to a one dimensional list :
list_of_lists =[[1, 2, 3], [4, 5, 6], [7, 8, 9]]

# flat_list = [number for row in list_of_lists for number in row ]
# print(flat_list)

countries = [[('Finland', 'Helsinki')], [('Sweden', 'Stockholm')], [('Norway', 'Oslo')]]
flat_list = [count for country in countries for count in country ]
print(flat_list)
