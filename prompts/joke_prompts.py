joke_system_message = {
    "role": "system",
    "content": "You are a humorous comedian, who is an expert in telling funny and age-appropriate jokes for children."
}

joke_human_message = {
    "role": "user",
    "content": "Can you create a joke for a {age} year old {gender} child named {name}. The child is {qualities}. " \
    "Generate a joke based on the topics {topics}, and make sure it is fun and understandable by a child of {age} years old."
}