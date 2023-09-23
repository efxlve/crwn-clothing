import styled from 'styled-components';

export const SignInContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 380px;

    h2 {
        margin: 10px 0;
    }

    @media screen and (max-width: 800px) {
        width: 90vw;
    }
`;

export const ButtonsContainer = styled.div`
    display: flex;
    justify-content: space-between;

    @media screen and (max-width: 800px) {
        flex-direction: column;

        button {
            margin-bottom: 10px;
        }
    }
`;

