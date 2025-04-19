import { useEffect, useState } from "react";
import phrases from "../utils/phrases.json";

export const Home = () => {
  const [state, setState] = useState<{
    imageData: string | null;
    altText: string;
    isLoading: boolean;
  }>({
    imageData: null,
    altText: "Loading cat image...",
    isLoading: true
  });
  const fontSize = 32;

  useEffect(() => {
    const lastFetchTime = localStorage.getItem("catLastFetchTime");
    const now = Date.now();

    if (lastFetchTime && now - parseInt(lastFetchTime) < 5000) {
      const cachedImageData = localStorage.getItem("catImageData");
      const cachedAltText = localStorage.getItem("catAltText");

      if (cachedImageData && cachedAltText) {
        setState({
          imageData: cachedImageData,
          altText: cachedAltText,
          isLoading: false
        });
        return;
      }
    }

    const random = Math.floor(Math.random() * phrases.length);
    const selectedPhrase = phrases[random];

    const characterWidth = 0.6 * fontSize;
    const textWidth = Math.ceil(selectedPhrase.length * characterWidth);
    const imageWidth = Math.max(600, textWidth + 100);
    const encodedPhrase = encodeURIComponent(selectedPhrase);

    const url = `https://cataas.com/cat/cute/says/${encodedPhrase}?fontSize=${fontSize}&width=${imageWidth}&height=400`;

    setState(prev => ({ ...prev, isLoading: true }));

    fetch(url)
      .then(response => response.blob())
      .then(blob => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64data = reader.result;
          if (!base64data) {
            return;
          }

          setState({
            imageData: base64data.toString(),
            altText: `Cat image with text: "${selectedPhrase}"`,
            isLoading: false
          });

          localStorage.setItem("catImageData", base64data.toString());
          localStorage.setItem("catAltText", `Cat image with text: "${selectedPhrase}"`);
          localStorage.setItem("catLastFetchTime", now.toString());
        };
        reader.readAsDataURL(blob);
      })
      .catch(error => {
        console.error("Error fetching cat image:", error);
        setState(prev => ({ ...prev, isLoading: false }));
      });
  }, []);

  return (
    <div className="w-full h-full flex justify-center items-center">
      {state.isLoading ? (
        <p>Loading cute cat...</p>
      ) : state.imageData ? (
        <img
          src={state.imageData}
          alt={state.altText}
          className="max-h-screen max-w-full"
        />
      ) : null}
    </div>
  );
};
