## **HACKATHON-ESSENTIAL DSA VOCABULARY**

```
FORMAT: [Term] → Definition + Hackathon Example
```

---

## **1. TIME COMPLEXITY (Big O)**

```
O(1) - Constant Time
  Definition: Operation completes regardless of data size
  Example: Dictionary lookup by key, setting array index
  Hackathon: "User lookup by email_id is O(1)"
  
O(N) - Linear Time
  Definition: Operation time grows with data size
  Example: Loop through list, search without index
  Hackathon: "Searching inbox for email is O(N)"
  
O(N²) - Quadratic Time
  Definition: Nested loops, operation time explodes
  Example: Bubble sort, nested iteration
  Hackathon: AVOID THIS (slow at scale)

O(log N) - Logarithmic Time
  Definition: Divide-and-conquer (binary search)
  Example: Sorted list lookup
  Hackathon: "Database index gives O(log N) access"
```

---

## **2. DATA STRUCTURES**

```
Dictionary / Hash Map
  Use for: Fast key-value lookups
  Time: O(1) average case
  Hackathon: Store users by email_id for instant access
  
List / Array
  Use for: Ordered sequences
  Time: O(N) to search, O(1) to access by index
  Hackathon: Order matters (timeline, queue)
  
Set
  Use for: Unique values only, no duplicates
  Time: O(1) membership test
  Hackathon: Check if email already exists
  
Queue (FIFO)
  Use for: First-in-first-out (messages, tasks)
  Time: O(1) add/remove
  Hackathon: Message delivery order
  
Stack (LIFO)
  Use for: Last-in-first-out (undo/redo)
  Time: O(1) push/pop
  Hackathon: Browser back button behavior
```

---

## **3. SEARCH & SORTING**

```
Linear Search
  Definition: Check each element sequentially
  Time: O(N)
  Use: Small data, unsorted
  Hackathon: ❌ Avoid if possible

Binary Search
  Definition: Divide sorted list in half repeatedly
  Time: O(log N)
  Use: Large sorted data
  Hackathon: Database indexes use this internally

Indexing
  Definition: Pre-sort data for faster lookups
  Time: O(1) to O(log N)
  Use: Primary keys, foreign keys
  Hackathon: "Add database index on user.email for O(1) access"
```

---

## **4. OPTIMIZATION PATTERNS (BUD from CTCI)**

```
Bottleneck
  Definition: Slowest part of your code
  Hackathon: "Inbox search is O(N) bottleneck, switch to dict"
  
Unnecessary Work
  Definition: Doing something you don't need to
  Hackathon: "Don't load all 10K users if fetching 1 user"
  
Duplicated Work
  Definition: Computing same thing multiple times
  Hackathon: Cache email lookups instead of rescanning
```

---

## **5. CONSTRAINT DESIGN**

```
Space Complexity
  Definition: Memory used by algorithm
  Notation: O(1), O(N), O(N²)
  Hackathon: "Store only active users, not all history"
  
Time vs Space Tradeoff
  Definition: Use more memory to save time (or vice versa)
  Hackathon: "Cache popular emails (space) to avoid O(N) search (time)"
  
Scalability
  Definition: How does code perform at 10X data?
  Hackathon: "My dict lookup stays O(1) at 1M users, but O(N) list fails"
```

---

## **6. DATABASE PATTERNS**

```
Primary Key
  Definition: Unique identifier for each row
  Example: user_id, email_id
  Hackathon: "Ensure email_id is unique primary key"
  
Index
  Definition: Sorted copy of column for fast lookup
  Time: O(log N) instead of O(N)
  Hackathon: "CREATE INDEX on users.email"
  
Foreign Key
  Definition: Reference to row in another table
  Example: order.user_id → users.id
  Hackathon: "Link orders to users via foreign key"
  
N+1 Query Problem
  Definition: Loop querying database instead of batch
  Bad: Loop 100 users, each query = 100 DB calls
  Good: One batch query = 1 DB call
  Hackathon: "Use JOIN instead of N loop queries"
```

---

## **7. ARCHITECTURE PATTERNS**

```
Caching
  Definition: Store frequently used data in memory
  Time savings: O(N) lookup → O(1) cache hit
  Hackathon: "Cache user profiles to avoid repeated DB queries"
  
Lazy Loading
  Definition: Load data only when needed
  Use: Heavy data (documents, images)
  Hackathon: "Load email body only when user clicks 'read'"
  
Pagination
  Definition: Return data in pages (10 items/page)
  Constraint: Avoid loading 1M rows at once
  Hackathon: "API returns page 1 of 5, fetch more on scroll"
  
Batch Processing
  Definition: Process multiple items together
  Time: One operation on 100 items, not 100 operations
  Hackathon: "Send 50 emails in batch, not 50 separate calls"
```

---

## **CHEAT SHEET FOR HACKATHON (Print this)**

```
📊 CHOOSE DATA STRUCTURE:
  Need fast lookup?        → Dictionary (O(1))
  Need ordered data?       → List (O(N) search, but ordered)
  Need unique only?        → Set (O(1) membership)
  Need FIFO queue?         → Queue
  Need undo/redo?          → Stack

⚡ AVOID THESE:
  ❌ O(N²) nested loops on user data
  ❌ Searching list when dict exists
  ❌ N+1 database queries (use JOIN)
  ❌ Loading all data when you need 1 page

🚀 DO THIS:
  ✅ Index database primary keys
  ✅ Cache repeated lookups
  ✅ Batch queries (JOIN instead of loops)
  ✅ Pagination for large data
  ✅ Use dict for O(1) access

📝 IN _ARCHITECTURE.md SAY:
  "User lookup is O(1) via dictionary-based storage"
  "Email search optimized with indexed email_id"
  "Inbox pagination prevents O(N) full scan"
```

---

## **USAGE IN YOUR POC PROJECT**

**When building:**
```
1. Pick data structure (dict? list?)
2. Ask: What's the time complexity?
3. Document in code comment
4. Explain in _ARCHITECTURE.md
```

**Example in code:**
```python
# Bad: O(N) search every time
def find_user(email):
    for user in all_users_list:
        if user.email == email:
            return user

# Good: O(1) lookup
users_by_email = {user.email: user}  # Dict, not list
def find_user(email):
    return users_by_email.get(email)
```

**In _ARCHITECTURE.md:**
```
## Data Structure Decisions
- Users stored in dict keyed by email_id (O(1) lookup)
- Messages in list (preserve order) with index on sender_id
- Inbox pagination limits to 20 items (O(1) page fetch)
```

---

**Use this vocabulary in POC → judges see you think like architects, not just coders.**