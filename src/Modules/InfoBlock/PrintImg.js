import React, {Component} from "react";

class PrintImg extends Component{
    constructor(props) {
        super(props);
        this.state = {
            dataFromOut: this.props.printImg,
            printImg: ""
        };

    }

    componentDidMount() {
        let printImg = "data:image/jpg;base64," + this.state.dataFromOut.img;

        this.setState({printImg: printImg});

    }

    render() {
        return(
            <p>
                <img src={this.state.printImg} width={700}/>
            </p>
        )
    }
}

export default PrintImg;