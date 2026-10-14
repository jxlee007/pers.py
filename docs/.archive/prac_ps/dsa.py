def main():
    print(first_unique_char_in_str("leetl"))
    # two_sum()


def two_sum(nums,target):
    """
    Given an array of integers nums and an integer target,
    return the indices of the two numbers such that they add up
    to target. You may assume that each input would have
    exactly one solution, and you may not use the same element
    """
    pass

def first_unique_char_in_str(input):
    """
    First Unique Character in a String
    • Std In: "leetcode"
    • Std Out: 0 (The character 'l' occurs once and is at index 0)

    the character should only reapeat once - to be unique

    ord = ordinal = lowercase letters unicode
    """

    # str problems are all abt - sw,et,fal

    #  1. fast-lookup: : Fixed array for lowercase English letters
    # frequency map = 26 alphabet size
    
    counts = [0] * 26   # O(1) 
    #  creates a list containing 26 zeros

    # 2. Smart windowing
    # 'head' tracks the index of our current unique candidate
    head = 0

    # 3. Efficient Traversal: Single pass through the string
    for tail in range(len(input)): 
        # Update frequency map
        char_idx = ord(input[tail]) - ord('a')
        counts[char_idx] += 1
        
        # Shrink the window from the left if the current head candidate is no longer unique
        while head <= tail and counts[ord(input[head]) - ord('a')] > 1:
            head += 1
            
    # If head surpassed tail, no unique character exists
    return head if head < len(input) else -1















# ----------------------------------------
if __name__ == "__main__":
    main()