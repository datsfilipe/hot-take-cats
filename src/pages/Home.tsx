import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/router";

export const Home = () => {
  const navigate = useNavigate({ from: "/" });

  const [password, setPassword] = useState<string | null>(null);
  const numbers = Array.from(Array(9), (_, i) => i + 1);
  numbers.push(0);

  useEffect(() => {
    if (password === "666") {
      alert("You have unlocked the secret!");

      setTimeout(() => {
        navigate({
          to: "/cat",
        });
      }, 1500);
    }
  }, [password, navigate]);

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
