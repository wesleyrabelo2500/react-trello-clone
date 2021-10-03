import React, { Component, useState } from 'react';
import { DragSource } from 'react-dnd';
import { ItemTypes } from '../../../core/constants';
import { Card } from './Card';
import { CardModal } from './CardModal';

const cardSource = {
    beginDrag(props) {
        return props;
    },
    endDrag(props) {
        return props;
    },
};

const collect = (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
});

function CardContainer(props) {
    const [modalIsVisible, setModalIsVisible] = useState(false);

    const { listKey, card, connectDragSource, onEditCard, onDeleteCard } = props;

    return connectDragSource(
        <div>
            <Card
                card={card}
                showModal={() => setModalIsVisible(true)}
                onEditCard={onEditCard}
                onDeleteCard={onDeleteCard}
                listKey={listKey}
            />

            <CardModal
                listKey={listKey}
                card={card}
                visible={modalIsVisible}
                onOk={() => setModalIsVisible(false)}
                onCancel={() => setModalIsVisible(false)}
                onEditCard={onEditCard}
                onDeleteCard={onDeleteCard}
            />
        </div>
    );
}

export default DragSource(ItemTypes.CARD, cardSource, collect)(CardContainer);
