import React from 'react';
import { Button, Row, Col, Layout, Typography, Input } from 'antd';
import { GithubOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { SIGN_IN, SIGN_UP } from '../../routes';

const { Header, Content, Footer } = Layout;
const { Title, Text } = Typography;

const InputHero = styled(Input)`
    &:hover,
    &:focus {
        border-color: #c98bd2;
        box-shadow: none;
    }
`;

function Landing() {
    return (
        <Layout
            style={{
                backgroundColor: 'transparent',
                background:
                    'linear-gradient(rgba(255, 255, 255, 0.54) -2.93%, rgb(255, 255, 255) -2.92%, rgb(0, 123, 193, 0.1) 90%)',
            }}
        >
            <Header
                style={{
                    backgroundColor: 'transparent',
                    display: 'flex',
                    justifyContent: 'end',
                    alignItems: 'center',
                }}
            >
                <Button
                    style={{
                        backgroundColor: '#0079bf',
                        color: '#FFFFFF',
                        outline: 'none',
                        border: 'none',
                    }}
                >
                    <Link to={SIGN_IN}>Go To Boards</Link>
                </Button>
            </Header>
            <Content style={{ display: 'flex', overflow: 'hidden' }}>
                <Row gutter={[50]} type="flex" align="middle">
                    <Col span={10} offset={2}>
                        <Title level={1} style={{ lineHeight: '50px', margin: '10px 0' }}>
                            <span style={{ fontSize: 42, fontWeight: 'bold' }}>
                                React Trello Clone
                            </span>
                        </Title>
                        <Text
                            type="secondary"
                            style={{ lineHeight: '28px', fontSize: '16px', margin: '10px 0' }}
                        >
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Natoque aenean
                            tempor elementum et nunc. Sed euismod vivamus quam.Lorem ipsum dolor sit
                            amet, consectetur adipiscing elit.
                        </Text>
                    </Col>
                    <Col span={12}>
                        <img
                            src="/images/landing/hero.svg"
                            alt="hero-illustration"
                            style={{ width: '100%' }}
                        />
                    </Col>
                </Row>
            </Content>
            <Footer style={{ backgroundColor: 'transparent' }} type>
                <Row type="flex" justify="center">
                    <Col></Col>
                    <Col>
                        <a
                            href="https://github.com/bmarvinb/react-trello-clone"
                            target="_blank"
                            style={{ color: '#000000', opacity: '0.8' }}
                        >
                            <GithubOutlined style={{ fontSize: '24px' }} />
                        </a>
                    </Col>
                </Row>
            </Footer>
        </Layout>
    );
}

export default Landing;
