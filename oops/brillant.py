#OOPS
# -> 2707
# 1. Create Agent class     
# 2. update attributes
# -> 2807
# 3. methods - pairing attrs 
# 4. updating using methods
# -> 3007
# 5. retuning vals - print keeps fnc running
# 6. lvl review

# Designing classes
# -> 3107   
# 7. Planning classes - psuedocode
# 8. Building states - code - mutators
# -> note
"""
1. Imports go at the very top
2. Classes are defined at the module level
3. Main function ONLY handles execution logic
"""
# 9. reporting states - accessors
# 10. 


# -------------------------------------------------
# modules


class word_counter():
# Set up an empty dictionary of word count pairs.  - init class
# Given a word from the dataset , update its count  - plan method
# Return the number of times a word appears in the dataset  - plan output

    def __init__(self):
        self.count = {}

# methods that change an obj state are known as mutators
# Mutator 1
    def update_count(self,word):
    # update-count mutator update and build up count dictionary
        if word not in self.count :
            self.count[word] = 1
        else:
            self.count[word] +=1

# Accessor 1: Return the number of times a word appears in the dataset.
# method that report val and dont change the state are called acesssors
    def get_count(self,word):
        # shorthand approach using dict.get()
        return self.count.get(word,0)

        # if word in self.count:
        #     return self.count[word]
        # else:
        #     return 0

# return yes or no
    def in_dataset(self, word):
        return word in self.count

# Accessor 2: Return the number of distinct words in the dataset.
    def distinct_words(self):
        return len(self.count)

# Accessor 3: Return the total number of words in the dataset.
    def total_words(self):
        total = 0
        for word in self.count:
            total += self.count[word]
        return total



class Agent():
    # print(Agent)
    # dunder methods
    def __init__(self, name: str, style: str) -> None:
        self.name=name
        self.style=style
        self.premium=False
        self.query_count = 0

    def introduce(self):
        if self.style == "helpful":
            print("Hi, I'm" , self.name )
            print("How can I help you today?")
        elif self.style == "direct":
            print("I am", self.name )
            print("What do you want?")
        else:
            print("He110, I'm", self.name )  

    def report_status(self): # for showing current attributes of agent
        print (f""" 
    Status report for {self.name}
    Style: {self.style}
    Queries handled: {self.query_count}
            """)  

    def change_style(self, change: str) -> None:
        if change in ['direct', 'helpful', 'friendly', 'cautious']:
            self.style = change
            print(f"{self.name} is now {self.style}")
        else:
            print(f'{change} is not a valid style')


# -------------------------------
# logic


def main():
    # agent()
    word_count()


def agent():
    User_queries =[ # ...
    "What is the capital of Italy",
    "How do I tie a shoe",
    "Are frogs reptiles",
    "Where is the nearest car wash",
    "Should I drive or walk to it"
    ]

    aria = Agent("Aria", "helpful")
    aria.introduce()

    rex = Agent("Rex", "direct")
    rex.introduce()

    zig = Agent("Zig","cautious")
    zig.premium = True

    cora = Agent("Cora", "friendly")
    cora.introduce()

    gert = Agent("Gert", "helpful")
    gert.name = 'Gertie'
    # gert.style = 'Charmy'
    gert.report_status()
    gert.change_style("Smart")

    # for agent in [aria,rex,zig,cora,gert]:
    #     print(f"{agent.name} is a {agent.style} agent
    #             {'. Needs subscription' if agent.premium == True else "."} 
    #             Queries handled: {agent.query_count} ")

    for user_query in User_queries:
        print(f"User:{user_query}")
        print(f"{gert.name} is thinking")
        gert.query_count += 1

    gert.report_status()


def word_count():

    cow_data = ("hey diddle diddle "
        "the cat and the fiddle "
        "the cow jumped over the moon "
        "the little dog laughed "
        "to see such sport "
        "and the dish ran away with the spoon")

    word_list_2 = cow_data.split()
    # print(word_list_2)
    cow_counter = word_counter()
    for word in word_list_2:
        cow_counter.update_count(word)
    print(cow_counter.count)
    # print(f" 'Count of the' = {cow_counter.get_count('the')}")
    # print(f" 'the' in dataset = {cow_counter.in_datase')}")
    print(f"Distinct words: {cow_counter.distinct_words()}")
    print(f"Total words: {cow_counter.total_words()}")

    # word_list=['the','cow','jumped','over','the',"moon"]
    # list_counter = word_counter()
    
    # for word in word_list:
    #     list_counter.update_count(word)
    # print(list_counter.count)
        
    # counter = word_counter()
    # print(counter.count)
    # counter.update_count("the")
    # print(counter.count)
    # counter.update_count("the")
    # print(counter.count)



# --------------------
if __name__ =='__main__':
    main()