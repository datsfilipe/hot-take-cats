import { useState } from "react";

export const Home = () => {
  const [password, setPassword] = useState<string | null>(null);
  const numbers = Array.from(Array(9), (_, i) => i + 1);
  numbers.push(0);

  return (
    <div>
      <h1>Enter THE password</h1>
      <p>{password}</p>
      {numbers.map((number) => (
        <button
          key={number}
          onClick={() => {
            setPassword(password ? password + number : number.toString());
          }}
        >
          {number}
        </button>
      ))}
    </div>
  );
};
