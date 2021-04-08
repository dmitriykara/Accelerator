import React, { useState, useEffect } from "react";

import "./App2.css";

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

export const App2 = () => {
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
      }, Math.random() * 100 + 1100);
    }
  }, [index]);
  return (
    <section className="main">
      <div className="sentence">
        <span style={{ fontSize: "16px" }}>Введите: </span> "Пример текста"
      </div>
      <div className="speed">{((Math.random() * 100 + 1100)) / 60 + " слов/мин"}</div>
      <div className="container">
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
          <div className={`col text ${value === "Backward" ? "active" : ""}`}>
            <div className="a">К</div>
            <div className="b">Е</div>
            <div className="c">А</div>
            <div className="d">П</div>
            <div className="e">М</div>
            <div className="f">И</div>
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
      </div>

      <div className="predictive">
        <div className="predictive__predict-word left">{first}</div>
        <div
          className={`predictive__predict-word text ${
            value === "Up" ? "accept" : ""
          }`}
        >
          {currentWord}
        </div>
        <div className="predictive__predict-word right">{second}</div>
      </div>
    </section>
  );
};
