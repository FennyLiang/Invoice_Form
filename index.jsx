import React from 'react';
import reactDom from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Card, CardTitle, CardText} from 'material-ui/Card';
import injectTapEventPlugin from 'react-tap-event-plugin';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import indexStyle from './index.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    injectTapEventPlugin();

    this.state = {
      isActive: true,
      expanedForm1:false,
      expanedForm2:false,
      clickState: false
  };

    this.handleChangeForm3 = this.handleChangeForm3.bind(this);
  }
  static propTypes = {
    children: React.PropTypes.node,
  };

  handleExpandChangeForm1 = () => {
    var expanedFormOne = !this.state.expanedForm1;
    this.setState({expanedForm1: expanedFormOne});
  };

  handleExpandChangeForm2 = () => {
    var expanedFormTwo = !this.state.expanedForm2;
    this.setState({expanedForm2: expanedFormTwo});
  };
  handleChangeForm3 = () => {
    var expanedFormThree = !this.state.clickState;
    this.setState({clickState: expanedFormThree});
  };

  handleChangeForm0 = () => {
    var expanedFormZero = !this.state.clickState;
    this.setState({clickState: expanedFormZero});
  };

  button_click = () => {
    this.setState({isActive: false});
  }

  render() {
    return (

      <MuiThemeProvider>
        <div>
          <h1 style={{textAlign: 'center' }}>發票設定</h1>
          <h5 onClick={this.button_click} style={{display: this.state.isActive ? '' : 'none' }}>您目前的選擇</h5>
          <h5 onClick={this.button_click} style={{display: this.state.isActive ? 'none' : '' }}>請選擇您的發票方式</h5>

          {/*店家載具*/}
          <Card style={{padding: 20, marginTop: 20}} onClick={this.handleChangeForm0} className={this.state.clickState ? indexStyle.selected_green : ''} >
            <CardTitle title="使用店家載具" style={{textAlign: 'center'}} />
            <CardText style={{ textAlign: 'center' }} >
              發票由WeMo代為保管，中獎會主動寄出給您
            </CardText>
          </Card>
          <RaisedButton label="更改發票方式" fullWidth={true} primary={true} onClick={this.button_click} style={{display: this.state.isActive ? '' : 'none' }}/>

          {/*手機條碼*/}
          <Card style={{padding: 20, marginTop: 20, display: this.state.isActive ? 'none' : '' }} expanded={this.state.expanedForm1} onExpandChange={this.handleExpandChangeForm1} className={this.state.expanedForm1 ? indexStyle.selected_green : ''} >
            <CardTitle title="手機條碼" style={{textAlign: 'center'}} actAsExpander={true} />
            <CardText style={{ textAlign: 'center' }} actAsExpander={true} >
              將發票存入手機條碼當中
            </CardText>
              {this.state.expanedForm1 ? <TextField hintText="請輸入您的手機條碼" fullWidth={true} /> : null}
          </Card>

          {/*捐贈*/}
          <Card style={{padding: 20, marginTop: 20, display: this.state.isActive ? 'none' : '' }} expanded={this.state.expanedForm2} onExpandChange={this.handleExpandChangeForm2} className={this.state.expanedForm2 ? indexStyle.selected_green : ''} >
            <CardTitle title="捐贈" style={{textAlign: 'center'}} actAsExpander={true} />
            <CardText style={{ textAlign: 'center' }} actAsExpander={true} >
              將發票捐贈
            </CardText>
              {this.state.expanedForm2 ? <TextField hintText="請輸入您的愛心碼(預設為陽光基金會)" fullWidth={true} /> : null}
          </Card>

          {/*其他*/}
          <Card style={{padding: 20, marginTop: 20, display: this.state.isActive ? 'none' : '' }} onClick={this.handleChangeForm3} className={this.state.clickState ? indexStyle.selected_grey : ''}>
            <CardTitle title="其他" style={{textAlign: 'center'}} />
            <CardText style={{ textAlign: 'center' }}>
              索取發票或是將發票存入自然人憑證
            </CardText>
          </Card>

        </div>

      </MuiThemeProvider>
    )
  }

}

reactDom.render(<App />, document.getElementById('app'))