import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Navigation from './Navbar';
import Home from './Home.js'
import Create from './Create.js'
import Marketplace from './Marketplace.js'
import MyListedItems from './MyListedItems.js'
import MyPurchases from './MyPurchases.js'
import Login from './Login.js'
import Collections from './Collections.js'
import Accounts from "./Accounts.js";
import Register from './Register.js'
import MarketplaceAbi from '../contractsData/Marketplace.json'
import MarketplaceAddress from '../contractsData/Marketplace-address.json'
import NFTAbi from '../contractsData/NFT.json'
import NFTAddress from '../contractsData/NFT-address.json'
import { useState,useEffect } from 'react'
import { ethers } from "ethers"
import { Spinner } from 'react-bootstrap'
import './App.css';
import * as Registeration from './Register.js'
import { create as ipfsHttpClient } from "ipfs-http-client";
import {Buffer} from 'buffer';


export var loggedacc;
export var loggedwal;

const projectId = 'Your Project Id'
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

function App() {
  const [loading, setLoading] = useState(false)
  const [account, setAccount] = useState(null)
  const [nft, setNFT] = useState({})
  const [marketplace, setMarketplace] = useState({})
  const [logged, setLogged] = useState(false)
  const [lazyitems] = useState([])
  let xp = 0; // initial XP
  const xpPerLevel = 100; // XP required to level up
  const [level, setLevel] = useState(1);
  const [counter,setCounter] = useState(0);

  useEffect(() => {
    // Run the function once when the app starts
    makeNFTs();

    // Return a cleanup function to ensure it never runs again
    return () => {
      // Any cleanup code you may need
    };
  }, []);

  const makeNFTs = async () => {
    const exampleNFTs = [
      {
        price: 3,
        name: "Bored Ape",
        description: "This is a Bored Ape NFT.",
        ownedby: "0x70997970c51812dc3a010c7d01b50e0d17dc79c8",
        image: "https://pyhoxus.infura-ipfs.io/ipfs/QmQnZmNJgycomAjrEwtDPJjH7KR2UcfM8qfLoDLhb2CtnL",
      },
      {
        price: 6,
        name: "CryptoPunk",
        description: "This is a CryptoPunk NFT.",
        ownedby: "0x70997970c51812dc3a010c7d01b50e0d17dc79c8",
        image: "https://pyhoxus.infura-ipfs.io/ipfs/Qme5hVaRnQJ19ETUhRp6WxdCx5P3bsQjdVJnLGvNdDLL6v",
      },
      {
        price: 8,
        name: "Art Blocks",
        description: "This is an Art Blocks NFT.",
        ownedby: "0x70997970c51812dc3a010c7d01b50e0d17dc79c8",
        image: "https://pyhoxus.infura-ipfs.io/ipfs/QmQxV9c5FtVRCUwC5TjcnLSQwQpECPjryC9FTSRhTjEAQL",
      },
      {
        price: 2,
        name: "Meebit",
        description: "This is a Meebit NFT.",
        ownedby: "0x70997970c51812dc3a010c7d01b50e0d17dc79c8",
        image: "https://pyhoxus.infura-ipfs.io/ipfs/QmTCSHmTxybTb5L66KXVGnTFRrmkrqTsL2ahMaccgzKQMD",
      },
      {
        price: 12,
        name: "Pudgy Penguin",
        description: "This is a Pudgy Penguin NFT.",
        ownedby: "0x70997970c51812dc3a010c7d01b50e0d17dc79c8",
        image: "https://pyhoxus.infura-ipfs.io/ipfs/QmQnv2wQAYMUnFhtM3RKZthjGPLsgUZimhhx9mK2joL1BZ",
      },
      {
        price: 5,
        name: "Rumble Kong League",
        description: "Rumble Kong League NFT.",
        ownedby: "0x8626f6940e2eb28930efb4cef49b2d1f2c9c1199",
        image: "https://pyhoxus.infura-ipfs.io/ipfs/Qmawi5Zh5CHduAHZWyHiD4XqJfGWgsNVWnvrhe6ejHPdcD",
      },
      {
        price: 18,
        name: "MoonCats",
        description: "This is a MoonCats NFT.",
        ownedby: "0x8626f6940e2eb28930efb4cef49b2d1f2c9c1199",
        image: "https://pyhoxus.infura-ipfs.io/ipfs/Qmd1VsK7JgSKxR2LtoDMa1ahuLvkUN4nanuFsuRfSmhLyN",
      },
      {
        price: 10,
        name: "Avastars",
        description: "This is an Avastars NFT.",
        ownedby: "0x8626f6940e2eb28930efb4cef49b2d1f2c9c1199",
        image: "https://pyhoxus.infura-ipfs.io/ipfs/QmevXoY7UsiXkBLyonQTQY6L4uuyVm3VRTGy7vaPoXdozJ",
      },
      {
        price: 7,
        name: "Bored Ape Yacht Club",
        description: "Bored Ape Yacht Club NFT.",
        ownedby: "0x8626f6940e2eb28930efb4cef49b2d1f2c9c1199",
        image: "https://pyhoxus.infura-ipfs.io/ipfs/QmY9PoCB7zstJ32srv1SpiUEtv6XidPvLuqYwBSraPt7qN",
      },
      {
        price: 15,
        name: "Loot",
        description: "This is a Loot NFT.",
        ownedby: "0x8626f6940e2eb28930efb4cef49b2d1f2c9c1199",
        image: "https://pyhoxus.infura-ipfs.io/ipfs/QmTikXbMDHk4Fo6bWDJhYJUfmS5hCfdmtRmgYferqmufJw",
      },
      {
        price: 10,
        name: "Axe",
        description: "This is a Axe NFT.",
        ownedby: "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC",
        image: "https://pyhoxus.infura-ipfs.io/ipfs/QmTSniZUpopkhsKzaCrbeDqZpHN7BxUxbMU1Mrp4RpiTDR",
      },
    ];
    for (let i = 0; i < exampleNFTs.length; i++) {
      lazyitems.push(exampleNFTs[i]);
    }
  }

  // MetaMask Login/Connect
  const web3Handler = async () => {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    setAccount(accounts[0])
    // Get provider from Metamask
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()

    window.ethereum.on('chainChanged', (chainId) => {
      window.location.reload();
    })

    window.ethereum.on('accountsChanged', async function (accounts) {
      setAccount(accounts[0])
      await web3Handler()
    })
    loadContracts(signer)
  }
  const loadContracts = async (signer) => {
    const marketplace = new ethers.Contract(MarketplaceAddress.address, MarketplaceAbi.abi, signer)
    setMarketplace(marketplace)
    const nft = new ethers.Contract(NFTAddress.address, NFTAbi.abi, signer)
    setNFT(nft)
    setLoading(false)
  }

  const Authentication = async (username,password) => {
    for(var i=0;i<Registeration.loginobj.length;i++){
      if(Registeration.loginobj[i].username===username && Registeration.loginobj[i].password===password){
        setLogged(true);
        loggedacc = username;
        loggedwal = Registeration.loginobj[i].account;
        console.log(Registeration.loginobj[i].account)
        setCounter(i)
        return
      }
    }
      alert("Wrong Username or Password");
  }
  const mintlazy = async (image,price,name,description) => {
    if (!image || !price || !name || !description) return
    if(!logged){ 
    alert("You need to log in first"); 
    return 
    }
    lazyitems.push({
      price: price,
      name: name,
      description: description,
      image: image,
      ownedby:account
    })
    alert("Lazy Mint is Successful")
    incrementXp(50)
  }

  const buylazyitem = async (image,price,name,description,seller) => {
    if (!image || !price || !name || !description) return
    try{
      const result = await client.add(JSON.stringify({image, price, name, description}))
      lazythenbuy(price,result,seller);
    } catch(error) {
      console.log("ipfs uri upload error: ", error)
    }
  }
  const lazythenbuy = async(price,result,seller) => {
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
    console.log(id,{ value:listingPrice })
    await (await marketplace.purchaselazyItem(id,seller, { value: listingPrice })).wait()
  }
  const incrementXp = async (amount) => {
    Registeration.loginobj[counter].xp += amount; // add XP
    if (Registeration.loginobj[counter].xp >= xpPerLevel * Registeration.loginobj[counter].level) { // if XP is enough to level up
      Registeration.loginobj[counter].xp -= xpPerLevel * Registeration.loginobj[counter].level; // remove the XP required to level up
      setLevel(Registeration.loginobj[counter].level+1);
      Registeration.loginobj[counter].level=Registeration.loginobj[counter].level+1 // increase the level
    }
  }
  const updateProgressBar = async () => {
    const xpPercentage = Registeration.loginobj[counter].xp / (xpPerLevel * Registeration.loginobj[counter].level) * 100; // calculate XP percentage
    const progressBar = document.getElementById('progress-bar'); // get the progress bar element
    progressBar.style.width = xpPercentage + '%'; // set the progress bar width
  }
  return (
    <BrowserRouter>
      <div className="App">
        <>
          <Navigation web3Handler={web3Handler} account={account} />
        </>
        <div>
          {loading ?(
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
              <Spinner animation="border" style={{ display: 'flex' }} />
              <p className='mx-3 my-0'>Awating Metamask Connection...</p>
            </div>
          ) : (
            <Routes>
              <Route path="/" element={
                <Home/>
              } />
              <Route path="/createnft" element={
                <Create marketplace={marketplace} nft={nft} mintlazy={mintlazy} incrementXp={incrementXp} />
              } />
              <Route path="/marketplace" element={
                <Marketplace marketplace={marketplace} nft={nft} lazyitems={lazyitems} buylazyitem={buylazyitem} />
              } />
              
              <Route path="/listednft" element={
                <MyListedItems marketplace={marketplace} nft={nft} account={account} />
              } />
              <Route path="/purchases" element={
                <MyPurchases marketplace={marketplace} nft={nft} account={account} />
              } />
              <Route path="/accounts" element={
                <Accounts/>
              } />
              <Route path="/login" element={
                <Login marketplace={marketplace} updateProgressBar={updateProgressBar} nft={nft} xp={xp} level={level} incrementXp={incrementXp} xpPerLevel={xpPerLevel} Authentication={Authentication} lazyitems={lazyitems} logged={logged} web3Handler={web3Handler} account={account}  />
              } />
              <Route path="/collections" element={
                <Collections marketplace={marketplace} nft={nft} lazyitems={lazyitems} logged={logged} account={account} />
              } />
              <Route path="/register" element={
                <Register marketplace={marketplace} nft={nft} account={account} />
              } />
            </Routes>
          )}
        </div>
      </div>
    </BrowserRouter>

  );
}

export default App;
