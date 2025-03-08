import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EmployeeDetail = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:3000/employee/detail/${id}`)
    .then(res => {
      setEmployee(res.data.result[0])
    })
    .catch(err => console.log(err))
  }, [id]);

  const handleLogout = () => {
    axios.get('http://localhost:3000/employee/logout')
    .then(res => {
      if (res.data.status) {
        localStorage.removeItem('valid');
        navigate('/')
      }
    })
    .catch(err => console.log(err))
  }

  return (
    <div>
      <div className='p-2 d-flex justify-content-center shadow'>
        <h4>Employee Management System</h4>
      </div>
      <div className='d-flex justify-content-center flex-column align-items-center mt-3'>
        <img src={`http://localhost:3000/Images/${employee.image}`} className="emp_det_image" />
        <div className='d-flex align-items-center flex-column mt-5'>
          <h3>Name: {employee.name}</h3>
          <h3>Email: {employee.email}</h3>
          <h3>Salary: ${employee.salary}</h3>
        </div>
        <div>
          <button className='btn btn-primary me-2'>Edit</button>
          <button className='btn btn-danger' onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </div>
  )
}

export default EmployeeDetail
