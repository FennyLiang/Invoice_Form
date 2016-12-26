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
      expanedForm1:false,
      expanedForm2:false,

  };

  }
  static propTypes = {
    children: React.PropTypes.node,
  };

  handleExpandChangeForm1 = () => {
    this.setState({expanededForm1: true})
  };

  handleExpandChangeForm2 = () => {
    this.setState({expanedForm2: true});
  };


  render() {
    return (

      <MuiThemeProvider>
        <div>
          <h1 style={{textAlign: 'center' }}>發票設定</h1>
          <h5>您目前的選擇</h5>
          <h5>請選擇您的發票方式</h5>

          {/*店家載具*/}
          <Card>
            <CardTitle title="使用店家載具" style={{textAlign: 'center'}} />
            <CardText style={{textAlign: 'center' }}>
              發票由WeMo代為保管，中獎會主動寄出給您
            </CardText>
          </Card>
          <RaisedButton label="更改發票方式" fullWidth={true} primary={true}/>

          {/*手機條碼*/}
          <Card style={{padding: 20, marginTop: 20}} expanded={this.state.expanedForm1} onExpandChange={this.handleExpandChangeForm1} className={this.state.expanedForm1 ? indexStyle.selected : ''} >
            <CardTitle title="手機條碼" style={{textAlign: 'center'}} actAsExpander={true} />
            <CardText style={{ textAlign: 'center' }} actAsExpander={true} >
              將發票存入手機條碼當中
            </CardText>
            <div>
              {this.state.expanedForm1 ? <TextField hintText="請輸入您的手機條碼" fullWidth={true} /> : null}
            </div>
          </Card>

          {/*捐贈*/}
          <Card style={{padding: 20, marginTop: 20}} expanded={this.state.expanedForm2} onExpandChange={this.handleExpandChangeForm2} className={this.state.expanedForm2 ? indexStyle.selected : ''} >
            <CardTitle title="捐贈" style={{textAlign: 'center'}} actAsExpander={true} />
            <CardText style={{ textAlign: 'center' }} actAsExpander={true} >
              將發票捐贈
            </CardText>
            {this.state.expanedForm2 ? <TextField hintText="請輸入您的愛心碼(預設為陽光基金會)" fullWidth={true} /> : null}
          </Card>

          {/*其他*/}
          <Card style={{padding: 20, marginTop: 20}}>
            <CardTitle title="其他" style={{textAlign: 'center'}} />
            <CardText style={{ textAlign: 'center' }}>
              將發票捐贈
            </CardText>
            <TextField hintText="索取發票或是將發票存入自然人憑證" fullWidth={true} />
          </Card>

        </div>

      </MuiThemeProvider>
    )
  }

}

reactDom.render(<App />, document.getElementById('app'))