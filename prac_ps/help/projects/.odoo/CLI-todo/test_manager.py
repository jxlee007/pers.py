from manager import TaskManager

manager = TaskManager()
manager.add_task("Buy milk", "test")
manager.add_task("Walk dog", "test")

result = manager.get_task_by_id(1)
print(result)  # Should print task, not None