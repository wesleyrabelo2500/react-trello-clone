import styled from 'styled-components';
import { Button } from 'antd';
import React from 'react';

const Loading = styled.div`
    text-align: center;
`;

export const Loader = () => (
    <Loading>
        <Button shape="circle" loading />
    </Loading>
);
