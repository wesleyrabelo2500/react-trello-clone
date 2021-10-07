import { Dropdown, Input, Menu } from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import styled from 'styled-components';
import { StyledButton } from '../global-styles';

export const ColumnHeader = (props) => {
    const { listTitle, columnId, onEditList, onDeleteList } = props;
    const [edit, setEdit] = useState(false);
    const [title, setTitle] = useState('');

    const handleEnableEdit = () => {
        setEdit(true);
        setTitle(listTitle);
    };

    const handleFormSubmit = async (event, callback, columnId, listTitle) => {
        event.preventDefault();

        await callback(columnId, listTitle);
        setTitle('');
        setEdit(false);
    };

    const handleDeleteList = (callback, columnId) => {
        callback(columnId);
    };

    return (
        <Header>
            {edit ? (
                <form
                    onSubmit={(event) => handleFormSubmit(event, onEditList, columnId, title)}
                    onBlur={(event) => handleFormSubmit(event, onEditList, columnId, title)}
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
                        <Menu.Item key="1" onClick={() => handleDeleteList(onDeleteList, columnId)}>
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

    svg {
        color: black;
    }
`;

const InputTitle = styled(Input)`
    height: 25px !important;
    margin-bottom: 0.5em !important;
    font-weight: bold;
    padding: 4px 5px !important;
    font-size: 1.17em !important;
`;
