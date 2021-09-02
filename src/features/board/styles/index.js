import styled from 'styled-components';
import { Icon, Input } from 'antd';
import { Button } from '../../../shared/components/Button';

export const AddList = styled.div`
    width: 250px;
`;

export const Lists = styled.div`
    background-color: #0079bf;
    flex: 1;
    display: flex;
    overflow: auto;
    white-space: nowrap;
    padding: 0 10px;

    > div {
        margin-right: 1rem;
    }
`;

export const Form = styled.form`
    margin-right: 5px !important;
`;

export const StyledBoardTitle = styled.div`
    margin-top: -20px;
    background: #0079bf;
    display: flex;
    position: relative;
    padding: 8px 8px 12px;
`;

export const Favorite = styled.div``;

export const ShowMenuButton = styled.div`
    color: white;
    position: absolute;
    right: 0;
    text-decoration: underline;
    div {
        font-weight: normal;
    }
`;

export const StyledIcon = styled(Icon)`
    &.active {
        color: #f2d600;
    }
`;

export const MenuButtonText = styled.span`
    padding-left: 5px;
`;

export const StyledButton = styled(Button)`
    background: ${(props) => (props.active ? '#0079BF' : '')};
`;

export const CardBlock = styled.div`
    position: relative;
    background: white;
    margin-bottom: 7px;
    border-radius: 3px;
    padding: 6px 10px 6px;
    box-shadow: 0px 1px 0px grey;
    min-width: 250px;
    &:hover {
        background: ${(props) => (props.editMode ? '#fff' : '#efefef')};
        cursor: pointer;
    }
`;

export const TitleInput = styled(Input)`
    border: none !important;
    outline: none !important;
    height: 20px !important;
    padding-left: 0 !important;
    &:focus {
        box-shadow: none !important;
    }
`;

export const Edit = styled.div`
    position: absolute;
    right: 4px;
    top: 4px;
    > div {
        display: inline-block;
    }
`;

export const StyledTextArea = styled(Input.TextArea)`
    margin-bottom: 10px !important;
`;

export const SaveButton = styled(Button)`
    margin-right: 5px;
    background: #0079bf;
    display: inline-block;
    padding: 0 10px;
`;

export const Detail = styled.span`
    cursor: pointer;
`;

export const Details = styled.div`
    flex-direction: column;
    width: 100%;
    > div {
        margin-bottom: 16px;
        &:last-child {
            margin-bottom: 0;
        }
    }
`;

export const CardDetailWrapper = styled.div`
    width: 100%;
`;

export const CardDetailHead = styled.div`
    display: flex;
`;

export const CardDetailIcon = styled.div`
    width: 7%;
`;

export const LabelWrapper = styled.div`
    cursor: pointer;
    box-sizing: border-box;
    display: inline-block;
    color: white;
    border-radius: 3px;
    font-weight: 600;
    height: 32px;
    text-align: center;
    min-width: ${(props) => (props.small ? '30px' : '40px')};
    line-height: ${(props) => (props.small ? '16px' : '32px')};
    font-size: ${(props) => (props.small ? '10px' : '12px')};
    height: ${(props) => (props.small ? '16px!important' : '32px')};
    margin: ${(props) => (props.small ? '0' : '0 4px 4px 0')};
    padding: ${(props) => (props.small ? '0 3px' : '0 12px')};
    i {
        margin-left: 5px;
    }
`;

export const Header = styled.div`
    display: flex;
    margin-bottom: 5px;
    background: #fff;
    justify-content: space-between;
    border-radius: 5px;
    padding: 0 0px 0 10px;
    align-items: center;
    min-width: 250px;
`;

export const InputTitle = styled(Input)`
    height: 25px !important;
    margin-bottom: 0.5em !important;
    font-weight: bold;
    padding: 4px 5px !important;
    font-size: 1.17em !important;
`;
