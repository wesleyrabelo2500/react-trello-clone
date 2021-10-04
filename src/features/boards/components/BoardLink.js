import PropTypes from 'prop-types'; // ES6
import { Icon } from '@ant-design/compatible';
import { Favorite, StyledBoardLink, Title } from '../styles';

export const BoardLink = ({ title, favorite, color }) => (
    <StyledBoardLink color={color || "#0079BF"}>
        <Title>{title}</Title>
        <Favorite favorite={favorite}>
            <Icon type="star" />
        </Favorite>
    </StyledBoardLink>
);

BoardLink.propTypes = {
    title: PropTypes.string.isRequired,
    favorite: PropTypes.string,
    color: PropTypes.string
}
