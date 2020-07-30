import React,{Component} from "react";
import {Button, Header, Form, Modal, Dimmer, Table} from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

class OperationTable extends Component{
    constructor(props) {
        super(props);
        this.state = {
            dataFromOut: this.props.operations,
            imagesList: ""
        };
    }

    createTable(){
        let cell = [];
        let list = [];
        if (this.state.dataFromOut !== undefined) {
            list = this.state.dataFromOut.split("$");
            console.log(list);
            let num = list.length - 1;

            cell.push(
                <Table.Row>
                    <Table.Cell rowSpan={num}>Выполненые работы:</Table.Cell>
                    <Table.Cell>{list[0]}</Table.Cell>
                </Table.Row>
            );
            for (let i = 1; i < num; i++) {
                cell.push(
                    <Table.Row>
                        <Table.Cell>{list[i]}</Table.Cell>
                    </Table.Row>
                )
            }
        }
        console.log(cell);
        this.setState({
            imagesList: cell
        })
    }

    componentDidMount() {
        this.createTable()
    }

    render() {
        return(
            <div>
                {this.state.imagesList}
            </div>
        )
    }
}

export default OperationTable;