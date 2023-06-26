import RNEventSource from "react-native-event-source";

export default async function react_native_gpt({
  API_KEY = "",
  model = "gpt-3.5-turbo",
  system = "jesteś asystentem głosowym",
  stream = true,
  message = "ta wiadomość jest pusta",
  messages = [
    {
      role: "system",
      content: system,
    },
    {
      role: "user",
      content: message,
    },
  ],
  setResult,
}) {
  const options = {
    method: "POST", 
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
    body: JSON.stringify({
      model: model,
      messages: messages,
    
      stream: stream,
    }),
  };

  const eventSource = new RNEventSource(
    "https://api.openai.com/v1/chat/completions",
    options
  );
  zdanie = "";
  result = "";
  return new Promise((resolve) => {
    eventSource.addEventListener("message", (event) => {
      let data = JSON.parse(event.data).choices[0];
      console.log(data);
      if (data.finish_reason == "stop") {
        eventSource.close();
        resolve();
      } else if (data.delta.content != undefined) {
        zdanie += data.delta.content;
        console.log(zdanie);
        setResult((prevResult) => prevResult + data.delta.content);
      }
    });
  });
}

module.exports = react_native_gpt;
