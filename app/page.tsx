import ChatInterface from "@/components/chat-interface"

export default function Home() {
  return (
    <div>
      <main className="flex flex-col overflow-hidden h-screen bg-gray-50 dark:bg-gray-900">
        <div className="flex-1 w-full max-w-4xl mx-auto flex flex-col">
          <header className="border-b border-gray-200 dark:border-gray-800 py-4 px-4 sm:px-6">
            <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">AI Chatbot Conversation</h1>
          </header>
          <ChatInterface />
        </div>
      </main>
    </div>
  )
}

