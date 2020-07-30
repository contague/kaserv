import React,{Component} from "react";
import {Button, Header, Form, Modal, Dimmer, Loader} from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import GetStatus from "./GetStatus";

class ModalPart extends Component{
    constructor(props) {
        super(props);
        this.state = {
            statusModal: this.props.statusModal,
            statusContent: ""
        };
        this.changeState = this.changeState.bind(this);
    }

    async changeState(){
        await this.setState({statusModal: false});
        await this.props.closeModule();
    }

    componentDidMount() {

        this.setState({statusContent:
                <GetStatus
                    name = {this.props.name}
                    number = {this.props.number}
                />
        })
    }

    render() {
        return(
            <div>
                <Modal
                    open={this.state.statusModal}
                    onClose={this.changeState}
                    closeIcon
                >
                    <Header icon='archive' content='Состояние заявки'/>
                    <Modal.Content>
                        {this.state.statusContent}
                    </Modal.Content>
                </Modal>
            </div>
        )
    }
}

export default ModalPart;