import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { SIGN_IN, SIGN_UP } from '../../routes'
import { FormButton } from '../components/common/FormButton'


const Hero = styled.div`
    height: 100vh;
    margin: 0;
`

const Container = styled.div`
    width: 80%;
    margin: 0 auto;
`

const Navbar = styled.nav`
    height: 70px;
`

const NavContainer = styled(Container)`
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
`

const NavLinks = styled.div`
    display: flex;
    align-items: center;
`

const Button = styled(FormButton)`
    margin: 0 10px;
`

const HeroMain = styled.main`
    display: flex;
    height: 100%;
    align-items: center;
`

const Illustration = styled.img`
    width: 100%;
`

function Landing() {

    return (
        <Hero>
            <Navbar>
                <NavContainer>
                    <h2 className="logo">TrelloBoard</h2>
                    <NavLinks>
                        <Button>
                            <Link to={SIGN_IN}>
                                Login
                            </Link>
                        </Button>
                        <Button>
                            <Link to={SIGN_UP}>
                                Signup
                            </Link>
                        </Button>
                    </NavLinks>
                </NavContainer>
            </Navbar>
            <Container>
                <HeroMain>
                    <div style={{flex: 1}}>
                        <h1 className="">Love Working Together?</h1>
                        <p>Collaborate, manage projects, and reach new productivity peaks. From high rises to the home office, the way your team works is unique - accomplish it all with TrelloBoard</p>
                        <FormButton>
                            <a href="https://github.com/bmarvinb/react-trello-clone" target='_blank'>
                                <img src='/images/landing/github.svg' alt="github" style={{width: 24,margin: '0 5px'}}/>
                                <span>Join Us</span>
                            </a>
                        </FormButton>
                    </div>
                    <div style={{flex: 1}}>
                        <Illustration src='/images/landing/hero-Illustration.png' alt='hero-illustration' />
                    </div>
                </HeroMain>
            </Container>
        </Hero>
    )
}

export default Landing
