import React,{Component} from "react";
import store from "./ModalStore";
import { Header, Modal, Table } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

class SecondModal extends Component{
    render() {
        return(
            <div>
                <Modal
                    closeIcon
                    open={store.getState().modalAction}
                    onClose={() => {store.dispatch({type: "close"})}}
                    size='small'
                >
                    <Header icon='browser' content='Состояние ремонта' />
                    <Modal.Content>
                        <div>
                            <Table celled selectable>
                                <Table.Body>
                                    {this.props.statusPrint}
                                </Table.Body>
                            </Table>
                        </div>
                    </Modal.Content>
                </Modal>
            </div>
        )
    }
}

export default SecondModal;