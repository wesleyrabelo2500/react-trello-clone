import { Button } from 'antd';
import React, { Component } from 'react';
import styled from 'styled-components';
import { Detail, SaveButton, StyledTextArea } from '../styles';

export class CardDescription extends Component {
    state = {
        description: '',
        editMode: false,
    };

    submitForm = async (event, callback, listKey, cardKey, card) => {
        event.preventDefault();
        await callback(listKey, cardKey, { ...card, description: this.state.description });
        this.setState({
            editMode: false,
        });
    };

    handleDescriptionChange = (event) => {};

    render() {
        const { editMode } = this.state;
        const { listKey, card, onEditCard } = this.props;
        const isValid = this.state.description;
        return (
            <div>
                {editMode ? (
                    <form
                        onSubmit={(event) =>
                            this.submitForm(event, onEditCard, listKey, card.key, card)
                        }
                    >
                        <StyledTextArea
                            onChange={(event) => this.setState({ description: event.target.value })}
                            value={this.state.description}
                            autoSize
                        />
                        <SaveButton
                            disabled={!isValid}
                            onClick={(event) =>
                                this.submitForm(event, onEditCard, listKey, card.key, card)
                            }
                        >
                            Save
                        </SaveButton>
                        <Button
                            onClick={(event) =>
                                this.setState({
                                    editMode: false,
                                })
                            }
                        >
                            Cancel
                        </Button>
                    </form>
                ) : (
                    <DescriptionPlaceholder
                        onClick={(event) =>
                            this.setState({
                                description: this.props.card.description,
                                editMode: true,
                            })
                        }
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
}

const DescriptionPlaceholder = styled.div``;
