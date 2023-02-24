import React from "react";
import "./index.css";
//import memesData from "./memesData";

export default function Form() {
  let [meme, setMeme] = React.useState({
    topText: "",
    bottomText: "",
    randomImage: "http://i.imgflip.com/1bij.jpg",
  });

  let [allMeme, setAllMeme] = React.useState([]);

  function click() {
    console.log("Clicked");
    // let memesArray = allMeme.data.memes;
    let random = Math.floor(Math.random() * allMeme.length);
    // console.log(random);
    // console.log(memesData.data.memes[random].url);

    let url = allMeme[random].url;
    setMeme((prev) => ({
      ...prev,
      randomImage: url,
    }));
  }

  function handleChange(event) {
    let { value, name } = event.target;
    setMeme((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  React.useEffect(function () {
    fetch("https://api.imgflip.com/get_memes")
      .then((res) => res.json())
      .then((data) => setAllMeme(data.data.memes));
  }, []);

  return (
    <>
      <span id="textbox">
        <input
          type="text"
          placeholder="Top Text"
          name="topText"
          onChange={handleChange}
          value={meme.topText}
        />
        <input
          type="text"
          placeholder="Bottom Text"
          name="bottomText"
          onChange={handleChange}
          value={meme.bottomText}
        />
      </span>

      <button id="btn" onClick={click}>
        Get a new meme image 🖼
      </button>
      <div id="meme">
        <img src={meme.randomImage} alt="Meme Image" />
        <h2 className="img-text top">{meme.topText}</h2>
        <h2 className="img-text bottom">{meme.bottomText}</h2>
      </div>
    </>
  );
}
