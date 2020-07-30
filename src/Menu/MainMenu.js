import React, {Component} from "react";
import 'semantic-ui-css/semantic.min.css'
import {Menu, Header, Segment, Grid} from 'semantic-ui-react';
import {
    Route,
    NavLink,
    HashRouter
} from "react-router-dom";
import MenuElement from "./MenuElement";
import getData from "../GetData/GetData";
import InfoBlock from "../Modules/InfoBlock/InfoBlock";
import LoginApp from "../Modules/Login/LoginApp";

class MainMenu extends Component{
    constructor(props) {
        super(props);
        this.state = {
            dynamicMenu: "…",
            menuElementRoute: "…",
            outerData: "",
            menuHeader: "",
            role: "guest",
        };
        this.changeRole = this.changeRole.bind(this);
    }

    async getData(){
        let data = await getData();
        this.setState({outerData: data})
    }

    getMenu(){
        let data = this.state.outerData;
        let menu = [];

        const {activeItem} = this.state;

        this.setState({menuHeader:
                <NavLink to={"/"}>
                    <Header as='h3' block>
                        КА сервис
                    </Header>
                </NavLink>
        });
        for (let i = 0; i < data.length; i++){
            if(i === 0 || data[i].group1 !== data[i - 1].group1)
            {menu.push(
                <NavLink to={"/" + data[i].group1}>
                    <Menu.Item
                        name={data[i].group1}
                        active={activeItem === data[i].group1}
                        onClick={this.handleItemClick}
                    >
                        {data[i].group1}
                    </Menu.Item>
                </NavLink>)}
        }
        menu.push(
            <Menu.Item position='right'>
                    <LoginApp updateRole = {this.changeRole}/>
            </Menu.Item>
        );
        this.setState({dynamicMenu: menu})
    }

    changeRole(){
        this.setState({role: "diler"});
        this.getData().then(r => this.createComponents());
    };

    getMenuComponent(){
        let  data = this.state.outerData;
        let menuElement = [];
        let menuElementData = [];
        let headerData = {idModule: "11"};
        menuElement.push(<Route exact path={"/"}  render={(props)=>
            <Grid.Column stretched width={12}>
                <Segment>
                    <InfoBlock data={headerData} {...props}/>
                </Segment>
            </Grid.Column>
        }  />);
        for (let i = 0; i < data.length; i++){

            if((i === data.length - 1 || data[i].group1 === data[i + 1].group1) && i !== data.length - 1){
                menuElementData.push(data[i]);

            }
            else {
                menuElementData.push(data[i]);
                let outData = menuElementData;
                menuElement.push(<Route path={"/" + data[i].group1}  render={(props)=><MenuElement data={outData} {...props}/>}  />);
                menuElementData = [];

            }

        }
        this.setState({menuElementRoute: menuElement})
    }

    createComponents(){
        this.getMenu();
        this.getMenuComponent();
    }

    componentDidMount() {
        this.getData().then(r => this.createComponents());
    }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name });



    render() {
        return(
            <HashRouter>
                {this.state.menuHeader}
                <Menu>
                    {this.state.dynamicMenu}
                </Menu>
                <div id="content">
                    {this.state.menuElementRoute}
                </div>
            </HashRouter>
        )
    }
}

export default MainMenu;