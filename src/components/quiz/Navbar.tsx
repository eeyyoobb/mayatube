'use client';

import React, { useState, useContext } from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import { CurrentUserContext } from "@/context/CurrentUserContext";
import { useQuizState } from '@/context/QuizProvider';
import  toast  from 'react-hot-toast';

interface NavbarProps {}

function Navbar(props: NavbarProps) {
  const currentUser = useContext(CurrentUserContext);
  const [isLoading, setIsLoading] = useState(false);
  const{theme}=useQuizState();
  const{userObject, userXpObject}=useQuizState();
  const { user, setUser } = userObject;

  async function changeTheLoginState() {
    console.log(isLoading);
    const userCopy = { ...user };
    userCopy.isLogged = !userCopy.isLogged;

    try {
      setIsLoading(true);
      const response = await fetch(
        `/api/user?id=${userCopy._id}`,
        {
          method: 'PUT',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify({ updateUser: userCopy }),
        },
      );

      if (!response.ok) {
        toast.error('xp went wrong...');
        throw new Error('fetching xp failed...');
      }

      setUser(userCopy);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }


  return (
    <NavStyled theme={theme}>
      <NavContainer>
        <Brand>
          <BrandLink href="#">
            <Image
              src="/quizSpark_icon.png"
              alt="Quiz Maya Icon"
              width={60}
              height={60}
            />
            <BrandTitle>
              Quiz <span>Maya</span>
            </BrandTitle>
          </BrandLink>
        </Brand>

        <UserInfo>
          {currentUser ? (
            <UserDetails>
              <WelcomeText>Welcome: {currentUser.name}</WelcomeText>
              <XPText>{currentUser.experience}XP</XPText>
            </UserDetails>
          ) : null}
        </UserInfo>
      </NavContainer>
    </NavStyled>
  );
}

export default Navbar;

const NavStyled = styled.nav`
  font-family: 'Roboto', sans-serif;
  width: 100%;
  padding: 1rem 2rem;
  background-color: ${(props) => props.theme.colorBg};
  border: 2px solid ${(props) => props.theme.borderColor2};
  color: ${(props) => props.theme.colorGrey2};
  @media (min-width: 640px) {
    padding: 1.25rem 2rem;
  }
  @media (min-width: 1024px) {
    padding: 1.25rem 2.5rem;
  }
`;

const NavContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  justify-content: space-between;
  @media (min-width: 640px) {
    flex-direction: row;
  }
`;

const Brand = styled.div`
  text-align: center;
  @media (min-width: 640px) {
    text-align: left;
  }
`;

const BrandLink = styled.a`
  display: flex;
  gap: 0.25rem;
  align-items: center;
`;

const BrandTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  display: flex;
  gap: 0.5rem;
  color: ${(props) => props.theme.colorBrand};

  span {
    color:#e07000;
  }
`;

const UserInfo = styled.div`
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  @media (min-width: 640px) {
    margin-top: 0;
    flex-direction: row;
    align-items: center;
  }
`;

const UserDetails = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const WelcomeText = styled.span``;

const XPText = styled.span`
  font-weight: bold;
  color: #e07000; /* Tailwind's green-700 */
`;
