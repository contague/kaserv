import React,{Component} from "react";
import {Button, Form} from "semantic-ui-react";
import 'js-sha1';
import 'semantic-ui-css/semantic.min.css';

class ChangePass extends Component{
    constructor(props) {
        super(props);
        this.state={
            message: ""
        };
        this.sendPass = this.sendPass.bind(this);
    }

    async sendPass(e){
        let pass = this._passElement.value;
        let checkPass = this._passCheckElement.value;
        let sha1 = require('sha1');
        let encodePass = sha1(pass).toUpperCase();

        let message = await this.sendChange(pass, checkPass, encodePass);
        let print = <p>{message}</p>;
        this.setState({message: print})
    }

    async sendChange(pass, checkPass, encodePass) {
        let passBody = {
            pass: encodePass
        }
        let jsonPass = JSON.stringify(passBody);
        const options = {
            method: 'post',
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                "Accept": "application/json"},
            body: jsonPass
        };
        if ((pass !== "" && checkPass !== "") && (pass === checkPass)){
            let resp = await fetch("changePass", options);
            if (resp.ok) {
                let data = await resp.json();
                console.log(data)
                return "Пароль изменен";
            }
        }
        else if(pass !== checkPass){
            return "Введенные пароли не совпадают";
        }
        else if(pass === "" && checkPass === ""){
            return "Введите новый пароль";
        }
    }

    render() {
        return(
            <Form onSubmit={this.sendPass}>
                <p><input ref={(a) => this._passElement = a} placeholder={"Введите новый пароль"}/></p>
                <p><input ref={(a) => this._passCheckElement = a} placeholder={"Повторно введите новый пароль"}/></p>
                <p><Button type="submit">submit</Button></p>
                {this.state.message}
            </Form>
        )
    }
}

export default ChangePass;