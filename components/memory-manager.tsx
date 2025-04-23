"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Brain } from "lucide-react"

interface MemoryManagerProps {
  conversation: Array<{ text: string; sender: string }>
}

interface Memory {
  topic: string
  sentiment: string
  frequency: number
  lastMentioned: string
}

export function MemoryManager({ conversation }: MemoryManagerProps) {
  const [memories, setMemories] = useState<Memory[]>([])
  const [showMemories, setShowMemories] = useState<boolean>(false)

  // Process conversation to extract memories
  useEffect(() => {
    if (conversation.length > 0) {
      // Simple memory extraction based on keywords
      // In a real app, this would use more sophisticated NLP
      const userMessages = conversation.filter((msg) => msg.sender === "user")

      const extractedTopics = new Map<string, Memory>()

      const topics = [
        { keyword: "play", topic: "Playing games" },
        { keyword: "food", topic: "Food preferences" },
        { keyword: "walk", topic: "Walking outdoors" },
        { keyword: "friend", topic: "Friends" },
        { keyword: "sleep", topic: "Sleep habits" },
        { keyword: "toy", topic: "Favorite toys" },
      ]

      userMessages.forEach((msg) => {
        const lowerText = msg.text.toLowerCase()

        topics.forEach(({ keyword, topic }) => {
          if (lowerText.includes(keyword)) {
            const sentiment = determineSentiment(lowerText)

            if (extractedTopics.has(topic)) {
              const memory = extractedTopics.get(topic)!
              extractedTopics.set(topic, {
                ...memory,
                frequency: memory.frequency + 1,
                lastMentioned: new Date().toLocaleDateString(),
                sentiment: sentiment,
              })
            } else {
              extractedTopics.set(topic, {
                topic,
                sentiment,
                frequency: 1,
                lastMentioned: new Date().toLocaleDateString(),
              })
            }
          }
        })
      })

      setMemories(Array.from(extractedTopics.values()))
    }
  }, [conversation])

  const determineSentiment = (text: string): string => {
    const positiveWords = ["love", "like", "good", "great", "awesome", "happy"]
    const negativeWords = ["hate", "dislike", "bad", "awful", "sad", "angry"]

    let positiveCount = 0
    let negativeCount = 0

    positiveWords.forEach((word) => {
      if (text.includes(word)) positiveCount++
    })

    negativeWords.forEach((word) => {
      if (text.includes(word)) negativeCount++
    })

    if (positiveCount > negativeCount) return "positive"
    if (negativeCount > positiveCount) return "negative"
    return "neutral"
  }

  return (
    <div className="w-full">
      <Button variant="outline" onClick={() => setShowMemories(!showMemories)} className="mb-2 w-full">
        <Brain className="h-5 w-5 mr-2" />
        {showMemories ? "Hide Pet's Memory" : "Show Pet's Memory"}
      </Button>

      {showMemories && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">What Your Pet Remembers</CardTitle>
          </CardHeader>
          <CardContent>
            {memories.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {memories.map((memory, index) => (
                  <div key={index} className="border rounded-lg p-3">
                    <div className="font-medium">{memory.topic}</div>
                    <div className="text-sm text-gray-500">
                      Mentioned {memory.frequency} {memory.frequency === 1 ? "time" : "times"}
                    </div>
                    <div className="text-sm">
                      Sentiment:
                      <span
                        className={`ml-1 ${
                          memory.sentiment === "positive"
                            ? "text-green-600"
                            : memory.sentiment === "negative"
                              ? "text-red-600"
                              : "text-gray-600"
                        }`}
                      >
                        {memory.sentiment}
                      </span>
                    </div>
                    <div className="text-xs text-gray-400">Last mentioned: {memory.lastMentioned}</div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-gray-500">
                Your pet hasn't formed any memories yet. Try talking about specific topics!
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}

