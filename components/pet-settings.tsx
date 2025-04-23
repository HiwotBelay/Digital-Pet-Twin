"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { X } from "lucide-react"

interface PetSettingsProps {
  currentName: string
  currentType: string
  currentColor: string
  onSave: (name: string, type: string, color: string) => void
  onCancel: () => void
}

export function PetSettings({ currentName, currentType, currentColor, onSave, onCancel }: PetSettingsProps) {
  const [name, setName] = useState<string>(currentName)
  const [type, setType] = useState<string>(currentType)
  const [color, setColor] = useState<string>(currentColor)

  const handleSave = () => {
    onSave(name, type, color)
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="relative">
          <Button variant="ghost" size="icon" className="absolute right-2 top-2" onClick={onCancel}>
            <X className="h-4 w-4" />
          </Button>
          <CardTitle>Pet Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="pet-name">Pet Name</Label>
            <Input
              id="pet-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your pet's name"
            />
          </div>

          <div className="space-y-2">
            <Label>Pet Type</Label>
            <RadioGroup value={type} onValueChange={setType} className="flex flex-col space-y-1">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="dog" id="dog" />
                <Label htmlFor="dog">Dog</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="cat" id="cat" />
                <Label htmlFor="cat">Cat</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="bird" id="bird" />
                <Label htmlFor="bird">Bird</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label>Pet Color</Label>
            <RadioGroup value={color} onValueChange={setColor} className="flex flex-col space-y-1">
              {type === "dog" && (
                <>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="golden" id="golden" />
                    <Label htmlFor="golden">Golden</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="brown" id="brown" />
                    <Label htmlFor="brown">Brown</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="black" id="black" />
                    <Label htmlFor="black">Black</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="white" id="white" />
                    <Label htmlFor="white">White</Label>
                  </div>
                </>
              )}

              {type === "cat" && (
                <>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="orange" id="orange" />
                    <Label htmlFor="orange">Orange</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="gray" id="gray" />
                    <Label htmlFor="gray">Gray</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="black" id="black" />
                    <Label htmlFor="black">Black</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="white" id="white" />
                    <Label htmlFor="white">White</Label>
                  </div>
                </>
              )}

              {type === "bird" && (
                <>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="blue" id="blue" />
                    <Label htmlFor="blue">Blue</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="red" id="red" />
                    <Label htmlFor="red">Red</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="green" id="green" />
                    <Label htmlFor="green">Green</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yellow" id="yellow" />
                    <Label htmlFor="yellow">Yellow</Label>
                  </div>
                </>
              )}
            </RadioGroup>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end space-x-2">
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save Changes</Button>
        </CardFooter>
      </Card>
    </div>
  )
}

