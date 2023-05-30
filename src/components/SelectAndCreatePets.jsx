import React, { memo, useMemo, useState } from "react";
// Импорт img хаски чёрный
import huskyPuppyStoitBlack from "../img/pets/husky/husky_puppy_stoit_black.png";
import puppySitBlack from "../img/pets/husky/husky_puppy_sidit_black.png";
import huskyPuppyLieBlack from "../img/pets/husky/husky_puppy_lezit_black.png";
import huskyPuppyUpBlack from "../img/pets/husky/husky_puppy_up_black.png";
// Импорт img хаски бронзовый
import huskyPuppyStoitBronz from "../img/pets/husky/husky_puppy_stoit_bronz.png";
import puppySitBronz from "../img/pets/husky/husky_puppy_sidit_bronz.png";
import huskyPuppyLieBronz from "../img/pets/husky/husky_puppy_lezit_bronz.png";
import huskyPuppyUpBronz from "../img/pets/husky/husky_puppy_up_bronz.png";
// Импорт img трансформер Бамбалби
import bamblbi from "../img/pets/bamblbi/bamblbi.png";
import bamblbiAuto from "../img/pets/bamblbi/bamblbi_auto.png";
import bamblbiDance from "../img/pets/bamblbi/bamblbi-dance.png";
import bamblbiAttack from "../img/pets/bamblbi/bamblbi-attack.png";
// Импорт img маленького дракончика
import litleDragon from "../img/pets/litle_dragon/little_dragon_0.png";
import litleDragonFireVector from "../img/pets/litle_dragon/little_dragon_1.png";
import litleDragonFireHand from "../img/pets/litle_dragon/little_dragon_2.png";
import litleDragonGame from "../img/pets/litle_dragon/little_dragon_3.png";
// Фоны
import imgBackgroundHomeDog from "../img/background/locationHome.png";
import imgBGHomeSpace from "../img/background/kosmicheskii-korabl.png";
import imgBGLitleDragon from "../img/background/bg_dragon.jpg";
// Объекты
import imgFood from "../img/items/food_v2.png";
import imgBallGreen from "../img/items/ball_v1.png";
import imgCanat from "../img/items/canat.png";
import imgShit from "../img/object/shit.png";
import imgPunchingBag from "../img/object/punching_bag.png";
// Погода
import imgMeteoNorm from "../img/icon/weather_norm.png";
import imgMeteRain from "../img/icon/icon-rain.png";
import imgMeteoHot from "../img/icon/hot-weather.png";

const SelectAndCreatePets = memo(
  ({ targetCard, flagCreate, setFlagCreate, myPets, setMyPets }) => {
    const [createPetName, setCreatePetName] = useState("");
    const [createPet, setCreatePet] = useState(null);
    const [logError, setLogError] = useState("");

    const previewSelectPets = [
      {
        id: 1,
        img: [
          huskyPuppyStoitBlack,
          puppySitBlack,
          huskyPuppyLieBlack,
          huskyPuppyUpBlack,
        ],
        type: "хаски",
        comsndOneText: "Сидеть!",
        comsndTwoText: "Лежать!",
        bgHome: [imgBackgroundHomeDog],
      },
      {
        id: 2,
        img: [
          huskyPuppyStoitBronz,
          puppySitBronz,
          huskyPuppyLieBronz,
          huskyPuppyUpBronz,
        ],
        type: "хаски",
        comsndOneText: "Сидеть!",
        comsndTwoText: "Лежать!",
        bgHome: [imgBackgroundHomeDog],
      },
      {
        id: 3,
        img: [bamblbi, bamblbiAuto, bamblbiDance, bamblbiAttack],
        type: "Трансформер",
        comsndOneText: "Трансформация!",
        comsndTwoText: "Танец!",
        bgHome: [imgBGHomeSpace],
      },
      {
        id: 4,
        img: [
          litleDragon,
          litleDragonFireVector,
          litleDragonFireHand,
          litleDragonGame,
        ],
        type: "Дракон",
        comsndOneText: "Огонь!",
        comsndTwoText: "Магия!",
        bgHome: [imgBGLitleDragon],
      },
    ];

    // Создание нового питомца
    function createNewPet() {
      if (createPetName && createPet) {
        const freeID = myPets.find((t) => t.create === false);
        freeID.name = createPetName;
        freeID.hp = 100;
        freeID.satiety = 100;
        freeID.mood = 100;
        freeID.img_pet = createPet.img;
        freeID.age = "";
        freeID.money = 0;
        freeID.delicacy = 0;
        freeID.toilet = 100;
        freeID.shit = false;
        freeID.energy = 100;
        freeID.create = true;
        const birthday = new Date();
        freeID.data_create = birthday;
        freeID.end_food = birthday;
        freeID.end_energy = birthday;
        freeID.time_game = birthday;
        freeID.end_toilet = birthday;
        freeID.type = createPet.type;
        // Команды
        freeID.comsndOneStudied = false;
        freeID.comsndOneProgress = 0;
        freeID.comsndOneText = createPet.comsndOneText;
        freeID.comsndTwoStudied = false;
        freeID.comsndTwoProgress = 0;
        freeID.comsndTwoText = createPet.comsndTwoText;
        // Объекты
        freeID.foodObj = imgFood;
        freeID.toyOneObj = imgBallGreen;
        freeID.toyTwoObj = imgCanat;
        freeID.shitObj = imgShit;
        freeID.punchingBagObj = imgPunchingBag;
        // Фон
        freeID.bgHome = createPet.bgHome;
        // Level
        freeID.level = 1;
        freeID.progressLevel = 0;
        // Погода
        freeID.meteoVar = birthday;
        freeID.meteoCollection = [
          // Массив с погодой всех видов
          {
            id: 1,
            meteo: "Ясная погода",
            img: imgMeteoNorm,
            min_temperature: 8,
            max_temperature: 20,
            temperature: 14,
          },
          {
            id: 2,
            meteo: "Дождь",
            img: imgMeteRain,
            min_temperature: 1,
            max_temperature: 7,
            temperature: 6,
          },
          {
            id: 3,
            meteo: "Очень жарко",
            img: imgMeteoHot,
            min_temperature: 22,
            max_temperature: 32,
            temperature: 28,
          },
        ];
        freeID.currentMeteo = []; //Текущая погода

        freeID.currentMeteo.push(
          freeID.meteoCollection[0],
          freeID.meteoCollection[1],
          freeID.meteoCollection[0]
        );

        // freeID.meteoFuncion  = meteoFuncion;
        //

        setFlagCreate(true);
        setMyPets([...myPets]);
        setCreatePet("");
        setCreatePetName("");
      } else {
        setLogError("Выберите вид питомца и введите имя");
      }

      console.log(myPets);
    }
    // Конец создания питомца

    // Ввод имени
    const handlerOnChangeName = (e) => {
      setCreatePetName(e.target.value);
      setLogError("");
    };

    return (
      <div>
        {targetCard && targetCard.create ? (
          <>
            {/* Питомец создан */}
            <div className="preview-info">
              <ul className="preview-info-list">
                <li>Имя: {targetCard.name}</li>
                {/* <li>Возраст: </li> */}
                <li>Здоровье: {targetCard.hp}</li>
                <li>Настроение: {targetCard.mood}</li>
                <li>Сытость: {targetCard.satiety}</li>
              </ul>
            </div>
            <div className="preview-pet">
              <img src={targetCard.img_pet[0]} alt="" />
            </div>
          </>
        ) : (
          <>
            <h3>Выберите питоца</h3>
            <div className="conteiner_preview_select_pets">
              {previewSelectPets.map((p) => (
                <div
                  className="preview_select_pets-avatar-conteiner"
                  key={p.id}
                  onClick={() => setCreatePet(p)}
                >
                  <img
                    className="preview_select_pets-avatar-img"
                    src={p.img[0]}
                  />
                </div>
              ))}
            </div>
            {createPet ? (
              <img className="preview-pet" src={createPet.img[0]} alt="" />
            ) : (
              <></>
            )}

            <label className="preview-new-name">
              <input
                onChange={handlerOnChangeName}
                placeholder="Введите имя питомца"
              />
              <button onClick={createNewPet}>Создать</button>
            </label>
            <h1 className="homePageLogError">{logError}</h1>
          </>
        )}
      </div>
    );
  }
);

export default SelectAndCreatePets;
