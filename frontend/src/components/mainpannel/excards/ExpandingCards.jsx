import React, { useState } from 'react';
import './expandingCards.scss';

// 定义卡片数据
const cardData = [
  {
    id: 1,
    title: 'Explore The World',
    imageUrl: 'https://images.unsplash.com/photo-1558979158-65a1eaa08691?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
  },
  {
    id: 2,
    title: 'Wild Forest',
    imageUrl: 'https://images.unsplash.com/photo-1572276596237-5db2c3e16c5d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
  },
  {
    id: 3,
    title: 'Sunny Beach',
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1353&q=80',
  },
  {
    id: 4,
    title: 'City on Winter',
    imageUrl: 'https://images.unsplash.com/photo-1551009175-8a68da93d5f9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1351&q=80',
  },
  {
    id: 5,
    title: 'Mountains - Clouds',
    imageUrl: 'https://images.unsplash.com/photo-1549880338-65ddcdfd017b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
  },
];

const ExpandingCards = () => {
  const [activeId, setActiveId] = useState(1);

  const handleCardClick = (id) => {
    setActiveId(id);
  };

  return (
    <div className="excard-container">
      {cardData.map((card) => (
        <div
          key={card.id}
          className={`excard-panel ${activeId === card.id ? 'active' : ''}`}
          style={{ backgroundImage: `url(${card.imageUrl})` }}
          onClick={() => handleCardClick(card.id)}
        >
          <h3>{card.title}</h3>
        </div>
      ))}
    </div>
  );
};

export default ExpandingCards;
