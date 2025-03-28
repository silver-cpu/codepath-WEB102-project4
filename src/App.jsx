import React, { useState, useEffect } from "react";
import "./App.css";
function App() {
  let [catformation, dataapply] = useState(null);
  let [buttonvar, clickcheck] = useState(false);
  let [banlist, setbanlist] = useState([]);
  const api = "live_glsG47gzoE0aanFMB8rzkhdoPsuzUf2byF1EZUItYivsR90SGnXMCjUGsKmESUrv";
  const fetcher = async () => {
  const response = await fetch("https://api.thecatapi.com/v1/breeds?"+api);
  const data = await response.json();
  while (true) {
    let rand = Math.floor(Math.random() * data.length);
    const {name, life_span, weight, origin, reference_image_id} = data[rand];
    let attributeslist = [name, life_span, weight.imperial, origin, reference_image_id];
    let bancheck = bannedattr => banlist.includes(bannedattr);
    if (attributeslist.some(bancheck)) {
      continue;
    }
    const image = new Image();
    image.src = `https://cdn2.thecatapi.com/images/${reference_image_id}.jpg`;
    image.onload = () => {
      const cat = {reference_image_id, name, life_span, weight: weight.imperial, origin, randomName: randname};
      dataapply(cat);
    };
    break;
    }
  };
  useEffect(() => {fetcher();}, []);
  const addtobanlist = (newat) => {
    setbanlist([...banlist, newat]);
    console.log(banlist);
  };
  const removefrombanlist = (at) => {
    let updateban = banlist.filter(currentattrebute => currentattrebute !== at);
    setbanlist(updateban);
    console.log(banlist);
  };
  const catnames = ["Oliver", "Liam", "Sophia", "Emma", "Noah", "Mia", "Ava", "James", "Charlotte", "Benjamin", "Amelia", "Lucas", "Harper", "Ethan", "Ella", "Alexander", "Scarlett", "Mason", "Isabella", "Sebastian"];
  const randname = catnames[Math.floor(Math.random() * catnames.length)];
  return (
    <div>
      <div className="container">
        <h1>Trippin' on Cats</h1>
        <h3>Discover cats from your wildest dreams!</h3>
        <p>😺😸😹😻😼😽🙀😿😾</p>
        <br></br>
        <div className="discover-container">
          {buttonvar && (
            <div className="listening-container">
              <h2 className="cat-name">{catformation.randomName}</h2>
              <div className="buttons">
                <button className="topbuttons" onClick={() => addtobanlist(catformation.life_span)}>{catformation.life_span}</button>
                <button className="topbuttons" onClick={() => addtobanlist(catformation.name)}>{catformation.name}</button>
                <button className="topbuttons" onClick={() => addtobanlist(catformation.weight)}>{catformation.weight}</button>
                <button className="topbuttons" onClick={() => addtobanlist(catformation.origin)}>{catformation.origin}</button>
              </div>
              <img src={`https://cdn2.thecatapi.com/images/${catformation.reference_image_id}.jpg`} height="250px" width="250px" alt="randomly generated cat pic :3"/>
            </div>
          )}
          <p></p>
          <button className="fetcher" onClick={() => { 
            fetcher();
            clickcheck(true);}}>
            🔀 Discover!
          </button>
        </div>
      </div>
<div className="list">
        <h2>Ban List</h2>
        <p>Select an attribute in your listing to ban it</p>
        <div className="sidebar">
          {banlist.map((attribute) => (
            <button key={attribute} className="listedbanoption" onClick={() => removefrombanlist(attribute)}>
              {attribute}
            </button>
          ))}
        </div>
      </div>
      </div>
  );
}

export default App;