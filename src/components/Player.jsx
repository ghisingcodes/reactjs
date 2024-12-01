import { useRef } from "react";
import { useState } from "react";

export default function Player() {
  const inputValue = useRef();
  const [playerName, setPlayerName] = useState(null);
  // const [submitted, setSubmitted] = useState(false);

  // function changeHandler(event){
  //   setSubmitted(false);
  //   setPlayerName(event.target.value);
  // }
  function clickHandler(){
    setPlayerName(inputValue.current.value);
    inputValue.current.value = "";
    // setSubmitted(true);
  }
  return (
    <section id="player">
      {/* <h2>Welcome {submitted ? playerName : "unknown entity"}</h2> */}
      <h2>Welcome { playerName ?? "unknown entity"}</h2>
      <p>
        <input
        ref={inputValue}
        type="text"
        // value={playerName}
        // onChange={changeHandler}
      />
        <button onClick={clickHandler}>Set Name</button>
      </p>
    </section>
  );
}
