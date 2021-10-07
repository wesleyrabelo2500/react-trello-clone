import { userBoard } from './board';

const userLists = (board) => userBoard(board).child('lists');
const userList = (board, list) => userLists(board).child(list);
const userCards = (board, list) => userList(board, list).child('cards');
const userCard = (board, list, card) => userList(board, list).child('cards').child(card);

const lists = (board) => userLists(board).once('value');

const createList = async (board, list) => {
    await userLists(board).push(list);
    return list;
};

const removeList = async (board, list) => await userList(board, list).remove();

const updateList = async (board, list, data) => {
    await userList(board, list).update(data);
    return data;
};

const createCard = async (board, list, data) => {
    await userCards(board, list).push(data);
    return data;
};

const getCards = (board, list) => userCards(board, list).once('value');

const getCard = (board, list, card) => userCard(board, list, card).once('value');

const updateCard = async (board, list, card, data) => {
    await userCard(board, list, card).update(data);
    return data;
};

const moveCard = async (board, cardId, oldcolumnId, newcolumnId) => {
    const data = (await getCard(board, oldcolumnId, cardId)).val();
    await removeCard(board, oldcolumnId, cardId);
    await createCard(board, newcolumnId, data);
};

const removeCard = (board, list, card) => userCard(board, list, card).remove();

export const listService = {
    onceGetLists: lists,
    doCreateList: createList,
    doDeleteList: removeList,
    updateList: updateList,
    createCard: createCard,
    getCard: getCard,
    updateCard: updateCard,
    moveCard: moveCard,
    getCards: getCards,
    removeCard: removeCard,
};
