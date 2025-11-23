const OPENAI_API_KEY = "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";
const GEMINI_API_KEY = "AIzaSyCqoZSs5kIISGh4SpPPPijXq_Ftzd5d8lM";

async function askAI() {

  const question = document.getElementById("question").value;
  const answer = document.getElementById("answer");

  answer.textContent = "Loading response...";

  // ---- GPT ----
  const gptResponse = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${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}`
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: question }]
    })
  });

  const gptData = await gptResponse.json();
  const gptAnswer = gptData.choices[0].message.content;

  // ---- Gemini ----
  const geminiResponse = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${AIzaSyCqoZSs5kIISGh4SpPPPijXq_Ftzd5d8lM}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          { parts: [{ text: question }] }
        ]
      })
    }
  );

  const geminiData = await geminiResponse.json();
  const geminiAnswer = geminiData.candidates[0].content.parts[0].text;

  answer.textContent = 
`📘 GPT Response:
${gptAnswer}


📗 Gemini Response:
${geminiAnswer}


✅ Final Educational Answer:
Both models gave valuable educational explanations.`;
}
