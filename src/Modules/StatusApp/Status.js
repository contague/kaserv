import React, {Component} from "react";
import {Button, Header, Form, Modal, Dimmer, Loader} from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import ModalPart from "./ModalPart";

class Status extends Component{
    constructor(props) {
        super(props);
        this.state = {
            statusModal: true,
            changedComp: ""
        };
        this.openModal = this.openModal.bind(this);
        this.closeModule = this.closeModule.bind(this);
    }

    closeModule(){
        this.setState({changedComp: ""})
    }

    async openModal(){
        let name = this._firstElement.value;
        let number = this._secondElement.value;
        let b = <ModalPart
            statusModal = {this.state.statusModal}
            closeModule = {this.closeModule}
            name = {name}
            number = {number}
        />;
        await this.setState({changedComp: b});
    }

    render(){
        return (

            <Form>
                <p><input ref={(a) => this._firstElement = a} placeholder={"Введите фамилию"}/></p>

                <p><input ref={(b) => this._secondElement = b} placeholder={"Введите номер заявки"}/></p>

                <p><Button type="submit" onClick={this.openModal}>Показать</Button></p>
                {this.state.changedComp}
            </Form>
        );
    }
}

export default Status;