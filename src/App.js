import React, { useState, useEffect } from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import CreateStudent from "./components/create-student.component";
import EditStudent from "./components/edit-student.component";
import StudentList from "./components/student-list.component";
//import Home from "./components/home";

export default function App() {
const [students, setStudents] = useState({
  state: false
});

  useEffect(() => {
    axios
      .get("http://localhost:4000/students/")
      .then(res => {
        console.log(res.data);
          if(res.data.length!==0){
            setStudents({state:true});
        }else{
            setStudents({ state: false });
        }
      });
  }, []);
console.log("Estado: " + students.state);
  if(students.state){
      return (
        <Router>
          <div className="App">
            <header className="App-header">
              <Navbar bg="dark" variant="dark">
                <Container>
                  <Navbar.Brand>
                    <Link to={"/home"} className="nav-link">
                      React MERN Stack App
                    </Link>
                  </Navbar.Brand>

                  <Nav className="justify-content-end">
                    <Nav>
                      <Link to={"/home"} className="nav-link">
                        Home
                      </Link>
                    </Nav>

                    {/*<Nav>
                      <Link to={"/create-student"} className="nav-link">
                        Create Student
                      </Link>
                    </Nav>*/}

                    {/* <Nav>
                <Link to={"/edit-student/:id"} className="nav-link">
                  Edit Student
                </Link>
              </Nav> */}

                    <Nav>
                      <Link to={"/student-list"} className="nav-link">
                        Student List
                      </Link>
                    </Nav>
                  </Nav>
                </Container>
              </Navbar>
            </header>

            <Container>
              <Row>
                <Col md={12}>
                  <div className="wrapper">
                    <Switch>
                      <Route exact path="/" component={CreateStudent} />
                      <Route path="/create-student" component={CreateStudent} />
                      <Route path="/edit-student/:id" component={EditStudent} />
                      <Route path="/student-list" component={StudentList} />
                    </Switch>
                  </div>
                </Col>
              </Row>
            </Container>
          </div>
        </Router>
      );
  }else{
return (
  <Router>
    <div className="App">
      <header className="App-header">
        <Navbar bg="dark" variant="dark">
          <Container>
            <Navbar.Brand>
              <Link to={"/home"} className="nav-link">
                React MERN Stack App
              </Link>
            </Navbar.Brand>

            <Nav className="justify-content-end">
              <Nav>
                <Link to={"/home"} className="nav-link">
                  Home
                </Link>
              </Nav>

              <Nav>
                <Link to={"/create-student"} className="nav-link">
                  Create Student
                </Link>
              </Nav>

              {/* <Nav>
                <Link to={"/edit-student/:id"} className="nav-link">
                  Edit Student
                </Link>
              </Nav> */}

              {/*<Nav>
                <Link to={"/student-list"} className="nav-link">
                  Student List
                </Link>
              </Nav>*/}
            </Nav>
          </Container>
        </Navbar>
      </header>

      <Container>
        <Row>
          <Col md={12}>
            <div className="wrapper">
              <Switch>
                <Route exact path="/" component={CreateStudent} />
                <Route path="/create-student" component={CreateStudent} />
                <Route path="/edit-student/:id" component={EditStudent} />
                <Route path="/student-list" component={StudentList} />
              </Switch>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  </Router>
);
  }


}