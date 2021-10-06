import PropTypes from 'prop-types';
import { StarOutlined, StarFilled } from '@ant-design/icons';
import styled from 'styled-components';

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

const Title = styled.div`
    font-weight: bold;
`;

const Favorite = styled.div`
    position: absolute;
    bottom: 4px;
    right: 4px;
    transition: all 0.1s;
    color: ${(props) => (props.favorite ? '#f2d600' : 'white')};
    display: ${(props) => (props.favorite ? 'block' : 'none')};
`;

const StyledBoardLink = styled.div`
    position: relative;
    display: inline-block;
    padding: 4px;
    width: 250px;
    height: 80px;
    background-color: ${(props) => props.color};
    color: white;
    margin: 0.5%;
    border-radius: 4px;
    transition: all 0.3s;
`;
