import React,{Component} from "react";
import StatusText from "./StatusText";
import {Dimmer, Loader} from "semantic-ui-react";

class GetStatus extends Component{
    constructor(props) {
        super(props);
        this.state = {
            printStatus: ""
        };
    }

    async getStatusFromServer(){
        let surname = this.props.name;
        let number = this.props.number;
        let statusBody = {
            surname: surname,
            number: number
        }
        let jsonStatus = JSON.stringify(statusBody);
        const options = {
            method: 'post',
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                "Accept": "application/json"},
            body: jsonStatus
        };
        if ((surname !== "" && number !== "") || (surname !== undefined && number !== undefined)){
            this.setState({printStatus:
                    <Dimmer active inverted>
                        <Loader inverted content='Loading' />
                    </Dimmer>
            });
            let resp = await fetch("status", options);
            if (resp.ok) {
                let json = await resp.json();
                console.log(json);
                if (json === null){
                    this.setState({printStatus: "Неправильно введена фамилия или номер заявки"});
                }
                else this.setState({printStatus: <StatusText text = {json}/>});
            }
        }
    }

    async componentDidMount() {
        this.getStatusFromServer();
    }

    render() {
        return (
            <div>
                {this.state.printStatus}
            </div>
        );
    }
}

export default GetStatus;