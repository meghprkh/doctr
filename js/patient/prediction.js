var React = require("react");

var symptoms =["sneezing","sore throat","stuffy nose","body aches","running nose","muscle aches","itchy throat","mucus","cough","vomitting","diarrhea","shortness of breath","wheezing","chest tightness","hunger","fatigue","excessing urination","dry mouth","itchy skin","blurred vision","nausea","heavy breathing","abdominal pain","loss of appetite","low grade fever","dark urine","joint pain","yellowing of skin","high fever","chills","head ache","body ache","runny nose","repeated seizures","loss of consciousness","uncontrollable body movements","temporary confusion","light intolerance","noise intolerance","bad breath","fever","dizziness","dim vision","sensitivity to light","double vision in single eye","fading of colors","sweats","cough"];


var diseases = {
  "common cold":["sneezing","sore throat","stuffy nose","body aches","running nose","muscle aches","itchy throat","mucus"],
  "viral fever":["sore throat","cough","vomitting","diarrhea"],
  "asthma":["cough","shortness of breath","wheezing","chest tightness"],
  "diabetes":["extreme hunger","fatigue","excessing urination","dry mouth","itchy skin","blurred vision","nausea","heavy breathing"],
  "hepatitis":["fatigue","nausea","abdominal pain","loss of appetite","low grade fever"],
  "flu":["cough","high fever","chills","fatigue","nausea","head ache","body ache","stuffy nose"],
  "epilepsy":["repeated seizures","loss of consciousness","uncontrollable body movements","temporary confusion"],
  "migraine":["head ache","light intolerance","nausea","noise intolerance"],
  "sinus":["head ache","stuffy nose","bad breath","fever","dizziness"],
  "cataract":["blurred vision","dim vision","sensitivity to light","double vision in single eye","fading of colors"],
  "malaria":["fever","sweats","chills","fatigue","head ache","nausea"]
}

function predict(userSymptoms) {
  var newdiseases={};
  var toReturn=[];

  var max=0;
  for (var disease in diseases) {
    if (diseases.hasOwnProperty(disease)) {
      var count=0;
      for (var i=0;i<userSymptoms.length;i++) {
        if(diseases[disease].indexOf(userSymptoms[i])!==-1) count++;
      }
      if(count>max) max=count;
      newdiseases[disease]=count;
    }
  }

  for (var disease in newdiseases) {
    if (newdiseases.hasOwnProperty(disease)) {
      if(newdiseases[disease]===max) toReturn.push(disease);
    }
  }
  return toReturn;
}

var SymptomsCheck = React.createClass({
  getInitialState: function() {
    return {prediction:[]}
  },
  submit:function() {
    var array=[];
    var userSymptoms=document.getElementsByClassName("symptoms");
    for(var i=0;i<userSymptoms.length;i++) {
      if(userSymptoms[i].checked) array.push(userSymptoms[i].value);
    }
    this.setState({prediction:predict(array)});
  },
  render:function() {
    //console.log(this.state.prediction);

    var list=[];
    for(var i=0;i<symptoms.length;i+=3) {
      var row=[];
      row.push(<td><input type="checkbox" className="symptoms" value={symptoms[i]}/>&nbsp;{symptoms[i]}</td>);
      row.push(<td><input type="checkbox" className="symptoms" value={symptoms[i+1]}/>&nbsp;{symptoms[i+1]}</td>);
      row.push(<td><input type="checkbox" className="symptoms" value={symptoms[i+2]}/>&nbsp;{symptoms[i+2]}</td>);
      list.push((<tr>{row}</tr>));
    };
    var prediction=this.state.prediction.map(function(a){
      return (<li>{a}</li>)
    });
    return (
      <div style={{padding:"5px"}}>
      <div className="row">
        <div className="col-md-6">
          <table className="table">
          <tbody>
          {list}
          </tbody>
          </table>
        </div>
        <div className="col-md-1 text-center">
          <button className="btn btn-primary" onClick={this.submit}>Predict</button>
        </div>
        <div className="col-md-5">
          <h5>You probably have one of the following:</h5>
          <ul>
            {prediction}
          </ul>
        </div>
      </div>
      </div>);
  }
});

module.exports=SymptomsCheck;
