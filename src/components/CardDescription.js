import PropTypes from 'prop-types';
import { Button, Input } from 'antd';
import React, { useState } from 'react';
import styled from 'styled-components';
import { isEmptyText } from '../utils/board-utils';

export function CardDescription(props) {
    const [description, setDescription] = useState('');
    const [editMode, setEditMode] = useState(false);

    const submitForm = async (event, callback, listKey, cardKey, card) => {
        event.preventDefault();
        await callback(listKey, cardKey, { ...card, description: description });
        setEditMode(false);
    };

    const { listKey, card, onEditCard } = props;
    return (
        <div>
            {editMode ? (
                <form onSubmit={(event) => submitForm(event, onEditCard, listKey, card.key, card)}>
                    <StyledTextArea
                        onChange={(event) => setDescription(event.target.value)}
                        value={description}
                        autoSize
                    />
                    <SaveButton
                        disabled={isEmptyText(description)}
                        onClick={(event) => submitForm(event, onEditCard, listKey, card.key, card)}
                    >
                        Save
                    </SaveButton>
                    <Button onClick={() => setEditMode(false)}>Cancel</Button>
                </form>
            ) : (
                <DescriptionPlaceholder
                    onClick={() => {
                        setDescription(props.card.description);
                        setEditMode(true);
                    }}
                >
                    {card.description ? (
                        <span>{card.description}</span>
                    ) : (
                        <Detail>Add a more detailed description...</Detail>
                    )}
                </DescriptionPlaceholder>
            )}
        </div>
    );
}

const DescriptionPlaceholder = styled.div``;

CardDescription.propTypes = {
    listKey: PropTypes.string,
    card: PropTypes.object,
    onEditCard: PropTypes.func,
};

const StyledTextArea = styled(Input.TextArea)`
    margin-bottom: 10px !important;
`;

const SaveButton = styled(Button)`
    margin-right: 5px;
    background: #1890ff;
    display: inline-block;
    padding: 0 10px;
`;

const Detail = styled.span`
    cursor: pointer;
`;
