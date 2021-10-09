import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { BoardTitle, BoardModal } from '../components';
import { boardService } from '../services';
import { withAuthorization } from '../utils';

export const BoardsPage = withAuthorization((authUser) => !!authUser)(() => {
    const [boardsSnapshot, setBoardsSnapshot] = useState({});
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
        const data = (await boardService.getBoards()).val();
        setBoardsSnapshot(data || {});
    };

    const addBoard = async (board) => {
        await boardService.addBoard(board);
        setModalVisible(false);
        await fetchBoards();
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
            <div className="flex mb-3 items-center text-xl">
                <UserOutlined className={`mr-2`} /> Personal Boards
            </div>

            <div className="grid grid-cols-4 gap-4">
                {objectToArray(boardsSnapshot).map((board) => (
                    <BoardTitle
                        title={board.title}
                        action={() => history.push(`boards/${board?.key}`)}
                    />
                ))}
                <BoardTitle
                    title="Add new board"
                    addition={true}
                    action={() => setModalVisible(true)}
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
