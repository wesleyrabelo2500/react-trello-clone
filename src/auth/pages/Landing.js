import React from 'react'
import {Button, Row,Col,Layout,Typography,Input } from 'antd'
import { GithubOutlined } from '@ant-design/icons'
import styled from 'styled-components'
import { Link, withRouter } from 'react-router-dom';
import { SIGN_IN, SIGN_UP } from '../../routes';
import { withLandingAuthentication } from '../utils/AuthHOC';

const { Header, Content, Footer } = Layout;
const { Title, Text } = Typography;

const InputHero = styled(Input)`
    &:hover, &:focus{
        border-color: #C98BD2;
        box-shadow: none;
    }
`

function Landing() {
    return (
        <Layout style={{backgroundColor:"transparent",background: "linear-gradient(180deg, rgba(255, 255, 255, 0.54) -2.93%, #FFFFFF -2.92%, #E9C4EE 100%)"}}>
            <Header style={{display:"flex"}} style={{backgroundColor:"transparent",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <Text style={{display:"flex",alignItems:"baseline",fontSize:"18px"}}><Title level={1}>TB</Title>oard</Text>
                <Button style={{backgroundColor:"#C98BD2",color:"#FFFFFF",outline:"none",border:"none"}}>
                    <Link to={SIGN_IN} >
                        Go To Your Dashboard
                    </Link>
                </Button>
            </Header>
            <Content style={{display:'flex',overflow:'hidden'}}>
                <Row gutter={[50]} type="flex" align="middle">
                <Col span={10} offset={2}>
                    <Title level={1} style={{lineHeight:"50px",margin:"10px 0"}}><span style={{fontSize:42,fontWeight:"bold"}}>TB</span>oard helps teams to move forward.</Title>
                    <Text type="secondary" style={{lineHeight:"28px",fontSize:"16px",margin:"10px 0"}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Natoque aenean tempor elementum et nunc. Sed euismod vivamus quam.Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Text>
                    <div style={{margin:"10px 0",display:'flex',gap:"10px"}}>
                        <InputHero placeholder="Email"/>
                        <Button style={{backgroundColor:"#C98BD2",color:"#FFFFFF",outline:"none",border:"none"}}>
                            <Link to={SIGN_UP}>
                                Sign Up - Free
                            </Link>
                        </Button>
                    </div>
                </Col>
                <Col span={12} >
                    <img src="/images/landing/hero.svg" alt="hero-illustration" style={{width:"100%"}}/>
                </Col>
                </Row>
            </Content>
            <Footer style={{backgroundColor:"transparent"}} type>
                <Row type="flex" justify="space-between">
                    <Col><Text>© 2021, TBoards. All right reserver.</Text></Col>
                <Col>
                    <a href="https://github.com/bmarvinb/react-trello-clone" target="_blank" style={{color:"#000000",opacity:"0.8"}}>
                        <GithubOutlined style={{fontSize:"24px"}}/>
                    </a>
                </Col>
                </Row>
            </Footer>
        </Layout>
    )
}

export default withRouter(withLandingAuthentication(Landing))