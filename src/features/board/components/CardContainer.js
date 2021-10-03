import React, { Component } from 'react';
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

function collect(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging(),
    };
}

class CardContainer extends Component {
    state = {
        card: {},
        modalIsVisible: false,
    };

    render() {
        const { listKey, card, connectDragSource, onEditCard, onDeleteCard } = this.props;
        const { modalIsVisible } = this.state;

        return connectDragSource(
            <div>
                <Card
                    card={card}
                    showModal={() =>
                        this.setState({
                            modalIsVisible: true,
                        })
                    }
                    onEditCard={onEditCard}
                    onDeleteCard={onDeleteCard}
                    listKey={listKey}
                />

                <CardModal
                    listKey={listKey}
                    card={card}
                    visible={modalIsVisible}
                    onOk={() =>
                        this.setState({
                            modalIsVisible: false,
                        })
                    }
                    onCancel={() =>
                        this.setState({
                            modalIsVisible: false,
                        })
                    }
                    onEditCard={onEditCard}
                    onDeleteCard={onDeleteCard}
                />
            </div>
        );
    }
}

export default DragSource(ItemTypes.CARD, cardSource, collect)(CardContainer);
