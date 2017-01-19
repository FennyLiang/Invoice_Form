import React from 'react';
import reactDom from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Card, CardTitle, CardText} from 'material-ui/Card';
import injectTapEventPlugin from 'react-tap-event-plugin';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import indexStyle from './index.css';
import 'whatwg-fetch';
import Spinner from 'react-spinkit';


const InvoiceType = {
  Email: 0,
  PhoneNumber: 1,
  Donate: 2,
  CitizenDigitalCertification: 3,
}


class App extends React.Component {

  constructor(props) {
    super(props);
    injectTapEventPlugin();

    this.state = {
      isChangingInvoiceType: false,
      selectedInvoiceType: InvoiceType.Email,
      phoneNumber: '',
      donateCode: '',
      citizenCode: '',
      phoneErrorText: '',
      donateErrorText: '',
      citizenErrorText: '',
      disable: false,
    };
    this.submitForm=this.submitForm.bind(this);


  }
  static propTypes = {
    children: React.PropTypes.node,
  };

  startChangeInvoiceType() {
    this.setState({ isChangingInvoiceType: true });
  }

  changeInvoiceType(type) {
    this.setState({ selectedInvoiceType: type });
  }

  handleTextField(fieldName, event) {
    let nextState ={};
    var phoneRegex = /^\/[A-Z0-9]{7}/ //手機條碼
    var donateRegex = /^[0-9]{3,7}$/ //捐贈
    var citizenRegex = /^[A-Z]{2}\d{14}$/;

    nextState[fieldName] = event.target.value;

    switch (this.state.selectedInvoiceType){
      case InvoiceType.Email:
        break;
      case InvoiceType.PhoneNumber:
        if (nextState[fieldName].match(phoneRegex)) {
          this.setState({ phoneErrorText: '', disable: false })
        } else {
          this.setState({ phoneErrorText: '格式不符，請輸入正確手機條碼。', disable: true })
        }
        break;
      case InvoiceType.Donate:
        if (nextState[fieldName].match(donateRegex)){
          this.setState({ donateErrorText: '', disable: false })
        }else {
          this.setState({ donateErrorText: '格式不符，請輸入3~7位數字愛心碼。', disable: true })
        }
        break;
      case InvoiceType.CitizenDigitalCertification:
        if (nextState[fieldName].match(citizenRegex)){
          this.setState({ citizenErrorText: '', disable: false })
        }else {
          this.setState({ citizenErrorText: '格式不符，請輸入開頭2碼英文字+14碼數字。', disable: true })
        }
        break;
      default:
        break;
    }

    this.setState(nextState);
  }



  async submitForm() {
    //find value
    var resultVal = '';
    switch (this.state.selectedInvoiceType){
      case InvoiceType.Email:
        break;
      case InvoiceType.PhoneNumber:
        resultVal = this.state.phoneNumber;
        console.log(this.state.phoneNumber);
        break;
      case InvoiceType.Donate:
        resultVal = this.state.donateCode;
        console.log(this.state.donateCode);
        break;
      case InvoiceType.CitizenDigitalCertification:
        resultVal = this.state.citizenCode;
        console.log(this.state.citizenCode);
        break;
      default:
        break;
        return (resultVal, this.state.selectedInvoiceType);
    }
    // fetch api
    const resp = await fetch('https://briareus-qat.wemoscooter.com/api/invoice', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      mode: 'cors',

      body: JSON.stringify({
        type: this.state.selectedInvoiceType,
        phoneNum: parseInt(resultVal)
      }),
    });
    // .then(res => res.json())
    // .then(console.log);
    const {result} = await resp.json();
    console.log(result);

    if(result === "success"){
      window.location.href = 'https://briareus-qat.wemoscooter.com?action=closed'
    }else{
      if(this.state.selectedInvoiceType == InvoiceType.PhoneNumber){
        this.setState({ phoneErrorText: '條碼錯誤，請輸入正確手機條碼。', disable: true })
      }else if(this.state.selectedInvoiceType == InvoiceType.Donate){
        this.setState({ donateErrorText: '愛心碼錯誤，請輸入正確愛心碼。', disable: true })
      } else {
        this.setState({ citizenErrorText: '憑證錯誤，請輸入正確自然人憑證。', disable: true })
      }
    }

  }

  leavePage() {
    if(this.state.isChangingInvoiceType){
      window.location.href = 'https://briareus-qat.wemoscooter.com?action=closed'
    }
  }

  // Get user Default Setting

  componentWillMount() {
    this.getInitType();
  }

  getParameterByName =(name, url) => {
    if (!url) {
      url = window.location.href;
    }
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    var decoUrl = decodeURIComponent(results[2].replace(/\+/g, " "));
    return decoUrl;
  };


  async getInitType (decoUrl) {
    var resultToken = this.getParameterByName('token', decoUrl);
    console.log(resultToken);
    const resp = await fetch('https://briareus-qat.wemoscooter.com/api/invoice', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      mode: 'cors',

    });

    const { result, type } = await resp.json();
    console.log(result, type);

    this.setState({ selectedInvoiceType: type});
  }



  style =  {
    padding: 20,
    marginTop: 20,
  };

  fadeinStyle = {
    animationDelay: 0.7,
    opacity:1
  };

  render() {
    // if(this.state.position === true){
    //   return(
    //     <div>
    //     <Spinner spinnerName="three-bounce" style={{textAlign: 'center', marginTop: 50}}/>
    //     </div>
    //   )
    // } else {
    return (
      <MuiThemeProvider>

        <div style={ {...this.fadeinStyle, paddingLeft: 20, paddingRight: 20 } } className={indexStyle.fadeIn} >

          <h2 style={{textAlign: 'center' }}>發票設定</h2>
          {/*當isChangingInvoiceType等於false這件事是否為真？ => 不是，所以顯示 */}
          <h5 style={{display: this.state.isChangingInvoiceType ? 'none' : '' }}>您目前的選擇</h5>
          {/*當isChangingInvoiceType等於false這件事是否為真？ => 是，所以顯示 */}
          <h5 style={{display: this.state.isChangingInvoiceType ? '' : 'none' }}>請選擇您的發票方式</h5>

          {/*店家載具*/}
          <Card className={`${indexStyle.card} ${this.state.isChangingInvoiceType && (this.state.selectedInvoiceType == InvoiceType.Email) ? indexStyle.selectedCard : ''}`}
                onClick={this.changeInvoiceType.bind(this, InvoiceType.Email)}
                hidden={!(this.state.selectedInvoiceType == InvoiceType.Email) && !this.state.isChangingInvoiceType}
                style={this.state.isChangingInvoiceType ? {}:{ marginBottom: 0 }} >
            <CardTitle title="使用店家載具" style={{textAlign: 'center' }} titleColor="#9E9E9E"/>
            <CardText style={{ textAlign: 'center'}} color={'#9E9E9E'} >
              WeMo將使用您的EMAIL做為店家載具<br/>
              中獎會主動寄出紙本發票給您
            </CardText>
          </Card>

          {/*手機條碼*/}
          <Card className={`${indexStyle.card} ${this.state.isChangingInvoiceType && (this.state.selectedInvoiceType == InvoiceType.PhoneNumber) ? indexStyle.selectedCard : ''}`}
                expanded={this.state.selectedInvoiceType == InvoiceType.PhoneNumber }
                onClick={this.changeInvoiceType.bind(this, InvoiceType.PhoneNumber)}
                hidden={!(this.state.selectedInvoiceType == InvoiceType.PhoneNumber) && !this.state.isChangingInvoiceType}
                style={this.state.isChangingInvoiceType ? {}:{ marginBottom: 0 }}>
            <CardTitle title="手機條碼" style={{textAlign: 'center'}} actAsExpander={true} titleColor="#9E9E9E" />
            <CardText style={{ textAlign: 'center' }} actAsExpander={true} color={'#9E9E9E'} >
              將發票存入手機條碼當中
            </CardText>
            <TextField className={indexStyle.strechHeightAnimation}
                       style={ this.state.isChangingInvoiceType && this.state.selectedInvoiceType == InvoiceType.PhoneNumber ? { opacity: 1 } : { height: 0, opacity: 0 }}
                       hidden={!this.state.isChangingInvoiceType}
                       hintText="請輸入您的手機條碼"
                       errorText={this.state.phoneErrorText}
                       errorStyle={{color: '#FF8A65'}}
                       onChange={this.handleTextField.bind(this, 'phoneNumber')}
                       fullWidth={true}
            />
          </Card>

          {/*捐贈*/}
          <Card className={` ${indexStyle.card} ${ this.state.isChangingInvoiceType && (this.state.selectedInvoiceType == InvoiceType.Donate) ? indexStyle.selectedCard: ''}`}
                expanded={this.state.selectedInvoiceType == InvoiceType.Donate}
                onClick={ this.changeInvoiceType.bind(this, InvoiceType.Donate)}
                hidden={!(this.state.selectedInvoiceType == InvoiceType.Donate) && !this.state.isChangingInvoiceType}
                style={this.state.isChangingInvoiceType ? {}:{ marginBottom: 0 }} >
            <CardTitle title="捐贈" style={{textAlign: 'center'}} actAsExpander={true} titleColor="#9E9E9E" />
            <CardText style={{ textAlign: 'center' }} actAsExpander={true} color={'#9E9E9E'} >
              將發票捐贈
            </CardText>
            <TextField className={indexStyle.strechHeightAnimation}
                       style={ this.state.isChangingInvoiceType && this.state.selectedInvoiceType == InvoiceType.Donate ? { opacity: 1 } : { height: 0, opacity: 0 }}
                       hidden={!this.state.isChangingInvoiceType}
                       hintText="請輸入您的愛心碼(預設為陽光基金會)"
                       errorText={this.state.donateErrorText}
                       errorStyle={{color: '#FF8A65'}}
                       onChange={this.handleTextField.bind(this, 'donateCode')}
                       fullWidth={true} />
          </Card>

          {/*其他*/}
          <Card className={` ${indexStyle.card} ${this.state.isChangingInvoiceType && (this.state.selectedInvoiceType == InvoiceType.CitizenDigitalCertification) ? indexStyle.selected_grey: ''}`}
                expanded={this.state.selectedInvoiceType == InvoiceType.CitizenDigitalCertification}
                onClick={ this.changeInvoiceType.bind(this, InvoiceType.CitizenDigitalCertification)}
                hidden={!(this.state.selectedInvoiceType == InvoiceType.CitizenDigitalCertification) && !this.state.isChangingInvoiceType}
                style={this.state.isChangingInvoiceType ? {}:{ marginBottom: 0 }} >
            <CardTitle title="自然人憑證" style={{textAlign: 'center'}} actAsExpander={true} titleColor="#9E9E9E" />
            <CardText style={{ textAlign: 'center' }} actAsExpander={true} color={'#9E9E9E'} >
              將發票存入自然人憑證
            </CardText>
            <TextField className={indexStyle.strechHeightAnimation}
                       style={ this.state.isChangingInvoiceType && this.state.selectedInvoiceType == InvoiceType.CitizenDigitalCertification ? { opacity: 1 } : { height: 0, opacity: 0 }}
                       hidden={!this.state.isChangingInvoiceType}
                       hintText="請輸入您的自然人憑證"
                       errorText={this.state.citizenErrorText}
                       errorStyle={{color: '#FF8A65'}}
                       onChange={this.handleTextField.bind(this, 'citizenCode')}
                       fullWidth={true} />
          </Card>
          {/*當isChangingInvoiceType等於true的時候出現button，此為設button的相反狀態，而不是真的更改狀態*/}
          { !this.state.isChangingInvoiceType &&
          <RaisedButton className={indexStyle.RaisedButton_noRadius} label="更改發票方式" fullWidth={true} primary={true} onClick={this.startChangeInvoiceType.bind(this)} />
          }

          { this.state.isChangingInvoiceType &&
          <div>
            <div style={{position: 'relative', marginBottom: 10, padding: 0, display: this.state.isActive ? 'none' : ''}}>
              <h4 style={{color:'#9E9E9E', lineHeight: 1.5, textAlign:'left', fontSize: 15.5}}>
                為了響應環保，未得獎者本公司不提供紙本發票索取喔。請大家跟我們一起愛護這個地球 >_^
              </h4>
            </div>
            <div style={{...this.style}}></div>
            <div style={{position: 'fixed', bottom: 0, left: 0, width: '100%'}} >
              <RaisedButton label="取消"
                            className={indexStyle.RaisedButton_noRadius}
                            style={{width: '50%'}}
                            onClick={this.leavePage.bind(this)}
                            backgroundColor={'#B2DFDB'}
                            labelColor={'#FFFFFF'} />
              {/*{ this.state.selectedInvoiceType == InvoiceType.CitizenDigitalCertification ?*/}
              {/*<RaisedButton label="請洽客服" className={indexStyle.RaisedButton_noRadius}*/}
              {/*disabled={true}*/}
              {/*style={{width: '50%' }}*/}
              {/*labelColor={'#FFFFFF'} />*/}
              {/*:*/}
                <RaisedButton label="確認" type="submit"
                className={indexStyle.RaisedButton_noRadius}
                style={{width: '50%', display: this.state.clickState ? 'none':'inline-block'}}
                backgroundColor={'#81D4FA'}
                labelColor={'#FFFFFF'}
                onClick={this.submitForm}
                disabled={this.state.disable}/>
              {/*}*/}
            </div>
          </div>
          }
        </div>
      </MuiThemeProvider>
    )
  }
}
// }

reactDom.render(<App />, document.getElementById('app'));