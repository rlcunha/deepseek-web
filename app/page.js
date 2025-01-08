'use client'
import { useState } from 'react'

export default function Home() {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSend = async () => {
    if (!input.trim()) return
    
    setIsLoading(true)
    const userMessage = { role: 'user', content: input }
    const newMessages = [...messages, userMessage]
    
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages: newMessages }),
      })

      const data = await response.json()
      if (data.error) throw new Error(data.error)

      setMessages([...newMessages, { role: 'assistant', content: data.content }])
    } catch (error) {
      console.error('Error:', error)
      alert('Erro ao processar a requisição')
    } finally {
      setIsLoading(false)
      setInput('')
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div className="w-full max-w-2xl">
        <div className="mb-4 space-y-4">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`p-4 rounded-lg ${
                msg.role === 'user'
                  ? 'bg-blue-100 ml-auto max-w-[80%]'
                  : 'bg-gray-100 mr-auto max-w-[80%]'
              }`}
            >
              <p>{msg.content}</p>
            </div>
          ))}
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            className="flex-1 p-2 border rounded"
            placeholder="Digite sua pergunta..."
            disabled={isLoading}
          />
          <button
            onClick={handleSend}
            disabled={isLoading}
            className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 disabled:opacity-50"
          >
            {isLoading ? 'Enviando...' : 'Enviar'}
          </button>
        </div>
      </div>
    </main>
  )
}