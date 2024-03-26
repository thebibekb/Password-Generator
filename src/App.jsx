import { useState, useCallback ,useEffect,  useRef} from "react";

function App() {
  const [length, setlength] = useState(7);
  const [numberallowed, setnumberallowed] = useState(false);
  const [charallowed, setcharallowed] = useState(false);
  const [password, setpassword] = useState("");

  //useREf 
  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass=""
    let str = "ASDFGHJKLZXCVBNMQWERTYUIOPqwertyuiopasdfghjklzxcvbnm";
    if (numberallowed) str += "1234567890098765432112345678";
    if (charallowed) str += "!@#$%^&*_+[]{}!@#$%^&*_+[]{}";

    for (let index = 1; index <= length; index++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setpassword(pass);
  }, [length, numberallowed, charallowed]);

  const copyclipboard =useCallback(()=>{
    passwordRef.current?.select(); //? is for optional
    window.navigator.clipboard.writeText(password)
  },[password])

  useEffect(()=>{
    passwordGenerator();
  },[length,charallowed,numberallowed,passwordGenerator]
  )

  return (
    <>
      <div className="w-full max-w-md mx-auto my-72 shadow-md rounded-lg  px-4  text-blue-1000 bg-blue-100">
        Password Generator
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3"
            placeholder="Password"
            readOnly
            ref={passwordRef}
          />
          <button onClick={copyclipboard}
          className="outline-none bg-blue-800 text-yellow-100 px-3 py-0.5">
            copy
          </button>
        </div>
        <div className="flex items-center gap-x-1 ">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={7}
              max={100}
              value={length}
              className="cursor-pointer  thumb-yellow"
              onChange={(e) => {
                setlength(e.target.value);
              }}
            />
            <label>Length:{length}</label>
          </div>

          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={numberallowed}
              id="numberInput"
              onChange={() => {
                setnumberallowed((prev) => !prev);
              }}
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>

          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={charallowed}
              id="charInput"
              onChange={() => {
                setcharallowed((prev) => !prev);
              }}
            />
            <label htmlFor="charInput">Character</label>
          </div>

          <div></div>
        </div>
      </div>
    </>
  );
}

export default App;
