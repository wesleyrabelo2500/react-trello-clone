import { db } from '../../../core/api/firebase';

const cardsRef = db.ref('cards');

export const addCard = (listKey, cardTitle) =>
    db.ref(`cards/${listKey}`).push({
        title: cardTitle,
    });

export const getCard = (listKey) => db.ref(`cards/${listKey}`).once('value');

export const updateCard = async (listKey, cardKey, card) => {
    await cardsRef
        .child(listKey)
        .child(cardKey)
        .update({
            ...card,
        });
    card.key = cardKey;
    return card;
};

export const moveCard = (oldListKey, newListKey, cardKey, card) =>
    db
        .ref(`cards/${oldListKey}`)
        .child(`${cardKey}`)
        .remove()
        .then(() =>
            db.ref(`cards/${newListKey}/${cardKey}`).set({
                ...card,
            })
        );

export const deleteCard = (listKey, cardKey) =>
    db.ref(`cards/${listKey}/`).child(`${cardKey}`).remove();
