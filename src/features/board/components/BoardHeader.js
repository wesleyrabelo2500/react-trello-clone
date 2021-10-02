import { Dropdown, Icon, Input, Menu } from 'antd';
import React, { useState } from 'react';
import { Button } from '../../../shared/components/Button';
import {
    Favorite,
    Form,
    ShowMenuButton,
    StyledBoardTitle,
    StyledButton,
    StyledIcon,
} from '../styles';

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
                    <StyledIcon type="star" className={favorite && 'active'} />
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
                        <Icon type="ellipsis" />
                    </Button>
                </Dropdown>
            </ShowMenuButton>
        </StyledBoardTitle>
    );
};

export default BoardHeader;
