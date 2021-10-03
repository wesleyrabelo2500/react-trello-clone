import { Dropdown, Icon, Menu } from 'antd';
import React, { useState } from 'react';
import { Header, InputTitle, StyledButton } from '../styles';

export const ListHeader = (props) => {
    const { listTitle, listKey, onEditList, onDeleteList } = props;
    const [edit, setEdit] = useState(false);
    const [title, setTitle] = useState('');

    const handleDisableEdit = () => {
        setEdit(false);
    };

    const handleEnableEdit = () => {
        setEdit(true);
        setTitle(listTitle);
    };

    const handleInputChange = (e) => {
        setTitle(e.target.value);
    };

    const handleFormSubmit = (event, callback, listKey, listTitle) => {
        event.preventDefault();

        callback(listKey, listTitle).then(() => {
            setTitle('');
            setEdit(false);
        });
    };

    const handleDeleteList = (callback, listKey) => {
        callback(listKey);
    };

    return (
        <Header>
            {edit ? (
                <form
                    onSubmit={(event) => handleFormSubmit(event, onEditList, listKey, title)}
                    onBlur={(event) => handleFormSubmit(event, onEditList, listKey, title)}
                >
                    <InputTitle value={title} onChange={handleInputChange} />
                </form>
            ) : (
                <h4 onClick={handleEnableEdit} role="presentation">
                    {listTitle}
                </h4>
            )}
            <Dropdown
                overlay={
                    <Menu>
                        <Menu.Item
                            key="1"
                            onClick={(event) => handleDeleteList(onDeleteList, listKey)}
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
};
