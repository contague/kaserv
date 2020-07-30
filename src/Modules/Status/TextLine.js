import React, {Component} from "react";
import { Table } from 'semantic-ui-react'

class TextLine extends Component{
    render() {
        return(
            <Table.Row>
                <Table.Cell>{this.props.statusLine}</Table.Cell>
                <Table.Cell textAlign='right'>{this.props.statusText}</Table.Cell>
            </Table.Row>

        )
    }
}

export default TextLine;