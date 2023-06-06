import './Home.css';


const Home = ({}) => {
  
  return (
    
    <div className="flex justify-center holepage">
      <section className="firstpage">
        <div className="title-section">
          <h3 className="titlefu">FUNGIBLE NFT MARKETPLACE</h3>
          <h1 className="title-type">Wonder through this marketplace to find whatever you want</h1>
          <button className="btn-title">SEARCH THROUGH WEBSITE  &nbsp; &nbsp;&nbsp;&nbsp;&nbsp; -&gt;</button>
        </div>
      </section>

          

<section className="secondpage">
<div className="news-section" style={{float:'left'}}>
            <div className="title">
              &nbsp;
              <div className="title-text">
              Crypto NEWS
              </div>
            </div>
            <main className="row">
        <section className="col-s-6 col-3 news"><img className="news-image" src="ethereum2.png" alt=""/>
        <a href="https://www.investopedia.com/ethereum-2-0-6455959" target="_blank">
      <span className="link"></span>
    </a>
        <div className="news-line">Ethereum 2.0:The Future Ethereum</div>
        <div className="news-date">February 23, 2023</div>
        </section>
        <section className="col-s-6 col-3 news"><img className="news-image" src="nftgames.png" alt=""/>
        <a href="https://influencermarketinghub.com/nft-games/" target="_blank">
      <span className="link"></span>
    </a>
        <div className="news-line">Check out these NFT Games</div>
        <div className="news-date">January 10, 2023</div>
        </section>
        <section className="col-s-6 col-3 news"><img className="news-image" src="nftguide.png" alt=""/>
        <a href="https://www.oberlo.com/blog/how-to-make-nft" target="_blank">
      <span className="link"></span>
    </a>
        <div className="news-line">Your Ultimate NFT Guide</div>
        <div className="news-date">March 4, 2023</div>
        </section>
    </main>
</div>
</section>

<section className="thirdpage">

<div className="news-section" style={{float:'left'}}>
            <div className="title">
              &nbsp;
              <div className="title-text">
              NFT
              </div>
            </div>
            <main className="row">
        <section className="col-s-6 col-3 news"><img className="news-image" src="nftpic.png" alt=""/>
        <a href="https://ethereum.org/en/nft/" target="_blank">
      <span className="link"></span>
    </a>
        <div className="news-line">What is NFT?</div>
        <div className="news-date">Click to see more!</div>
        </section>
        <section className="col-s-6 col-3 news"><img  className="news-image" src="nftpic2.png" alt=""/>
        <a href="https://www.investopedia.com/how-to-create-an-nft-6362495/" target="_blank">
      <span className="link"></span>
    </a>
        <div className="news-line">How to Create NFTs?</div>
        <div className="news-date">Click to see more!</div>
        </section>
        <section className="col-s-6 col-3 news"><img className="news-image" src="nftguide.png" alt=""/>
        <a href="https://influencermarketinghub.com/how-to-buy-an-nft/#:~:text=To%20purchase%20an%20NFT%2C%20you,to%20get%20started%20buying%20NFTs." target="_blank">
      <span className="link"></span>
    </a>
        <div className="news-line">How to Buy a NFT?</div>
        <div className="news-date">Click to see more!</div>
        </section>
    </main>
</div>
</section>
    </div>
  );
}
export default Home