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
    <div label="Chatbot" className="fixed bottom-6 right-6 z-50">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="shadow-lg rounded-full px-5 py-3 backdrop-blur"
          >
            <span className="hidden sm:inline">Ask me anything</span>
            <span className="inline sm:hidden">
              <CircleQuestionMark />
            </span>
          </Button>
        </PopoverTrigger>
        <PopoverContent
          side="top"
          align="end"
          className="w-80 max-h-96 overflow-y-auto backdrop-blur border border-white/10 text-white bg-black/70 rounded-2xl p-4"
        >
          <div className="grid gap-5">
            {/* Welcome Section */}
            <div className="text-center space-y-2">
              <h4 className="text-lg font-bold">👋 Hey there!</h4>
              <p className="text-sm text-gray-300">
                I’m your friendly Bloggite helper. What’s on your mind?
              </p>
            </div>

            {/* Input Field */}
            <div className="space-y-2">
              <p className="font-medium text-sm">💡 Got your own question?</p>
              <Input
                type="text"
                placeholder="Type here..."
                className="w-full rounded-lg border border-gray-500/40 bg-black/30 px-3 py-2 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring focus:ring-blue-500"
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
                size="sm"
                variant="outline"
                className="w-full bg-white/30"
                onClick={askQuestion}
                disabled={loading}
              >
                {loading ? "Thinking..." : "🚀 Ask"}
              </Button>
            </div>

            {/* Display Answer */}
            {answer && (
              <div
                className="bg-gray-900 p-3 rounded-md whitespace-pre-wrap text-left"
                style={{ overflowY: "auto" }}
              >
                <h5 className="font-semibold mb-1 text-white">Answer:</h5>
                <p>{answer}</p>
              </div>
            )}

            {/* Display Sources */}
            {sources.length > 0 && (
              <div className="text-xs text-gray-400 mt-2 overflow-y-auto ">
                <h6 className="font-semibold mb-1">Sources:</h6>
                <ul className="list-disc list-inside space-y-1">
                  {sources.map((src, idx) => (
                    <li key={idx}>
                      {src.title} 
                      </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}

export default Chatbot
