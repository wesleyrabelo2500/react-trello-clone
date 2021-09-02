import { Dropdown, Icon, Menu } from 'antd';
import React, { Component } from 'react';
import { Header, StyledButton, InputTitle } from '../styles';

export class ListHeader extends Component {
    state = {
        edit: false,
        title: '',
    };

    handleEnableEdit = () => {
        const { listTitle } = this.props;
        this.setState(() => ({ edit: true, title: listTitle }));
    };

    handleDisableEdit = () => {
        this.setState(() => ({ edit: false }));
    };

    handleInputChange = (event) => {
        this.setState({ title: event.target.value });
    };

    handleFormSubmit = (event, callback, listKey, listTitle) => {
        event.preventDefault();

        callback(listKey, listTitle).then(() => this.setState(() => ({ title: '', edit: false })));
    };

    handleDeleteList = (callback, listKey) => {
        callback(listKey);
    };

    render() {
        const { listTitle, listKey, onEditList, onDeleteList } = this.props;
        const { edit, title } = this.state;
        return (
            <Header>
                {edit ? (
                    <form
                        onSubmit={(event) =>
                            this.handleFormSubmit(event, onEditList, listKey, title)
                        }
                        onBlur={(event) => this.handleFormSubmit(event, onEditList, listKey, title)}
                    >
                        <InputTitle value={title} onChange={this.handleInputChange} />
                    </form>
                ) : (
                    <h4 onClick={this.handleEnableEdit} role="presentation">{listTitle}</h4>
                )}
                <Dropdown
                    overlay={
                        <Menu>
                            <Menu.Item
                                key="1"
                                onClick={(event) => this.handleDeleteList(onDeleteList, listKey)}
                            >
                                Delete This List
                            </Menu.Item>
                        </Menu>
                    }
                    trigger={['click']}
                >
                    <StyledButton>
                        <Icon type="ellipsis" />
                    </StyledButton>
                </Dropdown>
            </Header>
        );
    }
}
