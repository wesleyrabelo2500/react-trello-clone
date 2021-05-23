import styled from 'styled-components';

export const StyledList = styled.div`
    background-color: #dfe3e6;
    border-radius: 3px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    max-height: 100%;
    position: relative;
    white-space: normal;
    padding: 8px;
`;

export const ListWrapper = styled.div`
    width: 272px;
    margin: 0 4px;
    height: 100%;
    box-sizing: border-box;
    display: inline-block;
    vertical-align: top;
    white-space: nowrap;
`;

export const List = props => (
    <ListWrapper>
        <StyledList>{props.children}</StyledList>
    </ListWrapper>
);
