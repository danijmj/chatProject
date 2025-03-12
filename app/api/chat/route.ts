import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

// Maximum number of messages in the conversation
const MAX_MESSAGES = 10

export async function POST(req: Request) {
  // Create a TransformStream to stream the response
  const encoder = new TextEncoder()
  const stream = new TransformStream()
  const writer = stream.writable.getWriter()

  // Process the request in the background
  processConversation(req, writer).catch((error) => {
    console.error("Error processing conversation:", error)
    writer.close()
  })

  // Return the stream as the response
  return new Response(stream.readable)
}

async function processConversation(req: Request, writer: WritableStreamDefaultWriter<Uint8Array>) {
  try {
    const { initialPrompt } = await req.json()

    if (!process.env.OPENAI_API_KEY) {
      throw new Error("OPENAI_API_KEY is not set")
    }

    const messages: { role: "bot1" | "bot2"; content: string }[] = []
    let currentPrompt = initialPrompt
    let currentBot: "bot1" | "bot2" = "bot1"

    // Generate messages until we reach the maximum
    while (messages.length < MAX_MESSAGES) {
      // Generate a response from the current bot
      const { text } = await generateText({
        model: openai("gpt-4o"),
        system:
          currentBot === "bot1"
            ? "You are Bot 1 in a conversation with Bot 2. Respond to the prompt or to Bot 2's message. Keep your response concise and engaging."
            : "You are Bot 2 in a conversation with Bot 1. Respond to Bot 1's message. Keep your response concise and engaging.",
        prompt: currentPrompt,
      })

      // Add the message to the conversation
      const message = { role: currentBot, content: text }
      messages.push(message)

      // Send the message to the client
      await writer.write(encoder.encode(JSON.stringify({ message }) + "\n"))

      // Switch to the other bot for the next message
      currentBot = currentBot === "bot1" ? "bot2" : "bot1"

      // Update the prompt for the next message
      currentPrompt = text
    }
  } catch (error) {
    console.error("Error in processConversation:", error)
    await writer.write(encoder.encode(JSON.stringify({ error: "An error occurred" }) + "\n"))
  } finally {
    await writer.close()
  }
}

