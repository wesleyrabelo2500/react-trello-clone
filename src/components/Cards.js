import React, { useState } from 'react';
import { DragSource } from 'react-dnd';
import { ItemTypes } from '../constants';
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

function Cards(props) {
    const [modalIsVisible, setModalIsVisible] = useState(false);

    const { columnId, card, connectDragSource, onEditCard, onDeleteCard } = props;

    return connectDragSource(
        <div>
            <Card
                card={card}
                showModal={() => setModalIsVisible(true)}
                onEditCard={onEditCard}
                onDeleteCard={onDeleteCard}
                columnId={columnId}
            />

            <CardModal
                columnId={columnId}
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

export default DragSource(ItemTypes.CARD, cardSource, collect)(Cards);
