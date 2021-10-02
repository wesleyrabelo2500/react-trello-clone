import { Dropdown, Icon, Menu } from 'antd';
import React, { Component } from 'react';
import { Header, InputTitle, StyledButton } from '../styles';

export class ListHeader extends Component {
    state = {
        edit: false,
        title: '',
    };

    handleFormSubmit = async (event, callback, listKey, listTitle) => {
        event.preventDefault();
        await callback(listKey, listTitle);
        this.setState(() => ({ title: '', edit: false }));
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
                        <InputTitle
                            value={title}
                            onChange={(event) => this.setState({ title: event.target.value })}
                        />
                    </form>
                ) : (
                    <h4
                        onClick={() =>
                            this.setState(() => ({ edit: true, title: this.props.listTitle }))
                        }
                        role="presentation"
                    >
                        {listTitle}
                    </h4>
                )}
                <Dropdown
                    overlay={
                        <Menu>
                            <Menu.Item key="1" onClick={() => onDeleteList(listKey)}>
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
