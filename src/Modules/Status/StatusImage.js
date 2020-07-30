import React,{Component} from "react";
import {Modal, Image, Icon} from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

class StatusImage extends Component{
    constructor(props) {
        super(props);
        this.state = {
            dataFromOut: this.props.path,
            finalUrl: ""
        };
    }

    componentDidMount() {
        let imagePath = "statusImage?path=" + this.state.dataFromOut;
        let encodePath = encodeURI(imagePath);
        this.setState({
            finalUrl: encodePath
        });
        console.log(imagePath);
    }

    render() {
        return(
            <Modal trigger={<Icon name="picture" size='huge' />} basic>
                <Modal.Content image>
                    <Image centered size='huge' src={this.state.finalUrl} />
                </Modal.Content>
            </Modal>
        )
    }
}

export default StatusImage;