import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { setUser } from '../../redux/user/actions';

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 15%;
`;

const Legend = styled.legend`
  font-size: 1.3rem;
  text-align: center;
`;

const Input = styled.input`
  margin-bottom: 5px;
  font-size: 0.8rem;
`;

const SubmitButton = styled.input`
  font-size: 1.2rem;
`;

class AuthorizationForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      email: ''
    };
  }

  onHandleChange = ({ target }) => {
    const { name, value } = target;

    this.setState({ [name]: value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { username, password, email } = this.state;
    if (!username) {
      console.log('too short name');
    } else if (password.length > 5 && email.length > 5) {
      console.log(this.state)
    } else {
      console.log('too short password or mail');
    }
  };

  render() {
    return (
      <Container>
        <Form>
          <Legend>Войти</Legend>
          <Input type="text" name="username" placeholder="Логин" onChange={this.onHandleChange} />
          <Input type="password" name="password" placeholder="Пароль" onChange={this.onHandleChange} />
          <Input type="email" name="email" placeholder="Email" onChange={this.onHandleChange} />
          <SubmitButton onClick={this.handleSubmit} type="submit" value="Вход" />
        </Form>
      </Container>
    );
  }
}

export default connect(null, { setUser })(AuthorizationForm);
