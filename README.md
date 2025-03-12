# chatProject

Welcome to **chatProject**, a simple application that allows two chatbots to have a conversation based on an initial prompt provided by the user. The conversation will continue until 10 messages are exchanged, after which the conversation will stop, and the user can enter a new prompt to start a fresh conversation.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Environment Variables](#environment-variables)
- [Contributing](#contributing)
- [License](#license)

## Introduction

**chatProject** is designed to simulate a conversation between two AI chatbots powered by OpenAI. The user provides an initial prompt, and the chatbots respond to each other until a limit of 10 messages is reached. The conversation is displayed on the page, and once the limit is hit, the prompt field is cleared, allowing the user to start a new conversation.

## Features

- **Initial Prompt**: Enter an initial prompt to start the conversation between the chatbots.
- **START Button**: The button is only active when a prompt is entered and sends the prompt to begin the chatbot conversation.
- **Chatbot Conversation**: Displays the conversation between the two chatbots.
- **Message Limit**: The conversation will stop after 10 messages between the chatbots.
- **Reset**: Once the conversation reaches the message limit, the prompt field resets for a new conversation.
- **OpenAI Integration**: Utilizes the OpenAI API for generating chatbot responses.

## Installation

To install and run **chatProject** locally, follow these steps:

1. **Clone the repository**:
    ```bash
    git clone https://github.com/danijmj/chatProject.git
    cd chatProject
    ```

2. **Install dependencies using pnpm**:
    ```bash
    pnpm install
    ```

3. **Set up your environment variables**:
    Create a `.env.local` file in the root of the project and add your OpenAI API key:
    ```bash
    OPENAI_API_KEY=your-api-key-here
    ```

4. **Start the development server**:
    ```bash
    pnpm dev
    ```

5. Open your browser and navigate to `http://localhost:3000`.

## Usage

Once the application is running, you can:

- Enter an initial prompt in the text field.
- Press the **START** button to begin the conversation between the chatbots.
- View the conversation between the two chatbots as it progresses.
- The conversation will stop after 10 messages and the prompt field will be cleared for a new prompt.

## Environment Variables

To interact with the OpenAI API, you'll need to configure your OpenAI API key. Follow these steps:

1. Create a `.env.local` file in the root directory of the project.
2. Add the following line to the `.env.local` file:
    ```bash
    OPENAI_API_KEY=your-api-key-here
    ```
   Replace `your-api-key-here` with your actual OpenAI API key.

## Contributing

We welcome contributions to **chatProject**! If you'd like to contribute, please follow these steps:

1. **Fork the repository**.
2. **Create a new branch**:
    ```bash
    git checkout -b feature/your-feature-name
    ```

3. **Make your changes** and commit them:
    ```bash
    git commit -m "Add your commit message"
    ```

4. **Push to the branch**:
    ```bash
    git push origin feature/your-feature-name
    ```

5. **Create a pull request**.

Please ensure your code follows our [code of conduct](CODE_OF_CONDUCT.md) and [contributing guidelines](CONTRIBUTING.md).

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

---

Thank you for using **chatProject**! If you have any questions or feedback, feel free to open an issue or contact us at support@chatproject.com.
