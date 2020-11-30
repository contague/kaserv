import React, {Component} from "react";
import ModernDatepicker from 'react-modern-datepicker';
import {Dropdown, Form, Button, Loader, Dimmer} from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import "./StatusJournal.css"
import JournalTable from "./JournalTable";

class StatusJournal extends Component{
    constructor(props) {
        super(props);
        this.state = {
            date: new Date(),
            firstDate: new Date(),
            option: "",
            array: "",
            dataForOut: "",
            printJournal: ""
        };
        this.getOptions = this.getOptions.bind(this);
    }

    setDate(){
        let date = new Date();
        date.setMonth(date.getMonth() - 2);
        this.setState({firstDate: date});
    }

    async getOptions(){
        let firstDate = this.state.date.getTime();
        let secondDate = this.state.firstDate.getTime();
        let option;
        if (this._thirdElement.props.value === undefined){
            option = this._thirdElement.props.defaultValue;
        }
        else {
            option = this._thirdElement.props.value;
        }
        await this.setState({array: [firstDate, secondDate, option]});
        await this.sendData();
    }

    async sendData(){
        this.setState({printJournal:
                <Dimmer active inverted>
                    <Loader inverted content='Loading' />
                </Dimmer>
        });
        let statusJournalBody = {
            firstDate: this.state.array[0],
            secondDate: this.state.array[1],
            option: this.state.array[2]
        }
        let jsonStatusJournal = JSON.stringify(statusJournalBody);
        const options = {
            method: 'post',
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                "Accept": "application/json"},
            body: jsonStatusJournal
        };
        let resp = await fetch("statusJournal", options);
        if (resp.ok) {
            let data = await resp.json();
            this.setState({dataForOut: data});
            this.setState({printJournal: <JournalTable data={this.state.dataForOut}/>});
            console.log(data)
        }
    }

    componentDidMount() {
        this.setDate();
    }

    onChange = date => this.setState({ date: new Date(date.split("-")[2], date.split("-")[1] - 1, date.split("-")[0])});
    onChangeFirst = firstDate => this.setState({ firstDate: new Date(firstDate.split("-")[2], firstDate.split("-")[1] - 1, firstDate.split("-")[0]) });
    handleChange = (e, { value }) => this.setState({ value });

    render() {
        const options = [
            { key: 1, text: 'Все за период', value: 1 },
            { key: 2, text: 'Готово к выдаче', value: 2 },
            { key: 3, text: 'Не готово к выдаче (ремонтируется)', value: 3 },
        ];
        const { value } = this.state;
        return(
            <Form onSubmit={this.getOptions}>
                Журнал заявок с
                <p><ModernDatepicker
                    ref={(a) => this._firstElement = a}
                    onChange={this.onChangeFirst}
                    date={this.state.firstDate}
                    format={'DD-MM-YYYY'}
                    className="color"
                /></p>
                <p>по</p>
                <p><ModernDatepicker
                    ref={(a) => this._secondElement = a}
                    onChange={this.onChange}
                    date={this.state.date}
                    format={'DD-MM-YYYY'}
                    className="color"
                /></p>
                <p>
                    <Dropdown
                        ref={(a) => this._thirdElement = a}
                        selection
                        options={options}
                        defaultValue={1}
                        onChange={this.handleChange}
                        value={value}
                    />
                    <Button type="submit">Открыть</Button>
                </p>
                <p>{this.state.printJournal}</p>
            </Form>
        )
    }
}

export default StatusJournal;