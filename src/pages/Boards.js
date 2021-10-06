import { StarOutlined, UserOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { withAuthorization } from '../utils/auth-hoc';
import { Spinner } from '../components/common/Spinner';
import { isEmpty, mergeDataWithKey } from '../utils/board-utils';
import { CreateBoardModal } from '../components/CreateBoardModal';
import styled from 'styled-components';
import { BoardLink } from '../components/common/BoardLink';
import { createBoard, getBoards } from '../services/board';

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
                        <StarOutlined />
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
                    <UserOutlined />
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

const BoardTypes = styled.div`
    margin: auto;
    padding: 0 10px;
    margin-bottom: 20px;
`;

const BoardTypeTitle = styled.h4`
    i {
        margin-right: 5px;
        color: gray;
    }
    margin-left: 5px;
    margin-bottom: 0px;
`;

const NewBoardContent = styled.div`
    text-align: center;
`;

const CreateBoardTitle = styled.div`
    top: 25px;
    position: relative;
`;

const StyledBoardLink = styled.div`
    position: relative;
    display: inline-block;
    padding: 4px;
    width: 250px;
    height: 80px;
    background-color: ${(props) => props.color};
    color: white;
    margin: 0.5%;
    border-radius: 4px;
    transition: all 0.3s;
`;

const StyledNewBoard = styled(StyledBoardLink)`
    color: #6b808c;
    cursor: pointer;
    position: relative;
`;

export default withAuthorization((authUser) => !!authUser)(BoardsPage);
