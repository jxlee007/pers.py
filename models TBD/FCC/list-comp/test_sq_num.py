import time
from operator import itemgetter

# Create a large list of 400,000 items with heavy duplicates
nums = list(range(200000)) + list(range(200000))

# -------------------------------------------------------------
# APPROACH 1: SET + LIST (Your Optimized Code)
# -------------------------------------------------------------
start = time.perf_counter()  # High-precision timer

seen = set()
result = []
for elem in nums:
    if elem not in seen:
        seen.add(elem)
        result.append(elem)

end = time.perf_counter()
print(f"SET + LIST Time: {end - start:.5f} seconds")

# -------------------------------------------------------------
# APPROACH 2: LIST ONLY (The Slow Way)
# -------------------------------------------------------------
start = time.perf_counter()

result_slow = []
for elem in nums:
    # ❌ SLOW: Python must scan the ENTIRE result_slow list from scratch 
    # every single iteration to check if the element is there!
    if elem not in result_slow: 
        result_slow.append(elem)

end = time.perf_counter()
print(f"LIST ONLY Time : {end - start:.5f} seconds")

