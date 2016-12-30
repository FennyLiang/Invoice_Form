import React from 'react';
import reactDom from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Card, CardTitle, CardText} from 'material-ui/Card';
import injectTapEventPlugin from 'react-tap-event-plugin';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import indexStyle from './index.css';
import Spinner from 'react-spinkit';


class App extends React.Component {

  constructor(props) {
    super(props);
    injectTapEventPlugin();

    this.state = {
      isActive: true,
      expanedForm1:false,
      expanedForm2:false,
      clickState: false,
      clickFirst: false,
      position: true,
  };


  }
  static propTypes = {
    children: React.PropTypes.node,
  };

  handleExpandChangeForm1 = () => {
    var expanedFormOne = !this.state.expanedForm1;
    this.setState({expanedForm1: expanedFormOne, expanedForm2:false, clickState:false, clickFirst:false});
  };

  handleExpandChangeForm2 = () => {
    var expanedFormTwo = !this.state.expanedForm2;
    this.setState({expanedForm2: expanedFormTwo, expanedForm1:false, clickState:false, clickFirst:false});
  };
  handleChangeForm3 = () => {
    var expanedFormThree = !this.state.clickState;
    this.setState({clickState: expanedFormThree, expanedForm1: false, expanedForm2:false, clickFirst:false});
  };

  handleChangeForm0 = () => {
    var expanedFormZero = !this.state.clickFirst;
    this.setState({clickFirst: expanedFormZero, expanedForm1: false, expanedForm2:false, clickState:false});
  };

  button_click = () => {
    this.setState({isActive: false});
  };

  getInitialState() {
    return {position: true};
  };

  componentDidMount() {
    setTimeout(function() { this.setState({position: false}); }.bind(this), 1000)
  };


  style =  {
    padding: 20,
    marginTop: 20,
  };

  fadeinStyle = {
    animationDelay: 0.7,
    opacity:1
  };

  render() {
    if(this.state.position === true){
      return(
        <div>
        <Spinner spinnerName="three-bounce" style={{textAlign: 'center', marginTop: 50}}/>
        </div>
      )
    } else {
        return (
          <MuiThemeProvider>

            <div style={ this.state.position? '' : {...this.fadeinStyle} } className={indexStyle.fadeIn} >

              <h2 style={{textAlign: 'center' }}>發票設定</h2>
              <h5 onClick={this.button_click} style={{display: this.state.isActive ? '' : 'none' }}>您目前的選擇</h5>
              <h5 onClick={this.button_click} style={{display: this.state.isActive ? 'none' : '' }}>請選擇您的發票方式</h5>

              {/*店家載具*/}
              <Card style={{...this.style, border: this.state.clickFirst ? '#B2DFDB solid 2px' : ''}} className={indexStyle.RaisedButton_noRadius} onClick={this.handleChangeForm0}>
                <CardTitle title="使用店家載具" style={{textAlign: 'center' }} />
                <CardText style={{ textAlign: 'center' }} >
                  發票由WeMo代為保管，中獎會主動寄出給您
                </CardText>
              </Card>
              <RaisedButton label="更改發票方式" fullWidth={true} primary={true} onClick={this.button_click} style={{display: this.state.isActive ? '' : 'none' }}/>

              {/*手機條碼*/}
              <Card style={{...this.style, display: this.state.isActive ? 'none' : '', border: this.state.expanedForm1 ? '#B2DFDB solid 2px' : '' }} expanded={this.state.expanedForm1} onExpandChange={this.handleExpandChangeForm1} >
                <CardTitle title="手機條碼" style={{textAlign: 'center'}} actAsExpander={true} />
                <CardText style={{ textAlign: 'center' }} actAsExpander={true} >
                  將發票存入手機條碼當中
                </CardText>
                <TextField className={indexStyle.strechHeightAnimation} style={this.state.expanedForm1 ? { opacity: 1 } : { height: 0, opacity: 0 }} hintText="請輸入您的手機條碼" fullWidth={true} />
              </Card>

              {/*捐贈*/}
              <Card style={{...this.style, display: this.state.isActive ? 'none' : '', border: this.state.expanedForm2 ? '#B2DFDB solid 2px' : '' }} expanded={this.state.expanedForm2} onExpandChange={this.handleExpandChangeForm2} >
                <CardTitle title="捐贈" style={{textAlign: 'center'}} actAsExpander={true} />
                <CardText style={{ textAlign: 'center' }} actAsExpander={true} >
                  將發票捐贈
                </CardText>
                <TextField className={indexStyle.strechHeightAnimation} style={this.state.expanedForm2 ? { opacity: 1 } : { height: 0, opacity: 0 }} hintText="請輸入您的愛心碼(預設為陽光基金會)" fullWidth={true} />
              </Card>

              {/*其他*/}
              <Card style={{...this.style, marginBottom: 100, display: this.state.isActive ? 'none' : '', border: this.state.clickState ? '#B0BEC5 solid 2px' : '' }} onClick={this.handleChangeForm3} >
                <CardTitle title="其他" style={{textAlign: 'center'}} />
                <CardText style={{ textAlign: 'center' }}>
                  索取發票或是將發票存入自然人憑證
                </CardText>
              </Card>
              <div style={{position: 'fixed', bottom: 0, left: 0, width: '100%', display: this.state.isActive ? 'none' : '' }} >
                <RaisedButton label="取消" className={indexStyle.RaisedButton_noRadius} style={{width: '50%'}} backgroundColor={'#B2DFDB'} labelColor={'#FFFFFF'} />
                <RaisedButton label="確認" className={indexStyle.RaisedButton_noRadius} style={{width: '50%', display: this.state.clickState ? 'none':'inline-block'}} backgroundColor={'#81D4FA'} labelColor={'#FFFFFF'} />
                <RaisedButton label="請洽客服" className={indexStyle.RaisedButton_noRadius} disabled={true} style={{width: '50%', display: this.state.clickState ? 'inline-block':'none' }} labelColor={'#FFFFFF'} />
              </div>
            </div>
          </MuiThemeProvider>
        )
      }
    }
  }

reactDom.render(<App />, document.getElementById('app'));