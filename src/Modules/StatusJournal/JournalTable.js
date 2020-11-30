import React, {Component} from "react";
import { Table } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import ModalPart from "../StatusApp/ModalPart";

class JournalTable extends Component{
    constructor(props) {
        super(props);
        this.state = {
            dataFromOut: this.props.data,
            dataForPrint: "",
            statusModal: true,
            changedComp: ""
        };

        this.openModal = this.openModal.bind(this);
        this.closeModule = this.closeModule.bind(this);
    }

    closeModule(){
        this.setState({changedComp: ""})
    }

    async openModal(surName, repairNumber){
        let name = surName;
        let number = repairNumber;
        let b = <ModalPart
            statusModal = {this.state.statusModal}
            closeModule = {this.closeModule}
            name = {name}
            number = {number}
        />;
        await this.setState({changedComp: b});
    }

    createTable(){

        let printRow = [];
        let list = this.state.dataFromOut;
        console.log(list);
        console.log(list.length);
        if (list.length !== 0) {
            for (let i = 0; i < list.length; i++) {
                let printElement =
                    <Table.Row onClick = {this.openModal.bind(this, list[i].fullName, list[i].number)}>
                        <Table.Cell>{list[i].ready}</Table.Cell>
                        <Table.Cell>{list[i].state}</Table.Cell>
                        <Table.Cell> </Table.Cell>
                        <Table.Cell>{list[i].number}</Table.Cell>
                        <Table.Cell>{list[i].repairBeginDate}</Table.Cell>
                        <Table.Cell>{list[i].location}</Table.Cell>
                        <Table.Cell>{list[i].modelName}</Table.Cell>
                        <Table.Cell>{list[i].SN}</Table.Cell>
                        <Table.Cell>{list[i].IMEI}</Table.Cell>
                        <Table.Cell>{list[i].cost}</Table.Cell>
                        <Table.Cell>{list[i].fullName}</Table.Cell>
                    </Table.Row>;
                printRow.push(printElement);
            }
            this.setState({dataForPrint: printRow})
        }
    }

    componentDidMount() {
        this.createTable();
        console.log(this.state.dataFromOut)
    }

    render() {
        return(
            <div>
                <Table celled selectable>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Готово к выдаче</Table.HeaderCell>
                            <Table.HeaderCell>Статус</Table.HeaderCell>
                            <Table.HeaderCell>Тип ремонта</Table.HeaderCell>
                            <Table.HeaderCell>Номер заявки</Table.HeaderCell>
                            <Table.HeaderCell>Дата начала ремонта</Table.HeaderCell>
                            <Table.HeaderCell>Текущее местоположение</Table.HeaderCell>
                            <Table.HeaderCell>Модель</Table.HeaderCell>
                            <Table.HeaderCell>Серийный номер</Table.HeaderCell>
                            <Table.HeaderCell>IMEI</Table.HeaderCell>
                            <Table.HeaderCell>Сумма</Table.HeaderCell>
                            <Table.HeaderCell>Клиент</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {this.state.dataForPrint}
                    </Table.Body>
                </Table>
                {this.state.changedComp}
            </div>
        )
    }
}

export default JournalTable;