import React, { useState, useEffect } from "react";
import axios from "axios";
import MaterialTable from "material-table";
//import useYup from "@usereact/use-yup";

/*const validationSchema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().required(),
})*/

export default function StudentList() {
  const [columns] = useState({
    data: [
      { title: "Name", field: "name" },
      { title: "E-mail", field: "email", type: "mail" },
      { title: "Roll-Nº", field: "rollno", type: "numeric" }
    ]
  });

  const [student, setStudent] = useState({
    data: []
  });

  /*const { errors, validate } = useYup(values, validationSchema, {
    validateOnChange: true
  })
  console.log('errors: ', errors)*/

  useEffect(() => {
    axios
      .get("http://localhost:4000/students/")
      .then(res => {
        setStudent(res);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <MaterialTable
        title="Table Example"
        columns={columns.data}
        data={student.data}
        {...console.log("")}
        editable={{
          onRowAdd: newData =>
            new Promise(resolve => {
              setTimeout(() => {
                resolve();
                setStudent(prevState => {
                  const data = [...prevState.data];
                  axios
                    .post("http://localhost:4000/students/create-student", {
                      name: newData.name,
                      email: newData.email,
                      rollno: parseInt(newData.rollno)
                    })
                    .then(res => {
                      console.log(res.data);
                    })
                    .catch(error => {
                      console.log(error);
                    });
                  data.push(newData);
                  return { ...prevState, data };
                });
              }, 600);
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise(resolve => {
              setTimeout(() => {
                resolve();
                if (oldData) {
                  setStudent(prevState => {
                    const data = [...prevState.data];
                    axios
                      .put(
                        "http://localhost:4000/students/update-student/" +
                          oldData._id,
                        {
                          name: newData.name,
                          email: newData.email,
                          rollno: parseInt(newData.rollno)
                        }
                      )
                      .then(res => {
                        console.log(res.data);
                      })
                      .catch(error => {
                        console.log(error);
                      });
                    data[data.indexOf(oldData)] = newData;
                    return { ...prevState, data };
                  });
                }
              }, 600);
            }),
          onRowDelete: oldData =>
            new Promise(resolve => {
              setTimeout(() => {
                resolve();
                setStudent(prevState => {
                  const data = [...prevState.data];
                  axios
                    .delete(
                      "http://localhost:4000/students/delete-student/" +
                        oldData._id
                    )
                    .then(res => {
                      console.log(res.data);
                    })
                    .catch(error => {
                      console.log(error);
                    });
                  data.splice(data.indexOf(oldData), 1);
                  return { ...prevState, data };
                });
              }, 600);
            })
        }}
      />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
      ></link>
    </div>
  );
}
