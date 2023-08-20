import { useEffect, useMemo, useState } from "react";
import ListEvent from "./ListEvent";

const EventSrteet = ({
  pet,
  setMyPets,
  myPets,
  setVisibleModal,
  setMessage,
  setCoordsPet,
  coords,
  refCoords,
}) => {
  const [answerFlag, setFlagAnswer] = useState(false);
  const [cardEventBtn, setCardEventBtn] = useState(false);
  const [message, setMessages] = useState("");
  const [flagHistoryEvent, setFlagHistoryEvent] = useState(false);
  const [indexEvent, setIndexEvent] = useState(0);
  // const [thisEvent, setThisEvent] = useState(null)

  const historyMessage = (history) => {
    setMessages(history);
    setFlagHistoryEvent(true);
    setFlagAnswer(true);
    setCardEventBtn(false);
  };

  const [eventCollection, setEventCollection] = useState([
    {
      id: 1,
      battle: true,
      strong: 30,
      strong_message: "",
      title: "Встреча с собакой",
      body: `${pet.name} встречает лабрадора и он предлагает поиграть.`,
      yes_text: "Дружелюбно",
      no_text: "Агрессивно",
      yes() {
        pet.energy = pet.energy - 10;
        if (pet.energy < 0) {
          pet.energy = 0;
        }
        pet.mood = pet.mood + 20;
        if (pet.mood > 100) {
          pet.mood = 100;
        }
        setMyPets([...myPets], pet.energy, pet.mood);
        historyMessage(
          `${pet.name} и лабрадор хорошо поиграли. ${pet.name} слегка устал, зато поднялось настроение.`
        );
      },
      no() {
        console.log(this.event.strong);
        battle(this.event.strong);
      },
    },
    {
      id: 2,
      battle: true,
      strong: 90,
      strong_message: "",
      title: "Встреча с собакой",
      body: `${pet.name} встречает крупного кане-корсо, его настрой кажется недружелюбным `,
      yes_text: "Игнорировать",
      no_text: "Агрессивно",
      yes() {
        // console.log("str", str);
        historyMessage(
          `${pet.name} аккуратно прошёл(а) мимо, смотря кани-корсу в глала`
        );
      },
      no() {
        battle(this.event.strong);
      },
    },
    {
      id: 3,
      battle: false,
      title: "Интересное место",
      body: `${pet.name} нашёл(а) болото. Может искупаться? А что скажет хозяин... Хотя...`,
      yes_text: "Искупаться",
      no_text: "Нет, нельзя",
      yes() {
        pet.clear = pet.clear - 80;
        pet.mood = pet.mood + 25;
        if (pet.clear < 0) {
          pet.clear = 0;
        }
        if (pet.mood > 100) {
          pet.mood = 100;
        }
        setMyPets([...myPets], pet.mood, pet.clear);
        historyMessage(
          `${pet.name} радостно забегает в болото. Подумаешь, немного испачкался(лась), зато какой запах...`
        );
      },
      no() {
        pet.mood = pet.mood - 20;
        if (pet.mood < 0) {
          pet.mood = 0;
        }
        setMyPets([...myPets], pet.mood);
        historyMessage(`${pet.name} проходит мимо, настроение ухудшилось.`);
      },
    },
    {
      id: 4,
      battle: false,
      title: "Незнакомец",
      body: `К ${pet.name} подошёл незнакоец и предлагает что-то вкусненькое`,
      yes_text: "Взять угощение",
      no_text: "Нет, нельзя",
      yes() {
        pet.satiety = pet.satiety + 2;
        if (pet.satiety > 100) {
          pet.satiety = 100;
        }
        setMyPets([...myPets], pet.satiety);
        historyMessage(
          `${pet.name} берёт еду у незнакомца. Оказалось вкусно. А нет ли ещё?`
        );
      },
      no() {
        historyMessage(`${pet.name} с осторожностью обходит незнакомца`);
      },
    },
    {
      id: 5,
      battle: true,
      strong: 40,
      strong_message: "",
      title: "Встреча с собакой",
      body: `${pet.name} встречает хаски. Намерения неизвестны.`,
      yes_text: "Дружелюбно",
      no_text: "Агрессивно",
      yes() {
        console.log("хаски");
        pet.mood = pet.mood - 10;
        if (pet.mood < 0) {
          pet.mood = 0;
        }
        setMyPets([...myPets], pet.mood);
        historyMessage(
          `${pet.name} предложил поиграть хаске, но тот ответил агрессивно. Лай стоял по всему району. Настроение ухудшилось`
        );
      },
      no() {
        battle(this.event.strong);
      },
    },
    {
      id: 6,
      battle: false,
      title: "Мышь!",
      body: `${pet.name} замечает рядом бегущую мышку, которая скрылась в норке`,
      yes_text: "Ловить!",
      no_text: "Ловить!",
      yes() {
        pet.energy = pet.energy - 15;
        if (pet.energy < 0) {
          pet.energy = 0;
        }
        pet.clear = pet.clear - 15;
        if (pet.clear < 0) {
          pet.clear = 0;
        }
        pet.mood = pet.mood + 25;
        if (pet.mood > 100) {
          pet.mood = 100;
        }
        setMyPets([...myPets], pet.mood, pet.clear, pet.energy);
        historyMessage(
          `${pet.name} включает инстинкт охотника и начинает ловить мышь. Рыть нору. Устал, испачкался, но доволольный(ая)`
        );
      },
      no() {
        pet.energy = pet.energy - 15;
        if (pet.energy < 0) {
          pet.energy = 0;
        }
        pet.clear = pet.clear - 15;
        if (pet.clear < 0) {
          pet.clear = 0;
        }
        pet.mood = pet.mood + 25;
        if (pet.mood > 100) {
          pet.mood = 100;
        }
        setMyPets([...myPets], pet.mood, pet.clear, pet.energy);
        historyMessage(
          `${pet.name} включает инстинкт охотника и начинает ловить мышь. Рыть нору. Устал, испачкался, но доволольный(ая)`
        );
      },
    },
    {
      id: 7,
      battle: false,
      title: "Незнакомец",
      body: `К ${pet.name} подошёл незнакоец и предлагает что-то вкусненькое`,
      yes_text: "Взять угощение",
      no_text: "Нет, нельзя",
      yes() {
        pet.mood = pet.mood - 5;
        if (pet.mood < 0) {
          pet.mood = 0;
        }
        setMyPets([...myPets], pet.mood);
        historyMessage(
          `${pet.name} хочет проверить что в руке у незнакомца, но там оказывается пусто и человек хотел схватить ${pet.name}. ${pet.name} увернулся, настроение упало`
        );
      },
      no() {
        historyMessage(`${pet.name} с осторожностью обходит незнакомца`);
      },
    },
    {
      id: 8,
      battle: true,
      strong: 48,
      strong_message: "",
      title: "Встреча с собакой",
      body: `${pet.name} встречает хаски. Намерения дружелюбные.`,
      yes_text: "Дружелюбно",
      no_text: "Агрессивно",
      yes() {
        pet.mood = pet.mood + 10;
        if (pet.mood > 100) {
          pet.mood = 100;
        }
        pet.energy = pet.energy - 10;
        if (pet.energy < 0) {
          pet.energy = 0;
        }
        setMyPets([...myPets], pet.mood, pet.energy);
        historyMessage(
          `${pet.name} предложил(а) поиграть хаске, оба сделали игровой поклон и начали носиться что есть сил. Настроение улучшилось`
        );
      },
      no() {
        battle(this.event.strong);
      },
    },
    {
      id: 9,
      battle: true,
      strong: 15,
      strong_message: "",
      title: "Встреча с собакой",
      body: `${pet.name} встречает корги. Намерения дружелюбные.`,
      yes_text: "Дружелюбно",
      no_text: "Агрессивно",
      yes() {
        pet.mood = pet.mood + 10;
        if (pet.mood > 100) {
          pet.mood = 100;
        }
        pet.energy = pet.energy - 10;
        if (pet.energy < 0) {
          pet.energy = 0;
        }
        setMyPets([...myPets], pet.mood, pet.energy);
        historyMessage(
          `${pet.name} предложил(а) поиграть корги, оба сделали игровой поклон и начали носиться что есть сил. Настроение улучшилось`
        );
      },
      no() {
        battle(this.event.strong);
      },
    },
    {
      id: 10,
      battle: true,
      strong: 79,
      strong_message: "",
      title: "Встреча с собакой",
      body: `${pet.name} встречает стаффорда. Намерения неизвестны.`,
      yes_text: "Дружелюбно",
      no_text: "Агрессивно",
      yes() {
        pet.mood = pet.mood - 15;
        if (pet.mood < 0) {
          pet.mood = 0;
        }
        setMyPets([...myPets], pet.mood, pet.energy);
        historyMessage(
          `${pet.name} попробовал(а) предложить поиграть, и тут уже увидел(а) агрессивный выпад в свою сторону. Стаффорд слегка зацепил шерсть, настроение ухудшилось`
        );
      },
      no() {
        battle(this.event.strong);
      },
    },
    {
      id: 11,
      battle: true,
      strong: 62,
      strong_message: "",
      title: "Встреча с собакой",
      body: `${pet.name} встречает овчарку. Намерения неизвестны.`,
      yes_text: "Дружелюбно",
      no_text: "Агрессивно",
      yes() {
        pet.mood = pet.mood + 10;
        if (pet.mood > 100) {
          pet.mood = 100;
        }
        pet.energy = pet.energy - 10;
        if (pet.energy < 0) {
          pet.energy = 0;
        }

        setMyPets([...myPets], pet.mood, pet.energy);
        historyMessage(
          `${pet.name} попробовал(а) предложить поиграть. Овчарка насторожилась, но ${pet.name} удалось её разыграть, настроение улучшилось`
        );
      },
      no() {
        battle(this.event.strong);
      },
    },
    {
      id: 12,
      battle: false,
      strong_message: "",
      title: "Раскопки",
      body: `${pet.name} учуил(а) что-то интересное в земле. Разрешить покопать?`,
      yes_text: "Конечно, копай",
      no_text: "Нет, нельзя",
      yes() {
        pet.mood = pet.mood + 10;
        if (pet.mood > 100) {
          pet.mood = 100;
        }
        pet.energy = pet.energy + 10;
        if (pet.energy > 100) {
          pet.energy = 100;
        }
        pet.clear = pet.clear - 15;
        if (pet.clear < 0) {
          pet.clear = 0;
        }
        pet.money = pet.money + 5;
        setMyPets([...myPets], pet.mood, pet.energy, pet.money, pet.clear);
        historyMessage(
          `${pet.name} нашёл(а) чужую нычку. Настроение и энергия повысилось, так же найдено 5 монет`
        );
      },
      no() {
        pet.mood = pet.mood - 25;
        if (pet.mood < 0) {
          pet.mood = 0;
        }
        historyMessage(
          `${pet.name} смотрит на ямку и сильно раасстроился(лась)`
        );
        setMyPets([...myPets], pet.mood);
      },
    },
    {
      id: 13,
      battle: false,
      strong_message: "",
      title: "Раскопки",
      body: `${pet.name} учуил(а) что-то интересное в земле. Разрешить покопать?`,
      yes_text: "Конечно, копай",
      no_text: "Нет, нельзя",
      yes() {
        pet.mood = pet.mood + 10;
        if (pet.mood > 100) {
          pet.mood = 100;
        }
        pet.clear = pet.clear - 15;
        if (pet.clear < 0) {
          pet.clear = 0;
        }
        setMyPets([...myPets], pet.mood, pet.energy, pet.clear);
        historyMessage(`${pet.name} нашёл(а) игрушку. Настроение улучшилось`);
      },
      no() {
        pet.mood = pet.mood - 15;
        if (pet.mood < 0) {
          pet.mood = 0;
        }
        historyMessage(
          `${pet.name} смотрит на ямку и сильно раасстроился(лась)`
        );
      },
    },
    {
      id: 14,
      battle: false,
      strong_message: "",
      title: "Раскопки",
      body: `${pet.name} учуил(а) что-то интересное в земле. Разрешить покопать?`,
      yes_text: "Конечно, копай",
      no_text: "Нет, нельзя",
      yes() {
        pet.mood = pet.mood + 55;
        if (pet.mood > 100) {
          pet.mood = 100;
        }
        pet.clear = pet.clear - 45;
        if (pet.clear < 0) {
          pet.clear = 0;
        }
        setMyPets([...myPets], pet.mood, pet.clear);
        historyMessage(
          `${pet.name} нашёл(а) залежи с рыбой. С удовольствием начал(а) валяться. Настроение сильно повысилось улучшилось. Запах шокирует прохожих`
        );
      },
      no() {
        pet.mood = pet.mood - 15;
        if (pet.mood < 0) {
          pet.mood = 0;
        }
        historyMessage(
          `${pet.name} смотрит на ямку и сильно раасстроился(лась)`
        );
      },
    },
    {
      id: 15,
      battle: false,
      strong_message: "",
      title: "Встреча с собакой",
      body: `К ${pet.name} подошёл старый пёс и попросил одну вкусняшку`,
      yes_text: "Дать (если есть)",
      no_text: "Агрессивно",
      yes() {
        if (pet.delicacy > 0) {
          pet.mood = pet.mood + 10;
          if (pet.mood > 100) {
            pet.mood = 100;
          }
          pet.enepgy = pet.enepgy + 10;
          if (pet.enepgy > 100) {
            pet.enepgy = 100;
          }
          historyMessage(
            `Старый пёс рассказал интересную историю, настроение улучшилось, и ${pet.name} немного отдохнул`
          );
        } else {
          pet.mood = pet.mood - 15;
          if (pet.mood < 0) {
            pet.mood = 0;
          }
          historyMessage(
            `${pet.name} хотел(а) бы поделиться, но вкусняшек нет. Стало как-то грустно на душе...`
          );
        }
        setMyPets([...myPets], pet.mood, pet.enepgy);
      },
      no() {
        historyMessage(
          `${pet.name} сагрессировал(а) на старого пса. Тот лёг и поджал хвост. ${pet.name} посмотрел в галаза старого пса, увидел страх. А ведь он даже не соперник. Стало пагано на душе`
        );
        pet.mood = pet.mood - 35;
        if (pet.mood < 0) {
          pet.mood = 0;
        }
        setMyPets([...myPets], pet.mood);
      },
    },
    {
      id: 16,
      battle: false,
      title: "Заяц!",
      body: `${pet.name} замечает бегущего зайца. Вперёд!`,
      yes_text: "Погнаться!",
      no_text: "Погнаться!",
      yes() {
        pet.energy = pet.energy - 15;
        if (pet.energy < 0) {
          pet.energy = 0;
        }
        pet.mood = pet.mood + 25;
        if (pet.mood > 100) {
          pet.mood = 100;
        }
        setMyPets([...myPets], pet.mood, pet.energy);
        historyMessage(
          `${pet.name} включает инстинкт охотника и погнался за зайцем. Спустя 10 минут, возвращается. Язык на боку, морда довольная`
        );
      },
      no() {
        pet.energy = pet.energy - 15;
        if (pet.energy < 0) {
          pet.energy = 0;
        }
        pet.mood = pet.mood + 25;
        if (pet.mood > 100) {
          pet.mood = 100;
        }
        setMyPets([...myPets], pet.mood, pet.energy);
        historyMessage(
          `${pet.name} включает инстинкт охотника и погнался за зайцем. Спустя 10 минут, возвращается. Язык на боку, морда довольная`
        );
      },
    },
    {
      id: 17,
      battle: false,
      title: "Контакт с хозяином!",
      body: `${pet.name} смотрит на вас и хочет прилечь`,
      yes_text: "Разрешить!",
      no_text: "Нет, пошли!",
      yes() {
        pet.energy = pet.energy + 35;
        if (pet.energy > 100) {
          pet.energy = 100;
        }
        pet.mood = pet.mood + 5;
        if (pet.mood > 100) {
          pet.mood = 100;
        }
        setMyPets([...myPets], pet.mood, pet.energy);
        historyMessage(
          `${pet.name} лёг. Ловит носиком запахи, которые развиваются по ветру. ${pet.name} отдохнул и доволен, может идти дальше.`
        );
      },
      no() {
        historyMessage(`${pet.name} послушался(ась) вас.`);
      },
    },
    {
      id: 18,
      battle: false,
      title: "Контакт с хозяином!",
      body: `${pet.name} смотрит на вас`,
      yes_text: "Дать вкусняшку!",
      no_text: "Что встал? Пошли",
      yes() {
        if (pet.delicacy > 0) {
          pet.delicacy = pet.delicacy - 1;
          pet.energy = pet.energy + 20;
          if (pet.energy > 100) {
            pet.energy = 100;
          }
          pet.mood = pet.mood + 25;
          if (pet.mood > 100) {
            pet.mood = 100;
          }
          historyMessage(
            `${pet.name} съел(а) вкусняшку и очень доволен(а), что между вами есть взаимопонимание настроение улучшилось, и ${pet.name} получил(а) прилив сил`
          );
        } else {
          pet.mood = pet.mood - 25;
          if (pet.mood < 0) {
            pet.mood = 0;
          }
          historyMessage(
            `Вы хотели угостить ${pet.name}, но не чем. ${pet.name} расстроился(ась)`
          );
        }
        setMyPets([...myPets], pet.mood, pet.energy, pet.delicacy);
      },
      no() {
        pet.mood = pet.mood - 25;
        if (pet.mood < 0) {
          pet.mood = 0;
        }
        historyMessage(`${pet.name} расстроился(ась)`);
      },
    },
    {
      id: 19,
      battle: false,
      title: "Спонтанные действия",
      body: `${pet.name} резко помчался вперёд`,
      yes_text: "Ко мне! (вкусняшка)",
      no_text: "Ко мне!",
      yes() {
        if (pet.delicacy > 0) {
          if (pet.level >= 2) {
            pet.delicacy = pet.delicacy - 1;
            return historyMessage(`${pet.name} послушался вас и прибежал`);
          } else {
            historyMessage(
              `Уровень послушания мал. ${pet.name} прибежал спустя несколько минут, от него несло чет тухлым.`
            );
          }
        } else {
          historyMessage(
            `У вас нет вкусняшки. ${pet.name} прибежал спустя несколько минут, от него несло чет тухлым.`
          );
        }
        pet.clear = pet.clear - 45;
        if (pet.clear < 0) {
          pet.clear = 0;
        }
        pet.energy = pet.energy - 10;
        if (pet.energy < 0) {
          pet.energy = 0;
        }
        pet.mood = pet.mood + 15;
        if (pet.mood > 100) {
          pet.mood = 100;
        }
        setMyPets([...myPets], pet.mood, pet.energy, pet.delicacy, pet.clear);
      },
      no() {
        historyMessage(
          `Уровень послушания мал. ${pet.name} прибежал спустя несколько минут, от него несло чет тухлым.`
        );
        pet.clear = pet.clear - 45;
        if (pet.clear < 0) {
          pet.clear = 0;
        }
        pet.energy = pet.energy - 10;
        if (pet.energy < 0) {
          pet.energy = 0;
        }
        pet.mood = pet.mood + 15;
        if (pet.mood > 100) {
          pet.mood = 100;
        }
        setMyPets([...myPets], pet.mood, pet.energy, pet.delicacy, pet.clear);
      },
    },
  ]);

  //   Переменшивание и фильтр по  нулевому индексу

  const closedHistory = () => {
    setFlagAnswer(false);
    console.log(eventCollection[indexEvent]);
    console.log(indexEvent);
    setFlagHistoryEvent(false);
    if (indexEvent < eventCollection.length - 1) {
      setIndexEvent(indexEvent + 1);
    } else {
      setIndexEvent(0);
    }
  };

  const sortEvent = useMemo(() => {
    if (indexEvent === 0) {
      setEventCollection(eventCollection.sort(() => Math.random() - 0.5));
      return [eventCollection[0]];
    } else {
      return [eventCollection[indexEvent]];
    }
  }, [!answerFlag]);

  const strongDog = useMemo(() => {
    console.log(sortEvent);
    eventCollection.forEach((el) => {
      if (el.id === sortEvent[0].id && el.battle === true) {
        let str;
        if (el.strong < 20) {
          str = "Слабый";
        } else if (el.strong >= 21 && el.strong <= 40) {
          str = "Не слабый";
        } else if (el.strong >= 41 && el.strong <= 60) {
          str = "Сильный";
        } else if (el.strong >= 61 && el.strong <= 80) {
          str = "Очень сильный";
        } else if (el.strong >= 81) {
          str = "Невероятно опасный";
        }
        el.strong_message = "Сила: " + str;
        // el.no = console.log("dfdf")
      }
    });
  }, [sortEvent]);

  const battle = (dog) => {
    // console.log("pet.strong", pet.strong)
    console.log("thisEvent", dog);
    // console.log("pet.strong > sortEvent[0].strong", pet.strong > sortEvent[0].strong)
    if (pet.strong > dog) {
      pet.strong = pet.strong + 1;
      pet.energy = pet.energy - 10;
      if (pet.energy < 0) {
        pet.energy = 0;
      }
      pet.mood = pet.mood + 15;
      if (pet.mood > 100) {
        pet.mood = 100;
      }
      historyMessage(
        `${pet.name} рыкнул, увидив что собака не собирается уступать бросился в драку. ${pet.name} выйграл драку, его сила увеличилась`
      );
    } else {
      historyMessage(
        `${pet.name} рыкнул, увидив что собака не собирается уступать бросился в драку. ${pet.name} проиграл драку, его настроение ухудшилось`
      );
      pet.energy = pet.energy - 15;
      if (pet.energy < 0) {
        pet.energy = 0;
      }
      pet.mood = pet.mood - 25;
      if (pet.mood < 0) {
        pet.mood = 0;
      }
    }
    setMyPets([...myPets], pet.energy, pet.mood, pet.strong);
  };

  const showCardEvent = () => {
    console.log("pet.energy", pet.energy);
    if (pet.energy < 1) {
      coords = refCoords.current.getBoundingClientRect();
      setCoordsPet(coords);
      setVisibleModal(true);
      setMessage("Я устал(а)");
      setTimeout(() => {
        setVisibleModal(false);
      }, 3000);
      return;
    } else if (pet.mood < 1) {
      coords = refCoords.current.getBoundingClientRect();
      setCoordsPet(coords);
      setVisibleModal(true);
      setMessage("У меня нет настроения");
      setTimeout(() => {
        setVisibleModal(false);
      }, 3000);
      return;
    } else if (!pet.effect[0].flag) {
      coords = refCoords.current.getBoundingClientRect();
      setCoordsPet(coords);
      setVisibleModal(true);
      setMessage("Я себя плохо чувствую");
      setTimeout(() => {
        setVisibleModal(false);
      }, 3000);
    } else {
      setCardEventBtn(true);
    }
  };

  return (
    <div>
      {/* {str} */}
      <div className="card-event-btn-show-card" onClick={showCardEvent}>
        <span className="event-title-btn">Событие</span>
        <span className="event-icon-btn">?</span>
      </div>
      {cardEventBtn ? <ListEvent eventCollection={sortEvent} /> : <></>}
      {flagHistoryEvent ? (
        <div className="card-event-container history-modal-event">
          <p className="event-history-text">{message}</p>
          <button className="history-event-btn" onClick={closedHistory}>
            Закрыть
          </button>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default EventSrteet;
