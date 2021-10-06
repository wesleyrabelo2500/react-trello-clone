import { Button, Input, Modal } from 'antd';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { DEFAULT_COLOR } from '../constants/core-constants';
import { isEmptyText } from '../utils/board-utils';
import styled from 'styled-components';

export function CreateBoardModal(props) {
    const [boardTitle, setBoardTitle] = useState('');

    const handleCreateBoard = async (event, callback) => {
        event.preventDefault();
        if (isEmptyText(boardTitle)) {
            return;
        }
        await callback({
            title: boardTitle,
            color: DEFAULT_COLOR,
        });
        setBoardTitle('');
    };

    const handleBoardTitleChange = (event) => {
        setBoardTitle(event.target.value);
    };

    const { onCloseModal, onCreateBoard, visible } = props;

    return (
        <Modal
            title="Create board"
            width="320px"
            style={{ top: 20 }}
            visible={visible}
            onCancel={onCloseModal}
            footer={null}
        >
            <BoardForm onSubmit={(event) => handleCreateBoard(event, onCreateBoard)}>
                <StyledInput
                    placeholder="Add board title"
                    onChange={(event) => handleBoardTitleChange(event)}
                    value={boardTitle}
                />
                <Button type="primary" onClick={(event) => handleCreateBoard(event, onCreateBoard)}>
                    Create
                </Button>
            </BoardForm>
        </Modal>
    );
}

CreateBoardModal.propTypes = {
    onCloseModal: PropTypes.func,
    onCreateBoard: PropTypes.func,
    visible: PropTypes.bool,
};

const StyledInput = styled(Input)`
    margin-bottom: 10px !important;
`;

const BoardForm = styled.form`
    width: 100%;
    margin: auto;
`;
