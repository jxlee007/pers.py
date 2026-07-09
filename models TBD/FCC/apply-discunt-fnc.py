# my code - logic understainding was wrong

 
# def   apply_discount (price,discount) :
    
#    
#     if not isinstance(price, (int,float)):
#         # on T this will run
#         print ("The price should be a number.")
#     elif not isinstance(discount , (int,float)) :
#         print ("The discount should be a number.")
#     elif price <= 0 :
#         print ("The price should be greater than 0")
#     elif discount <= 0 or discount > 100 :
#         print("The discount should be between 0 and 100")
#     else :
#         print (price - discount)
# apply_discount (22,10) 


"""
### Comparison & Troubleshooting

The main difference is that your new code uses `print` and `elif`, while the "passed" version uses `return` and `if`. In a coding lab or test, these differences are why a solution might "Fail."

#### Specific Problems with Original Code:

1. **print vs. return** (The biggest issue)
   - Instructions say the function should **return** a value.
   - `print` just shows text on the screen for a human.
   - `return` gives the answer back to the test script so it can use it.
   - **Result:** The test sees `None` coming from your function and marks it as **Failed**.

2. **The Math Logic**
   - **Your Code:** `price - discount`
   - **Scenario:** If price is 100 and discount is 20, it gives 80 (looks right for one case).
   - **The Problem:** The lab says the discount is a **percentage**.
   - **Example:** If price is 50 and discount is 20%, the answer should be 40.
   - **Your math:** 50 - 20 = 30 (Wrong).
   - **Correct Math:** `price * (1 - discount / 100)`

3. **Logic for "Zero"**
   - **Your Code:** `elif discount <= 0`
   - **Lab Rule:** "If discount is less than 0..."
   - **The Conflict:** The lab says a discount of 0 is allowed. Your code treats 0 as an error.
   - **Note:** It should only be an error if it's negative (`< 0`).

4. **if vs elif**
   - While `elif` works, using `if` with `return` is often cleaner for "Guard Clauses." Once a return happens, the function stops immediately.

#### Summary Table:

| Feature          | Your Current Code  | What the Lab Needs          |
|------------------|-------------------|----------------------------|
| Output           | `print()`         | `return`                   |
| Math             | `price - discount` | `price * (1 - discount/100)`|
| Zero Discount    | Error             | Allowed                    |
"""




# ai correction 
def apply_discount(price, discount):
    # 1. Check if price is a number (int or float)
    # isinstance is use to check datatype
    # tuple() is use to check both at once 
    if not isinstance(price, (int, float)):
        return "The price should be a number"
    
    # 2. Check if discount is a number (int or float)
    if not isinstance(discount, (int, float)):
        return "The discount should be a number"
    
    # 3. Check if price is greater than 0
    if price <= 0:
        return "The price should be greater than 0"
    
    # 4. Check if discount is between 0 and 100
    if discount < 0 or discount > 100:
        return "The discount should be between 0 and 100"
    
    # 5. Calculate the final price
    # Logic: price - (price * (discount / 100))
    final_price = price * (1 - (discount / 100))
    
    return final_price
