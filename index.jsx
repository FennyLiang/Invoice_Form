import React from 'react';
import reactDom from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Card, CardActions, CardTitle, CardText} from 'material-ui/Card';
import injectTapEventPlugin from 'react-tap-event-plugin';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';



class App extends React.Component {
  constructor(props) {
    super(props);
    injectTapEventPlugin();
  }
  static propTypes = {
    children: React.PropTypes.node,
  };

  render() {
    return (

      <MuiThemeProvider>

        <div>
          <h1 style={{textAlign: 'center' }}>發票設定</h1>
          <h5>您目前的選擇</h5>
          <h5>請選擇您的發票方式</h5>
          <Card>
            <CardTitle title="使用店家載具" style={{textAlign: 'center'}} />
            <CardText style={{textAlign: 'center' }}>
              發票由WeMo代為保管，中獎會主動寄出給您
            </CardText>
          </Card>
          <RaisedButton label="更改發票方式" fullWidth={true} primary={true}/>

          <Card style={{padding: 20, marginTop: 20}}>
            <CardTitle title="手機條碼" style={{textAlign: 'center'}} />
            <CardText style={{ textAlign: 'center' }}>
              將發票存入手機條碼當中
            </CardText>
            <TextField hintText="請輸入您的手機條碼" fullWidth={true} />
          </Card>

          <Card style={{padding: 20, marginTop: 20}}>
            <CardTitle title="捐贈" style={{textAlign: 'center'}} />
            <CardText style={{ textAlign: 'center' }}>
              將發票捐贈
            </CardText>
            <TextField hintText="請輸入您的愛心碼(預設為陽光基金會)" fullWidth={true} />
          </Card>

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