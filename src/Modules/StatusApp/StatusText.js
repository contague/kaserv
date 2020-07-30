import React,{Component} from "react";
import {Table} from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

import ListImages from "../Status/ListImages";

class StatusText extends Component{
    constructor(props) {
        super(props);
        this.state = {
            operationsTable: "",
            statusElement: "",
            testState: "123"
        };
    }

    createOperations(list){
        let cell = [];
        let operations = list.operation;
        console.log((operations !== "") + " работы");
        if ((operations !== undefined) && (operations !== "")){
            let listOfOperations = operations.split("$");
            let num = listOfOperations.length - 1;
            cell.push(
                <Table.Row>
                    <Table.Cell rowSpan={num}>Выполненые работы:</Table.Cell>
                    <Table.Cell>{listOfOperations[0]}</Table.Cell>
                </Table.Row>
            );
            for (let i = 1; i < num; i++){
                cell.push(
                    <Table.Row>
                        <Table.Cell>{listOfOperations[i]}</Table.Cell>
                    </Table.Row>
                )
            }
            this.setState({
                operationsTable: cell
            });
        }
    }

    createTable(list){
        let printVar = [];
        let repairBeginDate =
            <Table.Row>
                <Table.Cell>Дата начала ремонта</Table.Cell>
                <Table.Cell>{list.repairBeginDate}</Table.Cell>
            </Table.Row>;
        printVar.push(repairBeginDate);

        let repairEndDate =
            <Table.Row>
                <Table.Cell>Дата завершения ремонта</Table.Cell>
                <Table.Cell>{list.repairEndDate}</Table.Cell>
            </Table.Row>;
        printVar.push(repairEndDate);

        let state =
            <Table.Row>
                <Table.Cell>Состояние ремонта</Table.Cell>
                <Table.Cell>{list.state}</Table.Cell>
            </Table.Row>;
        printVar.push(state);

        let fullName =
            <Table.Row>
                <Table.Cell>ФИО</Table.Cell>
                <Table.Cell>{list.fullName}</Table.Cell>
            </Table.Row>;
        printVar.push(fullName);

        let modelName =
            <Table.Row>
                <Table.Cell>Модель</Table.Cell>
                <Table.Cell>{list.modelName}</Table.Cell>
            </Table.Row>;
        printVar.push(modelName);

        let IMEI =
            <Table.Row>
                <Table.Cell>IMEI</Table.Cell>
                <Table.Cell>{list.IMEI}</Table.Cell>
            </Table.Row>;
        printVar.push(IMEI);

        let equipment =
            <Table.Row>
                <Table.Cell>Комплектация</Table.Cell>
                <Table.Cell>{list.equipment}</Table.Cell>
            </Table.Row>;
        printVar.push(equipment);

        let issue =
            <Table.Row>
                <Table.Cell>Неисправность</Table.Cell>
                <Table.Cell>{list.issue}</Table.Cell>
            </Table.Row>;
        printVar.push(issue);

        let cost =
            <Table.Row>
                <Table.Cell>Стоимость ремонта</Table.Cell>
                <Table.Cell>{list.cost}</Table.Cell>
            </Table.Row>;
        printVar.push(cost);

        let comment =
            <Table.Row>
                <Table.Cell>Комментарий</Table.Cell>
                <Table.Cell>{list.comment}</Table.Cell>
            </Table.Row>;
        printVar.push(comment);

        printVar.push(this.state.operationsTable);

        let images =
            <Table.Row>
                <Table.Cell>Фотографии ремонта</Table.Cell>
                <Table.Cell>
                    <ListImages imgPath={list.images}/>
                </Table.Cell>
            </Table.Row>;
        printVar.push(images);

        this.setState({
            statusElement: printVar
        });
    }

    async componentDidMount() {
        await this.createOperations(this.props.text);
        await this.createTable(this.props.text);

    }

    render() {
        return (
            <Table celled selectable>
                <Table.Body>
                        {this.state.statusElement}
                </Table.Body>
            </Table>
        );
    }
}

export default StatusText;