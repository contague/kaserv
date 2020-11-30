import React, {Component} from "react";
import Text from "./Text";
import PrintImg from "./PrintImg";

import { Dimmer, Loader} from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

class InfoBlock extends Component{
    constructor(props) {
        super(props);
        this.state = {
            dataFromOut: this.props.data,
            data: "...",
            printData:
                <Dimmer active inverted>
                    <Loader inverted content='Loading' />
                </Dimmer>
        };
    }

    async getData(id) {
        let out = [];
        let idBody = {
            id: id
        };
        let jsonBody = JSON.stringify(idBody);
        const options = {
            method: 'post',
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                "Accept": "application/json"},
            body: jsonBody
        };

        let resp = await fetch("infoBlock", options);
        let data = await resp.json();
        await this.setState({data: data});
        for (let i = 0; i < data.length; i++){
            if (data[i].type === "1") {
                out.push(<Text text={data[i].data}/>);
            }
            else if(data[i].type === "2"){
                out.push(<PrintImg printImg={data[i]}/>);

            }
        }
        this.setState({printData: out});

    }

    componentDidMount() {
        this.getData(this.state.dataFromOut.idModule);
    }

    render() {
        return(
            <div>
                {this.state.printData}
            </div>
        )
    }
}

export default InfoBlock;