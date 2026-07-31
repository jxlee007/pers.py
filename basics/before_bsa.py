# Before Binary Search algo - refer 260726.md

def main():
    remove_even()


# C2.1 - The Evens Purger
def remove_even():
    num_list = [i + 1 for i in range(50)]
    print(num_list.index(1))
    print(num_list)
    idx = 0

    while idx < len(num_list):
        # Check the value at the current index position
        if num_list[idx] % 2 == 0:
            del num_list[idx]
            # Do NOT increase idx here! The next item slid into this spot.
        else:
            idx += 1  # Only move forward if the item was odd

    
    numlist = [ str(i) for i in num_list]

    idx = 1
    print(numlist[idx])
    while idx < len(numlist):
        numlist[0] += numlist[idx]
        idx += 1 

    m = numlist[0]

    print(m)



    # Three Loop Questions:
    #1. What do I want to repeat?
    #  -> 
    #2. What do I want to change each time?
    #  -> index 
    #3. How long should we repeat?
    #  -> till 







# -------------------------
if __name__ == "__main__":
    main()