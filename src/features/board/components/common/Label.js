import PropTypes from 'prop-types';
import { Icon } from 'antd';
import React from 'react';
import { LabelWrapper } from '../../styles';

export const Label = ({ color, text, active, onClick, card, listKey, small }) => (
    <LabelWrapper
        className={`card-label-${color}`}
        onClick={(event) => onClick(listKey, card.key, { ...card, label: text })}
        small={small}
    >
        {text && <span>{text}</span>}
        {active && <Icon type="check" />}
    </LabelWrapper>
);

Label.propTypes = {
    color: PropTypes.string.isRequired, 
    text: PropTypes.string.isRequired, 
    active: PropTypes.bool, 
    onClick: PropTypes.func, 
    card: PropTypes.object, 
    listKey: PropTypes.string, 
    small: PropTypes.bool
}
