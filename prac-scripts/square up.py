# created self defined functions
def calc(x):
    #your code goes here
    #using tuple for returning value p&a
    return (x*4,x*x)
    
side = int(input())
p, a = calc(side)

print("Perimeter: " + str(p))
print("Area: " + str(a))
