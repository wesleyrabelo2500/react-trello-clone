import { Dropdown, Input, Menu } from 'antd';
import { EllipsisOutlined, StarFilled, StarOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import { Button } from './common/Button';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { StyledButton } from '../global-styles';

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
            <div>
                <StyledButton onClick={onAddToFavorites} active={favorite}>
                    {favorite ? <StarFilled style={{ color: '#f2d600' }} /> : <StarOutlined />}
                </StyledButton>
            </div>
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

const Form = styled.form`
    margin-right: 5px !important;
  }
`;

const ShowMenuButton = styled.div`
    color: white;
    position: absolute;
    right: 0;
    text-decoration: underline;
    div {
        font-weight: normal;
    }
`;

const StyledBoardTitle = styled.div`
    margin-top: -20px;
    background: #0079bf;
    display: flex;
    position: relative;
    padding: 8px 8px 12px;
`;

export default BoardHeader;
