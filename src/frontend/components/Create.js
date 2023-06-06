import { useState } from 'react'
import { ethers } from "ethers"
import { Row, Form, Button } from 'react-bootstrap'
import {Buffer} from 'buffer';
import { create as ipfsHttpClient } from "ipfs-http-client";

const projectId = 'Your Project id'
const projectSecret = 'Your Project Secret'
const authorization = 'Basic ' + Buffer.from(projectId + ":" + projectSecret).toString('base64')


const client = ipfsHttpClient({
  host:"ipfs.infura.io",
  port:5001,
  protocol: "https",
  headers: {
    authorization: authorization,
  }
})

const Create = ({ marketplace, nft ,mintlazy,incrementXp }) => {
  const [image, setImage] = useState('')
  const [price, setPrice] = useState(null)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const uploadToIPFS = async (event) => {
    event.preventDefault()
    const file = event.target.files[0]
    if (typeof file !== 'undefined') {
      try {
        const result = await client.add(file)
        console.log(result)
       
        setImage(`https://pyhoxus.infura-ipfs.io/ipfs/${result.path}`)
      } catch (error){
        console.log("ipfs image upload error: ", error)
      }
    }
  }
  const createNFT = async () => {
    if (!image || !price || !name || !description) return
    try{
      const result = await client.add(JSON.stringify({image, price, name, description}))
      mintThenList(result)
    } catch(error) {
      console.log("ipfs uri upload error: ", error)
    }
  }
  const mintThenList = async (result) => {
    const uri = `https://pyhoxus.infura-ipfs.io/ipfs/${result.path}`
    console.log(uri)
    // mint nft 
    await(await nft.mint(uri)).wait()
    // get tokenId of new nft 
    const id = await nft.tokenCount()
    // approve marketplace to spend nft
    await(await nft.setApprovalForAll(marketplace.address, true)).wait()
    // add nft to marketplace
    const listingPrice = ethers.utils.parseEther(price.toString())
    await(await marketplace.makeItem(nft.address, id, listingPrice)).wait()
    incrementXp(100)
  };



  return (
    <div className="container-fluid mt-5" style={{ padding: '0' }}>
      <section className="new-firstpage" style={{padding:'50px'}}>
      <div className="row">
        <main role="main" className="col-lg-12 mx-auto" style={{ maxWidth: '1000px' }}>
          <div className="content mx-auto">
            <Row className="g-4">
              <Form.Control
                type="file"
                required
                name="file"
                onChange={uploadToIPFS}
              />
              <Form.Control onChange={(e) => setName(e.target.value)} size="lg" required type="text" placeholder="Name" />
              <Form.Control onChange={(e) => setDescription(e.target.value)} size="lg" required as="textarea" placeholder="Description" />
              <Form.Control onChange={(e) => setPrice(e.target.value)} size="lg" required type="number" placeholder="ETH Price" />
              <div className="d-grid px-0">
                <Button onClick={createNFT} className="btn-title" variant="primary" size="lg">
                  Create NFT and List!
                </Button>
                <Button onClick={() => mintlazy(image,price,name,description)} className="btn-title" variant="primary" size="lg" style={{marginTop:'25px'}}>
                  Lazy Mint this NFT!
                </Button>
              </div>
            </Row>
          </div>
        </main>
        </div>
      </section>
    </div>
  );
}

export default Create