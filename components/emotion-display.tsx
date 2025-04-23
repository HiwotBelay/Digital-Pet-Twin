"use client"

import { Badge } from "@/components/ui/badge"
import {
  Heart,
  Zap,
  Smile,
  Frown,
  Coffee,
  Music,
  AlertCircle,
  Moon,
  Laugh,
  AlertTriangle,
  Search,
  BrainCircuit,
} from "lucide-react"

interface EmotionDisplayProps {
  emotion: string
}

export function EmotionDisplay({ emotion }: EmotionDisplayProps) {
  const getEmotionIcon = () => {
    switch (emotion) {
      case "happy":
        return <Smile className="h-4 w-4 mr-1" />
      case "excited":
        return <Zap className="h-4 w-4 mr-1" />
      case "playful":
        return <Smile className="h-4 w-4 mr-1" />
      case "hungry":
        return <Coffee className="h-4 w-4 mr-1" />
      case "sad":
      case "concerned":
        return <Frown className="h-4 w-4 mr-1" />
      case "dancing":
        return <Music className="h-4 w-4 mr-1" />
      case "shocked":
        return <AlertCircle className="h-4 w-4 mr-1" />
      case "loving":
        return <Heart className="h-4 w-4 mr-1" />
      case "sleepy":
        return <Moon className="h-4 w-4 mr-1" />
      case "laughing":
        return <Laugh className="h-4 w-4 mr-1" />
      case "scared":
        return <AlertTriangle className="h-4 w-4 mr-1" />
      case "curious":
        return <Search className="h-4 w-4 mr-1" />
      case "thinking":
        return <BrainCircuit className="h-4 w-4 mr-1" />
      default:
        return <Heart className="h-4 w-4 mr-1" />
    }
  }

  const getEmotionColor = () => {
    switch (emotion) {
      case "happy":
        return "bg-green-100 text-green-800 hover:bg-green-200"
      case "excited":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
      case "playful":
        return "bg-indigo-100 text-indigo-800 hover:bg-indigo-200"
      case "hungry":
        return "bg-orange-100 text-orange-800 hover:bg-orange-200"
      case "sad":
        return "bg-blue-100 text-blue-800 hover:bg-blue-200"
      case "concerned":
        return "bg-blue-100 text-blue-800 hover:bg-blue-200"
      case "dancing":
        return "bg-purple-100 text-purple-800 hover:bg-purple-200"
      case "shocked":
        return "bg-red-100 text-red-800 hover:bg-red-200"
      case "loving":
        return "bg-pink-100 text-pink-800 hover:bg-pink-200"
      case "sleepy":
        return "bg-gray-100 text-gray-800 hover:bg-gray-200"
      case "laughing":
        return "bg-amber-100 text-amber-800 hover:bg-amber-200"
      case "scared":
        return "bg-red-100 text-red-800 hover:bg-red-200"
      case "curious":
        return "bg-cyan-100 text-cyan-800 hover:bg-cyan-200"
      case "thinking":
        return "bg-violet-100 text-violet-800 hover:bg-violet-200"
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-200"
    }
  }

  return (
    <div className="flex items-center justify-center">
      <Badge variant="outline" className={`flex items-center ${getEmotionColor()}`}>
        {getEmotionIcon()}
        <span className="capitalize">{emotion}</span>
      </Badge>
    </div>
  )
}

