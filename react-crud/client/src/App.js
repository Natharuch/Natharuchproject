import Axios from "axios"
import { useState } from 'react'

function App() {

  const [fname,setFname] = useState("");
  const [age,setAge] = useState(0);
  const [country,setCountry] = useState("");
  const [position,setPosition] = useState("");
  const [wage,setWage] = useState(0);
  const [newWage,setNewWage] = useState(0);


  const[employeeList, setEmployeeList]= useState([]);

  const getEmployees = () => {
    Axios.get('http://localhost:3001/employees').then((response)=> {
      setEmployeeList(response.data);
    });
    }
 
    const addEmployee = () => {
      Axios.post (`http://localhost:3001/create`, {
        fname : fname,
        age : age,
        country : country,
        position : position ,
        wage : wage 
      }).then (() => {
        setEmployeeList([
          ...employeeList,
          {
            fname:fname,
            age:age,
            country: country,
            position : position,
            wage : wage  
          }  
        ])
      })
    }
 
    const updateEmployeeWage = (id) => {
      Axios.put('http://localhost:3001/update/:id', {wage:newWage,id:id}).then((respose) =>{
        setEmployeeList(
          employeeList.map((val=> {
            return val.id === id ? {
              id : val.id,
              fname:val.fname,
              country:val.country,
              age:val.age,
              position:val.position,
              wage:newWage
            } : val;
          })
          )
        )
      })
    }

    // const deleteEmployee = id => {
    //   // <-- declare id parameter
    //   Axios.delete(`http://localhost:3001/delete/${id}`) // <-- remove ;
    //     .then(() => {
    //       // Issue GET request after item deleted to get updated list
    //       // that excludes note of id
    //       this.getEmployees()
    //     })
    //     .then(res => {
    //       const allNotes = res.data;
    //       this.setEmployeeList({ allNotes });
    //     })
    //     .catch(err => {
    //       console.error(err);
    //     });
    // };

    const deleteEmployee =(id)=> {
      Axios.delete(`http://localhost:3001/delete/${id}`).then((response) => {
        setEmployeeList(
          employeeList.filter((val)=> {
            return val.id !== id  ;  
          }) 
        );
      });
    } ; 
  
  return ( 
    <div className="App container">   
      <h1>Employee Information</h1>
      <div className="information">
        <form action=""> 
          <div className="mb-3">
            <label htmlFor="fname" className="form-label">
              Fname:
            </label>
            <input
              type="text"
              className="form-control"
              placehoder="Enter fname"
              onChange={(event)=> {
                setFname(event.target.value)
              }}
            /> 
          </div>
          <div className="mb-3">
            <label htmlFor="age" className="form-label">
              Age:
            </label>
            <input
              type="number"
              className="form-control"
              placehoder="Enter age"
              onChange={(event)=> {
                setAge(event.target.value)
              }}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="country" className="form-label">
              Country:
            </label>
            <input
              type="text"
              className="form-control"
              placehoder="Enter country"
              onChange={(event)=> {
                setCountry(event.target.value)
              }}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="position" className="form-label">
              Position:
            </label>
            <input
              type="text"
              className="form-control"
              placehoder="Enter position"
              onChange={(event)=> {
                setPosition(event.target.value)
              }}
            /> 
          </div>
          <div className="mb-3">
            <label htmlFor="wage" className="form-label">
              Wage:
            </label>
            <input
              type="namber"
              className="form-control"
              placehoder="Enter wage"
              onChange={(event)=> {
                setWage(event.target.value)
              }}
            />
          </div>
          <button className="btn btn-success" onClick={addEmployee}>Add Employee</button>
        </form>
      </div> 
      <hr/>
      <div className="employee">
        <button className="btn btn-primary" onClick={getEmployees}>Show employee</button>  
        <br/><br/>
        {employeeList.map((val,key) => {
          return(
            <div className="employee card">
             <div className="card-body txt-left"> 
              <p className="card-text">Fname:{val.fname}</p>
              <p className="card-text">Age:{val.age}</p>
              <p className="card-text">Country:{val.country}</p>
              <p className="card-text">Position:{val.position}</p>
              <p className="card-text">Wage:{val.wage}</p>
              <div className = "d-flex">
                <input type="text"
                 
                  style={{width:"300px"}}
                  placeholder="15000..."
                  className="form-control"
                  onChange={(event) => {
                    setNewWage(event.target.value)
                  }}
                  />
                  <button className="btn btn-warning" onClick={()=>{updateEmployeeWage(val.id)}}>Update </button> 
                  
                  <button className="btn btn-danger" onClick={()=>{deleteEmployee(val.id)}}>Delete</button>
          
              </div>
             </div>
            </div>
          )
        })}
      </div>
    </div>
  );
}

export default App ; 