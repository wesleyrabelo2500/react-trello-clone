import { Dropdown, Input, Menu } from 'antd';
import { EllipsisOutlined, StarFilled, StarOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import { Button } from './common/Button';
import {
    Favorite,
    Form,
    ShowMenuButton,
    StyledBoardTitle,
    StyledButton,
} from '../styles/board-styles';
import PropTypes from 'prop-types';

const BoardHeader = (props) => {
    const [edit, setEdit] = useState(false);
    const [boardTitle, setBoardTitle] = useState('');
    const { title, favorite, boardKey, onAddToFavorites, deleteBoard, updateBoard } = props;

    const handleSubmitForm = async (event, callback, boardKey, title) => {
        event.preventDefault();
        if (!title) {
            return;
        }
        await callback(boardKey, { title });
        setEdit(false);
    };

    return (
        <StyledBoardTitle>
            <h3>
                {edit ? (
                    <Form
                        onSubmit={(event) =>
                            handleSubmitForm(event, updateBoard, boardKey, boardTitle)
                        }
                        onBlur={() => setEdit(false)}
                    >
                        <Input
                            value={boardTitle}
                            onChange={(event) => setBoardTitle(event.target.value)}
                        />
                    </Form>
                ) : (
                    <Button onClick={() => setEdit(true)}>{title}</Button>
                )}
            </h3>
            <Favorite>
                <StyledButton onClick={onAddToFavorites} active={favorite}>
                    {favorite ? <StarFilled style={{ color: '#f2d600' }} /> : <StarOutlined />}
                </StyledButton>
            </Favorite>
            <ShowMenuButton>
                <Dropdown
                    overlay={
                        <Menu>
                            <Menu.Item key="0" onClick={() => deleteBoard(boardKey)}>
                                Delete board
                            </Menu.Item>
                        </Menu>
                    }
                    trigger={['click']}
                >
                    <Button>
                        <EllipsisOutlined />
                    </Button>
                </Dropdown>
            </ShowMenuButton>
        </StyledBoardTitle>
    );
};

BoardHeader.propTypes = {
    title: PropTypes.string.isRequired,
    favorite: PropTypes.bool,
    boardKey: PropTypes.string.isRequired,
    onAddToFavorites: PropTypes.func.isRequired,
    deleteBoard: PropTypes.func.isRequired,
    updateBoard: PropTypes.func.isRequired,
};

export default BoardHeader;
