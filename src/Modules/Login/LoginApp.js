import React,{Component} from "react";
import { Button, Header, Modal, Form } from 'semantic-ui-react'
import 'js-sha1';

class LoginApp extends Component{
    constructor(props) {
        super(props);
        this.state = {
            content: "",
            subContent: ""
        };
        this.getLogin = this.getLogin.bind(this);
        this.logOut = this.logOut.bind(this);
    }

    async getLogin(e){
        let log = this._loginElement.value;
        let pass = this._passElement.value;
        let sha1 = require('sha1');
        let hashPass = sha1(pass).toUpperCase();
        let loginBody = {
            log: log,
            pass: hashPass
        }
        let jsonPass = JSON.stringify(loginBody)

        const options = {
            method: 'post',
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                "Accept": "application/json"},
            body: jsonPass
        };
        if (log !== "" && pass !== ""){
            let resp = await fetch("login", options);
            if (resp.ok){
                let json = await resp.json();
                let role = json.role;
                if (role === "guest"){
                    this.setState({subContent: "Неправильно введен логин или пароль."});
                }
                else if (role === "diler"){
                    this.setState({subContent: ""});
                    this.setState({content: <Button active={this.props.updateRole()} onClick={this.logOut}>Выйти</Button>});
                }
            }
        }
    }

    async logOut() {
        let resp = await fetch("logOut");
        if (resp.ok) {
            let json = await resp.json();
            let role = json.role;

            if (role === "guest") {

                this.setState({content:
                        <div>
                            <p><input ref={(a) => this._loginElement = a} placeholder={"Введите логин"}/></p>
                            <p><input ref={(b) => this._passElement = b} placeholder={"Введите пароль"}/></p>
                            <p><Button active={this.props.updateRole()} type="submit">submit</Button></p>
                        </div>
                })
            }
        }
    }

    async componentDidMount() {
        let resp = await fetch("checkLogin");
        if (resp.ok){
            let json = await resp.json();
            let role = json.role;
            if (role === "guest"){
                this.setState({content:
                        <div>
                            <p><input ref={(a) => this._loginElement = a} placeholder={"Введите логин"}/></p>
                            <p><input ref={(b) => this._passElement = b} placeholder={"Введите пароль"}/></p>
                            <p><Button type="submit">submit</Button></p>
                        </div>});
            }
            else if (role === "diler"){
                this.setState({content: <Button onClick={this.logOut}>Выйти</Button>});
            }
        }
    }

    render() {
        return(
            <Modal trigger={<Button icon="sign-in">Вход</Button>} closeIcon>
                <Header icon='sign-in' content='Вход' />
                <Modal.Content>
                    <Form onSubmit={this.getLogin}>
                        {this.state.content}
                    </Form>
                    <p>{this.state.subContent}</p>
                </Modal.Content>
            </Modal>
        )
    }
}

export default LoginApp;