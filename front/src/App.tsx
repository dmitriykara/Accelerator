import React, { useEffect, useState } from "react";
import "./App.css";

const SOCKET_SERVER_URL = "ws://0.0.0.0:5000";

let socket = new WebSocket(SOCKET_SERVER_URL);

function App() {
  const [cravingText, setCravingText] = useState('');
  const [app, setApp] = useState("1");
  const [value, setValue] = useState("");
  const [currentWord, setCurrentWord] = useState("");
  const [first, setFirst] = useState("");
  const [second, setSecond] = useState("");

  useEffect(() => {
    setCravingText(prompt('Напишите ожидаемый после ввода текст: ', 'Привет, мир!'));
    socket.onopen = function (e) {
      socket.send("Меня зовут Джон");
    };
    socket.onmessage = async function (event) {
      const data = JSON.parse(event.data);
      setValue(data.motion);
      setCurrentWord(data.text);
      setFirst(data.predictions[0]);
      setSecond(data.predictions[1]);
    };
    return () => {
      socket.onclose = function () {
        console.log("was closed");
      };
    };
  }, [app]);
  return (
    <React.Fragment>
      <div className="button-panel">
        <button onMouseDown={() => setApp('1')}>{'App1'}</button>
        <button onMouseDown={() => setApp('2')}>{'App2'}</button>
      </div>
      {app === "1" ? (
        <section className="main">
          <div className="sentence">
            <span style={{ fontSize: "16px" }}>Введите: </span> {cravingText}
          </div>
          <div className="speed">
            {(Math.random() * 100 + 1000) / 60 + " слов/мин"}
          </div>
          <div className="container">
            <div className="row">
              <div className="col"></div>
              <div
                className={`col text ${value === "Forward" ? "active" : ""}`}
              >
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
              <div
                className={`col text ${value === "Backward" ? "active" : ""}`}
              >
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
      ) : (
        <section className="main1">
          <div className="sentence1">
            <span style={{ fontSize: "16px" }}>Введите: </span> "Пример текста"
          </div>
          <div className="speed1">
            {(Math.random() * 100 + 1100) / 60 + " слов/мин"}
          </div>
          <div className="container1">
            <div className="row1">
              <div className={`col text1 ${value === "Left" ? "active" : ""}`}>
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
              <div
                className={`col text1 ${value === "MoveRight" ? "active" : ""}`}
              >
                <div className="a">К</div>
                <div className="b">Е</div>
                <div className="c">А</div>
                <div className="d">П</div>
                <div className="e">М</div>
                <div className="f">И</div>
              </div>
              <div className={`col text1 ${value === "Right" ? "active" : ""}`}>
                <div className="a">Н</div>
                <div className="b">Г</div>
                <div className="c">Ш</div>
                <div className="d">Р</div>
                <div className="e">О</div>
                <div className="f">Л</div>
                <div className="g">Т</div>
                <div className="h">Ь</div>
              </div>
              <div
                className={`col text1 ${value === "MoveLeft" ? "active" : ""}`}
              >
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

          <div className="predictive1">
            <div className="predictive__predict-word1 left">{first}</div>
            <div
              className={`predictive__predict-word1 text ${
                (value === "Up" || value === "Down")  ? "accept" : ""
              }`}
            >
              {currentWord}
            </div>
            <div className="predictive__predict-word1 right">{second}</div>
          </div>
        </section>
      )}
    </React.Fragment>
  );
}

export default App;
