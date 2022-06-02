import { Button } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MainContext } from "../../context/context";
import { DropDown } from "./dropdown/DropDown";
import s from "./MainPage.module.css";

const MainPage = () => {
  const { setCharacter } = useContext(MainContext);
  const [data, setData] = useState([]);
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch(`https://rickandmortyapi.com/api/character?page=1`)
      .then((res) => res.json())
      .then((result) => {
        setPages(result.info);
        setData(result.results);
      });
  }, []);
  const navigate = useNavigate();

  const nextHandler = () => {
    fetch(`${pages.next}`)
      .then((res) => res.json())
      .then((result) => {
        setPages(result.info);
        setData(result.results);
      });
  };
  const previoustHandler = () => {
    fetch(`${pages.prev}`)
      .then((res) => res.json())
      .then((result) => {
        setPages(result.info);
        setData(result.results);
      });
  };

  useEffect(() => {
    setLoading(false);
    return () => {};
  }, [data]);

  const [value, setValue] = useState("");

  return (
    <div>
      <div className={s.input}>
        <div style={{ width: 200 }}>
          <DropDown
            characters={data}
            id="id"
            label="name"
            prompt="Select character..."
            value={value}
            onChange={(val) => setValue(val)}
          />
        </div>
        {/* <input
          type="text"
          placeholder="Search "
          style={{ textAlight: "center" }}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        /> */}
      </div>
      <div className={s.wrapper}>
        {!loading ? (
          <>
            {data
              ?.filter((character, idx) => {
                if (
                  character.name.toLowerCase().includes(value?.toLowerCase())
                ) {
                  return character;
                }
              })
              .map((item, idx) => (
                <div className={s.content}>
                  <div className={s.images}>
                    <img
                      src={item.image}
                      alt=""
                      onClick={() => {
                        localStorage.setItem("character", JSON.stringify(item));
                        setCharacter(item);
                        navigate(`/Character/${item.name}`);
                      }}
                    />
                  </div>
                  <div className={s.names}>{item.name}</div>
                  <div className={s.species}>{item.species}</div>
                  <div className={s.genders}>{item.gender}</div>
                </div>
              ))}
          </>
        ) : (
          <div>Loading...</div>
        )}
      </div>
      <div className={s.buttons}>
        {!pages.prev ? (
          <div></div>
        ) : (
          <>
            <Button
              variant="contained"
              onClick={previoustHandler}
              style={{ width: "150px" }}
            >
              Previous page
            </Button>
          </>
        )}

        <Button
          variant="contained"
          onClick={nextHandler}
          style={{ width: "150px" }}
        >
          Next page
        </Button>
      </div>
    </div>
  );
};

export default MainPage;
