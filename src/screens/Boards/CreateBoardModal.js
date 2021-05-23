import React, { Component } from 'react';
import { Button as AButton, Input, Modal } from 'antd';
import styled from 'styled-components';

import { BoardForm } from './styled';
import { DEFAULT_COLOR } from '../../constants';

export default class CreateBoardModal extends Component {
  state = {
    boardTitle: ''
  };

  handleCreateBoard = (event, callback) => {
    event.preventDefault();
    const board = {
      title: this.state.boardTitle,
      color: DEFAULT_COLOR
    };
    if (!board.title) {
      return;
    }
    return callback(board).then(() => {
      this.setState(() => ({
        boardTitle: ''
      }));
    });
  };

  handleBoardTitleChange = event => {
    this.setState({
      boardTitle: event.target.value
    });
  };

  handleBoardColorChange = event => {
    this.setState({
      boardColor: event
    });
  };

  render() {
    const { onCloseModal, onCreateBoard, visible } = this.props;
    const isValid = this.state.boardTitle;

    return (
      <Modal
        title="Create board"
        width="320px"
        style={{ top: 20 }}
        visible={visible}
        onCancel={onCloseModal}
        footer={null}
      >
        <BoardForm
          onSubmit={event => this.handleCreateBoard(event, onCreateBoard)}
        >
          <StyledInput
            placeholder="Add board title"
            onChange={event => this.handleBoardTitleChange(event)}
            value={this.state.boardTitle}
          />
          {isValid && (
            <AButton
              disabled={!isValid}
              type="primary"
              onClick={event => this.handleCreateBoard(event, onCreateBoard)}
              key="0"
            >
              Create
            </AButton>
          )}
        </BoardForm>
      </Modal>
    );
  }
}

const StyledInput = styled(Input)`
  margin-bottom: 10px !important;
`;
