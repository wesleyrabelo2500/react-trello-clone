import { Icon } from 'antd';
import { Link } from 'react-router-dom';
import React, { Component } from 'react';

import { CreateBoardModal } from '../components/CreateBoardModal';
import { createBoard, getBoards } from '../../../core/api/db';
import { Spinner } from '../../../shared/components/Spinner';
import { isEmpty, mergeDataWithKey } from '../../../shared/utils';
import { withAuthorization } from '../../../auth/utils/AuthHOC';
import {
    Boards,
    BoardTypes,
    BoardTypeTitle,
    StyledBoardLink,
    StyledNewBoard,
    NewBoardContent,
    Title,
    Favorite,
    CreateBoardTitle,
} from '../styles';

class BoardsScreen extends Component {
    state = {
        boards: [],
        isLoading: false,
        modalVisible: false,
    };

    componentDidMount = () => {
        this.setState({
            isLoading: true,
        });
        getBoards()
            .then((snapshot) => {
                if (!snapshot.val()) {
                    return;
                }
                this.setState({
                    boards: mergeDataWithKey(snapshot.val()),
                });
            })
            .finally(() => {
                this.setState({
                    isLoading: false,
                });
            });
    };

    handleCreateBoard = (board) => {
        return createBoard(board).then((response) => {
            let updatedBoards = this.state.boards;
            updatedBoards.push(response);
            this.setState({
                boards: updatedBoards,
                modalVisible: false,
            });
        });
    };

    setModalVisible = () => {
        this.setState({ modalVisible: true });
    };

    handleCloseModal = () => {
        this.setState({
            modalVisible: false,
        });
    };

    render() {
        const { isLoading } = this.state;
        const { boards } = this.state;
        const starredBoards = boards.filter((board) => board.favorite);

        return isLoading ? (
            <Spinner />
        ) : (
            <Boards>
                {!isEmpty(starredBoards) && (
                    <BoardTypes>
                        <BoardTypeTitle>
                            <Icon type="star" />
                            Starred Boards
                        </BoardTypeTitle>

                        {starredBoards.map((board, index) => {
                            return (
                                <Link to={`b/${board.key}`} key={index}>
                                    <BoardLink
                                        title={board.title}
                                        color="#0079BF"
                                        favorite={board.favorite}
                                    />
                                </Link>
                            );
                        })}
                    </BoardTypes>
                )}

                <BoardTypes>
                    <BoardTypeTitle>
                        <Icon type="user" />
                        Personal Boards
                    </BoardTypeTitle>

                    <React.Fragment>
                        {boards.map((board, index) => {
                            return (
                                <Link key={index} to={`b/${board.key}`}>
                                    <BoardLink
                                        key={index}
                                        title={board.title}
                                        color="#0079BF"
                                        favorite={board.favorite}
                                    />
                                </Link>
                            );
                        })}
                        <NewBoard onClick={this.setModalVisible} />
                    </React.Fragment>
                </BoardTypes>

                <CreateBoardModal
                    onCreateBoard={this.handleCreateBoard}
                    onCloseModal={this.handleCloseModal}
                    visible={this.state.modalVisible}
                />
            </Boards>
        );
    }
}

export const BoardLink = ({ title, favorite }) => (
    <StyledBoardLink color="#0079BF">
        <Title>{title}</Title>
        <Favorite favorite={favorite}>
            <Icon type="star" />
        </Favorite>
    </StyledBoardLink>
);

export const NewBoard = ({ onClick }) => (
    <StyledNewBoard color="#eee" onClick={onClick}>
        <NewBoardContent>
            <CreateBoardTitle>Create new board...</CreateBoardTitle>
        </NewBoardContent>
    </StyledNewBoard>
);

const authCondition = (authUser) => !!authUser;

export const WrapperBoardsScreen = withAuthorization(authCondition)(BoardsScreen);
