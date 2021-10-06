import React, { useState } from 'react';
import PropType from 'prop-types';

import { DeleteOutlined, AlignLeftOutlined } from '@ant-design/icons';
import { LABELS } from '../constants/constants';
import { GrayButton } from './common/Button';
import { Label } from './common/Label';
import styled from 'styled-components';
import { Input } from 'antd';

export const Card = (props) => {
    const [showEditIcons, setEditIcons] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [title, setTitle] = useState('');

    const handleSubmitForm = async (event, callback, listKey, cardKey, title) => {
        event.preventDefault();
        await callback(listKey, cardKey, { title });
        setEditMode(false);
    };

    const getColor = (labels, text) => {
        const label = labels.find((label) => label.text === text);
        return label.color;
    };

    const { showModal, onEditCard, onDeleteCard, card, listKey } = props;

    return (
        <CardBlock
            onMouseEnter={() => setEditIcons(true)}
            onMouseLeave={() => setEditIcons(false)}
            onBlur={() => setEditMode(false)}
            editMode={editMode}
            onClick={showModal}
        >
            <div>
                {card && card.label && (
                    <Label color={getColor(LABELS, card.label)} text={card.label} small={true} />
                )}
            </div>
            {editMode ? (
                <form
                    onSubmit={(event) =>
                        handleSubmitForm(event, onEditCard, listKey, card.key, title)
                    }
                >
                    <TitleInput value={title} onChange={(event) => setTitle(event.target.value)} />
                </form>
            ) : (
                <React.Fragment>
                    {showEditIcons && (
                        <Edit onClick={(event) => event.stopPropagation()}>
                            <GrayButton onClick={() => onDeleteCard(listKey, card.key)}>
                                <DeleteOutlined />
                            </GrayButton>
                        </Edit>
                    )}
                    <div>{card.title}</div>
                </React.Fragment>
            )}
            <div>{card.description && <AlignLeftOutlined />}</div>
        </CardBlock>
    );
};

Card.propType = {
    listKey: PropType.string.isRequired,
    card: PropType.object.isRequired,
    showModal: PropType.func.isRequired,
    onEditCard: PropType.func.isRequired,
    onDeleteCard: PropType.func.isRequired,
};

const CardBlock = styled.div`
    position: relative;
    background: white;
    margin-bottom: 7px;
    border-radius: 3px;
    padding: 6px 10px 6px;
    box-shadow: 0px 1px 0px grey;
    min-width: 250px;
    &:hover {
        background: ${(props) => (props.editMode ? '#fff' : '#efefef')};
        cursor: pointer;
    }
`;

const TitleInput = styled(Input)`
    border: none !important;
    outline: none !important;
    height: 20px !important;
    padding-left: 0 !important;
    &:focus {
        box-shadow: none !important;
    }
`;

const Edit = styled.div`
    position: absolute;
    right: 4px;
    top: 4px;
    > div {
        display: inline-block;
    }
`;
