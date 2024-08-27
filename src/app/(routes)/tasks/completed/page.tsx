'use client'
import React from 'react';
import Sidebar from '@/components/tasks/sidebar/sidebar';
import styled from "styled-components";
import GlobalStyleProvider from "@/context/GlobalStyleProvider";
import {GlobalProvider} from "@/context/globalProvider"

const Page = () => {

  return (
    <GlobalProvider>
    <GlobalStyleProvider>
    <PageStyled>
       Completed
    </PageStyled>
    </GlobalStyleProvider>
    </GlobalProvider>
  );
}

const PageStyled = styled.div`
  padding: 2.5rem;
  display: flex;
  gap:2.5rem;
  height:100%;
`;

export default Page;
