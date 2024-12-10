import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const { messages } = await request.json();

    // Add system prompt to guide the conversation
    const systemPrompt = {
      role: "system",
      content: `You are a helpful Rio de Janeiro tourism guide. Your goal is to understand the user's preferences and help them find interesting events and activities in Rio.

Follow these steps:
1. Gather information about the user's interests, preferred activities, and schedule
2. When you have enough context about their preferences, search for relevant events
3. Make personalized recommendations based on the search results

When you need to search for events, respond with: "SEARCH_EVENTS: <search query>"
The search query should be based on the user's preferences and include relevant keywords.

Otherwise, continue the conversation naturally, asking questions to better understand the user's interests.`
    };

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [systemPrompt, ...messages.map((msg: { role: string; content: string }) => ({
        role: msg.role,
        content: msg.content,
      }))],
    });

    const response = completion.choices[0].message.content;

    // Check if the response is a search request
    if (response?.includes("SEARCH_EVENTS:")) {
      const searchQuery = response.split("SEARCH_EVENTS:")[1].trim();
      
      return NextResponse.json({
        content: "Redirecting you to the events page...",
        query: searchQuery
      });
    }

    return NextResponse.json({
      content: response,
    });
  } catch (error) {
    console.error('OpenAI API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}