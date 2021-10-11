import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from 'antd';
import { StarOutlined, UserOutlined } from '@ant-design/icons';
import { BoardTitle, BoardModal } from '../components';
import { boardService } from '../services';
import { withAuthorization } from '../utils';

export const BoardsPage = withAuthorization((authUser) => !!authUser)(() => {
    const [boardsSnapshot, setBoardsSnapshot] = useState({});
    const [starredBoards, setStarredBoards] = useState([]);
    const [loading, setLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const history = useHistory();

    useEffect(() => {
        setLoading(true);
        (async () => {
            await fetchBoards();
            setLoading(false);
        })();
    }, []);

    const fetchBoards = async () => {
        await boardService.userBoards().on('value', (snapshot) => {
            if (!snapshot) {
                return;
            }
            setBoardsSnapshot(snapshot.val() || {});
            setStarredBoards(objectToArray(snapshot.val() || {}).filter((board) => board.starred));
        });
    };

    const addBoard = async (board) => {
        await boardService.addBoard(board);
        setModalVisible(false);
    };

    const starBoard = async (board, starred) => {
        await boardService.updateBoard(board, { starred });
    };

    const objectToArray = (data) =>
        !data
            ? []
            : Object.values(data).map((value, index) => ({
                  ...value,
                  key: Object.keys(data)[index],
              }));

    if (loading) {
        return (
            <div className={`flex h-full`}>
                <div className={`m-auto`}>
                    <Button shape="circle" loading />
                </div>
            </div>
        );
    }

    return (
        <div className={`pt-16 py-4 px-3`}>
            {starredBoards.length > 0 && (
                <>
                    <div className="flex mb-3 items-center text-xl">
                        <StarOutlined className={`mr-2`} /> Starred Boards
                    </div>

                    <div className="grid grid-cols-4 gap-4 mb-6">
                        {starredBoards.map((board) => (
                            <BoardTitle
                                key={board?.key}
                                title={board.title}
                                handleBoardClick={() => history.push(`boards/${board?.key}`)}
                                handleBoardStarToggling={() =>
                                    starBoard(board?.key, !board.starred)
                                }
                                starred={board.starred}
                            />
                        ))}
                    </div>
                </>
            )}

            <div className="flex mb-3 items-center text-xl">
                <UserOutlined className={`mr-2`} /> Personal Boards
            </div>

            <div className="grid grid-cols-4 gap-4">
                {objectToArray(boardsSnapshot).map((board) => (
                    <BoardTitle
                        key={board?.key}
                        title={board.title}
                        handleBoardClick={() => history.push(`boards/${board?.key}`)}
                        handleBoardStarToggling={() => starBoard(board?.key, !board.starred)}
                        starred={board.starred}
                    />
                ))}
                <BoardTitle
                    title="Add new board"
                    addition={true}
                    handleBoardClick={() => setModalVisible(true)}
                />
            </div>

            <BoardModal
                action={addBoard}
                closeModal={() => setModalVisible(false)}
                visible={modalVisible}
            />
        </div>
    );
});
