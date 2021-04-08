import React, { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import "./App.css";

const NEW_CHAT_MESSAGE_EVENT = "newChatMessage"; // Name of the event
const SOCKET_SERVER_URL = "ws://localhost:80";

let socket = new WebSocket(SOCKET_SERVER_URL);

socket.onopen = function (e) {
  console.log("[open] Соединение установлено");
  console.log("Отправляем данные на сервер");
  socket.send("Меня зовут Джон");
};

socket.onmessage = function (event) {
  console.log(`[message] Данные получены с сервера: ${event.data}`);
};

socket.onclose = function (event) {
  if (event.wasClean) {
    console.log(
      `[close] Соединение закрыто чисто, код=${event.code} причина=${event.reason}`
    );
  } else {
    // например, сервер убил процесс или сеть недоступна
    // обычно в этом случае event.code 1006
    console.log("[close] Соединение прервано");
  }
};

socket.onerror = function (error) {
  console.log(`[error] ${error}`);
};
const useChat = () => {
  const [messages, setMessages] = useState([]); // Sent and received messages
  const socketRef = useRef();

  useEffect(() => {
    // Creates a WebSocket connection
    socketRef.current = io(SOCKET_SERVER_URL);

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  function subscribeToTimer(cb: any) {
    socketRef.current.on("timer", (timestamp: any) => cb(null, timestamp));
    socketRef.current.emit("subscribeToTimer", 1000);
  }

  return { messages, subscribeToTimer };
};

const input: string[] = [
  "Backward",
  "Right",
  "Backward",
  "Backward",
  "Up",
  "Right",
  "Backward",
  "Backward",
  "Left",
  "Right",
  "Up",
];

const wordSuggestions = [
  { word: "п", first: "по", second: "привет" },
  { word: "пр", first: "привет", second: "просто" },
  { word: "при", first: "принято", second: "привет" },
  { word: "прим", first: "примерно", second: "пример" },
  { word: "пример " },
  { word: "пример т", first: "ты", second: "так" },
  { word: "пример те", first: "тебе", second: "тебя" },
  { word: "пример тек", first: "текст", second: "текстов" },
  { word: "пример текс", first: "текст", second: "текстов" },
  { word: "пример текст", first: "текст", second: "текста" },
  { word: "пример текста " },
];

function App() {
  const [value, setValue] = useState("");
  const [index, setIndex] = useState(0);
  const [currentWord, setCurrentWord] = useState("");
  const [first, setFirst] = useState("");
  const [second, setSecond] = useState("");

  useEffect(() => {
    if (index !== input.length) {
      const timerId = setTimeout(() => {
        setValue(input[index]);
        setIndex((prev: number) => ++prev);
        setCurrentWord(wordSuggestions[index].word);
        setFirst(wordSuggestions[index].first);
        setSecond(wordSuggestions[index].second);
      }, Math.random() * 100 + 1000);
    }
  }, [index]);

  return (
    <section className="main">
      <div className="sentence">
        <span style={{ fontSize: "16px" }}>Введите: </span> "Пример текста"
      </div>
      <div className="speed">
        {(Math.random() * 100 + 1000) / 60 + " слов/мин"}
      </div>
      <div className="container">
        <div className="row">
          <div className="col"></div>
          <div className={`col text ${value === "Forward" ? "active" : ""}`}>
            <div className="a">Ш</div>
            <div className="b">З</div>
            <div className="c">Х</div>
            <div className="d">Ъ</div>
            <div className="e">Д</div>
            <div className="f">Ж</div>
            <div className="g">Э</div>
            <div className="h">Б</div>
            <div className="k">Ю</div>
          </div>
          <div className="col"></div>
        </div>
        <div className="row">
          <div className={`col text ${value === "Left" ? "active" : ""}`}>
            <div className="a">Й</div>
            <div className="b">Ц</div>
            <div className="c">У</div>
            <div className="d">Ф</div>
            <div className="e">Ы</div>
            <div className="f">В</div>
            <div className="g">Я</div>
            <div className="h">Ч</div>
            <div className="k">С</div>
          </div>
          <div className={`col marker ${value === "Up" ? "accept" : ""}`}>
            <svg
              width="100"
              height="100"
              viewBox="0 0 144 150"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="143.895" height="150" fill="url(#pattern0)" />
              <defs>
                <pattern
                  id="pattern0"
                  patternContentUnits="objectBoundingBox"
                  width="1"
                  height="1"
                >
                  <use
                    href="#image0"
                    transform="translate(-0.0212121) scale(0.0115825 0.0111111)"
                  />
                </pattern>
                <image
                  id="image0"
                  width="90"
                  height="90"
                  href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABaCAYAAAA4qEECAAAABmJLR0QA/wD/AP+gvaeTAAACjklEQVR4nO3bzW7TQBTF8T9QSsICFnTZICF4AHgxEEJUCImuCjwZC1REAamtQETQvgQfahsW7hCw4tjxzNy54POTvCVnTi/jjzggIiIiIiIiIiIiIiL/jUuZ//014AIwy/w5sdapMnrP+ZdrwFPgEPgJnAIfgMfAuGCuujGwBexTZfwBfASeANcL5urkNvCZ+XTUj/fApFi6uQnVH78p5yfgTrF0La4CX2gOH44pcLNQRs4/e7og16Kcnv4H/vaM9vCly+5acji2C2Rs9Y7uC5gBX4FbhvkmLN/WFh17hvk6WaM6oayyCMvJXnWSw3EKXDTIt5LvrL4Qi8nuM8nh+JYxV29v6beYnJPdd5LD8SZDpmgP6L+gHGXHljwD7ifMk8xl4BVxC0u1jcRsF+F4TXXH6NIm8VMUO9kpJnl6vhbXUkxT38ku+dlFlFjw4EoOLBc+2JIDiwIGX3KQswiVXJOjEJXcIGUxKrlFqmvc0tfq/4QU06hJ7qhU2YMqObAue5AlB1ZlD7rkIHfZKvkPucpWyQukLlslL5GqbHclu/uGV/LT1mFAJ0MDurwzoBsWA7oFN6CHSgb0mNSAHvwb0FdZBvTlrAG9bmBAL9AY0CthBvSSowG9tmtAL6IbGAG7+JimFJO9R/VrYHe28FFykKLsRwnzJHNIue2iSew2cpAhU5QrwAk+JrkuZrJPcPbLrDFwhr+Sg75ln1Gde1w5xsd20aTPNnJkmK+zl/ib5LpVJ3unQMZWG3Sb6tLPgrtO9jFwo1DGVvdYXvYuPm4ENql+UL9sy7hbLF1HG8ALqrDhzL0PPMTXiWVEdZ18wPyK6Qh4juNJbjLC2eVRg3V8DYGIiIiIiIiIiIiIiHj2C7JZ0iJqGli7AAAAAElFTkSuQmCC"
                />
              </defs>
            </svg>
          </div>
          <div className={`col text ${value === "Right" ? "active" : ""}`}>
            <div className="a">Н</div>
            <div className="b">Г</div>
            <div className="c">Ш</div>
            <div className="d">Р</div>
            <div className="e">О</div>
            <div className="f">Л</div>
            <div className="g">Т</div>
            <div className="h">Ь</div>
          </div>
        </div>
        <div className="row">
          <div className="col"></div>
          <div className={`col text ${value === "Backward" ? "active" : ""}`}>
            <div className="a">К</div>
            <div className="b">Е</div>
            <div className="c">А</div>
            <div className="d">П</div>
            <div className="e">М</div>
            <div className="f">И</div>
          </div>
          <div className="col"></div>
        </div>
      </div>

      <div className="predictive">
        <div className="predictive__predict-word left">{first}</div>
        <div className="predictive__predict-word text">{currentWord}</div>
        <div className="predictive__predict-word right">{second}</div>
      </div>
    </section>
  );
}

export default App;
