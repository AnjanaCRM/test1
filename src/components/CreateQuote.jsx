import axios from 'axios';
import React, { useEffect,useState } from 'react'
import './CreateQuote.css'
// Importing toastify module
import {toast} from 'react-toastify';
// Import toastify css file
import 'react-toastify/dist/ReactToastify.css';
toast.configure()
function CreateQuote(props)
{
  const [disable, setDisable] = React.useState(false);
  //const [CreateQuoteButton, setCls] = useState("green");

 useEffect(() => {
  if (sessionStorage.getItem("isQuoteCreated") ==='Yes') {
    setDisable(true)
  }
 }, []);

const[form,setForm]=useState(
    {AircraftType:'Jet',Price:0.00,ProviderNotes:'',NoStops:0,AddPassenger:0,traveldate:'',DurationHour:'',DurationMin:'',MedicalCrew:'',GroundTransport:false,RequestId:''}
    );
 const handleFormSubmit=(e)=>
 {
    e.preventDefault();
    let inputParams=[];
   // let reqId={'requestId':props.requestId};
    form.RequestId=props.requestId;
    form.SupplierId=props.SupplierId;
    form.SupplierContactId=props.SupplierContactId;
    //form.RequestId=props.supplierStatus;
    //form.RequestId=props.requestId;
    console.log('Form Submit' + JSON.stringify(form));
    inputParams.push(form);
    //inputParams=[...inputParams,reqId ];
    console.log('Final Data:' + JSON.stringify(inputParams));
    //let final=[...form,45];
    //console.log('final:' + final);
    const POST_URL='https://crmapay-developer-edition.na213.force.com/InteractPay/services/apexrest/MedviationAuthorization?methodType=POST&inputParams=' + JSON.stringify(inputParams);
   console.log('URL:' + POST_URL);
   setDisable(true)
  //  let element = document.getElementById('button')
  //  ReactDOM.findDOMNode(element).style.backgroundColor = this.state.isClicked?'black' : 'white'
//      Axios.post(POST_URL)
//      .then(res=>console.log('Posting Data:'+res))
//      .catch(err=>console.log('Error:' + err));
fetch(POST_URL, {
    method: "GET",
    headers: {
      mode: "cors",
      "Access-Control-Allow-Origin": "*",
    },
  })
  .then((response) => response.json())
  .then((response) => {
    let status=JSON.stringify(response);
    console.log(" status-->" + status);
// eslint-disable-next-line eqeqeq
if(status){

sessionStorage.setItem("isQuoteCreated","Yes"); 
    if(props.supplierStatus === 'Approved'){

      toast.success('Your Quote is submitted succesfully and will be present to the Client', { position: toast.POSITION.TOP_CENTER });
      console.log(" create  quote-->" + status);
    }else{
      toast.success('Your Quote is submitted successfully. But, it can not be presented to the Client. Please sign-up to Medviation Platform to present your Quotes to the Client', { position: toast.POSITION.TOP_CENTER });
    }
 } else {
      toast.success('Please enter all fields', { position: toast.POSITION.TOP_CENTER });
 }
 //   //   function() {
  //   //       this.setState({ position: 1 });
  //   //   }
  //   //   .bind(this),
  //   //   3000
  // );
  // window.location.href = 'https://medviation-developer-edition.na213.force.com';
  //}
  // const instance=Axios.create({baseUrl:''})
  //useEffect( ()=>
 // {
   // Axios.get('').then((response)=>
  //} )},[]);
// }else{
 // toast.success('Your Quote is submitted successfully. But, it can not be presented to the Client. Please sign-up to Medviation Platform to present your Quotes to the Client', { position: toast.POSITION.TOP_CENTER });
 //}
        // Calling toast method by passing string
       // toast('Qour Quote is submitted succesfully and will be present to the Client')
       // let navigate = useNavigate();
    //    Navigate(' https://medviation-developer-edition.na213.force.com/s/client-dashboard');
  })
  .catch((err) => {
  //  toast('Your Quote is submitted successfully. But, it can not be presented to the Client. Please sign-up to Medviation Platform to present your Quotes to the Client')
    toast.success('Your Quote is submitted successfully. But, it can not be presented to the Client. Please sign-up to Medviation Platform to present your Quotes to the Client', { position: toast.POSITION.TOP_CENTER });
    console.log("err" + err);
  });
}
 const onChange=(e)=>{
     const {value,name,type,checked}=e.target;
     setForm((state) =>({...state,[name]:type==='checkbox' ? checked :value}));
     form.ExpirationHour="36";
     
     //console.log('Final Data:' + JSON.stringify(inputParams));
 }
  return (
    <div className="CreateQuote">
    <form onSubmit={handleFormSubmit}>
    <label>
        Price
        <input disabled={disable} type="number" name="Price" onChange={onChange} value={form.Price} min="0"  />
    </label>
    <label >Travel Date :
        <input disabled={disable} type="datetime-local" name="traveldate" onChange={onChange} value={form.traveldate} />
    </label>
    <label> Duration(hours)
        <select disabled={disable} name="DurationHour" onChange={onChange} value={form.DurationHour}>
            <option>0</option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
            <option>6</option>
            <option>7</option>
            <option>8</option>
            <option>9</option>
            <option>10</option>
            <option>11</option>
            <option>12</option>
            <option>13</option>
            <option>14</option>
            <option>15</option>
            <option>16</option>
            <option>17</option>
            <option>18</option>
            <option>19</option>
            <option>20</option>
            <option>21</option>
            <option>22</option>
            <option>23</option>
        </select>
    </label>
    <br/>
    <label> Duration(minutes)
       <input disabled={disable} type="text" name="durationmin" onChange={onChange} value={form.durationmin} min="0" ></input>
    </label>
    <label> No of Stops
        <br/>
        <input disabled={disable} type="radio" name="NoStops" value="1" onChange={onChange} />&nbsp;1 Stops &nbsp;&nbsp;
        <input disabled={disable} type="radio" name="NoStops" value="2" onChange={onChange} />&nbsp;2 Stops&nbsp;&nbsp;
        <input disabled={disable} type="radio" name="NoStops" value="3" onChange={onChange} />&nbsp;3+ Stops&nbsp;&nbsp;
    </label>
    <br/><br/>
    <label> Aircraft Type
        <br/>
        <div>
          <input disabled={disable} type="radio" name="AircraftType" value="Jet" onChange={onChange} />Jet &nbsp;&nbsp;
          <input disabled={disable} type="radio" name="AircraftType" value="Turbo Prop" onChange={onChange} />Turbo&nbsp;&nbsp;
          <input disabled={disable} type="radio" name="AircraftType" value="Rotor" onChange={onChange} />Prop
        </div>
    </label>
    <br/>
    <label> Expiration(hours)
    <br/>
       <input disabled={disable} type="radio" name="12" value="ExpirationHour" onChange={onChange} />&nbsp;12&nbsp;&nbsp;
        <input disabled={disable} type="radio" name="ExpirationHour" value="24" onChange={onChange} />&nbsp;24&nbsp;&nbsp;
        <input disabled={disable} type="radio" defaultChecked   name="ExpirationHour" value="36" onChange={onChange} />&nbsp;36&nbsp;&nbsp;
        <input disabled={disable} type="radio" name="ExpirationHour" value="48" onChange={onChange} />&nbsp;48&nbsp;&nbsp;
        <input disabled={disable} type="radio" name="ExpirationHour" value="60" onChange={onChange} />&nbsp;60&nbsp;&nbsp;
        <input disabled={disable} type="radio" name="ExpirationHour" value="72" onChange={onChange} />&nbsp;72&nbsp;&nbsp;
        <input disabled={disable} type="radio" name="ExpirationHour" value="84" onChange={onChange} />&nbsp;84&nbsp;&nbsp;
        <input disabled={disable} type="radio" name="ExpirationHour" value="96" onChange={onChange} />&nbsp;96&nbsp;&nbsp;
        <br/>
    {/* <select name="ExpirationHour" onChange={onChange} defaultValue="36" value={form.ExpirationHour}>
           <option>12</option>
           <option>36</option>
            <option>24</option>
            <option>48</option>
            <option>60</option>
            <option>72</option>
            <option>84</option>
            <option>96</option>
        </select> */}
        </label>
    <br/>
    <label> Additional Passenger
        <br/>
          <input disabled={disable} type="radio" name="AddPassenger" value="0" onChange={onChange} />&nbsp;No Additional Passengers &nbsp;&nbsp;
          <input disabled={disable} type="radio" name="AddPassenger" value="1" onChange={onChange} />&nbsp;1 Additional Passenger&nbsp;&nbsp;
    </label>
  <br/><br/>
   <label> Ground Transport
        <input disabled={disable} type="checkbox" name="GroundTransport" onChange={onChange} value={form.GroundTransport}></input>
    </label>
    <br></br>
    <label> Medical Staff
    <div>
          <input disabled={disable} type="radio" name="MedicalCrew" value="RN_RN" onChange={onChange} />&nbsp;RN & RN &nbsp;
          <input disabled={disable} type="radio" name="MedicalCrew" value="RN_RT" onChange={onChange} />&nbsp;RN & RT&nbsp;
          <input disabled={disable} type="radio" name="MedicalCrew" value="RN_Physician" onChange={onChange} />&nbsp;RN & Physician&nbsp;
          <input disabled={disable} type="radio" name="MedicalCrew" value="RN_Paramedic" onChange={onChange} />&nbsp;RN & Paramedic&nbsp;
        </div>
    </label>
    <br/>
    <label> Provider Notes
        <textarea name="ProviderNotes" onChange={onChange} disabled={disable} value={form.ProviderNotes}></textarea>
    </label>
    <br></br>
    <div>
    <button className="CreateQuoteButton" disabled={disable}>Create Quote</button>
    </div>
    </form>
    </div>
  )
}
export default CreateQuote