import json
import os
import time
from pymongo import MongoClient
from openai import OpenAI
import urllib.parse

# MongoDB connection parameters
username = urllib.parse.quote_plus(os.getenv('DB_USERNAME'))
password = urllib.parse.quote_plus(os.getenv('DB_PASSWORD'))

# Connect to MongoDB
client = MongoClient(f'mongodb+srv://{username}:{password}@trivycluster0.wwtabms.mongodb.net/?retryWrites=true&w=majority')

# Get a reference to the trivia database and the games collection
db = client['triviaGames']
games_collection = db['games']

model = "gpt-3.5-turbo-1106"

with open('trivia_categories.json', 'r') as f:
    json_value = json.load(f)
    trivia_categories = json_value["triviaCategories"]

def get_random_trivia(topic: str):
    all_questions = []
    chat_client = OpenAI()
    try:
        while len(all_questions) < 35:
            messages = [{"role": "system", "content": "You are a helpful assistant who generates trivia questions."}]
            prompt = {
                "role": "user",
                "content": (
                    f"Generate 60 difficult trivia questions about {topic}. "
                    "Return the questions as json objects in the following format: "
                    "{"
                    "   questions: ["
                    "       {"
                    "           question: <trivia question>,"
                    "           choices: [<choice 1>, <choice 2>, <choice 3>, <choice 4>],"
                    "           answer: <answer>"
                    "       },"
                    "       ..."
                    "   ]"
                    "}"
                    "Each answer should be one of the available choices for the question. "
                    "The questions should be about the topic and be challenging. "
                    "The questions, choices, and answers should be strings. "
                    "Do not have repeated questions, answers, or choices. "
                    "Do not have questions with the same answer. "
                    "Do not have questions with the same choices. "
                    "Do not have questions with the same question. "
                    "Make sure the result is valid json."
                ),
            }
            if all_questions:
                prompt["content"] += " The questions should be different from the following questions: " + ", ".join(
                    question["question"] for question in all_questions
                )
            messages.append(prompt)
            response = chat_client.chat.completions.create(
                model=model,
                response_format={"type": "json_object"},
                messages=messages,
            )
            new_questions = json.loads(response.choices[0].message.content)["questions"]
            unique_questions = [q for q in new_questions if q["question"] not in [x["question"] for x in all_questions]]
            all_questions.extend(unique_questions)
            print(f"Generated {len(unique_questions)} unique questions")
        print(f"Generated {len(all_questions)} questions total")
    except Exception as e:
        print("Error generating questions for topic: " + topic)
        print(e)
    return all_questions

for category in trivia_categories:
    for game in category['games']:
        print(f"Generating questions for {game['title']} in {category['category']}")
        games_collection.insert_one({
            'category': category['category'],
            'title': game['title'],
            'slug': game['slug'],
            'createdBy': 'trivy',
            'questions': get_random_trivia(game['title']),
            'createdAt': int(time.time()),
            'plays': 0,
        })