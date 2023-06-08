import React, { memo, useMemo, useState } from "react";
// Импорт img хаски чёрный

import huskyBlackAvatar from "../img/pets/husky/husky_black/husky_avatar_black.png";
import huskyBlack from "../img/pets/husky/husky_black/husky_black.png";
import huskyBlackSid from "../img/pets/husky/husky_black/husky_sid_black.png";
import huskyBlackLie from "../img/pets/husky/husky_black/husky_lie_black.png";
import huskyBlackPaw from "../img/pets/husky/husky_black/husky_paw_black.png";
import huskyBlackGame from "../img/pets/husky/husky_black/husky_game_black.png";
import huskyBlackRun from "../img/pets/husky/husky_black/husky_run_black.png";
import huskyBlackToilet from "../img/pets/husky/husky_black/husky_toilet_black.png";

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
import imgMeteoBGNorm from "../img/background/street.jpg";
import imgMeteBgRain from "../img/background/street_rain.png";
import imgMeteoBgSun from "../img/background/street_sun.png";

// Эффекты
import imgEffectMite from "../img/icon/mite.png";
import imgEffectFever from "../img/icon/fever.png";
import imgEffectEnerguDrink from "../img/icon/energy-drink.png";
import imgEffectVitamins from "../img/icon/vitamins.png";
import effectNorm from "../img/icon/meditation.png";
import effectDefendMite from "../img/icon/defends_mite.png";

const SelectAndCreatePets = memo(
  ({ targetCard, flagCreate, setFlagCreate, myPets, setMyPets }) => {
    const [createPetName, setCreatePetName] = useState("");
    const [createPet, setCreatePet] = useState(null);
    const [logError, setLogError] = useState("");

    const previewSelectPets = [
      {
        id: 1,
        img: [
          huskyBlackAvatar,
          huskyBlack,
          huskyBlackSid,
          huskyBlackLie,
          huskyBlackPaw,
          huskyBlackGame,
          huskyBlackRun,
          huskyBlackToilet,
        ],
        type: "хаски",
        bgHome: [imgBackgroundHomeDog],
        strong: 35,
        obedience: 10,
      },
      {
        id: 2,
        img: [
          huskyBlackAvatar, // 0 - аватар
          huskyBlack, // 1 - стоит
          huskyBlackSid, // 2 - сидеть
          huskyBlackLie, // 3 - лежать
          huskyBlackPaw, // 4 - лапа
          huskyBlackGame, // 5 - играть
          huskyBlackRun, // 6 - бег
          huskyBlackToilet, // 7 - туалет
        ],
        type: "хаски",
        bgHome: [imgBackgroundHomeDog],
        strong: 35,
        obedience: 10,
      },
    ];

    // Создание нового питомца
    function createNewPet() {
      if (createPetName && createPet) {
        const freeID = myPets.find((t) => t.create === false);
        freeID.name = createPetName;
        freeID.hp = 100;
        freeID.satiety = 100;
        freeID.max_satiety = 100;
        freeID.mood = 100;
        freeID.max_mood = 100;
        freeID.img_pet = createPet.img;
        freeID.age = "";
        freeID.money = 0;
        freeID.delicacy = 0;
        freeID.toilet = 100;
        freeID.shit = false;
        freeID.energy = 100;
        freeID.max_energy = 100;
        freeID.create = true;
        const birthday = new Date();
        freeID.data_create = birthday;
        freeID.end_food = birthday;
        freeID.end_energy = birthday;
        freeID.time_game = birthday;
        freeID.end_toilet = birthday;
        freeID.type = createPet.type;
        // Команды
        freeID.comands = [
          {
            id: "sid",
            name: "Сидеть",
            studied: false,
            progress: 0,
          },
          {
            id: "lie",
            name: "Лежать",
            studied: false,
            progress: 0,
          },
          {
            id: "paw",
            name: "Дай лапу",
            studied: false,
            progress: 0,
          },
        ];
        // freeID.health = true
        freeID.effect = [
          { // Нормальное состояние - 0
            name: "norm",
            flag: true,
            icon: effectNorm,
            info: "Хорошее самочувствие",
            event: false,
          },
          { // Укус клеща - 1
            name: "mite",
            flag: false,
            icon: imgEffectMite,
            info: "Укус клеща. Настроение, здоровье и силы значительно снижены",
            event: false,
          },
          { // Жар - 2
            name: "heat",
            flag: false,
            icon: imgEffectFever,
            info: "Температура повышена. Настроение, здоровье и силы снижены",
            event: false,
          },
          { // Простуда - 3
            name: "cold",
            flag: false,
            icon: imgEffectFever,
            info: "Температура повышена. Настроение, здоровье и силы снижены",
            event: false,
          },
          { // Повышеное восстановление энергии - 4
            name: "energy_drink",
            flag: false,
            icon: imgEffectEnerguDrink,
            info: "Энергия восстанавливается быстрее",
            event: false,
          },
          { // Защита от клещей - 5
            name: "defend_mite",
            flag: false,
            icon: effectDefendMite,
            info: "Защита от клещей",
            event: false,
          },
        ];
        // freeID.comsndOneStudied = false;
        // freeID.comsndOneProgress = 0;
        //   freeID.comsndTwoStudied = false;
        // freeID.comsndTwoProgress = 0;
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
            bg: imgMeteoBGNorm,
            min_temperature: 8,
            max_temperature: 20,
            temperature: 14,
          },
          {
            id: 2,
            meteo: "Дождь",
            img: imgMeteRain,
            bg: imgMeteBgRain,
            min_temperature: 2,
            max_temperature: 7,
            temperature: 6,
          },
          {
            id: 3,
            meteo: "Очень жарко",
            img: imgMeteoHot,
            bg: imgMeteoBgSun,
            min_temperature: 22,
            max_temperature: 32,
            temperature: 28,
          },
        ];
        freeID.currentMeteo = []; //Текущая погода

        freeID.currentMeteo.push(
          freeID.meteoCollection[0],
          freeID.meteoCollection[0],
          freeID.meteoCollection[0]
        );

        // freeID.meteoFuncion  = meteoFuncion;

        setFlagCreate(true);
        setMyPets([...myPets]);
        setCreatePet("");
        setCreatePetName("");
      } else {
        setLogError("Выберите вид питомца и введите имя");
      }

      // console.log(myPets);
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
                {/* <li>Здоровье: {targetCard.hp}</li>
                <li>Настроение: {targetCard.mood}</li>
                <li>Сытость: {targetCard.satiety}</li> */}
              </ul>
            </div>
            <div className="preview-pet">
              <img src={targetCard.img_pet[1]} alt="" />
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
              <img className="preview-pet" src={createPet.img[1]} alt="" />
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
