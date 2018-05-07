import React from 'react';
import './css/bootstrap.css';
import './css/forms.css';
const URL = '/index.html'

export default class PersonForm extends React.Component {
    static defaultProps = {
      linkHandler: ''
    }

    state={
        name: '', 
        name_valid: '',
        famaly: '',
        famaly_valid: '',  
        patronymic: '',  
        patronymic_valid: '',  
        calendar: '',
        calendar_valid: ''
    }

sentForm(event){
event.preventDefault(); 
if(!this.checkForm()) return;
const contentForm = {
famaly: this.state.famaly,
name: this.state.name,
patronymic: this.state.patronymic,
birthday: this.state.calendar
}

if (this.props.linkHandler){
    this.props.linkHandler(contentForm);
} else {
    const headers = new Headers({'Content-Type': 'application/json'});
    const init = {method: 'post', headers: headers, body: JSON.stringify(contentForm)};
    fetch(URL, init);
    alert(
        "Фамилия: " + contentForm.famaly + "\n" +
        "Имя: " + contentForm.name + "\n" +
        "Отчество: " + contentForm.patronymic + "\n" +
        "Дата рождения " + contentForm.birthday + "\n"
    )
}
}

checkForm(){
let name_valid = false, famaly_valid = false, patronymic_valid = false, calendar_valid = false;
this.state.name_valid === 'has-success' ? name_valid = true : this.setState({name_valid : 'has-error'});
this.state.famaly_valid === 'has-success' ? famaly_valid = true : this.setState({famaly_valid : 'has-error'});
this.state.patronymic_valid === 'has-success' ? patronymic_valid = true : this.setState({patronymic_valid : 'has-error'});
this.state.calendar_valid === 'has-success' ? calendar_valid = true : this.setState({calendar_valid : 'has-error'});
if (name_valid && famaly_valid && patronymic_valid && calendar_valid){ 
    return true;
} else {
    return false;
}
}

checkFill(event){
    const namevalid = event.target.name + '_valid';
    const value = event.target.value;
    const validate = (value.length >= 3) ? 'has-success' : 'has-error';
    this.setState({[namevalid] : validate});
}

upFirstLetter(event){
    const name = event.target.name;
    const value = event.target.value;
    const firstLetter = value && value[0].toUpperCase();
    const restString = value.substring(1);
    const fullString = firstLetter + restString;
    this.setState({[name] : fullString});
}

checkCalendar(event){
    const pureString = event.target.value.replace(/\./g, '');
    const date_1 = pureString[0];
    const date_2 = pureString[1]; 
    const date_3 = pureString[2];
    const date_4 = pureString[3];
    const date_5 = pureString[4];
    const date_6 = pureString[5];
    const date_7 = pureString[6];
    const date_8 = pureString[7];
    const out_1 = ['0','1','2','3'].some(item => item === date_1) ? date_1 : '';
    const out_2 = ['0','1','2','3','4','5','6','7','8','9'].some(item => item === date_2) ? date_2 : '';
    const out_3 = ['0','1'].some(item => item === date_3) ? date_3 : '';
    const out_4 = ['0','1','2','3','4','5','6','7','8','9'].some(item => item === date_4) ? date_4 : '';
    const out_5 = ['1','2'].some(item => item === date_5) ? date_5 : '';
    const out_6 = ['0','9'].some(item => item === date_6) ? date_6 : '';
    const out_7 = ['0','1','2','3','4','5','6','7','8','9'].some(item => item === date_7) ? date_7 : '';
    const out_8 = ['0','1','2','3','4','5','6','7','8','9'].some(item => item === date_8) ? date_8 : '';
    let dot_1 = '', dot_2 = '';
    if (out_3){ dot_1 = '.'};
    if (out_5){ dot_2 = '.'};
    const out = out_1 + out_2  + dot_1 + out_3 + out_4 + dot_2 + out_5 + out_6 + out_7 + out_8;
    const validate = (out_8) ? 'has-success' : 'has-error';
    this.setState({calendar: out, calendar_valid : validate}, () => this.checkForm());
}

render(){
  return(
  <div className="row bg-warning">
  <form name="person" id="person" onSubmit={this.sentForm.bind(this)}>
  <div className={'col-md-12 form-group ' + this.state.name_valid}>
      <label htmlFor="name">Имя</label>
      <input type="text" name="name" id="name" className="form-control" value={this.state.name} onChange={this.upFirstLetter.bind(this)} onBlur={this.checkFill.bind(this)}/>
      <span className='help-block'>Введите имя</span>
  </div>
  <div className={'col-md-12 form-group ' + this.state.famaly_valid}>
      <label htmlFor="famaly">Фамилия</label>
      <input type="text" name="famaly" id="famaly" className="form-control" value={this.state.famaly} onChange={this.upFirstLetter.bind(this)} onBlur={this.checkFill.bind(this)}/>
      <span className='help-block'>Введите фамилию</span>
  </div>
  <div className={'col-md-12 form-group ' + this.state.patronymic_valid}>
      <label htmlFor="patronymic">Отчество</label>
      <input id="patronymic" name="patronymic" type="text" className="form-control" value={this.state.patronymic} onChange={this.upFirstLetter.bind(this)} onBlur={this.checkFill.bind(this)}/>
      <span className='help-block'>Введите отчество</span>
  </div>
  <div className={'col-md-12 form-group ' + this.state.calendar_valid}>
      <label htmlFor="birthday">Дата рождения</label>
      <input id="birthday" name="birthday" type="text" className="form-control" placeholder="дд.мм.гггг" value={this.state.calendar} onChange={this.checkCalendar.bind(this)}/>
  </div>
  <div className="col-md-12 form-group">
      <button className="btn btn-info btn-block btn-lg">Добавить</button>
  </div>
  </form>
</div>
  )
  }
}

