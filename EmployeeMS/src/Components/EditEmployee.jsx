import React , { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const EditEmployee = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState({
    name: '',
    email: '',
    salary: '',
    address: '',
    category_id: ''
  });

  const [category, setCategory] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:3000/auth/category')
    .then(res => {
      if (res.data.status) {
        setCategory(res.data.result);
      } else {
        alert(res.data.Error)
      }
    }).catch(err => console.log(err))

    axios.get(`http://localhost:3000/auth/employee/${id}`)
    .then(res => {
      setEmployee({
        ...employee,
        name: res.data.result[0].name,
        email: res.data.result[0].email,
        salary: res.data.result[0].salary,
        address: res.data.result[0].address,
        category_id: res.data.result[0].category_id
      });
    }).catch(err => console.log(err))
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.put(`http://localhost:3000/auth/edit_employee/${id}`, employee)
    .then(res => {
      console.log(employee);
      if (res.data.status) {
        navigate('/dashboard/employee');
      } else {
        alert(res.data.Error)
      }
    }).catch(err => console.log(err))
  }

  return (
    <div className="d-flex justify-content-center align-items-center mt-3">
      <div className="p-3 rounded w-50 border">
        <h3 className="text-center">Edit Employee</h3>
        <form className="row g-1" onSubmit={handleSubmit}>
          <div className="col-12">
            <label for="inputName" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputName"
              placeholder="Enter Name"
              value={employee.name}
              onChange={(e) => setEmployee({ ...employee, name: e.target.value })}
            />
          </div>
          <div className="col-12">
            <label for="inputEmail4" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control rounded-0"
              id="inputEmail4"
              placeholder="Enter Email"
              autoComplete="off"
              value={employee.email}
              onChange={(e) => setEmployee({ ...employee, email: e.target.value })}
            />
          </div>
          <div className="col-12">
            <label for="inputSalary" className="form-label">
              Salary
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputSalary"
              placeholder="Enter Salary"
              autoComplete="off"
              value={employee.salary}
              onChange={(e) => setEmployee({ ...employee, salary: e.target.value })}
            />
          </div>
          <div className="col-12">
            <label for="inputAddress" className="form-label">
              Address
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputAddress"
              placeholder="1234 Main St"
              autoComplete="off"
              value={employee.address}
              onChange={(e) => setEmployee({ ...employee, address: e.target.value })}
            />
          </div>
          <div className="col-12">
            <label for="category_id" className="form-label">
              Category
            </label>
            <select name="category_id" id="category_id" className='form-select'
              onChange={(e) => setEmployee({ ...employee, category_id: e.target.value })}
            >
              {category.map((c) => (
                <option value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>
          <div className="col-12">
            <button type="submit" className="btn btn-primary w-100">
              Edit Employee
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditEmployee
