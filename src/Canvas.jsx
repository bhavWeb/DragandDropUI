
import React, { useState } from 'react';
import Xarrow from 'react-xarrows';
import { v4 as uuidv4 } from 'uuid';
import Draggable from 'react-draggable';

const Canvas = () => {
    const [cards, setCards] = useState([]);
    const [arrows, setArrows] = useState([]);
    const [selectedCardId, setSelectedCardId] = useState(null);

    const addCard = () => {
        const newCard = {
            id: uuidv4(),
            text: '',
            isExpanded: false,
            position: { x: 50, y: 50 },
        };
        setCards([...cards, newCard]);
    };

    const handleTextChange = (id, text) => {
        setCards(cards.map(card => card.id === id ? { ...card, text } : card));
    };

    const toggleExpand = (id) => {
        setCards(cards.map(card => card.id === id ? { ...card, isExpanded: !card.isExpanded } : card));
    };

    const handleDrag = (e, data, id) => {
        setCards(cards.map(card => card.id === id ? { ...card, position: { x: data.x, y: data.y } } : card));
    };

    const connectToCard = (fromCardId) => {
        if (cards.length <= 1) {
            alert('No More cards!');
            return;
        }

        const toCardId = cards.find(card => card.id !== fromCardId)?.id;
        if (toCardId) {
            setArrows([...arrows, { start: fromCardId, end: toCardId }]);
        }
    };

    return (
        <div className="w-full h-screen bg-gray-100 overflow-scroll relative">
            <button
                onClick={addCard}
                className="p-2 bg-blue-500 text-white rounded-lg m-4"
            >
                Add Card
            </button>

            {cards.map((card, index) => (
                <Draggable
                    key={card.id}
                    position={card.position}
                    onDrag={(e, data) => handleDrag(e, data, card.id)}
                >
                    <div
                        id={card.id}
                        className="w-60 p-4 bg-white rounded-lg shadow-lg border border-gray-300 absolute"
                    >
                        <textarea
                            value={card.text}
                            onChange={(e) => handleTextChange(card.id, e.target.value)}
                            className="w-full h-16 p-2 border rounded-md"
                            placeholder="Enter some text"
                        />
                        {card.isExpanded ? (
                            <div className="mt-2">{card.text}</div>
                        ) : (
                            <div className="mt-2">{card.text.substring(0, 50)}...</div>
                        )}
                        <button
                            onClick={() => toggleExpand(card.id)}
                            className="text-blue-500 mt-2"
                        >
                            {card.isExpanded ? 'Show Less' : 'Show More'}
                        </button>
                        <button
                            onClick={() => connectToCard(card.id)}
                            className="text-green-500 ml-4"
                        >
                            Connect to Another Card
                        </button>
                    </div>
                </Draggable>
            ))}

            {arrows.map((arrow, index) => (
                <Xarrow
                    key={index}
                    start={arrow.start}
                    end={arrow.end}
                    color="red"
                    strokeWidth={2}
                />
            ))}
        </div>
    );
};

export default Canvas;
