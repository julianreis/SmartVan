import styled from "styled-components";

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 10px;
  border-radius: 10px;
  width: 200px;
  margin: 20px;
  background-color: ${p => p.theme.button.background};
  box-shadow: 3px 10px 6px -6px ${p => p.theme.shadowColor};
  > span {
    padding: 10px 0;
    font-size: 20px;
  }
`;

export const DashButton = styled.button`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 10px;
  border-radius: 10px;
  width: 200px;
  margin: 20px;
  background-color: ${p => p.theme.button.background};
  box-shadow: 3px 10px 6px -6px ${p => p.theme.shadowColor};
  border: none;
  > span {
    padding: 10px 0;
    font-size: 20px;
  }
`;

export default function DashContainer({ children }: any) {
  return <Container>{children}</Container>;
}
