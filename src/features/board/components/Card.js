import { Icon } from 'antd';
import React, { Component } from 'react';
import { LABELS } from '../../../core/constants';
import { GrayButton } from '../../../shared/components/Button';
import { CardBlock, Edit, TitleInput } from '../styles';
import { Label } from './common/Label';

export class Card extends Component {
    state = {
        showEditIcons: false,
        editMode: false,
        title: '',
    };

    handleSubmitForm = async (event, callback, listKey, cardKey, title) => {
        event.preventDefault();
        await callback(listKey, cardKey, { title });
        this.setState(() => ({
            editMode: false,
        }));
    };

    getColor(labels, text) {
        return labels.find((label) => label.text === text).color;
    }

    render() {
        const { showModal, onEditCard, onDeleteCard, card, listKey } = this.props;
        const { showEditIcons, editMode, title } = this.state;
        return (
            <CardBlock
                onMouseEnter={() => this.setState(() => ({ showEditIcons: true }))}
                onMouseLeave={() => this.setState(() => ({ showEditIcons: false }))}
                onBlur={() => this.setState(() => ({ editMode: false }))}
                editMode={editMode}
                onClick={showModal}
            >
                <div>
                    {card && card.label && (
                        <Label
                            color={this.getColor(LABELS, card.label)}
                            text={card.label}
                            small={true}
                        />
                    )}
                </div>
                {editMode ? (
                    <form
                        onSubmit={(event) =>
                            this.handleSubmitForm(event, onEditCard, listKey, card.key, title)
                        }
                    >
                        <TitleInput
                            value={this.state.title}
                            onChange={(event) => this.setState({ title: event.target.value })}
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
}
