### The 5-Step Logical Decomposition Framework

### 1. Problem Isolation

* **Define the final goal** in one plain English sentence.
* **Identify all expected inputs** like user data, file types, or manual variables.
* **Specify the exact output** required by the user or system.
* **Separate the core requirements** from optional features or visual polish.

### 2. Structural Partitioning

* **Break the large problem** into three distinct phases: Input, Processing, and Output.
* **Divide the Processing phase** into small, independent sub-tasks.
* **Map out the linear order** in which these sub-tasks must run.
* **Draw a simple flowchart** using pen and paper to visualize the data journey.

### 3. Pseudo-Logic Draft

* **Write step-by-step instructions** for each sub-task using plain English statements.
* **Use basic conditional words** like "IF", "THEN", and "ELSE" to map decisions.
* **Represent repeating tasks** clearly using words like "FOR EACH" or "WHILE".
* **Keep code syntax completely out** of this draft to focus purely on thinking.

### 4. Atomic Implementation

* **Translate one line of pseudo-logic** into Python code at a time.
* **Use standard primitive data types** like strings, integers, and lists for simplicity.
* **Write hardcoded placeholder variables** to test parts before building full inputs.
* **Wrap each isolated sub-task** into its own clearly named Python function.

### 5. Continuous Validation

* **Run your script immediately** after coding a single new function or step.
* **Print variables to the console** at every stage to verify data accuracy.
* **Test the function with extreme inputs** like empty text or zero to check stability.
* **Fix errors immediately** before moving forward to the next logical block.

### Structural Code Translation & Execution Framework

### 1. Nested Loop Decoupling

* **Isolate the outer data collection** completely before writing any inner code mechanics.
* **Write a single loop** to print and confirm you can access the outer container.
* **Freeze your mental focus** on the first individual item inside that outer loop.
* **Identify the exact inner key** or list element hidden within that single item.
* **Drop the inner loop** directly underneath to iterate through that specific sub-target.
* **Use print statements inside** the second loop to watch the inner data change.

### 2. Decorator Wrapper Assembly

* **Create a parent function** that accepts the original function as an explicit parameter.
* **Define an inner execution block** using variable arguments to capture any input patterns.
* **Write your logic check first** at the top of this inner execution block.
* **Raise a descriptive exception** immediately if the validation check fails to execute properly.
* **Call the original function safely** underneath the check if all parameters match.
* **Return the final processed output** at the bottom of your inner execution block.
* **Add the decorator tag** directly above any target method to automate your validation checks.

### 3. Pointer Matrix Tracking

* **Define a static integer** to represent the fixed size of your tracking window.
* **Set up a single range loop** that stops safely before the list boundaries end.
* **Establish a left pointer index** mapped directly to the current loop step variable.
* **Calculate a right pointer index** by adding the window size to your left pointer.
* **Slice your data collection** cleanly using the calculated left and right indices.
* **Analyze the current sliced data window** before advancing the index tracking system.