import "./Publish.css";
import Dropzone from "react-dropzone";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Publish = ({ token }) => {
  const navigate = useNavigate();
  const [picture, setPicture] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [state, setState] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");

  const addPicture = (picToAdd) => {
    const newPicture = [...picture];
    for (let i = 0; i < picToAdd.length; i++) {
      newPicture.push(picToAdd[i]);
    }
    setPicture(newPicture);
  };

  const addArticle = async (event) => {
    try {
      event.preventDefault();
      const data = new FormData();
      data.append("title", title);
      data.append("description", description);
      data.append("price", price);
      data.append("condition", state);
      data.append("city", location);
      data.append("brand", brand);
      data.append("size", size);
      data.append("color", color);
      data.append("picture", picture);

      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/offer/publish",
        data,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        navigate("/");
      }
    } catch (error) {
      console.log(error.response);
    }
  };
  return (
    <div className="background">
      <form className="add-article-area container" onSubmit={addArticle}>
        <h1>Vends ton article</h1>
        {/* <Dropzone onDrop={(acceptedFiles) => addPicture(acceptedFiles)}>
          {({ getRootProps, getInputProps }) => (
            <section className="drop-area ">
              <div className="drop-zone" {...getRootProps()}>
                <input {...getInputProps()} />
                <p>Drag 'n' drop some files here, or click to select files</p>
              </div>
            </section>
          )}
        </Dropzone>
        <aside>
          <ul>
            {picture.map((file) => (
              <li key={file.path}>
                {file.path} - {file.size} bytes
              </li>
            ))}
          </ul>
        </aside> */}
        <input
          type="file"
          onChange={(event) => {
            setPicture(event.target.files[0]);
          }}
        />
        <div className="article-description">
          <div className="article-line">
            <span>Titre</span>
            <input
              type="text"
              placeholder="ex. Chemise Sézane verte"
              onChange={(event) => setTitle(event.target.value)}
            />
          </div>
          <div className="line"></div>
          <div className="article-line">
            <span>Décris ton article</span>
            <textarea
              placeholder="ex. porté quelquefois, taille correctement"
              onChange={(event) => setDescription(event.target.value)}
            ></textarea>
          </div>
        </div>
        <div className="article-description">
          <div className="article-line">
            <span>Marque</span>
            <input
              type="text"
              placeholder="ex. Zara"
              onChange={(event) => setBrand(event.target.value)}
            />
          </div>
          <div className="line"></div>

          <div className="article-line">
            <span>Taille</span>
            <input
              type="text"
              placeholder="ex. L/40/12"
              onChange={(event) => setSize(event.target.value)}
            />
          </div>
          <div className="line"></div>
          <div className="article-line">
            <span>Couleur</span>
            <input
              type="text"
              placeholder="ex. Fushia"
              onChange={(event) => setColor(event.target.value)}
            />
          </div>
          <div className="line"></div>
          <div className="article-line">
            <span>Etat</span>
            <input
              type="text"
              placeholder="ex. Neuf avec étiquette"
              onChange={(event) => setState(event.target.value)}
            />
          </div>
          <div className="line"></div>
          <div className="article-line">
            <span>Lieu</span>
            <input
              type="text"
              placeholder="ex. Paris"
              onChange={(event) => setLocation(event.target.value)}
            />
          </div>
        </div>
        <div className="article-description">
          <div className="article-line price">
            <span>Prix</span>
            <input
              type="text"
              placeholder="0.00€"
              onChange={(event) => setPrice(event.target.value)}
            />
          </div>
          <div className="article-line">
            <span></span>
            <span>
              <input type="checkbox" />
              <span style={{ marginLeft: "10px" }}>
                Je suis Intéressé(e) par les échanges
              </span>
            </span>
          </div>
        </div>
        <button className="add-article" type="submit">
          Ajouter
        </button>
      </form>
    </div>
  );
};
export default Publish;
