import { db } from '../firebase';
import { getUser } from './auth';

export const userBoards = () => db.ref('users').child(getUser().uid).child('boards');
export const userBoard = (board) => userBoards().child(board);

const updateBoard = (boardId, data) => userBoard(boardId).update(data);

const editBoard = (boardId, board) =>
    userBoard(boardId).update({
        ...board,
    });

const getBoard = (key) => userBoard(key).once('value');

const addBoard = (board) => userBoards().push(board);

const getBoards = () => userBoards().once('value');

const deleteBoard = (key) => userBoards().child(key).remove();

const getLanes = (key) => userBoard(key).once('value');
const saveLanes = (key, lanes) => userBoard(key).update(lanes);

export const boardService = {
    updateBoard,
    editBoard,
    getBoard,
    addBoard,
    getBoards,
    deleteBoard,
    saveLanes,
    getLanes,
};
