# [Trivy](https://www.trivy.fun/)

![Trivy Homepage](public/trivy-homepage.png)

Trivy is an engaging online platform for playing trivia games.

## Features

- AI-generated trivia questions using OpenAI's GPT-3.5 Turbo model
- User-friendly interface built with Next.js
- Persistent storage of trivia questions in MongoDB

## Tech Stack

- **Frontend**: [Next.js](https://nextjs.org)
- **Database**: [MongoDB Atlas](https://www.mongodb.com/products/platform/atlas-database)
- **AI Model**: OpenAI's [GPT-3.5-turbo-1106](https://platform.openai.com/docs/models/gpt-3-5-turbo)

## How It Works

The trivia questions and answers are generated using OpenAI's GPT-3.5 Turbo model and stored in a MongoDB Atlas database. The generation process is implemented in the [`generate_trivia.py`](https://github.com/chrisvensand/trivy/blob/10ebc3edda98564502f77c4520bf470aa5eb05c8/generate_trivia.py) file.

## Contact

For questions, feedback, or issues related to Trivy, please [open an issue](https://github.com/chrisvensand/trivy/issues) on GitHub.
