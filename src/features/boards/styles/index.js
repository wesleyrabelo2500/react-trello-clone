import styled from 'styled-components';
import { Input } from 'antd';

export const BoardTypes = styled.div`
    margin: auto;
    padding: 0 10px;
    margin-bottom: 20px;
`;

export const BoardTypeTitle = styled.h4`
    i {
        margin-right: 5px;
        color: gray;
    }
    margin-left: 5px;
    margin-bottom: 0px;
`;

export const Boards = styled.div``;

export const StyledBoardLink = styled.div`
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

export const StyledNewBoard = styled(StyledBoardLink)`
    color: #6b808c;
    cursor: pointer;
    position: relative;
`;

export const NewBoardContent = styled.div`
    text-align: center;
`;

export const CreateBoardTitle = styled.div`
    top: 25px;
    position: relative;
`;

export const Title = styled.div`
    font-weight: bold;
`;

export const Favorite = styled.div`
    position: absolute;
    bottom: 4px;
    right: 4px;
    transition: all 0.1s;
    color: ${(props) => (props.favorite ? '#f2d600' : 'white')};
    display: ${(props) => (props.favorite ? 'block' : 'none')};
`;

export const StyledInput = styled(Input)`
    margin-bottom: 10px !important;
`;

export const BoardForm = styled.form`
    width: 100%;
`;
