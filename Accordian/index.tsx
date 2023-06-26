import React from 'react';
import styled from 'styled-components';
import { Collapse } from 'react-collapse';

interface AccordionProps {
  children: React.ReactNode;
  titleComponent: React.ReactNode;
  isOpen: boolean;
}

const AccordionStyle = styled.div`
  > .ReactCollapse--collapse {
    transition: height 500ms;
  }
`;

const Accordian: React.FC<AccordionProps> = ({
  titleComponent,
  children,
  isOpen
}: AccordionProps) => (
  <AccordionStyle>
    {titleComponent}
    <Collapse isOpened={isOpen}>{children}</Collapse>
  </AccordionStyle>
);

export default Accordian;
