import { Checkbox } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { MainContext } from "../../context/context";
import s from "./CharactersPage.module.css";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";

const CharactersPage = () => {
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  const { character, setCharacter } = useContext(MainContext);
  const [avatar, setAvatar] = useState(character.image);
  const [likes, setLikes] = useState(0);
  console.log("avatar", avatar);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    setCharacter(JSON.parse(localStorage.getItem("character")));
    setLoading(false);
  }, []);

  //   const imageHandler = (e) => {
  //     setAvatar({ avatar: e.target.files[0] });
  //     const formdata = new FormData();
  //     formdata.append("myfile", avatar, avatar.name);
  //     formdata.append("name", "demo");
  //   };

  return (
    <div className={s.wrapper}>
      {!loading ? (
        <>
          <div className={s.wrapper}>
            <div className={s.content}>
              <div>
                <img src={character?.image}></img>
                {/* <input type="file" name="myfile" onChange={imageHandler} /> */}
              </div>
              <div>
                <div>Name: {character?.name}</div>
                <div>Status: {character?.status}</div>
                <div>Species: {character?.species}</div>
                <div>Gender: {character?.gender}</div>
                <div className={s.liocation}>
                  <div>Location</div>
                  <div>Name: {character?.location?.name}</div>
                  <span>
                    Url:{" "}
                    <a href={character?.location?.url}>
                      {character?.location?.url}
                    </a>
                  </span>
                </div>
                <div>Created: {character.created}</div>
              </div>
            </div>
            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "start",
                  alightItems: "center",
                  marginLeft: "120px",
                }}
              >
                {" "}
                <span>
                  <Checkbox
                    {...label}
                    icon={<FavoriteBorder />}
                    checkedIcon={<Favorite />}
                    onClick={() => {
                      setLikes(likes + 1);
                    }}
                  />
                </span>
                <div style={{ marginTop: "12px" }}>{likes}</div>
              </div>
              <div style={{ display: "flex", justifyContent: "space-around" }}>
                <div>
                  <h1>Episodes</h1>
                  {character?.episode?.map((item, idx) => (
                    <div>
                      <a href={item}>{item}</a>
                    </div>
                  ))}
                </div>
                <div style={{ width: "335px" }}></div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default CharactersPage;
