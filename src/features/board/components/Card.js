import { Icon } from 'antd';
import React, { Component } from 'react';

import { GrayButton } from '../../../shared/components/Button';
import { Label } from './Label';
import { LABELS } from '../../../core/constants';
import { TitleInput, CardBlock, Edit } from '../styles';

export class Card extends Component {
    state = {
        showEditIcons: false,
        editMode: false,
        title: '',
    };

    handleShowEditButton = () => {
        this.setState(() => ({ showEditIcons: true }));
    };

    handleHideEditButton = () => {
        this.setState(() => ({ showEditIcons: false }));
    };

    handleDisableEdit = () => {
        this.setState(() => ({ editMode: false }));
    };

    handleTitleChange = event => {
        this.setState({ title: event.target.value });
    };

    handleSubmitForm = (event, callback, listKey, cardKey, title) => {
        event.preventDefault();

        callback(listKey, cardKey, { title }).then(() =>
            this.setState(() => ({
                editMode: false,
            }))
        );
    };

    handleDeleteCard = (callback, listKey, cardKey) => {
        callback(listKey, cardKey);
    };

    render() {
        const { showModal, onEditCard, onDeleteCard, card, listKey } = this.props;
        const { showEditIcons, editMode, title } = this.state;
        return (
            <CardBlock
                onMouseEnter={this.handleShowEditButton}
                onMouseLeave={this.handleHideEditButton}
                onBlur={this.handleDisableEdit}
                editMode={editMode}
                onClick={showModal}
            >
                <div>
                    {card && card.label && (
                        <Label color={getColor(LABELS, card.label)} text={card.label} small={true} />
                    )}
                </div>
                {editMode ? (
                    <form onSubmit={event => this.handleSubmitForm(event, onEditCard, listKey, card.key, title)}>
                        <TitleInput value={this.state.title} onChange={event => this.handleTitleChange(event)} />
                    </form>
                ) : (
                    <React.Fragment>
                        {showEditIcons && (
                            <Edit onClick={event => event.stopPropagation()}>
                                <GrayButton onClick={() => this.handleDeleteCard(onDeleteCard, listKey, card.key)}>
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
}

function getColor(labels, text) {
    const label = labels.find(label => label.text === text);
    return label.color;
}
