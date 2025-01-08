# Deepseek Web App

A Next.js application for interacting with Deepseek API.

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env.local` file with your Deepseek token:
   ```
   DEEPSEEK_API_KEY=your_api_key_here
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```

## Deployment

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```
2. Deploy to Vercel:
   ```bash
   vercel
   ```
3. Set environment variables in Vercel dashboard:
   - DEEPSEEK_API_KEY

## Features

- Chat interface with Deepseek API
- Conversation history
- Error handling
- Rate limiting
- Vercel deployment ready
