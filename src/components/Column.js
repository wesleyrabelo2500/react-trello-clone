import React from 'react';
import { DropTarget } from 'react-dnd';
import { ItemTypes } from '../constants';
import { CreateCardControl } from './CreateCardControl';
import CardContainer from './Cards';
import { ColumnHeader } from './ColumnHeader';

const Column = (props) => {
    const {
        connectDropTarget,
        cards,
        columnId,
        list,
        handleUpdateList,
        handleDeleteList,
        handleCreateCard,
    } = props;

    return connectDropTarget(
        <div>
            <ColumnHeader
                columnId={list.key}
                listTitle={list.title}
                onEditList={handleUpdateList}
                onDeleteList={handleDeleteList}
            />

            {cards.map((card) => (
                <CardContainer key={card.key} card={card} />
            ))}

            <CreateCardControl
                placeholder="Create card"
                onCreate={(data) => handleCreateCard(columnId, data)}
            />
        </div>
    );
};

const cardTarget = {
    drop(props, monitor) {
        const item = monitor.getItem();
        const newColumnId = props.columnId;
        const oldColumnId = item.card.columnId;
        props.handleMoveCard(item.card.key, oldColumnId, newColumnId);
    },
};

function collect(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver(),
    };
}

export default DropTarget(ItemTypes.CARD, cardTarget, collect)(Column);
