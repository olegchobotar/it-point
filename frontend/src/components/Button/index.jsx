import { Button } from '@material-ui/core';
import styled, { css } from 'styled-components';

export default styled(Button)`
  && {
    background: linear-gradient(40deg, #45cafc, #303f9f);
    border-radius: 50px;
    ${props => 
        css`
        width: ${props.width}
        `};
    box-shadow: 0 4px 5px 0 rgba(0,0,0,0.18), 0 4px 15px 0 rgba(0,0,0,0.15);
    color: white;
    height: 48px;
    align-self: center;
    margin-top: 20px;
    padding: 0 30px;  
    }
`;
