import { useState } from 'react'
import './Register.css';
import './Account.css'


export var loginobj = [
  {
    username: "admin",
    password: "password",
    level: 1,
    xp: 0,
    account: "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC"
  },
  {
    username: "NftHunter",
    password: "password",
    level: 9,
    xp: 0,
    account: "0x8626f6940e2eb28930efb4cef49b2d1f2c9c1199"
  },
  {
    username: "CryptoCollector",
    password: "password",
    level: 7,
    xp: 0,
    account: "0x70997970c51812dc3a010c7d01b50e0d17dc79c8"
  },
  {
    username: "ArtEnthusiast",
    password: "password",
    level: 3,
    xp: 0,
    account: "0x3c44cdddb6a900fa2b585dd299e03d12fa4293bc"
  },
  {
    username: "PixelMaster",
    password: "password",
    level: 2,
    xp: 0,
    account: "0x90f79bf6eb2c4f870365e785982e1f101e93b906"
  },
  {
    username: "NiftyCollector",
    password: "password",
    level: 3,
    xp: 0,
    account: "0x15d34aaf54267db7d7c367839aaf71a00a2c6a65"
  },
  {
    username: "TokenArtist",
    password: "password",
    level: 4,
    xp: 0,
    account: "0x9965507d1a55bcc2695c58ba16fb37d819b0a4dc"
  },
  {
    username: "RarityHoarder",
    password: "password",
    level: 1,
    xp: 0,
    account: "0x976ea74026e726554db657fa54763abd0c3a0aa9"
  },
  {
    username: "NftConnoisseur",
    password: "password",
    level: 1,
    xp: 0,
    account: "0x14dc79964da2c08b23698b3d3cc7ca32193d9955"
  },
  {
    username: "DigitalArtFan",
    password: "password",
    level: 1,
    xp: 0,
    account: "0x23618e81e3f5cdf7f54c3d65f7fbc0abf5b21e8f"
  },
  {
    username: "ChainMaster",
    password: "password",
    level: 6,
    xp: 0,
    account: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"
  }
];


const Register = () => {
  const [username, setName] = useState('')
  const [password, setPassword] = useState('')

  const Registration = async () => {
    loginobj[loginobj.length] = {};
    loginobj[loginobj.length -1] = {username,password, level:1,xp:0};

    alert("You have successfully registered");
  }


  return (
    <section className="new-firstpage" style={{padding:'50px'}}>
    <div className="form-box">
            <div className="button-box">
                <div id="butn">
                <button type="button" className="toggle-btn">Register</button>
                </div>
                <button type="button" className="toggle-btn" style={{marginLeft:'90px'}}>Log In</button>
            </div>
            <form id="register" className="input-group">
            <input type="text" className="input-field" placeholder="Email id" required></input>
                <input type="text" onChange={(e) => setName(e.target.value)} className="input-field" placeholder="User id" required></input>
                <input type="password" onChange={(e) => setPassword(e.target.value)} className="input-field" placeholder="Password" required></input>
                <button type="button" onClick={Registration} className="submit-btn">Register</button>
            </form>

          </div>
          </section>
  );
}

export default Register