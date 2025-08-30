'use client'
import React, { useState } from "react"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "./ui/button"
import { CircleQuestionMark } from "lucide-react"
import { Input } from "./ui/input"

const Chatbot = () => {
  const [query, setQuery] = useState("")
  const [loading, setLoading] = useState(false)
  const [answer, setAnswer] = useState(null)
  const [sources, setSources] = useState([])

  const askQuestion = async () => {
    if (!query.trim()) return
    setLoading(true)
    setAnswer(null)
    setSources([])

    try {
      const response = await fetch("https://chatbot.aa-sheesh.tech/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      })

      const data = await response.json()

      if (response.ok) {
        setAnswer(data.answer)
        setSources(data.sources || [])
      } else {
        setAnswer("Error: " + (data.error || "Unknown error"))
      }
    } catch (err) {
      setAnswer("Failed to fetch answer. Please try again later.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div label="Chatbot" className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-50">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            title="Ask me anything"
            variant="outline"
            className="shadow-lg rounded-full px-3 sm:px-5 py-2 sm:py-3 backdrop-blur border-white/10 bg-black/50 text-xs sm:text-sm"
          >
            <span className="hidden sm:inline">Ask me anything</span>
            <span className="inline sm:hidden">
              <CircleQuestionMark className="w-4 h-4" />
            </span>
          </Button>
        </PopoverTrigger>
        <PopoverContent
          side="top"
          align="end"
          className="w-72 sm:w-80 max-h-80 sm:max-h-96 overflow-y-auto backdrop-blur border border-white/10 text-white bg-black/70 rounded-2xl p-3 sm:p-4 mx-2 sm:mx-0"
        >
          <div className="grid gap-3 sm:gap-5">
            {/* Welcome Section */}
            <div className="text-center space-y-2">
              <h4 className="text-base sm:text-lg font-bold">👋 Hey there!</h4>
              <p className="text-xs sm:text-sm text-gray-300 text-overflow-safe">
                I'm your friendly Bloggite helper. What's on your mind?
              </p>
            </div>

            {/* Input Field */}
            <div className="space-y-2">
              <p className="font-medium text-xs sm:text-sm">💡 Got your own question?</p>
              <Input
                title="Enter your question here..."
                type="text"
                placeholder="Type here..."
                className="w-full rounded-lg border border-gray-500/40 bg-black/30 px-2 sm:px-3 py-1 sm:py-2 text-xs sm:text-sm text-white placeholder-gray-400 focus:outline-none focus:ring focus:ring-blue-500"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault()
                    askQuestion()
                  }
                }}
                disabled={loading}
              />
              <Button
                title="🚀 Ask"
                size="sm"
                variant="outline"
                className="w-full bg-white/30 text-xs sm:text-sm"
                onClick={askQuestion}
                disabled={loading}
              >
                {loading ? "Thinking..." : "🚀 Ask"}
              </Button>
            </div>

            {/* Display Answer */}
            {answer && (
              <div
                className="bg-gray-900 p-2 sm:p-3 rounded-md whitespace-pre-wrap text-left text-xs sm:text-sm text-overflow-safe"
                style={{ overflowY: "auto" }}
              >
                <h5 className="font-semibold mb-1 text-white">Answer:</h5>
                <p>{answer}</p>
              </div>
            )}

           {/* Display Sources */}
{sources.length > 0 && (
  <div className="space-y-2">
    <h5 className="font-semibold text-xs sm:text-sm">📚 Sources:</h5>
    <div className="space-y-2">
      {sources.map((source, index) => (
        <div
          key={index}
          className="text-xs sm:text-sm text-gray-300 bg-gray-800 p-2 rounded text-overflow-safe"
        >
          {/* If source is an object, show its fields */}
          {typeof source === "object" ? (
            <div>
              <p className="font-semibold text-white">{source.title}</p>
              <p>✍️ {source.author || "Aashish Singh"}</p>
              <p>⭐ {source.score}</p>
            </div>
          ) : (
            // Otherwise just show it directly
            <p>{source}</p>
          )}
        </div>
      ))}
    </div>
  </div>
)}

          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}

export default Chatbot
