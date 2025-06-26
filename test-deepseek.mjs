import fetch from 'node-fetch';

const API_KEY = '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';

const test = async () => {
  const prompt = 'tell me which model are u using';

  const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'mistralai/mistral-small-3.2-24b-instruct:free',
      messages: [{ role: 'user', content: prompt }]
    }),
  });

  const data = await res.json();

  const reply = data.choices[0].message.content;
  console.log(`Q: ${prompt}`);
  console.log(`A: ${reply}`);
};

test().catch(err => console.error(err));
