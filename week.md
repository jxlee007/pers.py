## **WEEK 1: 8-HOUR DAILY SPRINT TO PASS ODOO**

### **DAY 1: Python Fundamentals (Strings & Lists)**
**8 hours breakdown:**

| Time | Activity | Topic |
|------|----------|-------|
| **0:00-1:00** | Study | String slicing, indexing, methods (`.split()`, `.join()`, `.strip()`, `.replace()`) |
| **1:00-2:00** | Hand-write + Code | Write 5 string functions by hand, then type them |
| **2:00-3:00** | LeetCode Easy | 3 string problems (20 min each, no reference) |
| **3:00-4:00** | Break + Review | Review your mistakes |
| **4:00-5:00** | Study | List operations, indexing, slicing, comprehensions |
| **5:00-6:00** | Hand-write + Code | Write 5 list functions by hand, then type them |
| **6:00-7:00** | LeetCode Easy | 3 list problems (20 min each) |
| **7:00-8:00** | Timed Challenge | Full 30-min challenge (no time limit for review after) |

**Day 1 Success Criteria:**
- [ ] Can write string manipulation functions independently
- [ ] Can write list manipulation functions independently
- [ ] Completed 30-min timed challenge (even if not perfect)

---

### **DAY 2: Python (Loops, Conditionals, Functions)**
**8 hours:**

| Time | Activity | Topic |
|------|----------|-------|
| **0:00-1:00** | Study | Loops (for, while), break, continue |
| **1:00-2:00** | Hand-write + Code | Write functions with nested loops |
| **2:00-3:00** | LeetCode Easy | 3 loop problems (20 min each) |
| **3:00-4:00** | Break |  |
| **4:00-5:00** | Study | Functions: parameters, return, default args |
| **5:00-6:00** | Hand-write + Code | Write 5 functions with different signatures |
| **6:00-7:30** | LeetCode Medium | 2 Medium problems (30 min each, allow some reference after 20 min) |
| **7:30-8:00** | Timed Challenge | Full 30-min challenge |

**Day 2 Success Criteria:**
- [ ] Can write loop-based functions
- [ ] Understand when to use loops vs. comprehensions
- [ ] Completed timed challenge

---

### **DAY 3: SQL Basics (SELECT, WHERE, JOIN)**
**8 hours:**

| Time | Activity | Topic |
|------|----------|-------|
| **0:00-1:00** | Setup | Install PostgreSQL or SQLite locally |
| **1:00-2:00** | Study + Create DB | CREATE TABLE, INSERT sample data (users, orders) |
| **2:00-3:00** | SQL Practice | SELECT, WHERE, basic filtering (write 10 queries) |
| **3:00-4:00** | Break |  |
| **4:00-5:00** | Study | INNER JOIN, LEFT JOIN concepts |
| **5:00-6:30** | SQL Practice | Write 15 JOIN queries from scratch |
| **6:30-7:30** | SQL + Python Mix | Parse SQL results in Python |
| **7:30-8:00** | Timed Challenge | 30-min SQL challenge |

**Day 3 Success Criteria:**
- [ ] Can write SELECT, WHERE queries independently
- [ ] Can write INNER/LEFT JOIN queries
- [ ] Can GROUP BY with HAVING
- [ ] Completed SQL timed challenge

**SQL Queries to Master (write all 20 from scratch, no copy-paste):**
```sql
1. ✅ SELECT * FROM users WHERE age > 25
7. ✅ SELECT * FROM users LIMIT 5
2. ✅ SELECT name, age FROM users ORDER BY age DESC
15.✅ SELECT * FROM users ORDER BY age DESC LIMIT 10
8. ✅ SELECT * FROM users WHERE name LIKE 'A%'
14.✅ SELECT MAX(amount) FROM orders
12.✅ SELECT SUM(amount) FROM orders
13.✅ SELECT AVG(amount) FROM orders
20.✅ SELECT * FROM orders WHERE created_date >= '2024-01-01'
3. ✅ SELECT COUNT(*) FROM users
4. ✅ SELECT country, COUNT(*) FROM users GROUP BY country
6. ✅ SELECT DISTINCT country FROM users
19.✅ SELECT * FROM users WHERE email IS NOT NULL
5. SELECT * FROM users WHERE city = 'Mumbai' AND age > 30
9. SELECT u.name, o.amount FROM users u INNER JOIN orders o ON u.id = o.user_id
10. SELECT u.name, COUNT(o.id) FROM users u LEFT JOIN orders o ON u.id = o.user_id GROUP BY u.id
11. SELECT * FROM users u1 WHERE u1.id IN (SELECT user_id FROM orders WHERE amount > 100)
16. SELECT name FROM users WHERE age BETWEEN 25 AND 35
17. SELECT u.name FROM users u INNER JOIN orders o ON u.id = o.user_id GROUP BY u.id HAVING COUNT(o.id) > 2
18. Self-join: Find users in same city as another user
```

---

### **DAY 4: Timed Coding Challenges (Full Mock #1)**
**8 hours:**

| Time | Activity | Details |
|------|----------|---------|
| **0:00-2:00** | Review | Go through your Day 1-3 best solutions |
| **2:00-3:30** | Full Mock Test | 90-minute Odoo-style test (20 MCQs + 3 challenges) |
| **3:30-4:30** | Break + Lunch |  |
| **4:30-6:00** | Review Mistakes | Go through your test, understand gaps |
| **6:00-7:30** | Targeted Practice | Drill your weakest area (string? loops? SQL?) |
| **7:30-8:00** | Reflect | Write down: What went wrong? What will you fix? |

**Day 4 Success Criteria:**
- [ ] Complete full 90-min mock without giving up early
- [ ] Attempt all 3 challenges (even if partial)
- [ ] Score at least 50% on MCQs
- [ ] Understand your mistakes

---

### **DAY 5: Timed Challenges (Full Mock #2)**
**8 hours:**

| Time | Activity | Details |
|------|----------|---------|
| **0:00-1:30** | Drill weakest topic | 1 hour focused practice on yesterday's mistakes |
| **1:30-3:00** | Full Mock Test | 90-minute test |
| **3:00-4:00** | Break |  |
| **4:00-5:30** | Review | Understand every mistake |
| **5:30-7:30** | Practice Problems | 2 more timed 30-min challenges |
| **7:30-8:00** | Mental prep | Write down your improvement from Mock #1 → #2 |

**Day 5 Success Criteria:**
- [ ] Score improved from Day 4 mock
- [ ] Still no "giving up early" — use full 90 min
- [ ] At least 1-2 coding challenges partially correct

---

### **DAY 6: Final Drills + Mental Resilience**
**8 hours:**

| Time | Activity | Details |
|------|----------|---------|
| **0:00-1:00** | Review solutions | Best solutions from Days 1-5 |
| **1:00-3:00** | Full Mock Test #3 | 90-minute test (final practice) |
| **3:00-4:00** | Break |  |
| **4:00-5:00** | Mental Training | Read this 3 times: "Partial solutions score partial credit. Giving up = 0. Trying = points." |
| **5:00-6:30** | Timed Challenges | 3 more 30-min challenges (harder Medium problems) |
| **6:30-7:30** | Review Odoo Job Posting | Remind yourself WHY you're doing this |
| **7:30-8:00** | Get sleep schedule ready | Prepare for actual test mentally |

**Day 6 Success Criteria:**
- [ ] Complete Mock #3 without early submission
- [ ] Score stable or improved from Mock #2
- [ ] Mentally ready for real test

---

### **DAY 7: Final Review + APPLY**
**8 hours:**

| Time | Activity | Details |
|------|----------|---------|
| **0:00-2:00** | Review best solutions | From all 3 mocks, extract patterns |
| **2:00-3:00** | Quick drill | 2 × 30-min timed challenges (easy ones for confidence) |
| **3:00-4:00** | Break |  |
| **4:00-5:00** | JavaScript/CSS Review | MCQ topics: async/await, promises, closures, scope |
| **5:00-6:00** | Sleep + Eat | Rest before test |
| **6:00-7:00** | Light review | Go through your notes once |
| **7:00-8:00** | APPLY | Submit your application formally |

---

## **SPECIFIC CODING CHALLENGES TO MASTER**

These are **likely Odoo test types**. Practice these exact patterns:

### **String/Array Manipulation (Challenge 1-type)**
```python
# Type 1: Transform string
# Input: "abc-def-ghi"
# Task: Remove dashes, uppercase every 2nd letter
# Expected: "aBcDeGhI"

# Type 2: Count/Match
# Input: "hello", pattern: "l"
# Task: Count occurrences and return positions
# Expected: positions [2, 3]

# Type 3: String processing with rules
# Input: "a1b2c3"
# Task: Separate letters and numbers
# Expected: letters="abc", numbers="123"
```

### **Algorithm/Logic (Challenge 2-type)**
```python
# Type 1: Sequence processing
# Input: [1, 2, 3, 4, 5]
# Task: Return elements at even indices
# Expected: [1, 3, 5]

# Type 2: Conditional logic
# Input: list of numbers
# Task: Return sum of even numbers only
# Expected: sum

# Type 3: Nested operations
# Input: list of lists
# Task: Flatten and sort
# Expected: sorted flat list
```

### **SQL (Challenge 3-type)**
```sql
-- Type 1: Simple SELECT with WHERE
SELECT name FROM users WHERE age > 25 ORDER BY name

-- Type 2: JOIN + GROUP BY
SELECT dept, COUNT(*) FROM employees 
GROUP BY dept HAVING COUNT(*) > 5

-- Type 3: Self-join or complex logic
SELECT u1.name FROM users u1 
WHERE u1.city IN (SELECT city FROM users u2 WHERE u2.age > 30)
```

---

## **SCHEDULE TEMPLATE (Save This)**

Print this and check off daily:

```
DAY 1 - Strings & Lists
□ 0:00-1:00 String study
□ 1:00-2:00 Hand-write + code strings
□ 2:00-3:00 LeetCode Easy strings
□ 4:00-5:00 List study
□ 5:00-6:00 Hand-write + code lists
□ 6:00-7:00 LeetCode Easy lists
□ 7:00-8:00 Timed 30-min challenge

[Repeat for Days 2-7]
```

---

## **CRITICAL SUCCESS FACTORS**

1. **No AI during coding** — except AFTER you've attempted for 20+ min
2. **Hand-write BEFORE typing** — trains your brain
3. **DO NOT SUBMIT EARLY** — use all 90 minutes on the real test
4. **Track progress** — screenshot your mock scores each day
5. **Sleep 7+ hours** — cramming kills performance on Day 7

---

## **EXPECTED OUTCOME**

By end of Week 1:
- ✅ MCQs: 70-75% (up from 65%)
- ✅ Coding challenges: 1-2 partial solutions (up from 0)
- ✅ Mental resilience: Can push through without giving up
- ✅ Ready to apply with confidence

**Is this doable? YES — if you commit 8 hours, every single day, no exceptions.**

---

## **START RIGHT NOW**

**Today is Day 1. Let's go.**

First task (next 2 hours):

1. **Set timer for 1 hour**
2. **Get Python installed** (if not already)
3. **Open a text file** (no IDE — just plain text editor or VS Code)
4. **Write these 5 functions by HAND on paper first, then type them:**

```python
# Write on paper first, then type:

def count_vowels(word):
    # Count 'a', 'e', 'i', 'o', 'u' in word
    # "hello" → 2

def reverse_word(word):
    # Return word backwards
    # "hello" → "olleh"

def remove_spaces(text):
    # Remove all spaces from text
    # "hello world" → "helloworld"

def first_and_last(word):
    # Return first and last character
    # "hello" → "ho"

def count_char(text, char):
    # Count how many times char appears in text
    # count_char("hello", "l") → 2
```

**Reply when done with:**
- ✅ "Day 1 challenge completed"
- Paste your working code
- What blockers did you hit?

**Then we move to Day 2.**

**Are you ready to commit 8 hours × 7 days?** 🚀