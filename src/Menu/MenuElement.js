import React,{Component} from "react";
import { Dropdown, Menu, Grid, Segment } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import {
    Route,
    NavLink,
    HashRouter
} from "react-router-dom";

import InetCatalog from "../Modules/InetCatalog";
import InfoBlock from "../Modules/InfoBlock/InfoBlock";
import ProducerNom from "../Modules/ProducerNom";
import FileBrowser from "../Modules/FileBrowser";
import NewInfBlock from "../Modules/NewInfBlock";
import IndexModal from "../Modules/Status/indexModal";
import StatusJournal from "../Modules/StatusJournal/StatusJournal";
import ChangePass from "../Modules/ChangePass/ChangePass";
import Status from "../Modules/StatusApp/Status";

class MenuElement extends Component{
    constructor(props) {
        super(props);
        this.state = {
            dataFromOut: this.props.data,
            menuItem: "",
            activeItem: "",
            menuRoute: ""
        };
    }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name });

    createSubMenu(){
        let data = this.state.dataFromOut;
        let menuList = [];
        let subMenuList = [];

        for (let i = 0; i < data.length; i++){
            if (i === 0) {
                menuList.push(
                    <NavLink to={"/" + data[i].group1 + "/"}>
                        <Menu.Item
                            name={data[i].group3}
                            active={this.state.activeItem === data[i].group3}
                            onClick={this.handleItemClick}
                        />
                    </NavLink>
                )
            }
            else if (data[i].idGroup2 === "0"){
                menuList.push(
                    <NavLink to={"/" + data[i].group1 + "/" + data[i].group3}>
                        <Menu.Item
                            name={data[i].group3}
                            active={this.state.activeItem === data[i].group3}
                            onClick={this.handleItemClick}
                        />
                    </NavLink>
                )
            }
            else {
                if(i !== data.length - 1 && data[i].idGroup2 === data[i + 1].idGroup2){
                    subMenuList.push(
                        <NavLink to={"/" + data[i].group1 + "/" + data[i].group3}>
                            <Dropdown.Item>{data[i].group3}</Dropdown.Item>
                        </NavLink>
                    )
                }
                else {
                    subMenuList.push(
                        <NavLink to={"/" + data[i].group1 + "/" + data[i].group3}>
                            <Dropdown.Item>{data[i].group3}</Dropdown.Item>
                        </NavLink>
                    );
                    menuList.push(
                        <Dropdown item text = {data[i].group2}>
                            <Dropdown.Menu>
                                {subMenuList}
                            </Dropdown.Menu>
                        </Dropdown>
                    );
                    subMenuList = [];
                }
            }
        }
        this.setState({menuItem: menuList});
    }

    createRoute(){
        let data = this.state.dataFromOut;
        let menuRoute = [];

        for (let i = 0; i < data.length; i++){
            if(i === 0) {
                if (data[i].module === "~/REM/REM_Zayavka.aspx") {
                    let outData = data[i];
                    menuRoute.push(<Route exact path={"/" + data[i].group1 + "/"}
                                          render={(props) => <Status data={outData} {...props}/>}/>);
                }
                if (data[i].module === "~/Spr/SprInetCatalog.aspx") {
                    let outData = data[i];
                    menuRoute.push(<Route exact path={"/" + data[i].group1 + "/"}
                                          render={(props) => <InetCatalog data={outData} {...props}/>}/>);
                }
                if (data[i].module === "~/ART/ART_FormaElementaInfBlock.aspx") {
                    let outData = data[i];
                    menuRoute.push(<Route exact path={"/" + data[i].group1 + "/"}
                                          render={(props) => <InfoBlock data={outData} {...props}/>}/>);
                }
                if (data[i].module === "~/Spr/ProducerNom/SprProducerNom.aspx") {
                    let outData = data[i];
                    menuRoute.push(<Route exact path={"/" + data[i].group1 + "/"}
                                          render={(props) => <ProducerNom data={outData} {...props}/>}/>);
                }
                if (data[i].module === "~/KasFileBrowser/KasFileBrowser.aspx") {
                    let outData = data[i];
                    menuRoute.push(<Route exact path={"/" + data[i].group1 + "/"}
                                          render={(props) => <FileBrowser data={outData} {...props}/>}/>);
                }
                if (data[i].module === "~/HLP/HLP_FormaSpiskaInfBlock.aspx") {
                    let outData = data[i];
                    menuRoute.push(<Route exact path={"/" + data[i].group1 + "/"}
                                          render={(props) => <NewInfBlock data={outData} {...props}/>}/>);
                }
                if (data[i].module === "~/REM/REM_GurZForDialer.aspx") {
                    let outData = data[i];
                    menuRoute.push(<Route exact path={"/" + data[i].group1 + "/"}
                                          render={(props) => <StatusJournal data={outData} {...props}/>}/>);
                }
                if (data[i].module === "~/ChangePassword.aspx") {
                    let outData = data[i];
                    menuRoute.push(<Route exact path={"/" + data[i].group1 + "/"}
                                          render={(props) => <ChangePass data={outData} {...props}/>}/>);
                }
            }
            else {
                if (data[i].module === "~/REM/REM_Zayavka.aspx") {
                    let outData = data[i];
                    menuRoute.push(<Route exact path={"/" + data[i].group1 + "/" + data[i].group3}
                                          render={(props) => <Status data={outData} {...props}/>}/>);
                }
                if (data[i].module === "~/Spr/SprInetCatalog.aspx") {
                    let outData = data[i];
                    menuRoute.push(<Route exact path={"/" + data[i].group1 + "/" + data[i].group3}
                                          render={(props) => <InetCatalog data={outData} {...props}/>}/>);
                }
                if (data[i].module === "~/ART/ART_FormaElementaInfBlock.aspx") {
                    let outData = data[i];
                    menuRoute.push(<Route exact path={"/" + data[i].group1 + "/" + data[i].group3}
                                          render={(props) => <InfoBlock data={outData} {...props}/>}/>);
                }
                if (data[i].module === "~/Spr/ProducerNom/SprProducerNom.aspx") {
                    let outData = data[i];
                    menuRoute.push(<Route exact path={"/" + data[i].group1 + "/" + data[i].group3}
                                          render={(props) => <ProducerNom data={outData} {...props}/>}/>);
                }
                if (data[i].module === "~/KasFileBrowser/KasFileBrowser.aspx") {
                    let outData = data[i];
                    menuRoute.push(<Route exact path={"/" + data[i].group1 + "/" + data[i].group3}
                                          render={(props) => <FileBrowser data={outData} {...props}/>}/>);
                }
                if (data[i].module === "~/HLP/HLP_FormaSpiskaInfBlock.aspx") {
                    let outData = data[i];
                    menuRoute.push(<Route exact path={"/" + data[i].group1 + "/" + data[i].group3}
                                          render={(props) => <NewInfBlock data={outData} {...props}/>}/>);
                }
                if (data[i].module === "~/REM/REM_GurZForDialer.aspx") {
                    let outData = data[i];
                    menuRoute.push(<Route exact path={"/" + data[i].group1 + "/" + data[i].group3}
                                          render={(props) => <StatusJournal data={outData} {...props}/>}/>);
                }
                if (data[i].module === "~/ChangePassword.aspx") {
                    let outData = data[i];
                    menuRoute.push(<Route exact path={"/" + data[i].group1 + "/" + data[i].group3}
                                          render={(props) => <ChangePass data={outData} {...props}/>}/>);
                }
            }
        }
        this.setState({menuRoute: menuRoute});
    }

    componentDidMount() {
        this.createSubMenu();
        this.createRoute();
    }

    render() {
        return(
            <HashRouter>
                <Grid>
                    <Grid.Column width={4}>
                        <Menu fluid vertical tabular>
                            {this.state.menuItem}
                        </Menu>
                    </Grid.Column>
                    <Grid.Column stretched width={12}>
                        <Segment style={{overflow: 'auto', minHeight: 490}}>
                            {this.state.menuRoute}
                        </Segment>
                    </Grid.Column>
                </Grid>
            </HashRouter>
        )
    }
}

export default MenuElement;