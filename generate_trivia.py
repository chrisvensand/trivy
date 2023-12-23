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

top_trivia_categories = [{'name': 'General Knowledge', 'slug': 'general-knowledge'}, {'name': 'Geography', 'slug': 'geography'}, {'name': 'History', 'slug': 'history'}, {'name': 'Science', 'slug': 'science'}, {'name': 'Movies', 'slug': 'movies'}, {'name': 'Music', 'slug': 'music'}, {'name': 'Sports', 'slug': 'sports'}, {'name': 'Literature', 'slug': 'literature'}, {'name': 'Art', 'slug': 'art'}, {'name': 'Technology', 'slug': 'technology'}, {'name': 'Animals', 'slug': 'animals'}, {'name': 'Food & Drink', 'slug': 'food-drink'}, {'name': 'Language', 'slug': 'language'}, {'name': 'Mythology', 'slug': 'mythology'}, {'name': 'TV Shows', 'slug': 'tv-shows'}, {'name': 'Space', 'slug': 'space'}, {'name': 'Politics', 'slug': 'politics'}, {'name': 'Fashion', 'slug': 'fashion'}, {'name': 'Architecture', 'slug': 'architecture'}, {'name': 'Gaming', 'slug': 'gaming'}, {'name': 'Transportation', 'slug': 'transportation'}, {'name': 'Environment', 'slug': 'environment'}, {'name': 'Economics', 'slug': 'economics'}, {'name': 'Inventions', 'slug': 'inventions'}, {'name': 'Celebrities', 'slug': 'celebrities'}, {'name': 'Human Body', 'slug': 'human-body'}, {'name': 'Famous Landmarks', 'slug': 'famous-landmarks'}, {'name': 'Fashion Brands', 'slug': 'fashion-brands'}, {'name': 'Mythical Creatures', 'slug': 'mythical-creatures'}, {'name': 'Dinosaurs', 'slug': 'dinosaurs'}, {'name': 'Ancient Civilizations', 'slug': 'ancient-civilizations'}, {'name': 'World Leaders', 'slug': 'world-leaders'}, {'name': 'Olympic Games', 'slug': 'olympic-games'}, {'name': 'Weather', 'slug': 'weather'}, {'name': 'Astronomy', 'slug': 'astronomy'}, {'name': 'Currencies', 'slug': 'currencies'}, {'name': 'World Religions', 'slug': 'world-religions'}, {'name': 'Famous Quotes', 'slug': 'famous-quotes'}, {'name': 'Superheroes', 'slug': 'superheroes'}, {'name': 'Random Facts', 'slug': 'random-facts'}, {'name': 'Riddles', 'slug': 'riddles'}, {'name': 'Board Games', 'slug': 'board-games'}, {'name': 'Computer Science', 'slug': 'computer-science'}, {'name': 'Cryptocurrency', 'slug': 'cryptocurrency'}, {'name': 'Unsolved Mysteries', 'slug': 'unsolved-mysteries'}, {'name': 'Famous Scandals', 'slug': 'famous-scandals'}]

def get_random_trivia(topic: str, num_questions: int):
    all_questions = []
    chat_client = OpenAI()
    while len(all_questions) < num_questions:
        output_questions = min(50, num_questions - len(all_questions))
        messages = [{"role": "system", "content": "You are a helpful assistant."}]
        prompt = {
            "role": "user",
            "content": (
                f"Generate {output_questions} trivia questions in json format about {topic}. "
                "Return the questions as json objects in the following format: "
                "{'questions': [{'question': '<question>', 'choices': ['<choice1>', '<choice2>', '<choice3>', '<choice4>'], "
                "'answer': '<answer>'}, ...]}. Each answer should be one of the available choices for the question. "
                "Please return the questions in a list."
            ),
        }
        if all_questions:
            prompt["content"] += " The questions should be different from the following questions: " + ", ".join(
                question["question"] for question in all_questions
            )
        messages.append(prompt)
        response = chat_client.chat.completions.create(
            model="gpt-3.5-turbo-1106",
            response_format={"type": "json_object"},
            messages=messages,
        )
        new_questions = json.loads(response.choices[0].message.content)["questions"]
        unique_questions = [q for q in new_questions if q["question"] not in [x["question"] for x in all_questions]]
        all_questions.extend(unique_questions)
        print(f"Generated {len(unique_questions)} unique questions")
    print(f"Generated {len(all_questions)} questions total")
    return all_questions

for topic in top_trivia_categories:
    games_collection.insert_one({
        'topic': topic['name'],
        'slug': topic['slug'],
        'createdBy': 'trivy',
        'questions': get_random_trivia(topic['name'], 100),
        'createdAt': int(time.time()),
        'plays': 0,
    })