import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Table,
  Button,
  Badge,
  Card,
  Accordion,
  OverlayTrigger,
  Tooltip
} from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

function Admin() {
  const dateBuilder = (d) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    let days = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  };
  useEffect(() => {
    axios.get(`http://localhost:8000/info`).then((res) => {
      console.log(res.data);
      setAllData(res.data);
    });
  }, []);

  const [allData, setAllData] = useState([]);

  const deleteItem = (id) => {   
    // console.log(id)
   axios.delete(`http://localhost:8000/info/${id}`, id)
    //  window.location.reload();
          // setAllData(allData);
     
      // setAllData(deleteData);
   
  };

  const [search, setSearch] = useState("");
  const [order, setOrder] = useState("asc");
  const sorting = (col) => {
    if (order === "asc") {
      const sorted = [...allData].sort((a, b) =>
        a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
      );

      setAllData(sorted);
      setOrder("dsc");
    } else if (order === "dsc") {
      const sorted = [...allData].sort((a, b) =>
        a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1
      );

      setAllData(sorted);
      setOrder("asc");
    }
  };

  const onReload = () => {
    window.location.reload();
  };
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //  const [filterdata, setFilterdata] = useState(allData);
  const filterResult = (sat) => {
    const result = allData.filter((i) => {
      return i.status === sat;
    });

    setAllData(result);
  };

  //  let valOne = localStorage.getItem("id");
  //  var val = alldata.filter((i) => i.userId === valOne);
  //  console.log("val ===> ", val);
  return (
    <>
      <Row className="back">
        <div
          className="col-sm-10"
          style={{
            marginTop: "20px",
            marginBottom: "10px",
            marginLeft: "20px",
            marginRight: "-20px",
            width: "1100px",
          }}
        >
          <div className=" rounded" style={{ margin: "12px" }}>
            <p className=" date text"> {dateBuilder(new Date())}</p>
            <Row>
              {allData
                .filter((e) => {
                  if (search === "") {
                    return e;
                  } else if (
                    e.title.toLowerCase().includes(search.toLowerCase())
                  ) {
                    return e;
                  }
                })

                .map((i) => {
                  return (
                    <div class="col-3">
                      <Card
                        className="p-3 mb-5 bg-white"
                        style={{
                          borderRadius: "30px 0px 30px 0px ",
                          opacity: "0.9  ",
                        }}
                        key={i.title}
                      >
                      
                        <Card.Body>
                          <h5
                            style={{
                              marginRight: "20px",
                              paddingBottom: "10px",
                              color: "gray",
                            }}
                          >
                            {i.userName} posted an issue at {i.time}
                           
                            <OverlayTrigger
                                key="top"
                                placement="top"
                                overlay={
                                  <Tooltip id={`tooltip-$top`}>
                                      Delete issue
                                  </Tooltip>
                                }
                              >
                          <p  style={{marginLeft:"210px", opacity:"0.5", marginTop:"-25px"}} onClick={() => deleteItem(i.id)}>X</p>
                               
                              </OverlayTrigger>


                          </h5>

                          <Card.Title> {i.title} </Card.Title>
                          {/* <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle> */}
                          <Accordion>
                            <Accordion.Item eventKey="0">
                              <Accordion.Header>
                                Read Full Description
                              </Accordion.Header>
                              <Accordion.Body>
                                <Card.Text
                                  style={{
                                    maxHeight: "200px",
                                    overflow: "scroll",
                                  }}
                                >
                                  {i.media.substring(
                                    i.media.length - 4,
                                    i.media.length
                                  ) === "jpeg" ||
                                  i.media.substring(
                                    i.media.length - 3,
                                    i.media.length
                                  ) === "jpg" ||
                                  i.media.substring(
                                    i.media.length - 3,
                                    i.media.length
                                  ) === "png" ? (
                                    <img
                                      style={{
                                        width: "200px",
                                        height: "100px",
                                      }}
                                      src={require(`./assets/${i.media}`)}
                                      alt="thump"
                                    />
                                  ) : (
                                    <iframe
                                      style={{
                                        width: "200px",
                                        height: "100px",
                                      }}
                                      src={require(`./assets/${i.media}`)}
                                      title="hello"
                                    ></iframe>
                                  )}

                                  <div
                                    dangerouslySetInnerHTML={{
                                      __html: i.describe,
                                    }}
                                  />
                                </Card.Text>
                              </Accordion.Body>
                            </Accordion.Item>
                          </Accordion>
                          <Card.Text style={{ margin: "10px" }}>
                            {" "}
                            {i.status === "solved" ? (
                              <Badge bg="success "> {i.status} </Badge>
                            ) : null}
                            {i.status === "notsolved" ? (
                              <Badge bg="danger "> {i.status} </Badge>
                            ) : null}
                            {i.status === "inreview" ? (
                              <Badge bg="warning "> {i.status} </Badge>
                            ) : null}
                          </Card.Text>
                        </Card.Body>
                      </Card>
                    </div>
                  );
                })}
            </Row>
          </div>
        </div>
        <div
          className="col-sm-2  fixedContainer"
          style={{
            // backgroundColor: "white",
            borderRadius: "50px 0px 0px 50px",
            background: "rgba(2, 3, 0, 0.4)",
            // opacity: "0.7",
            paddingRight: "20px",
            paddingLeft: "-20px",
            // height: "800px",s
            marginTop: "100px ",
          }}
        >
          <text
            style={{
              fontSize: "30px",
              opacity: "1",
              color: "white",
              // backgroundColor: "rgba(255, 255, 255, 0.5)",
            }}
          >
            <img
              className=" img-circle1 "
              src="https://bootdey.com/img/Content/avatar/avatar7.png"
              alt=""
              style={{ margin: "10px" }}
            />
            &nbsp;
            {localStorage.getItem("username")}
          </text>

          <div>
            <Form.Group
              style={{
                borderRadius: "20px",
                backgroundColor: "white",
                opacity: "0.8",
                marginTop: "0px",
                marginLeft: "15px",
                padding: "10px",
              }}
            >
              {/* <h4>&nbsp; &nbsp; Filter data</h4>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; */}

              <div className="form-outline  ">
                <h4 style={{ padding: "5px" }}>Filter By</h4>
                <input
                  style={{
                    borderRadius: "20px",
                    paddingLeft: "20px",
                    paddingTop: "5px",
                    backgroundColor: " lightgray",
                    marginBottom: "10px",
                  }}
                  id="search-input"
                  type="search"
                  className="form-control search "
                  placeholder="Search"
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                />
              </div>
              <Form.Check
                className="form-check-inline text-primary text"
                type="radio"
                value="A-Z"
                label="A-Z"
                name="sort"
                onClick={() => sorting("title")}
              ></Form.Check>

              <Form.Check
                className="form-check-inline  text-primary text "
                type="radio"
                value="Z-A"
                name="sort"
                label="Z-A"
                onClick={() => sorting("title")}
              />

              <Form.Check
                className="form-check-inline text-primary text"
                type="radio"
                value="notsolved"
                label="Not Solved"
                name="sort"
                onClick={() => filterResult("notsolved")}
              ></Form.Check>

              <Form.Check
                className="form-check-inline  text-primary text "
                type="radio"
                value="inreview"
                name="sort"
                label="In Review"
                onClick={() => filterResult("inreview")}
              />
              <Form.Check
                className="form-check-inline  text-primary text "
                type="radio"
                value="solved"
                name="sort"
                label="Solved"
                onClick={() => filterResult("solved")}
              />
              <Form.Check
                className="form-check-inline  text-primary text"
                type="radio"
                value="solved"
                name="sort"
                label="Show all"
                onClick={() => onReload()}
              />
            </Form.Group>

            <Button
              style={{
                padding: "20px",
                fontSize: "large",
                marginLeft: "30px",
                margin: "20px",
              }}
              variant="danger"
            >
              <Link
                style={{
                  textDecoration: "none",
                  color: "white",
                  padding: "20px",
                  margin: "10px",
                }}
                to="/login"
              >
                Logout
              </Link>
            </Button>
          </div>
        </div>
      </Row>
    </>
  );
}

export default Admin;
