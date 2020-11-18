import styled from 'styled-components';

const StyledTitle = styled.h1`
  color: ${({theme}) => theme.text_color};
`;

export default function Header({children}) {
  return (
    <div>
      <StyledTitle>{children}</StyledTitle>
    </div>
  )
}
