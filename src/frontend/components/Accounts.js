import * as Registeration from './Register.js'
import { useState, useEffect } from 'react'
import { ethers } from "ethers"
import { Row, Col, Card, Button } from 'react-bootstrap'
import './Marketplace.css';

  
  const Accounts = ({}) => {
    const [items, setItems] = useState([])
    const [collections, setCollections] = useState([]);
    
    console.log(Registeration.loginobj)
    
    
    
    return (
      <section className="marketfirstpage" style={{padding:'50px'}}>
    <div>
        <br></br>
        <br></br>
      {Registeration.loginobj.map((obj, index) => (
        <div key={index}>
          <h4>Account: {obj.account}</h4>
          <div className="d-flex flex-wrap">
              <Col key={index} className="overflow-hidden">
                <Card>
                  <div className="image-contain">
                    <Card.Img variant="top" src="avatar.png" className="account-image" />
                  </div>
                  <Card.Body>
                    <Card.Title>Username: {obj.username}</Card.Title>
                    <Card.Text>Level: {obj.level}</Card.Text>
                  </Card.Body>
                  <Card.Footer>
                    <div className="d-grid">
                    </div>
                  </Card.Footer>
                </Card>
              </Col>
          </div>
        </div>
      ))}
    </div>


          </section>
    )
  }
export default Accounts