'use client'
import React from 'react';
import Sidebar from '@/components/tasks/sidebar/sidebar';
import styled from "styled-components";
import GlobalStyleProvider from "@/context/GlobalStyleProvider";
import {GlobalTaskProvider} from "@/context/TaskProvider"


const Page = () => {

  return (
    <GlobalTaskProvider>
    <GlobalStyleProvider>
    <PageStyled>
       To do
    </PageStyled>
    </GlobalStyleProvider>
    </GlobalTaskProvider>
  );
}

const PageStyled = styled.div`
  padding: 2.5rem;
  display: flex;
  gap:2.5rem;
  height:100%;
`;

export default Page;
