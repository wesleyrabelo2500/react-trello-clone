import styled from 'styled-components';

export const Button = styled.div`
    transition: 0.1s ease;
    border-radius: 3px;
    color: #fff;
    display: block;
    font-weight: 700;
    line-height: 32px;
    margin-right: 4px;
    min-width: 32px;
    text-decoration: none;
    text-align: center;
    &:hover {
        cursor: pointer;
    }
    i {
        font-size: 1rem !important;
    }
`;

export const GrayButton = styled(Button)`
    color: gray;
    margin: 0;
    font-size: 10px;
    padding: 4px;
    line-height: inherit;
    min-width: auto;
    &:hover {
        background: #eee;
        color: gray;
    }
`;
