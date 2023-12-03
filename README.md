# Flashcards Monorepo

This is a monorepo that contains the client and server applications for the Flashcards application.

- The client is a React app bootstrapped with Vite.
- The server is a Nest.js application.

## Flashcards App

A minimalistic Flashcards app that allows authenticated users to create flashcards and organize them in decks. 

* **Deck:** In the context of this Flashcards App, a deck refers to a collection or set of flashcards. It can be thought of as a category or topic under which related flashcards are grouped together.

* **Flashcard:** A flashcard is a small card used for learning and memorizing information. In the Flashcards App, each flashcard represents a question or prompt on one side and its corresponding answer on the other side. Users can flip the flashcard to test their knowledge and review the information.

## Getting Started

To get started with this project, follow these steps:

1. **Prerequisites**: Make sure you have Git, Node, and PNPM (the new package manager for Node) installed. If you don't have PNPM, you can install it globally with `npm install -g pnpm`. Additionally, you need to have Docker set up and running to spin up a local Postgres server. If you're new to Docker, you can refer to [this helpful guide](https://docs.docker.com/get-started/).
2. **Repository Setup**: Clone the repository and navigate to the root folder in the terminal.
3. **Dependencies**: Run `pnpm install` to install the dependencies for both the client and server.
4. **Environment Configuration**: Add a `.env` file in each the `app` and `api` sub-folders, similar to their respective `.env.example` files, and fill in the required environment variables.
5. **Database Setup**: Run `pnpm docker:up` to initialize the Postgres server.
6. **Run Locally**: To start the server, run `pnpm start:api`. To start the client, run `pnpm start:app`. Alternatively, you can run `pnpm start:all` to start both the client and server applications.