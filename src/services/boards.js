import { db } from './firebase';
import { getUser } from './auth';

const boardsRef = db.ref('boards');

export const createBoard = async (board) => {
    const uid = getUser().uid;
    const id = boardsRef.push().key;
    await boardsRef.child(uid).child(id).set(board);
    board.key = id;
    return board;
};

export const getBoards = () => {
    const uid = getUser().uid;
    return boardsRef.child(uid).once('value');
};
