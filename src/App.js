import React,{useState,useEffect} from 'react';
import Coin from './Coin';
import './App.css';





function App() {

   const [coins,setCoins] = useState([]);
   const [search,setSearch] = useState('');


  
  useEffect( async () =>{

    const url=' https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false';
    
    let data = await fetch(url);  //fetch data


    let parsedData = await data.json()   //parse data to json

   setCoins(parsedData) ;      
    

  },[]);




const handleChange = (e) =>{
setSearch(e.target.value)

} 


const filteredCoins =coins.filter (coin =>
  coin.name.toLowerCase().includes(search.toLowerCase())
  );
  

  return (
    <div className="coin-app">
      <div className='coin-search'>
        <h1 className='coin-text'>Search a currency</h1>
        <form>
          <input type='text' placeholder='Search' value={search} className='coin-input' onChange={handleChange}/>
        </form>
      </div>

      {filteredCoins.map(coin => {

        return(
        
          <>
          <Coin key={coin.id} name={coin.name} image={coin.image} symbol={coin.symbol} marketcap={coin.market_cap} price={coin.current_price} priceChange={coin.price_change_percentage_24h} volume={coin.total_volume}/>
        <hr></hr>
          </>
      
        
           );
      })}
      
    </div>
  );
}

export default App;
