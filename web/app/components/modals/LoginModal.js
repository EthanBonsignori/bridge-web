import React from 'react';
import { connect } from 'react-redux';
import { fromJS } from 'immutable';
import Title from './common/ModalTitle';
import Input from './common/ModalInput';
import Button from './common/ModalButton';
import LinksContainer from './common/ModalLinksContainer';
import ModalLink from './common/ModalLink';
import ErrorContainer from './common/ModalErrorContainer';
import {
  updateText,
  submitForm,
  blurInput,
} from '../../redux/actions/formActions';
import {
  openModal,
  closeModal,
} from '../../redux/actions/modalActions';
import {
  EMAIL,
  PASSWORD,
} from '../../constants/formConstants';
import {
  REGISTER_MODAL,
  FORGOT_MODAL,
} from '../../constants/modalConstants';
import { LOGIN } from '../../constants/reducersConstants';

class LoginModal extends React.Component {
  onClose = () => {
    const { dispatchCloseModal } = this.props;
    dispatchCloseModal();
  }

  openRegisterModal = () => {
    const { dispatchOpenModal } = this.props;
    dispatchOpenModal(REGISTER_MODAL, { title: 'Register' });
  }

  openForgotModal = () => {
    const { dispatchOpenModal } = this.props;
    dispatchOpenModal(FORGOT_MODAL, { title: 'Forgot Password' });
  }


  renderApiErrors = () => {
    const { apiErrors } = this.props;
    return (
      <ErrorContainer>
        <span>{apiErrors}</span>
      </ErrorContainer>
    );
  }

  onLoginClick = () => {
    const {
      dispatchSubmitForm,
      email,
      password,
    } = this.props;
    dispatchSubmitForm({
      email,
      password,
    });
  }

  onTextChange = (inputType, value) => {
    const { dispatchUpdateText } = this.props;
    dispatchUpdateText(inputType, value);
  }

  onBlur = (inputType, value) => {
    const { dispatchBlurInput, formErrors } = this.props;
    dispatchBlurInput(inputType, value, formErrors);
  }

  render() {
    const {
      apiErrors,
      formErrors,
      title,
      email,
      password,
      emailValidity,
      passwordValidity,
    } = this.props;

    return (
      <>
        <Title>{title}</Title>
        {apiErrors && this.renderApiErrors()}
        <Input
          type='email'
          placeholder='Email'
          value={email}
          inputType={EMAIL}
          onBlur={this.onBlur}
          onTextChange={this.onTextChange}
          validity={emailValidity}
          error={formErrors[EMAIL]}
        />
        <Input
          type='password'
          placeholder='Password'
          value={password}
          inputType={PASSWORD}
          onBlur={this.onBlur}
          onTextChange={this.onTextChange}
          validity={passwordValidity}
          error={formErrors[PASSWORD]}
        />
        <Button onClick={this.onLoginClick}>Log In</Button>
        <LinksContainer>
          <ModalLink onClick={this.openRegisterModal}>Create an account</ModalLink>
          <ModalLink onClick={this.openForgotModal}>Forgot your password?</ModalLink>
        </LinksContainer>
      </>
    );
  }
}

const mapStateToProps = (state = fromJS({})) => {
  const api = state.get('api');
  const login = state.get('login');
  return {
    apiErrors: api.get('userLoginState').error,
    formErrors: login.get('formErrors'),
    email: login.get('email'),
    password: login.get('password'),
    emailValidity: login.get('emailValidity'),
    passwordValidity: login.get('passwordValidity'),
  };
};

const mapDispatchToProps = (dispatch) => ({
  dispatchUpdateText: (inputType, value) => dispatch(
    updateText(inputType, value, LOGIN)
  ),
  dispatchBlurInput: (inputType, value, errors) => dispatch(
    blurInput(inputType, value, errors, LOGIN)
  ),
  dispatchSubmitForm: (inputFields) => dispatch(
    submitForm(inputFields, LOGIN)
  ),
  dispatchOpenModal: (modalType, modalProps) => dispatch(
    openModal(modalType, modalProps)
  ),
  dispatchCloseModal: () => dispatch(
    closeModal()
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginModal);
