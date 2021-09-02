import { Icon } from 'antd';
import { Favorite, StyledBoardLink, Title } from '../styles';

export const BoardLink = ({ title, favorite }) => (
    <StyledBoardLink color="#0079BF">
        <Title>{title}</Title>
        <Favorite favorite={favorite}>
            <Icon type="star" />
        </Favorite>
    </StyledBoardLink>
);
