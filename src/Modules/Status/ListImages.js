import React,{Component} from "react";
import {Icon} from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import StatusImage from "./StatusImage";

class ListImages extends Component{
    constructor(props) {
        super(props);
        this.state = {
            dataFromOut: this.props.imgPath,
            imagesList: []
        };
    }

    createImagesList() {
        let list = [];
        let pathList = this.state.dataFromOut.split("$");
        for(let i = 0; i < pathList.length - 1; i++){
            list.push(
                <StatusImage path={pathList[i]}/>
            )
        }
        this.setState({
            imagesList: list
        })
    }

    componentDidMount() {
        this.createImagesList()
    }

    render() {
        return(
            <div>
                {this.state.imagesList}
            </div>
        )
    }
}

export default ListImages;