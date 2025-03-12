"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Loader2, Send, RefreshCw } from "lucide-react"

type Message = {
  role: "bot1" | "bot2"
  content: string
}

export default function ChatInterface() {
  const [prompt, setPrompt] = useState("")
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [conversationComplete, setConversationComplete] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const startConversation = async () => {
    if (!prompt.trim()) return

    setIsLoading(true)
    setMessages([])
    setConversationComplete(false)

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ initialPrompt: prompt }),
      })

      if (!response.ok) {
        throw new Error("Failed to start conversation")
      }

      const reader = response.body?.getReader()
      if (!reader) return

      const decoder = new TextDecoder()
      let done = false
      let currentMessages: Message[] = []

      while (!done) {
        const { value, done: doneReading } = await reader.read()
        done = doneReading

        if (done) break

        const chunk = decoder.decode(value)
        try {
          // Each chunk is a JSON object with a message
          const data = JSON.parse(chunk)
          if (data.message) {
            currentMessages = [...currentMessages, data.message]
            setMessages([...currentMessages])

            // Check if we've reached 10 messages
            if (currentMessages.length >= 10) {
              setConversationComplete(true)
              break
            }
          }
        } catch (e) {
          // Skip invalid JSON chunks
          console.error("Error parsing chunk:", e)
        }
      }
    } catch (error) {
      console.error("Error starting conversation:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const resetConversation = () => {
    setPrompt("")
    setMessages([])
    setConversationComplete(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey && prompt.trim() && !isLoading && !conversationComplete) {
      e.preventDefault()
      startConversation()
    }
  }

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)]">
      {/* Messages area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center max-w-md">
              <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">Start a conversation</h2>
              <p className="text-gray-600 dark:text-gray-400">
                Enter an initial prompt and watch two AI chatbots have a conversation.
              </p>
            </div>
          </div>
        ) : (
          messages.map((message, index) => (
            <div key={index} className={`flex ${message.role === "bot1" ? "justify-start" : "justify-end"}`}>
              <div
                className={`max-w-[80%] p-4 rounded-lg ${
                  message.role === "bot1"
                    ? "bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-br-none"
                    : "bg-blue-600 text-white rounded-bl-none"
                } shadow-sm animate-fadeIn`}
              >
                <div className="font-medium mb-1 text-sm opacity-75">{message.role === "bot1" ? "Bot 1" : "Bot 2"}</div>
                <div className="whitespace-pre-wrap">{message.content}</div>
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />

        {conversationComplete && (
          <div className="text-center py-4 text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800/50 rounded-lg">
            Conversation complete. You can reset to start a new conversation.
          </div>
        )}
      </div>

      {/* Input area */}
      <div className="border-t border-gray-200 dark:border-gray-800 p-4">
        <div className="max-w-4xl mx-auto flex gap-2 items-center">
          <Input
            placeholder="Enter an initial prompt..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isLoading || conversationComplete}
            className="flex-1 py-6 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700"
          />

          {conversationComplete ? (
            <Button
              onClick={resetConversation}
              className="h-12 px-4 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200"
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Reset
            </Button>
          ) : (
            <Button
              onClick={startConversation}
              disabled={!prompt.trim() || isLoading}
              className="h-12 px-4 bg-blue-600 hover:bg-blue-700 text-white"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Start
                </>
              )}
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

