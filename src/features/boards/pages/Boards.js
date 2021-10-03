import { Icon } from 'antd';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { withAuthorization } from '../../../auth/utils/AuthHOC';
import { createBoard, getBoards } from '../api/boards';
import { Spinner } from '../../../shared/components/Spinner';
import { isEmpty, mergeDataWithKey } from '../../../shared/utils';
import { CreateBoardModal } from '../components/CreateBoardModal';
import {
    BoardTypes,
    BoardTypeTitle,
    CreateBoardTitle,
    NewBoardContent,
    StyledNewBoard,
} from '../styles';
import { BoardLink } from '../components/BoardLink';

const BoardsPage = () => {
    const [boards, setBoards] = useState([]);
    const [loading, setLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        setLoading(true);
        (async () => {
            const snapshot = await getBoards();
            setBoards(mergeDataWithKey(snapshot.val()));
            setLoading(false);
        })();
    }, []);

    const handleCreateBoard = async (board) => {
        const response = await createBoard(board);
        setBoards([...boards, response]);
        setModalVisible(false);
    };

    if (loading) {
        return <Spinner />;
    }

    const starredBoards = boards.filter((board) => board.favorite);

    return (
        <div>
            {!isEmpty(starredBoards) && (
                <BoardTypes>
                    <BoardTypeTitle>
                        <Icon type="star" />
                        Starred Boards
                    </BoardTypeTitle>

                    {starredBoards.map((board, index) => {
                        return (
                            <Link to={`b/${board.key}`} key={index}>
                                <BoardLink
                                    title={board.title}
                                    color="#0079BF"
                                    favorite={board.favorite}
                                />
                            </Link>
                        );
                    })}
                </BoardTypes>
            )}

            <BoardTypes>
                <BoardTypeTitle>
                    <Icon type="user" />
                    Personal Boards
                </BoardTypeTitle>

                <>
                    {boards.map((board, index) => {
                        return (
                            <Link key={index} to={`b/${board.key}`}>
                                <BoardLink
                                    key={index}
                                    title={board.title}
                                    color="#0079BF"
                                    favorite={board.favorite}
                                />
                            </Link>
                        );
                    })}

                    <StyledNewBoard color="#eee" onClick={() => setModalVisible(true)}>
                        <NewBoardContent>
                            <CreateBoardTitle>Create new board...</CreateBoardTitle>
                        </NewBoardContent>
                    </StyledNewBoard>
                </>
            </BoardTypes>

            <CreateBoardModal
                onCreateBoard={handleCreateBoard}
                onCloseModal={() => setModalVisible(false)}
                visible={modalVisible}
            />
        </div>
    );
};

export default withAuthorization((authUser) => !!authUser)(BoardsPage);
