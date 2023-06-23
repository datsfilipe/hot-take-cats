import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/router";

export const Home = () => {
  const navigate = useNavigate({ from: "/" });

  const [password, setPassword] = useState<string | null>(null);
  const numbers = Array.from(Array(9), (_, i) => i + 1);
  numbers.push(0);

  useEffect(() => {
    if (password?.length === 3) {
      if (password === "666") {
        alert("You have unlocked the secret!");

        setTimeout(() => {
          navigate({
            to: "/cat",
          });
        }, 1500);
      } else {
        alert("Wrong password!");

        setPassword(null);
      }
    }
  }, [password, navigate]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold">Enter THE 3 digits password</h1>
      <p className="font-medium text-2xl mt-4 mb-2">
        {password ? password : "..."}
      </p>
      <div className="max-w-4xl grid grid-cols-3 gap-4 mt-4">
        {numbers.map((number) => (
          <button
            key={number}
            onClick={() => {
              setPassword(password ? password + number : number.toString());
            }}
            className="bg-gray-200 hover:bg-gray-300 text-2xl text-neutral-950 font-bold rounded-lg w-20 py-2 m-4 mx-auto"
          >
            {number}
          </button>
        ))}
        <button
          onClick={() => {
            setPassword(null);
          }}
          className="material-symbols-outlined bg-gray-200 hover:bg-gray-300 text-4xl text-neutral-950 font-bold rounded-lg py-2 m-4 mx-auto col-span-2 w-full"
        >
          backspace
        </button>
      </div>
    </div>
  );
};
