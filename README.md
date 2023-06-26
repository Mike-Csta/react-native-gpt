**Module Name:** react-native-gpt

**Description:**

The `react-native-gpt` module enables convenient use of gpt models in React Native applications. This module provides asynchronous features for managing the connection to the OpenAI service, allowing you to easily generate and stream results from GPT-3, GPT-3.5-turbo, GPT-4 model.

**Installation:**

Using npm:

```bash
npm install react-native-gpt
```

**Use:**.

Import function from module:

```javascript
import react_native_gpt from "react-native-gpt";
```

Then, you can call this function with the required arguments. For example:

```javascript
react_native_gpt({
  API_KEY: "your-openai-api-key",
  model: "gpt-4",
  system: "hi, I am a chat assistant",
  stream: true,
  message: "how's the weather today?",
  setResult: (result) => console.log(result),
}).then(() => console.log("Done"));
```

** API Documentation:**

The `react_native_gpt` function accepts a configuration object with the following fields:

- `API_KEY` (required) - API key for authorization with the OpenAI service.
- `model` (optional) - The model to be used for generation. The default is "gpt-3.5-turbo".
- `system` (optional) - The system message to be passed to the model. The default is "you are a voice assistant".
- `stream` (optional) - Whether the results should be streamed. The default is `true`.
- `message` (optional) - A message from the user to be passed to the model. Default is `this message is empty`.
- `messages` (optional) - An array of messages to pass to the model. Each message is an object with two fields: `role` ("system" or "user") and `content`. By default, this array contains two messages: a system message ("you are a voice assistant") and a user message ("this message is empty").
- `setResult` (required) - A function that will be called with each new part of the result from the model. This function should take one argument, which is the new part of the result.

### Example of use with conversation (messages):

Below is an example of using the module in a React Native component:

```javascript
import React, { useState, useEffect } from "react";
import { Button, Text, View, TextInput, StyleSheet } from "react-native";
import react_native_gpt from "react-native-gpt";

const API_KEY = "your-api-key";

const Chat = () => {
  const [text, setText] = useState(""); // State to store the entered text
  const [result, setResult] = useState(""); // State to store the assistant's response
  const [history, setHistory] = useState([
    {
      role: "system",
      content: "hi, I am a chat assistant",
    },
  ]); // State to store the message history

  useEffect(() => {
    processText("Hello assistant!"); // Calling the processText function on component mount
  }, []);

  const processText = async (msg) => {
    setText(""); // Clearing the text input
    const updatedHistory = [...history, { role: "user", content: msg }]; // Updating the message history with a new user message

    try {
      await react_native_gpt({
        API_KEY: API_KEY,
        model: "gpt-4",
        system: "hi, I am a chat assistant",
        stream: true,
        messages: updatedHistory,
        setResult: (result) => {
          setResult(result); // Updating the state with the assistant's response
          setHistory((prevHistory) => [
            ...prevHistory,
            { role: "assistant", content: result },
          ]); // Updating the message history with the assistant's response
        },
      });
    } catch (error) {
      console.error(error); // Error handling
      setResult("An error occurred. Please try again."); // Setting an error message as the response
    }
  };

  return (
    <View style={styles.container}>
      {/* Displaying the message history */}
      <View style={styles.chatbox}>
        {history.map((message, index) => (
          <Text key={index} style={styles[message.role]}>
            {`${message.role}: ${message.content}`}
          </Text>
        ))}
        {/* Displaying the assistant's response */}
        <Text style={styles.assistant}>{`assistant: ${result}`}</Text>
      </View>
      {/* Text input for entering messages */}
      <TextInput
        style={styles.input}
        onChangeText={(text) => setText(text)}
        value={text}
        placeholder="Enter something..."
      />
      {/* Button to send the message */}
      <Button title="Send" onPress={() => processText(text)} />
    </View>
  );
};

export default Chat;
```

video:

https://github.com/Mike-Csta/react-native-gpt/assets/92047998/93229938-dcba-4e52-aa7e-389884af57f9
