import { useState, useEffect } from 'react'
import { ethers } from "ethers"
import { Row, Col, Card, Button } from 'react-bootstrap'
import './Marketplace.css';



const Marketplace = ({ marketplace, nft,lazyitems,buylazyitem}) => {
  const [loading, setLoading] = useState(false)
  const [items, setItems] = useState([])
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

  const buyMarketItem = async (item) => {
    console.log(item.itemId, { value: item.totalPrice })
    await (await marketplace.purchaseItem(item.itemId, { value: item.totalPrice })).wait()
    loadMarketplaceItems()
  }

  useEffect(() => {
    loadMarketplaceItems()
  }, [])
  if (loading) return (
    <main style={{ padding: "1rem 0" }}>
      <h2>Loading...</h2>
    </main>
  )
  return (
    
    <div className="flex justify-center">
      <section className="marketfirstpage" style={{padding:'50px'}}>
      {items.length > 0 && !lazyitems.length > 0 ?
        <div className="px-5 container">
          <Row xs={1} md={2} lg={4} className="g-4 py-5">
            {items.map((item, idx) => (
              <Col key={idx} className="overflow-hidden">
                <Card>
                <div className="image-container">
                   <Card.Img variant="top" src={lazyitems.image} className="nft-image" />
                  </div>
                  <Card.Body color="secondary">
                    <Card.Title>{item.name}</Card.Title>
                    <Card.Text>
                      {item.description}
                    </Card.Text>
                  </Card.Body>
                  <Card.Footer>
                    <div className='d-grid'>
                      <Button onClick={() => buyMarketItem(item)} variant="primary" size="lg">
                        Buy for {ethers.utils.formatEther(item.totalPrice)} ETH
                      </Button>
                    </div>
                  </Card.Footer>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
        :lazyitems.length > 0 && !items.length > 0 ?
        <div className="px-5 container">
          <Row xs={1} md={2} lg={4} className="g-4 py-5">
            {lazyitems.map((lazyitems, idx) => (
              <Col key={idx} className="overflow-hidden">
                <Card>
                <div className="image-container">
                   <Card.Img variant="top" src={lazyitems.image} className="nft-image" />
                  </div>
                  <Card.Body color="secondary">
                    <Card.Title>{lazyitems.name}</Card.Title>
                    <Card.Text>
                      {lazyitems.description}
                    </Card.Text>
                  </Card.Body>
                  <Card.Footer>
                    <div className='d-grid'>
                      <Button onClick={() => buylazyitem(lazyitems.image,lazyitems.price,lazyitems.name,lazyitems.description,lazyitems.ownedby)} variant="primary" size="lg">
                        Buy for {lazyitems.price}  ETH
                      </Button>
                    </div>
                  </Card.Footer>
                </Card>
              </Col>
            ))}
          </Row>
        </div> 
        :lazyitems.length > 0 && items.length > 0 ?
        <div>
        <div className="px-5 container">
          <Row xs={1} md={2} lg={4} className="g-4 py-5">
          {items.map((item, idx) => (
              <Col key={idx} className="overflow-hidden">
                <Card>
                <div className="image-container">
                   <Card.Img variant="top" src={lazyitems.image} className="nft-image" />
                  </div>
                  <Card.Body color="secondary">
                    <Card.Title>{item.name}</Card.Title>
                    <Card.Text>
                      {item.description}
                    </Card.Text>
                  </Card.Body>
                  <Card.Footer>
                    <div className='d-grid'>
                      <Button onClick={() => buyMarketItem(item)} variant="primary" size="lg">
                        Buy for {ethers.utils.formatEther(item.totalPrice)} ETH
                      </Button>
                    </div>
                  </Card.Footer>
                </Card>
              </Col>
            ))}
            {lazyitems.map((lazyitems,idx) => (
              <Col key={idx} className="overflow-hidden">
                <Card>
                <div className="image-container">
                   <Card.Img variant="top" src={lazyitems.image} className="nft-image" />
                  </div>
                  <Card.Body color="secondary">
                    <Card.Title>{lazyitems.name}</Card.Title>
                    <Card.Text>
                      {lazyitems.description}
                    </Card.Text>
                  </Card.Body>
                  <Card.Footer>
                    <div className='d-grid'>
                      <Button onClick={() => buylazyitem(lazyitems.image,lazyitems.price,lazyitems.name,lazyitems.description,lazyitems.ownedby)} variant="primary" size="lg">
                        Buy for {lazyitems.price} ETH
                      </Button>
                    </div>
                  </Card.Footer>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
        </div> :
        (
          <main  style={{ padding: "1rem 0" }}>
            <h2>No listed NFTs on the Marketplace Right Now</h2>
            <br></br>
          </main>
        )}
       </section>
    </div>
  );
}
export default Marketplace