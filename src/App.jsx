import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>
        <strong>22120310_22120221_22120085</strong>
        <br />
        <strong>Version 3</strong>
        <br />
        <strong>mạng máy tính thật là vui</strong>
      </h1>
      
    </>
  );
}

export default App;
