import * as Registeration from './Register.js'
import { useState, useEffect } from 'react'
import { ethers } from "ethers"
import { Row, Col, Card, Button } from 'react-bootstrap'
import './Marketplace.css';
import * as App from './App.js'
import {
  Link
} from "react-router-dom";
import { Navbar, Nav, Container } from 'react-bootstrap'
  
  const Collections = ({ marketplace, nft,lazyitems,logged,account}) => {
    const [items, setItems] = useState([])
    const [loading, setLoading] = useState(false)
    const [collections, setCollections] = useState([]);
    const loadMarketplaceItems = async () => {
      const itemCount = await marketplace.itemCount()
      let items = []
      for (let i = 1; i <= itemCount; i++) {
        const item = await marketplace.items(i)
        if (!item.sold) {
          const uri = await nft.tokenURI(item.tokenId)
          console.log(uri)
          const response = await fetch(uri)
          const metadata = await response.json()
          const totalPrice = await marketplace.getTotalPrice(item.itemId)
          items.push({
            totalPrice,
            itemId: item.itemId,
            seller: item.seller,
            name: metadata.name,
            description: metadata.description,
            image: metadata.image
          })
        }
      }
      setLoading(false)
      setItems(items)
    }
    const newcollections = [
      { account: "0x8626f6940e2eb28930efb4cef49b2d1f2c9c1199", username:"NftHunter", collection: [
        {price: 5, name: 'Rumble Kong League', description: 'Rumble Kong League NFT.', ownedby: '0x8626f6940e2eb28930efb4cef49b2d1f2c9c1199', image: 'https://pyhoxus.infura-ipfs.io/ipfs/Qmawi5Zh5CHduAHZWyHiD4XqJfGWgsNVWnvrhe6ejHPdcD'},
  {price: 18, name: 'MoonCats', description: 'This is a MoonCats NFT.', ownedby: '0x8626f6940e2eb28930efb4cef49b2d1f2c9c1199', image: 'https://pyhoxus.infura-ipfs.io/ipfs/Qmd1VsK7JgSKxR2LtoDMa1ahuLvkUN4nanuFsuRfSmhLyN'},
  {price: 10, name: 'Avastars', description: 'This is an Avastars NFT.', ownedby: '0x8626f6940e2eb28930efb4cef49b2d1f2c9c1199', image: 'https://pyhoxus.infura-ipfs.io/ipfs/QmevXoY7UsiXkBLyonQTQY6L4uuyVm3VRTGy7vaPoXdozJ'},
  {price: 7, name: 'Bored Ape Yacht Club', description: 'Bored Ape Yacht Club NFT.', ownedby: '0x8626f6940e2eb28930efb4cef49b2d1f2c9c1199', image: 'https://pyhoxus.infura-ipfs.io/ipfs/QmY9PoCB7zstJ32srv1SpiUEtv6XidPvLuqYwBSraPt7qN'},
  {price: 15, name: 'Loot', description: 'This is a Loot NFT.', ownedby: '0x8626f6940e2eb28930efb4cef49b2d1f2c9c1199', image: 'https://pyhoxus.infura-ipfs.io/ipfs/QmTikXbMDHk4Fo6bWDJhYJUfmS5hCfdmtRmgYferqmufJw'},
] },
      { account: "0x70997970c51812dc3a010c7d01b50e0d17dc79c8", username:"CryptoCollector", collection: [
        {price: 3, name: 'Bored Ape', description: 'This is a Bored Ape NFT.', ownedby: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8', image: 'https://pyhoxus.infura-ipfs.io/ipfs/QmQnZmNJgycomAjrEwtDPJjH7KR2UcfM8qfLoDLhb2CtnL'},
  {price: 6, name: 'CryptoPunk', description: 'This is a CryptoPunk NFT.', ownedby: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8', image: 'https://pyhoxus.infura-ipfs.io/ipfs/Qme5hVaRnQJ19ETUhRp6WxdCx5P3bsQjdVJnLGvNdDLL6v'},
  {price: 8, name: 'Art Blocks', description: 'This is Art Blocks NFT.', ownedby: '0x8626f6940e2eb28930efb40x70997970c51812dc3a010c7d01b50e0d17dc79c8cef49b2d1f2c9c1199', image: 'https://pyhoxus.infura-ipfs.io/ipfs/QmQxV9c5FtVRCUwC5TjcnLSQwQpECPjryC9FTSRhTjEAQL'},
  {price: 2, name: 'Meebit', description: 'This is a Meebit NFT.', ownedby: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8', image: 'https://pyhoxus.infura-ipfs.io/ipfs/QmTCSHmTxybTb5L66KXVGnTFRrmkrqTsL2ahMaccgzKQMD'},
  {price: 12, name: 'Pudgy Penguin', description: 'This is a Pudgy Penguin NFT.', ownedby: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8', image: 'https://pyhoxus.infura-ipfs.io/ipfs/QmQnv2wQAYMUnFhtM3RKZthjGPLsgUZimhhx9mK2joL1BZ'},
      ] },
    ];
    useEffect(() => {
      setCollections(newcollections);
    }, []);

    const makeCollection = async (accountName,username,lazyitems) => {
      if(!logged){ 
        alert("You need to log in first"); 
        return 
        }
      for(var i=0;i<Registeration.loginobj.length;i++){
        if (Registeration.loginobj[i].username === username){
          if(Registeration.loginobj[i].level >= 5){
          }
          else {
            alert("User level should be 5 or more");
            return
          }
        }
      }
      const filteredItems = lazyitems.filter((lazyitem) => lazyitem.ownedby === accountName);
  setCollections((prevCollections) => [
    ...prevCollections,
    { account: accountName, username:username, collection: filteredItems },
  ]);
    };
   
    useEffect(() => {
      loadMarketplaceItems()
    }, [])
    if (loading) return (
      <main style={{ padding: "1rem 0" }}>
        <h2>Loading...</h2>
      </main>
    )
    
    
    return (
      <section className="marketfirstpage" style={{padding:'50px'}}>
        <div>
        <Button onClick={() => makeCollection(account,App.loggedacc,lazyitems)} className="btn-title">Make Your Own Collection</Button>
        <br></br>
        <br></br>
      {collections.map((collection, idx) => (
        <div key={idx}>
          <h4>Account: {collection.username}</h4>
          <div className="d-flex flex-wrap">
            {collection.collection.map((lazyitem, idx) => (
              <Col key={idx} className="overflow-hidden">
                <Card>
                  <div className="image-container">
                    <Card.Img variant="top" src={lazyitem.image} className="nft-image" />
                  </div>
                  <Card.Body>
                    <Card.Title>{lazyitem.name}</Card.Title>
                    <Card.Text>{lazyitem.description}</Card.Text>
                  </Card.Body>
                  <Card.Footer>
                    <div className="d-grid">
                    <Nav.Link as={Link} to="/marketplace" className="marketlink" >Go to Marketplace &nbsp;&nbsp;&nbsp;</Nav.Link>
                    </div>
                  </Card.Footer>
                </Card>
              </Col>
            ))}
          </div>
        </div>
      ))}
    </div>


          </section>
    )
  }
export default Collections