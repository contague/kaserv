import React,{Component} from "react";

class FileBrowser extends Component{
    constructor(props) {
        super(props);
        this.state = {
            dataFromOut: this.props.data,
        };
    }
    render() {
        return(
            <div>
                {this.state.dataFromOut.module}
            </div>
        )
    }
}

export default FileBrowser;