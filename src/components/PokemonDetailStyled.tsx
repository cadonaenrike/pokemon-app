import styled, { keyframes, css } from "styled-components";
import { Button } from "@mui/material";

const unfoldIn = keyframes`
  0% {
    transform: translate(-50%, 0%) scaleY(.005) scaleX(0);
  }
  50% {
    transform: translate(-50%, 0%) scaleY(.005) scaleX(1);
  }
  100% {
    transform: translate(-50%, -50%) scaleY(1) scaleX(1);
  }
`;

const unfoldOut = keyframes`
  0% {
    transform: translate(-50%, -50%) scaleY(1) scaleX(1);
  }
  50% {
    transform: translate(-50%, 0%) scaleY(.005) scaleX(1);
  }
  100% {
    transform: translate(-50%, 0%) scaleY(.005) scaleX(0);
  }
`;

export const ModalContainer = styled.div<{ isOpen: boolean; color: string }>`
  position: fixed;
  display: flex;

  flex-direction: column;
  top: 50%;
  left: 50%;
  width: 90%;
  height: 80%;
  max-width: 90vw;
  max-height: 80vh;
  transform: translate(-50%, -50%);
  border-radius: 25px;
  background: ${(props) => props.color};

  animation: ${(props) =>
      props.isOpen
        ? css`
            ${unfoldIn}
          `
        : css`
            ${unfoldOut}
          `}
    0.8s ease-in-out;
`;

export const ModalContent = styled.div`
  padding: 2vw;
  flex: 1;
  display: flex;
  justify-content: space-around;
  align-items: center;
  @media (max-width: 768px) {
    padding: 10px;
  }
`;

export const PokeballBg = styled.div`
  position: absolute;
  right: 0;
  width: 35%;
  height: 100%;
  overflow: hidden;
  @media (max-width: 768px) {
    display: none;
  }
`;

export const PokeballBgAfter = styled.div`
  content: "";
  position: absolute;
  top: 50%;
  width: 100%;
  height: 105%;
  transform: translate(0, -50%);
  background: rgba(255, 255, 255, 0.11);
  mask: url("/images/pokeball-transparent.svg");
  mask-repeat: no-repeat;
  mask-size: cover;
  -webkit-mask: url("/images/pokeball-transparent.svg");
  -webkit-mask-repeat: no-repeat;
  -webkit-mask-size: cover;
`;

export const ModalBefore = styled.div`
  content: "Pokédex";
  position: absolute;
  left: -5px;
  bottom: -6px;
  font-size: 18vw;
  font-weight: 800;
  text-transform: uppercase;
  mask-image: linear-gradient(to bottom, #000 50%, transparent 80%);
  -webkit-mask-image: linear-gradient(to bottom, #000 50%, transparent 80%);
  -webkit-text-stroke: 2px rgba(255, 255, 255, 0.065);
  z-index: -1;
  @media (max-width: 768px) {
    font-size: 5vw;
  }
`;

export const BackButton = styled(Button)`
  position: relative;
  margin-top: 2vw;
  padding: 1.5vw 2.8vw;
  font-size: 2vw;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.39);
  border-color: transparent;
  background: transparent;
  transition: color 0.2s ease-in-out;

  &:hover {
    color: #fff;
  }
  @media (max-width: 768px) {
    padding: 10px;
  }
`;
