import React,{Component} from "react";
import SecondModal from "./SecondModal";
import StatusPrint from "./StatusPrint";
import {Button, Dimmer, Form, Loader, Table} from 'semantic-ui-react'
import TextLine from "./TextLine";

var xhr;

class ModalApp extends Component{
    constructor(props) {
        super(props);
        this.state = {
            stateList:
                <Dimmer active inverted>
                    <Loader inverted content='Loading' />
                </Dimmer>,
            modalStatus: false
        };

        this.sendData = this.sendData.bind(this);
        this.writeResponse = this.writeResponse.bind(this);
    }

    sendData(e){
        if ((this._firstElement !== "") && (this._secondElement !== "")) {
            var surname = this._firstElement.value;
            var number = this._secondElement.value;
            xhr = new XMLHttpRequest();
            var body = "surname=" + surname + "&number=" + number;

            xhr.open("POST", "status", true);
            xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xhr.send(body);

            this._firstElement.value = "";
            this._secondElement.value = "";
            xhr.addEventListener("readystatechange",
                this.writeResponse, false);
            e.preventDefault();
        }
    }

    writeResponse() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var output = [];
            var response = xhr.responseText;
            var respJs = JSON.parse(response);

            var repairBeginDate = <TextLine statusLine = "дата начала ремонта" statusText = {respJs.repairBeginDate}/>;
            console.log(repairBeginDate);
            output.push(<StatusPrint statusData={repairBeginDate}/>);

            var repairEndDate =<TextLine statusLine = "дата завершения ремонта" statusText = {respJs.repairEndDate}/>;
            console.log(repairEndDate);
            output.push(<StatusPrint statusData={repairEndDate}/>);

            var fullName =<TextLine statusLine = "ФИО" statusText = {respJs.fullName}/>;
            console.log(fullName);
            output.push(<StatusPrint statusData={fullName}/>);

            var modelName =<TextLine statusLine = "модель" statusText = {respJs.modelName}/>;
            console.log(modelName);
            output.push(<StatusPrint statusData={modelName}/>);

            var IMEI = <TextLine statusLine = "IMEI" statusText = {respJs.IMEI}/>;
            console.log(IMEI);
            output.push(<StatusPrint statusData={IMEI}/>);

            var equipment =<TextLine statusLine = "комплектация" statusText = {respJs.equipment}/>;
            console.log(equipment);
            output.push(<StatusPrint statusData={equipment}/>);

            var issue =<TextLine statusLine = "неисправность" statusText = {respJs.issue}/>;
            console.log(issue);
            output.push(<StatusPrint statusData={issue}/>);

            var cost =<TextLine statusLine = "стоимость ремонта" statusText = {respJs.cost}/>;
            console.log(cost);
            output.push(<StatusPrint statusData={cost}/>);

            var comment =<TextLine statusLine = "комментарий" statusText = {respJs.comment}/>;
            console.log(comment);
            output.push(<StatusPrint statusData={comment}/>);

            var operation =<TextLine statusLine = "выполненная работа" statusText = {respJs.operation}/>;
            console.log(operation);
            output.push(<StatusPrint statusData={operation}/>);


            this.setState({
                stateList: output
            });

        }

        else {
            console.log("test of invalid username")
        }
    }

    render() {
        return(
            <div>
                <Form onSubmit={this.sendData}>
                    <p><input ref={(a) => this._firstElement = a} placeholder={"Введите фамилию"}/></p>

                    <p><input ref={(b) => this._secondElement = b} placeholder={"Введите номер заявки"}/></p>

                    <p><Button type="submit" onClick={this.props.openModal}>submit</Button></p>
                </Form>
                <p>{console.log(this.props.modalValue)}</p>
                <SecondModal statusPrint = {this.state.stateList}/>
            </div>
        )
    }
}

export default ModalApp;