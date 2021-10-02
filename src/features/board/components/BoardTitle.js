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

export const BoardTitle = ({props}) => {
    const [state, setState] = useState({
      edit: false,
      boardTitle: '',  
    });
    const { title, favorite, boardKey, onAddToFavorites, deleteBoard, updateBoard } = props;

    const handleEnableEdit = () => {
        setState({
            edit:true, 
            boardTitle: title
        });
    };

    const handleDisableEdit = () => {
        setState({...state, edit: false});
    };

    const handleBoardTitleChange = (event) => {
        setState({ ...state, boardTitle: event.target.value});
    };

    const handleSubmitForm = (event, callback, boardKey, title) => {
        event.preventDefault();
        if(!title) {
            return;
        }
        callback(boardKey, {title}).then(() => {
            setState({...state, edit: false})
        });
    };

    return (
        <StyledBoardTitle>
                <h3>
                    {edit ? (
                        <Form
                            onSubmit={(event) =>
                                handleSubmitForm(event, updateBoard, boardKey, boardTitle)
                            }
                            onBlur={handleDisableEdit}
                        >
                            <Input value={boardTitle} onChange={handleBoardTitleChange} />
                        </Form>
                    ) : (
                        <Button onClick={handleEnableEdit}>{title}</Button>
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
    )
};

export default BoardTitle;