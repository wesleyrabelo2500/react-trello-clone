import PropTypes from 'prop-types';
import { StarOutlined, StarFilled } from '@ant-design/icons';
import { Favorite, StyledBoardLink, Title } from '../../styles/boards-styles';

export const BoardLink = ({ title, favorite, color }) => (
    <StyledBoardLink color={color || '#0079BF'}>
        <Title>{title}</Title>
        <Favorite favorite={favorite}>{favorite ? <StarFilled /> : <StarOutlined />}</Favorite>
    </StyledBoardLink>
);

BoardLink.propTypes = {
    title: PropTypes.string.isRequired,
    favorite: PropTypes.bool,
    color: PropTypes.string,
};
