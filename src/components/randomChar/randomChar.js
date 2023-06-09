import "./randomChar.scss";
import mjolnir from "../../resources/img/mjolnir.png";
import { useState, useEffect } from "react";
import useCharacterService from "../../services/CharacterService";
import setContent from "../../utils/setContent";
const RandomChar = () => {
  const [char, setChar] = useState({});
  const { process, setProcess, getCharacter, clearError } =
    useCharacterService();

  useEffect(() => {
    getCharacterData();
  }, []);

  const getCharacterData = () => {
    const randomId = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
    clearError();
    getCharacter(randomId)
      .then((char) => {
        setChar(char);
      })
      .then(() => setProcess("complete"));
  };

  return (
    <section className="random">
      <div className="container">
        <div className="random__wrapper">
          <div className="random__info">{setContent(process, View, char)}</div>
          <div className="random__choice">
            <h2 className="random__choice-title">
              Random character for today! Do you want to get to know him better?
            </h2>
            <h3 className="random__choice-subtitle">Or choose another one</h3>
            <img src={mjolnir} alt="mjolnir" className="random__choice-img" />
            <button
              className="btn btn_red random__choice__btn"
              onClick={getCharacterData}
            >
              TRY IT
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

const View = ({ data }) => {
  const { name, description, thumbnail, homepage, wiki } = data;
  return (
    <div className="random__info-content">
      <img src={thumbnail} alt="random" className="random__info-img" />
      <div className="random__info-desc">
        <h2 className="random__info-title">{name}</h2>
        <p className="random__info-text">
          {description?.length > 194
            ? description.slice(0, 192) + "..."
            : description}
        </p>
        <div className="random__info-btns">
          <a href={homepage} className="btn btn_red">
            HOMEPAGE
          </a>
          <a href={wiki} className="btn btn_grey">
            WIKI
          </a>
        </div>
      </div>
    </div>
  );
};
export default RandomChar;
