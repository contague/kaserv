import React, {Component} from "react";
import { Table } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

class StatusPrint extends Component{
    render() {
        return(
            <Table.Row>
                {this.props.statusData}
            </Table.Row>
        )
    }
}

export default StatusPrint;