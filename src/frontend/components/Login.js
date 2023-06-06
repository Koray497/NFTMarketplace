import { useState, useEffect } from 'react'
import './Login.css';
import {Button, Nav} from 'react-bootstrap'
import { ethers } from "ethers"
import { Row, Col, Card } from 'react-bootstrap'
import * as App from './App.js'


const Login = ({marketplace,nft,Authentication,logged,web3Handler, account,lazyitems,level,updateProgressBar}) => {
  const [username, setName] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [listedItems, setListedItems] = useState([])
  const [lazyItems,setlazyItems] = useState([])
  const [lazyitemowned,setlazyitemowned] = useState(null)
  updateProgressBar();
  const loadListedItems = async () => {
    // Load all sold items that the user listed
    //Lazy items
    const lazyitemCount = lazyitems.length;
    let lazyItems = []

    for (let indx = 0; indx < lazyitemCount; indx++) {
      let lazyitemcounter = 0;
      if (lazyitems[indx].ownedby.toLowerCase() === account) {
        lazyitemcounter++;

        lazyItems.push({
          price: lazyitems[indx].price,
          name: lazyitems[indx].name,
          description: lazyitems[indx].description,
          image: lazyitems[indx].image,
          ownedby:account
        })
      }
      setlazyitemowned(lazyitemcounter)
      setlazyItems(lazyItems)
    }
    


    const itemCount = await marketplace.itemCount()
    let listedItems = []
    let soldItems = []
    for (let indx = 1; indx <= itemCount; indx++) {
      const i = await marketplace.items(indx)
      if (i.seller.toLowerCase() === account) {
        // get uri url from nft contract
        const uri = await nft.tokenURI(i.tokenId)
        // use uri to fetch the nft metadata stored on ipfs 
        const response = await fetch(uri)
        const metadata = await response.json()
        // get total price of item (item price + fee)
        const totalPrice = await marketplace.getTotalPrice(i.itemId)
        // define listed item object
        let item = {
          totalPrice,
          price: i.price,
          itemId: i.itemId,
          name: metadata.name,
          description: metadata.description,
          image: metadata.image
        }
        listedItems.push(item)
        // Add listed item to sold items array if sold
        if (i.sold) soldItems.push(item)
      }
    }
    setLoading(false)
    setListedItems(listedItems)
  }
  useEffect(() => {
    loadListedItems()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  if (loading) return (
    <main style={{ padding: "1rem 0" }}>
      <h2>Loading...</h2>
    </main>
  )
  
  return (
      <section className="marketfirstpage" style={{padding:'50px'}}>
      <div>
        { logged ? (
          <div>
          <div className="avatar-box">
              <div id="avatar">
              <img src="avatar.png" alt="avatar" className="avatar"/>
                {App.loggedacc}
              </div>
          </div>
          <div className="wallet-button">
          {account ? (
                            <Nav.Link
                                href={`https://etherscan.io/address/${account}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="button nav-button btn-sm mx-4">
                                <Button variant="btn btn-primary">
                                    {account.slice(0, 5) + '...' + account.slice(38, 42)}
                                </Button>

                            </Nav.Link>
                        ) : (
                            <Button onClick={web3Handler} className="btn-title">Connect with Wallet</Button>
                        )}
              </div>
              <div className="informations">
              Level: {level} <br></br>
              Wallet Connected: {App.loggedwal} <br></br>
              Number of NFTs : {listedItems.length + lazyitemowned}
              </div>
              <br></br>
              <br></br>
              <div className="progress-bar-container">
              <div id="progress-bar" className="progress-bar"></div>
              </div>
              <div className="nfts">
              <div className="flex justify-center">

      {listedItems.length > 0 && !lazyItems.length > 0 ?
        <div className="px-5 container">
          <Row xs={1} md={2} lg={4} className="g-4 py-5">
            {listedItems.map((item, idx) => (
              <Col key={idx} className="overflow-hidden">
                <Card>
                  <Card.Img variant="top" src={item.image} />
                  <Card.Body color="secondary">
                    <Card.Title>{item.name}</Card.Title>
                    <Card.Text>
                      {item.description}
                    </Card.Text>
                  </Card.Body>
                  <Card.Footer>{ethers.utils.formatEther(item.totalPrice)} ETH</Card.Footer>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
        :lazyItems.length > 0 && !listedItems.length > 0 ?
        <div className="px-5 container">
          <Row xs={1} md={2} lg={4} className="g-4 py-5">
            {lazyItems.map((lazyItems, idx) => (
              <Col key={idx} className="overflow-hidden">
                <Card>
                  <Card.Img variant="top" src={lazyItems.image} />
                  <Card.Body color="secondary">
                    <Card.Title>{lazyItems.name}</Card.Title>
                    <Card.Text>
                      {lazyItems.description}
                    </Card.Text>
                  </Card.Body>
                  <Card.Footer>
                  {lazyItems.price} ETH
                  </Card.Footer>
                </Card>
              </Col>
            ))}
          </Row>
        </div> 
        :lazyItems.length > 0 && listedItems.length > 0 ?
        <div>
        <div className="px-5 container">
          <Row xs={1} md={2} lg={4} className="g-4 py-5">
          {listedItems.map((item, idx) => (
              <Col key={idx} className="overflow-hidden">
                <Card>
                  <Card.Img variant="top" src={item.image} />
                  <Card.Body color="secondary">
                    <Card.Title>{item.name}</Card.Title>
                    <Card.Text>
                      {item.description}
                    </Card.Text>
                  </Card.Body>
                  <Card.Footer>{ethers.utils.formatEther(item.totalPrice)} ETH</Card.Footer>
                </Card>
              </Col>
            ))}
            {lazyItems.map((lazyItems,idx) => (
              <Col key={idx} className="overflow-hidden">
                <Card>
                  <Card.Img variant="top" src={lazyItems.image} />
                  <Card.Body color="secondary">
                    <Card.Title>{lazyItems.name}</Card.Title>
                    <Card.Text>
                      {lazyItems.description}
                    </Card.Text>
                  </Card.Body>
                  <Card.Footer>
                  {lazyItems.price}  ETH
                  </Card.Footer>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
        </div> :
        (
          <main  style={{ padding: "1rem 0" }}>
            <h2></h2>
            <br></br>
          </main>
        )}
        
    </div>
                </div>
                </div>

        ) : (
    <div className="form-box">
            <div className="button-box">
                <div id="btn">
                <button type="button" className="toggle-btn">Log In</button>
                </div>
                <button type="button" className="toggle-btn" style={{marginLeft:'90px'}}>Register</button>
            </div>
            
            <form id="login" className="input-group">
                <input type="text" onChange={(e) => setName(e.target.value)} className="input-field" placeholder="User id" required></input>
                <input type="password" onChange={(e) => setPassword(e.target.value)} className="input-field" placeholder="Password" required></input>
                <button type="button" onClick={() => Authentication(username,password)} className="submit-btn">Login</button>
            </form>
            </div>
          )}
            </div>
            </section>
  
  );
}

export default Login