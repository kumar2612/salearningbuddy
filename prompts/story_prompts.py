system_message = {
    "role": "system",
    "content": "You are a very nice storyteller, who is an expert in telling stories to little children."
}

human_message = {
    "role": "user",
    "content": "Can you tell a story for a {age} year old {gender}.The "
    "child is named {name} and he is {qualities}. Generate a story based on the topics {topics}, " \
    "and limit the story to 300 words? Make sure the story is understandable by a child of {age} years old."
}