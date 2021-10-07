import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import Board from 'react-trello';
import { boardService } from '../services';
import { withAuthorization } from '../utils';
import { Button } from 'antd';

export const BoardPage = withRouter(
    withAuthorization((authUser) => !!authUser)(() => {
        const [board, setBoard] = useState({
            lanes: [],
        });
        const [loading, setLoading] = useState(false);

        useEffect(() => {
            setLoading(true);
            boardService.getBoard(boardId()).then((snapshot) => {
                setBoard(snapshot.val());
                setLoading(false);
            });
        }, []);

        const boardId = () => window.location.href.split('/').pop();

        const handleDataChange = async (data) => {
            await boardService.saveLanes(boardId(), data);
        };

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
