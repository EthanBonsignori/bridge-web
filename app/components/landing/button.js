import styled from 'styled-components';
import PropTypes from 'prop-types';

const LandingButton = (props) => (
  <StyledButton>{props.label}</StyledButton>
);

const StyledButton = styled.button`
  cursor: pointer;
  font-weight: 600;
  text-align: center;
  font-size: 19px;
  color: #fff;
  background-color: #4bc970;
  border: none;
  border-radius: 4px;
  width: 100%;
  padding: 0.8em;
  margin: 1em 0;
  box-shadow: 0px 2px 6px rgba(0,0,0,0.3)
`;

LandingButton.propTypes = {
  label: PropTypes.string,
};
export default LandingButton;
