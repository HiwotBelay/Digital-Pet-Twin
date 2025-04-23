"use client"

import { useState, useEffect, useRef } from "react"
import { PetDisplay } from "@/components/pet-display"
import { VoiceControls } from "@/components/voice-controls"
import { EmotionDisplay } from "@/components/emotion-display"
import { MemoryManager } from "@/components/memory-manager"
import { PetSettings } from "@/components/pet-settings"
import { Button } from "@/components/ui/button"
import { Settings, Volume2, VolumeX } from "lucide-react"

export default function Home() {
  const [petName, setPetName] = useState<string>("Buddy")
  const [petType, setPetType] = useState<string>("dog")
  const [petColor, setPetColor] = useState<string>("golden")
  const [currentEmotion, setCurrentEmotion] = useState<string>("happy")
  const [isMuted, setIsMuted] = useState<boolean>(false)
  const [showSettings, setShowSettings] = useState<boolean>(false)
  const [conversation, setConversation] = useState<Array<{ text: string; sender: string }>>([])
  const conversationRef = useRef<HTMLDivElement>(null)

  // Load saved pet data on initial render
  useEffect(() => {
    const savedPetName = localStorage.getItem("petName")
    const savedPetType = localStorage.getItem("petType")
    const savedPetColor = localStorage.getItem("petColor")

    if (savedPetName) setPetName(savedPetName)
    if (savedPetType) setPetType(savedPetType)
    if (savedPetColor) setPetColor(savedPetColor)

    // Add initial greeting
    setConversation([
      {
        text: `Hi there! I'm ${savedPetName || petName}. How are you today?`,
        sender: "pet",
      },
    ])
  }, [])

  // Scroll to bottom of conversation when it updates
  useEffect(() => {
    if (conversationRef.current) {
      conversationRef.current.scrollTop = conversationRef.current.scrollHeight
    }
  }, [conversation])

  const handleUserMessage = (message: string) => {
    // Add user message to conversation
    setConversation((prev) => [...prev, { text: message, sender: "user" }])

    // Process message and generate response
    setTimeout(() => {
      const response = generatePetResponse(message, currentEmotion)
      setConversation((prev) => [...prev, { text: response.text, sender: "pet" }])
      setCurrentEmotion(response.emotion)
    }, 1000)
  }

  const generatePetResponse = (message: string, currentEmotion: string) => {
    // Enhanced response generation with more emotions
    const lowerMessage = message.toLowerCase()
    const response = { text: "", emotion: currentEmotion }

    // Check for emotion triggers in the message
    if (lowerMessage.includes("hello") || lowerMessage.includes("hi") || lowerMessage.includes("hey")) {
      response.text = `Hello! It's great to see you! What would you like to talk about?`
      response.emotion = "excited"
    } else if (lowerMessage.includes("how are you")) {
      response.text = `I'm feeling ${currentEmotion} today! Thanks for asking.`
    } else if (lowerMessage.includes("play") || lowerMessage.includes("fun") || lowerMessage.includes("game")) {
      response.text = `I'd love to play! What game did you have in mind?`
      response.emotion = "playful"
    } else if (lowerMessage.includes("food") || lowerMessage.includes("treat") || lowerMessage.includes("hungry")) {
      response.text = `Yum! Did someone say treats? I'm always ready for a snack!`
      response.emotion = "hungry"
    } else if (lowerMessage.includes("bad") || lowerMessage.includes("sad") || lowerMessage.includes("upset")) {
      response.text = `I'm sorry to hear that. Maybe I can cheer you up with my silly antics?`
      response.emotion = "sad"
    } else if (lowerMessage.includes("good") || lowerMessage.includes("happy") || lowerMessage.includes("great")) {
      response.text = `That's wonderful! I'm happy when you're happy!`
      response.emotion = "happy"
    } else if (lowerMessage.includes("dance") || lowerMessage.includes("music") || lowerMessage.includes("sing")) {
      response.text = `I love to dance! Watch me show off my moves!`
      response.emotion = "dancing"
    } else if (lowerMessage.includes("wow") || lowerMessage.includes("amazing") || lowerMessage.includes("surprise")) {
      response.text = `I know, right? Isn't that incredible?`
      response.emotion = "shocked"
    } else if (lowerMessage.includes("love") || lowerMessage.includes("cuddle") || lowerMessage.includes("hug")) {
      response.text = `Aww, I love you too! You're the best friend ever!`
      response.emotion = "loving"
    } else if (lowerMessage.includes("sleep") || lowerMessage.includes("tired") || lowerMessage.includes("rest")) {
      response.text = `*yawn* I could use a little nap too...`
      response.emotion = "sleepy"
    } else if (lowerMessage.includes("joke") || lowerMessage.includes("funny") || lowerMessage.includes("laugh")) {
      response.text = `Why don't pets play poker in the jungle? Too many cheetahs! Haha!`
      response.emotion = "laughing"
    } else if (lowerMessage.includes("scared") || lowerMessage.includes("fear") || lowerMessage.includes("afraid")) {
      response.text = `Don't worry, I'll protect you! Even though I'm a bit scared too...`
      response.emotion = "scared"
    } else if (
      lowerMessage.includes("curious") ||
      lowerMessage.includes("wonder") ||
      lowerMessage.includes("what if")
    ) {
      response.text = `Hmm, that's interesting! Tell me more about that!`
      response.emotion = "curious"
    } else {
      // Default responses with random emotions to make the pet feel more alive
      const defaultResponses = [
        { text: `I'm listening! Tell me more about that.`, emotion: "curious" },
        { text: `That's interesting! What else is on your mind?`, emotion: "happy" },
        { text: `I'm so glad we're chatting today!`, emotion: "excited" },
        { text: `Hmm, I'm thinking about what you said...`, emotion: "thinking" },
        { text: `I wonder what we should talk about next?`, emotion: "playful" },
      ]

      const randomResponse = defaultResponses[Math.floor(Math.random() * defaultResponses.length)]
      response.text = randomResponse.text
      response.emotion = randomResponse.emotion
    }

    return response
  }

  const handleSavePetSettings = (name: string, type: string, color: string) => {
    setPetName(name)
    setPetType(type)
    setPetColor(color)

    // Save to localStorage
    localStorage.setItem("petName", name)
    localStorage.setItem("petType", type)
    localStorage.setItem("petColor", color)

    setShowSettings(false)
  }

  // Function to manually set emotion for testing
  const handleEmotionChange = (emotion: string) => {
    setCurrentEmotion(emotion)
    setConversation((prev) => [
      ...prev,
      {
        text: `I'm feeling ${emotion} now!`,
        sender: "pet",
      },
    ])
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-4 bg-gradient-to-b from-slate-50 to-slate-100">
      <div className="max-w-4xl w-full flex flex-col items-center gap-6">
        <div className="w-full flex justify-between items-center">
          <h1 className="text-3xl font-bold text-slate-800">My Pet Twin: {petName}</h1>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setIsMuted(!isMuted)}
              aria-label={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
            </Button>
            <Button variant="outline" size="icon" onClick={() => setShowSettings(!showSettings)} aria-label="Settings">
              <Settings className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col items-center gap-4">
            <PetDisplay petType={petType} petColor={petColor} emotion={currentEmotion} petName={petName} />
            <EmotionDisplay emotion={currentEmotion} />

            {/* Emotion testing buttons */}
            <div className="grid grid-cols-4 gap-2 mt-4 w-full">
              <Button size="sm" variant="outline" onClick={() => handleEmotionChange("happy")}>
                Happy
              </Button>
              <Button size="sm" variant="outline" onClick={() => handleEmotionChange("sad")}>
                Sad
              </Button>
              <Button size="sm" variant="outline" onClick={() => handleEmotionChange("excited")}>
                Excited
              </Button>
              <Button size="sm" variant="outline" onClick={() => handleEmotionChange("playful")}>
                Playful
              </Button>
              <Button size="sm" variant="outline" onClick={() => handleEmotionChange("hungry")}>
                Hungry
              </Button>
              <Button size="sm" variant="outline" onClick={() => handleEmotionChange("shocked")}>
                Shocked
              </Button>
              <Button size="sm" variant="outline" onClick={() => handleEmotionChange("dancing")}>
                Dancing
              </Button>
              <Button size="sm" variant="outline" onClick={() => handleEmotionChange("loving")}>
                Loving
              </Button>
              <Button size="sm" variant="outline" onClick={() => handleEmotionChange("sleepy")}>
                Sleepy
              </Button>
              <Button size="sm" variant="outline" onClick={() => handleEmotionChange("laughing")}>
                Laughing
              </Button>
              <Button size="sm" variant="outline" onClick={() => handleEmotionChange("scared")}>
                Scared
              </Button>
              <Button size="sm" variant="outline" onClick={() => handleEmotionChange("curious")}>
                Curious
              </Button>
            </div>
          </div>

          <div className="flex flex-col h-full">
            <div
              ref={conversationRef}
              className="flex-1 bg-white rounded-lg p-4 shadow-sm mb-4 overflow-y-auto h-80 border"
            >
              {conversation.map((message, index) => (
                <div key={index} className={`mb-3 ${message.sender === "user" ? "text-right" : "text-left"}`}>
                  <div
                    className={`inline-block px-4 py-2 rounded-lg ${
                      message.sender === "user" ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              ))}
            </div>

            <VoiceControls onUserMessage={handleUserMessage} isMuted={isMuted} />
          </div>
        </div>

        <MemoryManager conversation={conversation} />

        {showSettings && (
          <PetSettings
            currentName={petName}
            currentType={petType}
            currentColor={petColor}
            onSave={handleSavePetSettings}
            onCancel={() => setShowSettings(false)}
          />
        )}
      </div>
    </main>
  )
}

