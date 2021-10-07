import { StarOutlined, UserOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { withAuthorization } from '../utils/auth-hoc';
import { Spinner } from '../components/common/Spinner';
import { isEmpty, objectToArray } from '../utils/board-utils';
import { CreateBoardModal } from '../components/CreateBoardModal';
import styled from 'styled-components';
import { BoardLink } from '../components/common/BoardLink';
import { boardService } from '../services/board';
import { LINK_COLOR } from '../constants';

const BoardsPage = () => {
    const [boardsSnapshot, setBoardsSnapshot] = useState({});
    const [loading, setLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        setLoading(true);
        (async () => {
            await fetchBoards();
            setLoading(false);
        })();
    }, []);

    const fetchBoards = async () => {
        const result = await boardService.getBoards();
        setBoardsSnapshot(result.val());
    };

    const createBoard = async (board) => {
        await boardService.createBoard(board);
        await fetchBoards();
        setModalVisible(false);
    };

    if (loading) {
        return <Spinner />;
    }

    const boards = objectToArray(boardsSnapshot);
    const starredBoards = boards.filter((board) => board?.favorite);

    return (
        <div>
            {!isEmpty(starredBoards) && (
                <BoardTypes>
                    <BoardTypeTitle>
                        <StarOutlined />
                        Starred Boards
                    </BoardTypeTitle>

                    {starredBoards.map(({ key, title, favorite }) => {
                        return (
                            <Link key={key} to={`b/${key}`}>
                                <BoardLink title={title} color={LINK_COLOR} favorite={favorite} />
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
                    {boards.map((board) => (
                        <Link key={board.key} to={`b/${board?.key}`}>
                            <BoardLink
                                title={board.title}
                                color={LINK_COLOR}
                                favorite={board.favorite}
                            />
                        </Link>
                    ))}

                    <StyledNewBoard color="#eee" onClick={() => setModalVisible(true)}>
                        <NewBoardContent>
                            <CreateBoardTitle>Create new board...</CreateBoardTitle>
                        </NewBoardContent>
                    </StyledNewBoard>
                </>
            </BoardTypes>

            <CreateBoardModal
                onCreateBoard={createBoard}
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
