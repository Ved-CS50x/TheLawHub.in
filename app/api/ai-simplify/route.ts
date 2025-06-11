import { NextResponse } from "next/server"

const OPENAI_API_KEY = "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"
const OPENAI_API_URL = "https://api.openai.com/v1/chat/completions"

export async function POST(request: Request) {
  try {
    const { text } = await request.json()

    if (!text) {
      return NextResponse.json(
        { error: "Text is required" },
        { status: 400 }
      )
    }

    const response = await fetch(OPENAI_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are a legal assistant trained to simplify complex legal documents, clauses, and court text for law students, clients, or the general public. Your goal is to explain the content in simple, accurate, and respectful language — avoiding legal jargon unless absolutely necessary. Maintain the original meaning and highlight any legal implications or risks in a clear way. Format your response in a clear, structured way with appropriate headings and bullet points where needed."
          },
          {
            role: "user",
            content: `Please simplify the following legal text while maintaining its accuracy and meaning:\n\n${text}`
          }
        ],
        temperature: 0.7,
        max_tokens: 2000
      })
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.error?.message || "Failed to simplify text")
    }

    return NextResponse.json({
      simplifiedText: data.choices[0].message.content
    })
  } catch (error) {
    console.error("AI Simplification Error:", error)
    return NextResponse.json(
      { error: "Failed to simplify text" },
      { status: 500 }
    )
  }
} 