import { Dropdown, Icon, Input, Menu } from 'antd';
import React, { Component } from 'react';
import { Button } from '../../../shared/components/Button';
import {
    Favorite,
    Form,
    ShowMenuButton,
    StyledBoardTitle,
    StyledButton,
    StyledIcon,
} from '../styles';

export class BoardTitle extends Component {
    state = {
        edit: false,
        title: '',
    };

    handleEnableEdit = () => {
        this.setState({
            edit: true,
            boardTitle: this.props.title,
        });
    };

    handleDisableEdit = () => {
        this.setState({
            edit: false,
        });
    };

    handleBoardTitleChange = (event) => {
        this.setState({
            boardTitle: event.target.value,
        });
    };

    handleSubmitForm = (event, callback, boardKey, title) => {
        event.preventDefault();
        if (!title) {
            return;
        }
        callback(boardKey, { title }).then(() => {
            this.setState({
                edit: false,
            });
        });
    };

    render() {
        const { title, favorite, boardKey, onAddToFavorites, deleteBoard, updateBoard } =
            this.props;

        const { edit, boardTitle } = this.state;
        return (
            <StyledBoardTitle>
                <h3>
                    {edit ? (
                        <Form
                            onSubmit={(event) =>
                                this.handleSubmitForm(event, updateBoard, boardKey, boardTitle)
                            }
                            onBlur={this.handleDisableEdit}
                        >
                            <Input value={boardTitle} onChange={this.handleBoardTitleChange} />
                        </Form>
                    ) : (
                        <Button onClick={this.handleEnableEdit}>{title}</Button>
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
    }
}
