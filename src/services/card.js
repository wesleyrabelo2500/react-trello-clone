import { db } from '../firebase';

const cardsRef = db.ref('cards');

export const addCard = (columnId, cardTitle) =>
    db.ref(`cards/${columnId}`).push({
        title: cardTitle,
    });

export const getCard = (columnId) => db.ref(`cards/${columnId}`).once('value');

export const updateCard = async (columnId, cardId, card) => {
    await cardsRef
        .child(columnId)
        .child(cardId)
        .update({
            ...card,
        });
    card.key = cardId;
    return card;
};

export const moveCard = async (oldcolumnId, newcolumnId, cardId, card) => {
    await db.ref(`cards/${oldcolumnId}`).child(`${cardId}`).remove();
    await db.ref(`cards/${newcolumnId}/${cardId}`).set({
        ...card,
    });
};

export const deleteCard = (columnId, cardId) =>
    db.ref(`cards/${columnId}/`).child(`${cardId}`).remove();
