
# control flow 
# bisection search

# Assume portion_down_payment = 0.25 (25%)
# amount_saved, which starts at $0


yearly_salary = float(input("Enter your yearly salary: "))
portion_saved = float(input("Enter the percent of your salary to save, as a decimal: "))
cost_of_dream_home = float(input("Enter the cost of your dream home: "))
# months = float(input("Number of months: ")) ❌
months = 0

portion_down_payment =  0.25 
r =  0.05

amount_saved = 0

end_of_month = amount_saved * (r/12)