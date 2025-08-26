import React, { useEffect } from "react";
import "../css/StackedCards.css";

const StackedCards = () => {
  useEffect(() => {
    const cards = document.querySelectorAll(".card");
    const stackArea = document.querySelector(".stack-area");

    function rotateCards() {
      let angle = 0;
      cards.forEach((card, index) => {
        if (card.classList.contains("away")) {
          card.style.transform = `translateY(-120vh) rotate(-48deg)`;
        } else {
          card.style.transform = `rotate(${angle}deg)`;
          angle = angle - 10;
          card.style.zIndex = cards.length - index;
        }
      });
    }

    rotateCards();

    const onScroll = () => {
      let distance = window.innerHeight * 0.5;
      let topVal = stackArea.getBoundingClientRect().top;
      let index = -1 * (topVal / distance + 1);
      index = Math.floor(index);

      for (let i = 0; i < cards.length; i++) {
        if (i <= index) {
          cards[i].classList.add("away");
        } else {
          cards[i].classList.remove("away");
        }
      }
      rotateCards();
    };

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="stack-area">
      <div className="left ">
        <div className="title">Our Features</div>
        <div className="sub-title">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sapiente qui
          quis, facere, cupiditate, doloremque natus ex perspiciatis ratione hic
          corrupti adipisci ea doloribus!
          <br />
          <button>See More Details</button>
        </div>
      </div>
      <div className="right">
        <div className="card">
          <div className="sub">Simplified</div>
          <div className="content">Complex tasks are now simple</div>
        </div>
        <div className="card">
          <div className="sub">Boost Productivity</div>
          <div className="content">Perform Tasks in less time</div>
        </div>
        <div className="card">
          <div className="sub">Facilitated learning</div>
          <div className="content">Train anyone from anywhere</div>
        </div>
        <div className="card">
          <div className="sub">Support</div>
          <div className="content">Now it's 24/7 support</div>
        </div>
      </div>
    </div>
  );
};

export default StackedCards;
