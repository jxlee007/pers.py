## **PROFESSIONAL DOCUMENTATION STRATEGY (Short Answer)**

**Document in 3 places, NOT scattered everywhere:**

```
1. PRODUCTION CODE (.py files)
   └─ Only: Clean docstrings (PEP 257)
   └─ Format: """Args, Returns, Description"""
   └─ Example: Inside send_email(), document inputs/outputs only

2. ARCHITECTURE FOLDER (arch_reason/)
   └─ _ARCHITECTURE.md = Design decisions + trade-offs
   └─ features_list/ = Feature specs + edge cases
   └─ README.md = Quick-start guide

3. TEST FILES (tests/)
   └─ Tests ARE your documentation
   └─ Each edge case = 1 test function
   └─ No comments needed; function names explain intent
   └─ Example: test_user_creation_with_empty_email_should_fail()
```

**DO NOT:**
```
❌ Long comments inside .py code
❌ TODO lists in production files
❌ Tutorial questions in functions
```

**DO:**
```
✅ 1-line docstring per function (contract only)
✅ Design reasoning in .md files
✅ Edge cases in test file names/assertions
```

**Your immediate action:**
- Move all architectural questions → `arch_reason/_ARCHITECTURE.md`
- Keep models/email.py clean with only docstrings
- Each test case = proof of correctness