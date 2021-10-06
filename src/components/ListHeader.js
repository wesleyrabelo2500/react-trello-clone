import { Dropdown, Input, Menu } from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import styled from 'styled-components';
import { StyledButton } from '../global-styles';

export const ListHeader = (props) => {
    const { listTitle, listKey, onEditList, onDeleteList } = props;
    const [edit, setEdit] = useState(false);
    const [title, setTitle] = useState('');

    const handleEnableEdit = () => {
        setEdit(true);
        setTitle(listTitle);
    };

    const handleFormSubmit = async (event, callback, listKey, listTitle) => {
        event.preventDefault();

        await callback(listKey, listTitle);
        setTitle('');
        setEdit(false);
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
                    <InputTitle value={title} onChange={(e) => setTitle(e.target.value)} />
                </form>
            ) : (
                <h4 onClick={handleEnableEdit} role="presentation">
                    {listTitle}
                </h4>
            )}
            <Dropdown
                overlay={
                    <Menu>
                        <Menu.Item key="1" onClick={() => handleDeleteList(onDeleteList, listKey)}>
                            Delete This List
                        </Menu.Item>
                    </Menu>
                }
                trigger={['click']}
            >
                <StyledButton>
                    <EllipsisOutlined />
                </StyledButton>
            </Dropdown>
        </Header>
    );
};

const Header = styled.div`
    display: flex;
    margin-bottom: 5px;
    background: #fff;
    justify-content: space-between;
    border-radius: 5px;
    padding: 0 0px 0 10px;
    align-items: center;
    min-width: 250px;
`;

const InputTitle = styled(Input)`
    height: 25px !important;
    margin-bottom: 0.5em !important;
    font-weight: bold;
    padding: 4px 5px !important;
    font-size: 1.17em !important;
`;
