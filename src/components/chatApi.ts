// src/api/chatApi.ts
export async function fetchChatResponse(message: string): Promise<string> {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${import.meta.env.VITE_OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'qwen/qwen3-235b-a22b:free', // or your preferred model
        messages: [{ role: 'user', content: message }],
      }),
    });
    
    if (!response.ok) {
      throw new Error('API request failed');
    }
  
    const data = await response.json();
    return data.choices[0].message.content;
  }