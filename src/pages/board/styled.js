import styled from 'styled-components';

export const AddList = styled.div`
    width: 272px;
    margin: 0 4px;
    display: inline-block;
`;

export const Lists = styled.div`
    background-color: #0079bf;
    flex: 1;
    display: flex;
    overflow: auto;
    white-space: nowrap;
    padding: 0 1rem;

    > div {
        margin-right: 1rem;
    }
`;
