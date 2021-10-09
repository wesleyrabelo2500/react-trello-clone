import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import Board from 'react-trello';
import { Button } from 'antd';
import { boardService } from '../services';
import { withAuthorization } from '../utils';

export const BoardPage = withRouter(
    withAuthorization((authUser) => !!authUser)((props) => {
        const [board, setBoard] = useState({
            lanes: [],
        });
        const [loading, setLoading] = useState(false);

        useEffect(() => {
            (async () => {
                setLoading(true);
                const snapshot = await boardService.getBoard(boardId());
                const value = snapshot.val();
                const res = {
                    ...value,
                    lanes: value.lanes.map((lane) => ({ ...lane, cards: lane.cards || [] })),
                };
                setBoard(res);
                setLoading(false);
            })();
        }, []);

        const boardId = () => props.match?.params?.board;

        const handleDataChange = async (data) => await boardService.saveLanes(boardId(), data);

        if (loading) {
            return (
                <div className={`flex h-full w-full`}>
                    <div className={`m-auto`}>
                        <Button shape="circle" loading />
                    </div>
                </div>
            );
        }

        return (
            <Board
                className={`pt-16 bg-blue-500 h-full`}
                canAddLanes={true}
                editable={true}
                data={{
                    lanes: board.lanes || [],
                }}
                onDataChange={handleDataChange}
            />
        );
    })
);
