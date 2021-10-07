import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { List } from 'antd';
import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import Column from '../components/Column';
import { listService } from '../services/list';
import { boardService } from '../services/board';
import { CreateCardControl } from '../components/CreateCardControl';
import { Spinner } from '../components/common/Spinner';
import { withAuthorization } from '../utils/auth-hoc';
import BoardHeader from '../components/BoardHeader';
import styled from 'styled-components';
import { objectToArray } from '../utils/board-utils';

const BoardPage = () => {
    const [board, setBoard] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        (async () => {
            await fetchBoard();
            setLoading(false);
        })();
    }, []);

    const fetchBoard = async () => {
        const data = (await boardService.getBoard(boardId())).val();
        setBoard(data);
    };

    const handleCreateList = async (title) => {
        await listService.doCreateList(boardId(), { title });
        await fetchBoard();
    };

    const handleUpdateList = async (columnId, title) => {
        await listService.updateList(boardId(), columnId, { title });
        await fetchBoard();
    };

    const handleAddToFavorites = async () => {
        const updatedBoard = { ...board, favorite: !board.favorite };
        await boardService.editBoard(boardId(), updatedBoard);
        setBoard(updatedBoard);
    };

    const handleUpdateBoard = async (boardId, title) => {
        await boardService.updateBoard(boardId, title);
        await fetchBoard();
    };

    const handleDeleteList = async (columnId) => {
        await listService.doDeleteList(boardId(), columnId);
        await fetchBoard();
    };

    const handleDeleteBoard = async (boardId) => {
        await boardService.deleteBoard(boardId);
        window.location.assign('/boards');
    };

    const handleCreateCard = async (columnId, data) => {
        await listService.createCard(boardId(), columnId, data);
        await fetchBoard();
    };

    const handleEditCard = async (_, card, data) => {};

    const handleMoveCard = async (cardId, oldColumnId, newColumnId) => {
        await listService.moveCard(boardId(), cardId, oldColumnId, newColumnId);
        await fetchBoard();
    };

    const lists = objectToArray(board?.lists || []);
    const listCards = (list) =>
        objectToArray(list?.cards || []).map((d) => ({ ...d, columnId: list.key }));

    const boardId = () => window.location.href.split('/').pop();

    if (loading) {
        return <Spinner />;
    }

    return (
        <DndProvider backend={HTML5Backend}>
            <BoardHeader
                title={board.title}
                favorite={board.favorite}
                boardId={boardId()}
                onAddToFavorites={handleAddToFavorites}
                deleteBoard={handleDeleteBoard}
                updateBoard={handleUpdateBoard}
            />
            <Lists>
                {lists.map((list) => (
                    <List key={list.key}>
                        <Column
                            list={list}
                            cards={listCards(list)}
                            handleCreateCard={handleCreateCard}
                            handleMoveCard={handleMoveCard}
                            handleDeleteList={handleDeleteList}
                            handleUpdateList={handleUpdateList}
                        />
                    </List>
                ))}
                <CreateCardControl placeholder="Create new list" onCreate={handleCreateList} />
            </Lists>
        </DndProvider>
    );
};

const Lists = styled.div`
    background-color: #0079bf;
    flex: 1;
    display: flex;
    overflow: auto;
    white-space: nowrap;
    padding: 0 10px;

    > div {
        margin-right: 1rem;
    }
`;

export default withRouter(withAuthorization((authUser) => !!authUser)(BoardPage));
