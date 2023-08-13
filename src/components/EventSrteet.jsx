import { useEffect, useMemo, useState } from "react";
import ListEvent from "./ListEvent";

const EventSrteet = ({ pet, setMyPets, myPets }) => {
  const [answerFlag, setFlagAnswer] = useState(false);
  const [cardEventBtn, setCardEventBtn] = useState(false);
  const [message, setMessages] = useState("");
  const [flagHistoryEvent, setFlagHistoryEvent] = useState(false);

  const historyMessage = (history) => {
    setMessages(history);
    setFlagHistoryEvent(true);
    setFlagAnswer(true);
    setCardEventBtn(false);
  };

  const [eventCollection, setEventCollection] = useState([
    {
      id: 1,
      title: "Встреча с собакой",
      body: `${pet.name} встречает лабрадора и он предлагает поиграть.`,
      yes_text: "Дружелюбно",
      no_text: "Агрессивно",
      yes() {
        if (pet.effect[0].flag) {
          if (pet.energy >= 10) {
            pet.energy = pet.energy - 10;
            pet.mood = pet.mood + 20;
            if (pet.mood > 100) {
              pet.mood = 100;
            }
            setMyPets([...myPets], pet.energy, pet.mood);
            historyMessage(
              `${pet.name} и лабрадор хорошо поиграли. ${pet.name} слегка устал, зато поднялось настроение.`
            );
          } else {
            historyMessage(`${pet.name} слишком устал`);
          }
        } else {
          historyMessage(`${pet.name} себя плохо чувствует`);
        }
      },
      no() {
        historyMessage(
          `${pet.name} рыкнул и лабрадор тут же отбежал в сторону`
        );
      },
    },
    {
      id: 2,
      title: "Встреча с собакой",
      body: `${pet.name} встречает крупного кане-корсо, его настрой кажется недружелюбным`,
      yes_text: "Игнорировать",
      no_text: "Агрессивно",
      yes() {
        historyMessage(
          `${pet.name} аккуратно прошёл(ла) мимо, смотря кани-корсу в глала`
        );
      },
      no() {
        pet.mood = pet.mood - 15;
        if (pet.mood < 0) {
          pet.mood = 0;
        }
        setMyPets([...myPets], pet.mood);
        historyMessage(
          `${pet.name} рыкнул, кане-корсо показал зубы. Понимаю всю мощь кане-корсо, ${pet.name} решил уступить и отошёл. Настроение при этом упало...`
        );
      },
    },
    {
      id: 3,
      title: "Интересное место",
      body: `${pet.name} нашёл(ла) болото. Может искупаться? А что скажет хозяин... Хотя...`,
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
      title: "Встреча с собакой",
      body: `${pet.name} встречает хаски. Намерения неизвестны.`,
      yes_text: "Дружелюбно",
      no_text: "Агрессивно",
      yes() {
        if (pet.effect[0].flag) {
          console.log("хаски");
          pet.mood = pet.mood - 10;
          if (pet.mood < 0) {
            pet.mood = 0;
          }
          setMyPets([...myPets], pet.mood);
          historyMessage(
            `${pet.name} предложил поиграть хаске, но тот ответил агрессивно. Лай стоял по всему району. Настроение ухудшилось`
          );
        } else {
          historyMessage(`${pet.name} себя плохо чувствует`);
        }
      },
      no() {
        pet.mood = pet.mood + 20;
        if (pet.mood > 100) {
          pet.mood = 100;
        }
        setMyPets([...myPets], pet.mood);
        historyMessage(
          `${pet.name} рыкнул на хаски, получив ответный рык. Завязалась драка, но ${pet.name} вышел победителем. Настроение улучшилось`
        );
      },
    },
    {
      id: 6,
      title: "Мышь!",
      body: `${pet.name} замечает рядом бегущую мышку, которая скрылась в норке`,
      yes_text: "Ловить!",
      no_text: "Ловить!",
      yes() {
        pet.energy = pet.energy - 15
        if (pet.enegry < 0)  {
            pet.enegry = 0
        }
        pet.clear = pet.clear - 15;
        if (pet.clear < 0) {
          pet.clear = 0;
        }
        pet.mood = pet.mood + 25;
        if (pet.mood > 100) {
          pet.mood = 1000;
        }
        setMyPets([...myPets], pet.mood, pet.clear, pet.energy);
        historyMessage(
          `${pet.name} включает инстинкт охотника и начинает ловить мышь. Рыть нору. Устал, испачкался, но волольный(ная)`
        );
      },
      no() {
        pet.energy = pet.energy - 15
        if (pet.energy < 0)  {
            pet.energy = 0
        }
        pet.clear = pet.clear - 15;
        if (pet.clear < 0) {
          pet.clear = 0;
        }
        pet.mood = pet.mood + 25;
        if (pet.mood > 100) {
          pet.mood = 1000;
        }
        setMyPets([...myPets], pet.mood, pet.clear, pet.energy);
        historyMessage(
          `${pet.name} включает инстинкт охотника и начинает ловить мышь. Рыть нору. Устал, испачкался, но волольный(ная)`
        );
      },
    },
  ]);

  //   Переменшивание и фильтр по  нулевому индексу

  const closedEvent = useMemo(() => {
    return setFlagAnswer(false);
  }, [answerFlag]);

  const sortEvent = useMemo(() => {
    const arr = eventCollection;
    arr.sort(() => Math.random() - 0.5);
    return [arr[0]];
  }, [!answerFlag]);

  return (
    <div>
      <div
        className="card-event-btn-show-card"
        onClick={() => setCardEventBtn(true)}
      >
        <span className="event-title-btn">Событие</span>
        <span className="event-icon-btn">?</span>
      </div>
      {cardEventBtn ? <ListEvent eventCollection={sortEvent} /> : <></>}
      {flagHistoryEvent ? (
        <div className="card-event-container history-modal-event">
          <p className="event-history-text">{message}</p>
          <button
            className="history-event-btn"
            onClick={() => setFlagHistoryEvent(false)}
          >
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
