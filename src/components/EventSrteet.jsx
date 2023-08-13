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
            historyMessage(`${pet.name} и лабрадор хорошо поиграли. ${pet.name} слегка устал, зато поднялось настроение.`);
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
      ignor() {
        historyMessage(`${pet.name} прошёл мимо не обращая внимания`);
      },
    },
    {
      id: 2,
      title: "Встреча с собакой",
      body: `${pet.name} встречает крупного кане-корсо, его настрой кажется недружелюбным`,
      yes_text: "Дружелюбно",
      no_text: "Агрессивно",
      yes() {
        historyMessage(
          `${pet.name} и кане-корсо аккуратно понюхались, после чего кане-корсо прошёл мимо`
        );
      },
      no() {
        pet.mood = pet.mood - 15
        if(pet.mood < 0) {
            pet.mood = 0
        }
        setMyPets([...myPets], pet.mood);
        historyMessage(
          `${pet.name} рыкнул, кане-корсо показал зубы. Понимаю всю мощь кане-корсо, ${pet.name} решил уступить и отошёл. Настроение при этом упало...`
        );
      },
      ignor() {
        historyMessage(
          `${pet.name} аккуратно обошёл кане-корсо смотря ему в галаза`
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
