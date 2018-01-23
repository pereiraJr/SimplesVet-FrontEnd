const divStyle = {
  color: 'blue',
  marginRight: 'auto'
};

var TodosAnimais = React.createClass({

  getInitialState: function () {
    return { nome: '' ,raca: '',peso:'',id:'',Buttontxt:'Save', data1: []};
  },
   handleChange: function(e) {
        this.setState({[e.target.name]: e.target.value});
    },

  componentDidMount() {

    $.ajax({
       url: "http://localhost/slimApi/animais",
       type: "GET",
       dataType: 'json',
       ContentType: 'application/json',
       success: function(data) {
         this.setState({data1: data});
         console.log(data);
       }.bind(this),
       error: function(jqXHR) {
         console.log(jqXHR);

       }.bind(this)
    });
  },

DeleteData(id){
    $.ajax({
      url: "http://localhost/slimApi/animais/"+id,
      dataType: 'json',
      type: 'DELETE',
      success: function(data) {
        alert(data.status);

         this.componentDidMount();

      }.bind(this),
      error: function(xhr, status, err) {
         alert(err);


      }.bind(this),
      });
    },

    EditData(item){
   this.setState({nome: item.nome,raca:item.raca,peso:item.peso,id:item.id,Buttontxt:'Update'});
     },

   handleClick: function() {

   var Url="";
   if(this.state.Buttontxt=="Save"){
      Url="http://localhost/slimApi/animais";
       }
      else{
      Url="http://localhost/slimApi/animais/"+this.state.id;
      }
      var animalData = {
        'nome': this.state.nome,
        'raca':this.state.raca,
        'peso':this.state.peso,
        'id':this.state.id,

    }
    $.ajax({
      url: Url,
      dataType: 'json',
      type: 'POST',
      data: animalData,
      success: function(data) {
          alert(data.status);
          this.setState(this.getInitialState());
          this.componentDidMount();

      }.bind(this),
      error: function(xhr, status, err) {
         alert(err);
      }.bind(this)
    });
  },

  render: function() {
    return (
    <div  className="container"  style={{marginTop:'50px'}}>
    <p className="text-center" style={{fontSize:'25px'}}><b> Seja Bem vindo a SimplesVet</b></p>
     <form>
        <div className="col-sm-12 col-md-12"  style={{marginLeft:'400px'}}>
           <table className="table-bordered">
              <tbody>
                 <tr>
                    <td><b>Nome</b></td>
                    <td>
                       <input className="form-control" type="text" value={this.state.nome}    name="nome" onChange={ this.handleChange } />
                       <input type="hidden" value={this.state.id}    name="id"  />
                    </td>
                 </tr>
                 <tr>
                    <td><b>Raca</b></td>
                    <td>
                       <input type="text" className="form-control" value={this.state.raca}  name="raca" onChange={ this.handleChange } />
                    </td>
                 </tr>
                 <tr>
                    <td><b>Peso</b></td>
                    <td>
                       <input type="text"  className="form-control" value={this.state.peso}  name="peso" onChange={ this.handleChange } />
                    </td>
                 </tr>
                 <tr>
                    <td></td>
                    <td>
                       <input className="btn btn-primary" type="button" value={this.state.Buttontxt} onClick={this.handleClick} />
                    </td>
                 </tr>
              </tbody>
           </table>
        </div>
        <div className="col-sm-12 col-md-12 "  style={{marginTop:'50px',marginLeft:'300px'}} >
           <table className="table-bordered" style={divStyle}>
              <tbody>
                 <tr>
                    <th><b>Id</b></th>
                    <th><b>Nome</b></th>
                    <th><b>Raca</b></th>
                    <th><b>Peso</b></th>
                    <th><b>Edit</b></th>
                    <th><b>Delete</b></th>
                 </tr>
                 {this.state.data1.map((item, index) => (
                 <tr key={index}>
                    <td>{item.id}</td>
                    <td>{item.nome}</td>
                    <td>{item.raca}</td>
                    <td>{item.peso}</td>
                    <td>
                       <button type="button" className="btn btn-success" onClick={(e) => {this.EditData(item)}}>Edit</button>
                    </td>
                    <td>
                       <button type="button" className="btn btn-info" onClick={(e) => {this.DeleteData(item.id)}}>Delete</button>
                    </td>
                 </tr>
                 ))}
              </tbody>
           </table>
        </div>
     </form>
   </div>
    );
  }
});

ReactDOM.render(<TodosAnimais  />, document.getElementById('root'))
