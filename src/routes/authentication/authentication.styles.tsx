import styled from 'styled-components';

export const AuthenticationContainer = styled.div`
    display: flex;
    width: 900px;
    justify-content: space-between;
    margin: 30px auto;

    @media screen and (max-width: 800px) {
        width: 90vw;
        flex-direction: column;
        align-items: center;
        

        & > *:first-child {
            margin-bottom: 50px;
        }
    }
`;