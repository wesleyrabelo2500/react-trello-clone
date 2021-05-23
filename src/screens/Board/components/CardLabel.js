import { LABELS } from '../../../core/constants';
import React, { Component } from 'react';
import { Label } from './Label';

export class CardLabel extends Component {
    render() {
        const { card, listKey, onEditCard } = this.props;
        return LABELS.map((label, index) => (
            <Label
                key={index}
                color={label.color}
                text={label.text}
                active={card.label === label.text}
                card={card}
                listKey={listKey}
                onClick={onEditCard}
            />
        ));
    }
}
