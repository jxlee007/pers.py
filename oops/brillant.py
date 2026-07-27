#OOPS
# 1. Create Agent class -> 2707
# 2. update attributes
# 3.  -> 2807
# 4.

def main():
    # print(Agent)
    pass

class Agent():
    # dunder methods
    def __init__(self, name: str, style: str) -> None:
        self.name=name
        self.style=style
        self.premium=False
        self.query_count = 0

User_queries =[ # ...
"What is the capital of Italy",
"How do I tie a shoe",
"Are frogs reptiles",
"Where is the nearest car wash",
"Should I drive or walk to it"
]

aria = Agent("Aria", "helpful")
rex = Agent("Rex", "direct")
zig = Agent("Zig","cautious")
cora = Agent("Cora", "friendly")
gert = Agent("Gert", "helpful")

zig.premium = True

for agent in [aria,rex,zig,cora,gert]:
    print(f"{agent.name} is a {agent.style} agent{'. Needs subscription' if agent.premium == True else "."} Queries handled: {agent.query_count} ")

for user_query in User_queries:
    print(f"User:{user_query}")
    print("Zig is thinking")
    zig.query_count =+ 1




# --------------------
if __name__ =='__main__':
    main()