import { useEffect, useState } from "react";
import phrases from "../utils/phrases.json";

export const Cat = () => {
  const [phrase, setPhrase] = useState<string>();

  useEffect(() => {
    const random = Math.floor(Math.random() * phrases.length);

    const phrase = encodeURIComponent(phrases[random]);

    setPhrase(phrase);
  }, []);

  return (
    <div className="w-full h-full flex justify-center items-center">
      <img
        src={`https://cataas.com/cat/says/${phrase}`}
        alt={`Cat image with "${phrase}" phrase written.`}
      />
    </div>
  );
};
