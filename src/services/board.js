import { db } from '../firebase';
import { getUser } from './auth';

export const userBoards = () => db.ref('users').child(getUser().uid).child('boards');
export const userBoard = (board) => userBoards().child(board);

const updateBoard = (boardId, title) =>
    userBoard(boardId).update({
        ...title,
    });

const editBoard = (boardId, board) =>
    userBoard(boardId).update({
        ...board,
    });

const getBoard = (key) => {
    return userBoard(key).once('value');
};

const createBoard = (board) => userBoards().push(board);

const getBoards = () => userBoards().once('value');

const deleteBoard = (key) => userBoards().child(key).remove();

export const boardService = {
    updateBoard,
    editBoard,
    getBoard,
    createBoard,
    getBoards,
    deleteBoard,
};
