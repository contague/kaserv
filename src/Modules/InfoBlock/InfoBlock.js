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
        const options = {
            method: 'post',
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8" },
            body: "id=" + id
        };

        let resp = await fetch("infoBlock", options);
        let data = await resp.json();
        await this.setState({data: data});
        for (let i = 0; i < data.list.length; i++){
            if (data.list[i].type === "1") {
                out.push(<Text text={data.list[i].data}/>);
            }
            else if(data.list[i].type === "2"){
                out.push(<PrintImg printImg={data.list[i]}/>);

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