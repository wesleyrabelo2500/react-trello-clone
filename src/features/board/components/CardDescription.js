import { Button } from 'antd';
import React, { useState } from 'react';
import styled from 'styled-components';
import { Detail, SaveButton, StyledTextArea } from '../styles';
import { isEmptyText } from '../../../shared/utils';

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
