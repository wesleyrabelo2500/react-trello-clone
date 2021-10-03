import { Icon } from 'antd';
import React, { useState } from 'react';
import { LABELS } from '../../../core/constants';
import { GrayButton } from '../../../shared/components/Button';
import { CardBlock, Edit, TitleInput } from '../styles';
import { Label } from './common/Label';

export function Card(props) {
    const [state, setState] = useState({
        showEditIcons: false,
        editMode: false,
        title: '',
    });

    const handleSubmitForm = async (event, callback, listKey, cardKey, title) => {
        event.preventDefault();
        await callback(listKey, cardKey, { title });
        setState((prvsState) => ({
            ...prvsState,
            editMode: false,
        }));
    };

    const getColor = (labels, text) => {
        const label = labels.find((label) => label.text === text);
        return label.color;
    };

    const { showModal, onEditCard, onDeleteCard, card, listKey } = props;
    const { showEditIcons, editMode, title } = state;

    return (
        <CardBlock
            onMouseEnter={() => setState((prvsState) => ({ ...prvsState, showEditIcons: true }))}
            onMouseLeave={() => setState((prvsState) => ({ ...prvsState, showEditIcons: false }))}
            onBlur={() => setState((prvsState) => ({ ...prvsState, editMode: false }))}
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
                    <TitleInput
                        value={state.title}
                        onChange={(event) => setState({ title: event.target.value })}
                    />
                </form>
            ) : (
                <React.Fragment>
                    {showEditIcons && (
                        <Edit onClick={(event) => event.stopPropagation()}>
                            <GrayButton onClick={() => onDeleteCard(listKey, card.key)}>
                                <Icon type="delete" />
                            </GrayButton>
                        </Edit>
                    )}
                    <div>{card.title}</div>
                </React.Fragment>
            )}
            <div>{card.description && <Icon type="align-left" />}</div>
        </CardBlock>
    );
}
