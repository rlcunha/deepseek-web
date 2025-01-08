import { NextResponse } from 'next/server'

export async function POST(request) {
  try {
    const { messages } = await request.json()
    
    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages,
        temperature: 0.7
      })
    })

    if (!response.ok) {
      throw new Error('Erro na API Deepseek')
    }

    const data = await response.json()
    return NextResponse.json(data.choices[0].message)
    
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }
}