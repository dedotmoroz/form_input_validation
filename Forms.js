import React from 'react';
import PersonForm from './PersonForm';
import './css/bootstrap.css';
import './css/forms.css';


const users = [
{
    famaly: 'Чехов',
    name: 'Антон',
    patronymic: 'Павлович',
    birthday: '21.12.1855'
},
{
    famaly: 'Глинка',
    name: 'Петр',
    patronymic: 'Михайлович',
    birthday: '21.12.1812'
}
]


class DealForm extends React.Component {

state = {
    person_form_visible: false,
    deal_type: 'goods',
    goods: '',
    goods_valid: '',
    goods_description: '',
    goods_description_valid: '',
    service: '',
    service_valid: '',
    service_description: '',
    service_description_valid: '',
    users: users
}

toggleType(event){
this.setState({deal_type: event.target.value});
}

showPersonForm(event){
event.preventDefault();
this.setState({person_form_visible: !this.state.person_form_visible});
}

getPersonFormDate(contentForm){
    const arrUsers = this.state.users.slice();
    arrUsers.unshift(contentForm);
    this.setState({users: arrUsers});
    this.setState({person_form_visible: !this.state.person_form_visible});
}

getListPersons(){
   return this.state.users.map(item => <option>{item.famaly} {item.name} {item.patronymic}</option>);
}

sentForm(event){
event.preventDefault();
if(!this.checkForm()) return;

const contentBigForm = {
    dealtype: event.target.dealtype.value,
    buyer: event.target.buyer.value,
    person: event.target.person.value,
    goods: this.state.goods,
    goods_description: this.state.goods_description,
    service: this.state.service,
    service_description: this.state.service_description
    }
    console.log('arr', contentBigForm);

    alert(
        "Тип сделки: " + contentBigForm.dealtype + "\n" +
        "Ваша роль в сделке: " + contentBigForm.buyer + "\n" +
        "Вы будете участвовать в сделке как: " + contentBigForm.person + "\n" +
        "Название товара " + contentBigForm.goods + "\n" +
        "Описание товара " + contentBigForm.goods_description + "\n"+
        "Название услуги " + contentBigForm.service + "\n" +
        "Описание услуги " + contentBigForm.service_description + "\n"
    )


}

checkForm(){
    let goods_valid = false, goods_description_valid = false, service_valid = false, service_description_valid = false;
    this.state.goods_valid === 'has-success' ? goods_valid = true : this.setState({goods_valid : 'has-error'});
    this.state.goods_description_valid === 'has-success' ? goods_description_valid = true : this.setState({goods_description_valid : 'has-error'});
    this.state.service_valid === 'has-success' ? service_valid = true : this.setState({service_valid : 'has-error'});
    this.state.service_description_valid === 'has-success' ? service_description_valid = true : this.setState({service_description_valid : 'has-error'});
  
    if (this.state.deal_type === 'goods'){
        if (goods_valid && goods_description_valid){ 
            return true;
        } else {
            return false;
        }
    } else {
        if (service_valid && service_description_valid){ 
            return true;
        } else {
            return false;
        }
    }
    }

fillState(event){
    const name = event.target.name;
    const value = event.target.value;
    this.setState({[name] : value});
}

checkFill(event){
    const name = event.target.name;
    const namevalid = event.target.name + '_valid';
    const value = event.target.value;
    const validate = (value.length >= 2) ? 'has-success' : 'has-error';
    this.setState({[namevalid] : validate, [name] : value});
}

checkFillWords(event){
    const name = event.target.name;
    const namevalid = event.target.name + '_valid';
    const value = event.target.value;
    const array = value.split(' ');
    const validate = (array.length >= 4) ? 'has-success' : 'has-error';
    this.setState({[namevalid] : validate, [name] : value});
}

render(){  
  return(
    <div className="container">
        <div className="row">
            <div className="col-md-6 col-md-offset-3">
                <form id="myform" onSubmit={this.sentForm.bind(this)}>

                    <div className="row">
                        <div className="col-md-12 form-group">
                            <strong>Тип сделки:</strong>
                        </div>
                        <div className="col-md-6 form-group ">
                            <label className="radio-inline">
                                <input type="radio" name="dealtype" id="radiogoods" defaultValue="goods" defaultChecked="true" onClick={this.toggleType.bind(this)} /> товар
                            </label>
                        </div>
                        <div className="col-md-6 form-group ">
                            <label className="radio-inline">
                                <input type="radio" name="dealtype" id="radioservice" defaultValue="service" onClick={this.toggleType.bind(this)} /> услуга
                            </label>
                        </div>
                    </div>

                    
                    <div className="row">
                        <div className="col-md-12 form-group">
                            <strong>Ваша роль в сделке:</strong>
                        </div>

                        {this.state.deal_type === "goods" ? (
                        <React.Fragment>
                        <div className="col-md-6 form-group">
                             <label className="radio-inline">
                                <input type="radio" name="buyer" id="radiobuyer" defaultValue="buyer" defaultChecked="true" /> покупатель
                            </label>
                        </div>                        
                        <div className="col-md-6 form-group">
                            <label className="radio-inline">
                                <input type="radio" name="buyer" id="radioseller" defaultValue="seller" /> продавец
                            </label>
                        </div>
                        </React.Fragment>
                        ) : (
                        <React.Fragment>
                            <div className="col-md-6 form-group">
                            <label className="radio-inline">
                                <input type="radio" name="buyer" id="radiobuyer" defaultValue="customer" /> заказчик
                            </label>
                        </div>
                        <div className="col-md-6 form-group">
                            <label className="radio-inline">
                                <input type="radio" name="buyer" id="radioseller" defaultValue="executor" /> исполнитель
                            </label>
                        </div>
                       </React.Fragment>
                        )}
                    </div>



                    <div className="row">
                        <div className="col-md-12 form-group">
                            <label className="headlabel" htmlFor="namelist">Вы будете участвовать в сделке как:</label>
                        </div>
                        <div className="col-md-12 form-group">
                            <select name="person" id="namelist" className="form-control">
                                {this.getListPersons()}
                            </select>
                        </div>
                        <div className="col-md-12 form-group">
                            <button className="btn btn-secondary btn-block btn-lg" onClick={this.showPersonForm.bind(this)}>Добавить физическое лицо</button>
                        </div>
                    </div>
        
      <div className="row">
                        {this.state.deal_type === "goods" ? (
                        <React.Fragment>
                            <div className={'col-md-12 form-group ' + this.state.goods_valid}>
                            <label className="headlabel" htmlFor="goods">Название товара</label>
                            <input key="goods" id="goods" name="goods" type="text" className="form-control" value={this.state.goods} onChange={this.fillState.bind(this)} onBlur={this.checkFill.bind(this)}/>
                            <span className="help-block">Введите название товара</span>
                            </div>
                            <div className={'col-md-12 form-group ' + this.state.goods_description_valid}>
                            <label className="headlabel" htmlFor="goods_description">Описание товара</label>
                            <input key="goods_description" id="goods_description" name="goods_description" type="text" className="form-control" value={this.state.goods_description} onChange={this.fillState.bind(this)} onBlur={this.checkFillWords.bind(this)}/>
                            <span className="help-block">Введите описание товара</span>
                            </div>
                            </React.Fragment>
                             ) : (
                            <React.Fragment>
                            <div className={'col-md-12 form-group ' + this.state.service_valid}>
                            <label className="headlabel" htmlFor="service">Название услуги</label>
                            <input key="service" id="service" name="service" type="text" className="form-control" value={this.state.service} onChange={this.fillState.bind(this)} onBlur={this.checkFill.bind(this)}/>                   
                            <span className="help-block">Введите название услуги</span>
                            </div>
                            <div className={'col-md-12 form-group ' + this.state.service_description_valid}>
                            <label className="headlabel" htmlFor="service_description">Описание услуги</label>
                            <input key="service_description" id="service_description" name="service_description" type="text" className="form-control" value={this.state.service_description} onChange={this.fillState.bind(this)} onBlur={this.checkFillWords.bind(this)}/>
                            <span className="help-block">Введите описание услуги</span>
                            </div>
                            </React.Fragment>
                          )}
                            <div className="col-md-12 form-group">
                             <button className="btn btn-success btn-block btn-lg">Отправить</button>
                            </div>
                </div>
                </form>

                <div>

</div> 


            </div>
        </div>

   
   {this.state.person_form_visible &&  
   <div className="personform">
   <div className="formcontainer">
   <div className="formclose" onClick={this.showPersonForm.bind(this)}>X</div>
   <PersonForm linkHandler={this.getPersonFormDate.bind(this)} />
   </div>
   </div>}
    </div>
   
  )
}
}


export default DealForm;