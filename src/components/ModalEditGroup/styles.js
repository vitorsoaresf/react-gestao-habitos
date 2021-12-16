import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: fixed;
  top: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1;

  div {
    width: 95%;
    display: flex;
    flex-direction: column;
    align-items: center;

    h1 {
      width: 95%;
      padding: 5px 0;
      border-radius: 5px 5px 0 0;
      background: var(--darkGreen);
      font-size: 2rem;
      color: var(--white);
      display: flex;
      justify-content: space-between;

      p {
        margin-left: 5px;
      }

      button {
        color: var(--white);
        width: 30px;
        height: 30px;
        background: var(--purple);
        margin-right: 5px;
      }
    }
  }
`;

export const ContainerForm = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background: var(--gray);
  border-radius: 0 0 5px 5px;
  width: 100%;

  form {
    width: 90%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    input {
      width: 100%;
    }
  }

  button {
    width: 95%;
    height: 40px;
    color: var(--white);
    margin: 10px;
  }
`;
