/* eslint-disable no-console */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable*/
import { Form, Input } from "antd";
import Button from "@material-ui/core/Button";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import CryptoJS from "crypto-js";
import logo from "../images/messenger.svg";

class RegistrationForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      flag: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validateToNextPassword = this.validateToNextPassword.bind(this);
    this.compareToFirstPassword = this.compareToFirstPassword.bind(this);
    this.handleConfirmBlur = this.handleConfirmBlur.bind(this);
    this.encrypt = this.encrypt.bind(this);
  }

  /* istanbul ignore next */
  // timer() {
  //   setTimeout(function () {
  //     window.top.location = "http://localhost:3000/login";
  //   }, 5500);
  // }

  /* istanbul ignore next */
  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      const existedErrMessage = document.getElementById("errorMessage");
      if (existedErrMessage != null) {
        existedErrMessage.remove();
      }
      if (!err) {
        // console.log('Received values of form: ', values);
        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: values.username,
            password: this.encrypt(values.password), // for encryption
            // password: `${values.password}`, // for encryption
            securityCode: values.securityCode,
          }),
        };
        // console.log(requestOptions);
        fetch("http://localhost:8080/register", requestOptions)
          .then((res) => {
            console.log(res.status);
            if (res.status === 200) {
              console.log("Success");

              const theForm = document.getElementById("RegisterForm");
              theForm.remove();
              const LinktoLogin = document.createElement("p");
              LinktoLogin.innerHTML =
                "Registration was successful, Redirecting to Login Page";
              LinktoLogin.setAttribute("style", "font-size: 20px;");
              const RegisterDiv = document.getElementById("RegisterDiv");
              RegisterDiv.appendChild(LinktoLogin);
              setTimeout(() => {
                window.top.location = "http://localhost:3000/login";
              }, 3000);
            } else if (res.status === 400) {
              const errorMessage = document.createElement("p");
              errorMessage.innerHTML = "User Account Already Exist";
              errorMessage.setAttribute("id", "errorMessage");
              errorMessage.setAttribute("style", "color: red;");
              const RegisterDiv = document.getElementById("RegisterDiv");
              RegisterDiv.appendChild(errorMessage);
              console.log("Not Successful");
            }
          })
          .catch(() => console.log("Error"));
      }
    });
  }

  // encryption////////////////////////////////////////////////////////////////
  // eslint-disable-next-line class-methods-use-this
  encrypt(value) {
    const hash = CryptoJS.MD5(value).toString();
    console.log("EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE");
    console.log("encryption");
    console.log(`pass = ${value}, hash = ${hash}`);
    console.log("EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE");
    return hash;
  }

  // ////////////////////////////////////////////////////////////////

  /* istanbul ignore next */
  validateToNextPassword(rule, value, callback) {
    const { form } = this.props;
    // when the password text box has value && the flag is true(which means that we have words in confirmation password
    // we compare
    if (value.length !== 0) {
      if (value.length < 5) {
        callback("length should > 5");
      } else {
        let oneDigit = true;
        let oneCharacter = true;
        for (let i = 0; i < value.length; i += 1) {
          if (value.charAt(i) >= "0" && value.charAt(i) <= "9") {
            oneDigit = false;
          }
          if (value.charAt(i) < "0" || value.charAt(i) > "9") {
            oneCharacter = false;
          }
        }
        if (oneDigit) {
          callback("at least one number");
        }
        if (oneCharacter) {
          callback("Don't put all numbers");
        }
        if (value && this.state.flag) {
          form.validateFields(["confirm"], { force: true });
        }
      }
    } else if (value && this.state.flag) {
      form.validateFields(["confirm"], { force: true });
    }
    callback();
  }

  /* istanbul ignore next */
  compareToFirstPassword(rule, value, callback) {
    const { form } = this.props;
    // when the confirmation password has value && the value is not equal to the password
    if (value && value !== form.getFieldValue("password")) {
      callback("Please Enter the Same Passwords!");
    } else {
      callback();
    }
  }

  handleConfirmBlur(e) {
    const { value } = e.target; // get confirmation password
    const p = this.state.flag;
    this.setState({ flag: p || !!value });
  } // if the flag is true, flag is true, otherwise if confirmation password is not null, set the flag to true.

  render() {
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };

    return (
      <div>
        <header id="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <span className="AppTitle" id="logox">
            {" "}
            Video & Messaging Web App
          </span>
        </header>
        <div id="RegisterDiv">
          <Form {...formItemLayout} className="RegisterForm" id="RegisterForm">
            <Form.Item label="Username">
              {getFieldDecorator("username", {
                rules: [
                  {
                    required: true,
                    message: "Please input your Username!",
                  },
                ],
              })(<Input className="textbox" />)}
            </Form.Item>
            <Form.Item label="Password" hasFeedback>
              {getFieldDecorator("password", {
                rules: [
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                  {
                    validator: this.validateToNextPassword,
                  },
                ],
              })(<Input.Password className="textbox" />)}
            </Form.Item>
            <Form.Item label="Confirm Password" hasFeedback>
              {getFieldDecorator("confirm", {
                rules: [
                  {
                    required: true,
                    message: "Please confirm your password!",
                  },
                  {
                    validator: this.compareToFirstPassword,
                  },
                ],
              })(
                <Input.Password
                  onBlur={this.handleConfirmBlur}
                  className="textbox"
                />
              )}
            </Form.Item>
            <Form.Item label="Security Code" hasFeedback>
              {getFieldDecorator("securityCode", {
                rules: [
                  {
                    required: true,
                    message: "Please enter a security code!",
                  },
                ],
              })(
                <Input.Password
                  onBlur={this.handleConfirmBlur}
                  className="textbox"
                />
              )}
            </Form.Item>
            <Button
              className="Button"
              color="secondary"
              variant="text"
              size="large"
              id="register_button"
              onClick={this.handleSubmit}
            >
              <span id="ResgisterSpan">Register</span>
            </Button>
            <div id="JumpLinklogin">
              <span> I already have an account, </span>
              <Link to="/login" id="registerLink">
                {" "}
                Go to Login
              </Link>
            </div>
          </Form>
        </div>
      </div>
    ); // when the mouse wont focus on the textbox, active handConfirmBlur
  }
}
const Register = Form.create({ name: "register" })(RegistrationForm);
export default Register;
