import { db } from '../../../core/services/firebase';

const listsRef = db.ref('lists');

export const onceGetLists = (key) => listsRef.child(key).once('value');

export const doCreateList = async (boardKey, list) => {
    const id = listsRef.push().key;
    await listsRef.child(boardKey).child(id).set(list);
    list.key = id;
    return list;
};

export const doDeleteList = (boardKey, listKey) =>
    db
        .ref(`lists/${boardKey}`)
        .child(`${listKey}`)
        .remove()
        .then(() => db.ref('cards/').child(`${listKey}`).remove());

export const updateList = async (boardKey, listKey, list) => {
    await listsRef
        .child(boardKey)
        .child(listKey)
        .update({
            ...list,
        });
    return list;
};
