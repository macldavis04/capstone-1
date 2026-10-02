const BASE_URL = `${import.meta.env.VITE_BACKEND_URL || "http://localhost:3000"}/api/ai`;

async function streamPrompt(
  prompt: string,
  onText: (textSoFar: string) => void,
): Promise<string> {
  const res = await fetch(`${BASE_URL}/stream`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt }),
  });

  if (!res.ok) {
    const errorBody = await res.json().catch(() => ({ error: "Unknown error" }));
    throw new Error(errorBody.error || `Server error: ${res.status}`);
  }

  const reader = res.body!.getReader();
  const decoder = new TextDecoder();

  let fullText = "";
  let buffer = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split("\n");
    buffer = lines.pop() ?? "";

    for (const line of lines) {
      if (!line.startsWith("data:")) continue;
      const data = line.replace(/^data:\s*/, "").trim();
      if (!data) continue;

      try {
        const parsed = JSON.parse(data);
        const text = parsed?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text) {
          fullText += text;
          onText(fullText);
        }
      } catch {
      }
    }
  }

  return fullText;
}

export default {
  streamPrompt,
};