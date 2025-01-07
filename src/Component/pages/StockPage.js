import React, { useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addStock, selectStocks } from "../Slices/stockSlice";  // Import the action
import { useSelector } from "react-redux";
import Modal from "react-modal"; // Importing modal for the form

Modal.setAppElement("#root"); // Ensure accessibility

function TradingViewWidget() {
  const { displaySymbol } = useParams();
  const location = useLocation();
  const { stock } = location.state; // Receive stock object from location.state
  console.log("stock",stock);
  const dispatch = useDispatch();
  const stocks = useSelector(selectStocks);

  const [stockName, setStockName] = useState(stock.description); // Use stock.description as the initial value
  const [stockQuantity, setStockQuantity] = useState(1); // Initialize quantity to 1
  const [stockPrice, setStockPrice] = useState(stock.current); // Use stock.current as the initial price
  const [modalIsOpen, setModalIsOpen] = useState(false); // State to handle modal visibility

  // Handle the open and close of the modal
  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  const handleAddStock = () => {
    if (stockName && stockQuantity > 0 && stockPrice > 0) {
      const newStock = {
        stockName: stockName,
        quantity: stockQuantity,
        buyPrice: stockPrice,
        ticker: displaySymbol,
      };
      console.log("newStock",newStock);
      dispatch(addStock({ userId:localStorage.getItem("userId"), stock: newStock })); // Assume userId is 1 for now
      closeModal(); // Close modal after stock is added
      setStockName("");
      setStockQuantity(1);
      setStockPrice(stock.current);
    } else {
      alert("Please provide valid stock details.");
    }
  };

  const incrementQuantity = () => setStockQuantity((prevQuantity) => prevQuantity + 1);
  const decrementQuantity = () => setStockQuantity((prevQuantity) => Math.max(prevQuantity - 1, 1));

  return (
    <div className="container" style={{ width: "200vh", height: "100vh"}}>
  <button onClick={openModal} 
    style={{
      marginTop: "10px",
      width: "auto",
      backgroundColor: "#007bff",
      color: "#fff",
      border: "none",
      padding: "5px 10px",
      fontSize: "16px",
      borderRadius: "8px",
      cursor: "pointer", 
      marginBottom: "10px",
      boxShadow:"0.3px 0.3px 2px black"
      }}>
        Add Stock
      </button>

      {/* Modal for stock form */}
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={{ overlay: { backgroundColor: 'rgba(0, 0, 0, 0.5)' }, content: { padding: "20px", width: "400px", margin: "auto",marginTop:"70px" } }}>
        <h3>Add Stock</h3>
        <input
          type="text"
          placeholder="Stock Name"
          value={stockName}
          onChange={(e) => setStockName(e.target.value)}
          disabled
        />
        <div style={{ display: "flex", alignItems: "center" }}>
          <button onClick={decrementQuantity} style={{ marginRight: "10px" }}>-</button>
          <input
            type="number"
            value={stockQuantity}
            onChange={(e) => setStockQuantity(Number(e.target.value))}
            min="1"
            style={{ textAlign: "center", width: "50px" }}
          />
          <button onClick={incrementQuantity} style={{ marginLeft: "10px" }}>+</button>
        </div>
        <input
          type="number"
          placeholder="Price"
          value={stockPrice}
          onChange={(e) => setStockPrice(Number(e.target.value))}
          disabled
        />
        <input
          type="text"
          placeholder="Ticker"
          value={displaySymbol}
          onChange={() => {}}
          disabled
        />
        <button onClick={handleAddStock} style={{ marginTop: "15px", backgroundColor: "#007bff", color: "#fff", padding: "10px", width: "100%" }}>
          Add Stock
        </button>
        <button onClick={closeModal} style={{ marginTop: "10px", backgroundColor: "#dc3545", color: "#fff", padding: "10px", width: "100%" }}>
          Close
        </button>
      </Modal>

      {/* Display current stocks */}
      {/* <div>
        <h3>Current Stocks</h3>
        {stocks.length > 0 ? (
          <ul>
            {stocks.map((stock, index) => (
              <li key={index}>
                {stock.name} - {stock.quantity} shares at ${stock.price}
              </li>
            ))}
          </ul>
        ) : (
          <p>No stocks added yet.</p>
        )}
      </div> */}

      {/* TradingView iframe */}
      <iframe
        title="TradingView Widget"
        src={`https://s.tradingview.com/embed-widget/advanced-chart/?locale=en&symbol=${displaySymbol}&interval=D&theme=light&style=1&timezone=Etc/UTC&allow_symbol_change=true&autosize=true`}
        style={{
          width: "100%",
          height: "100%",
          border: "none",
        }}
      ></iframe>
    </div>
  );
}

export default TradingViewWidget;

// import React,{ useState} from "react";
// import { useParams,useLocation } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { addStock,selectStocks } from "../Slices/stockSlice";  // Import the action
// import { useSelector} from "react-redux";
// function TradingViewWidget() {
//   const { displaySymbol } = useParams();
//   const location = useLocation();
//   const { stock } = location.state;
//   console.log("stock",stock);
//   const dispatch = useDispatch();
//   const stocks = useSelector(selectStocks);

//   const [stockName, setStockName] = useState("");
//   const [stockQuantity, setStockQuantity] = useState(0);
//   const [stockPrice, setStockPrice] = useState(0);

//   const handleAddStock = () => {
//     if (stockName && stockQuantity > 0 && stockPrice > 0) {
//       const newStock = {
//         name: stockName,
//         quantity: stockQuantity,
//         price: stockPrice,
//         symbol: displaySymbol,
//       };
//       dispatch(addStock({ userId: 1, stock: newStock })); // Assume userId is 1 for now
//       setStockName("");
//       setStockQuantity(0);
//       setStockPrice(0);
//     } else {
//       alert("Please provide valid stock details.");
//     }
//   };

//   return (
//     <div className="container" style={{ width: "200vh", height: "100vh" }}>
//       {/* Add stock form */}
//       <div style={{ paddingBottom: "20px" }}>
//         <h3>Add Stock</h3>
//         <input
//           type="text"
//           placeholder="Stock Name"
//           value={stockName}
//           onChange={(e) => setStockName(e.target.value)}
//         />
//         <input
//           type="number"
//           placeholder="Quantity"
//           value={stockQuantity}
//           onChange={(e) => setStockQuantity(Number(e.target.value))}
//         />
//         <input
//           type="number"
//           placeholder="Price"
//           value={stockPrice}
//           onChange={(e) => setStockPrice(Number(e.target.value))}
//         />
//         <button onClick={handleAddStock}>Add Stock</button>
//       </div>

//       {/* Display current stocks */}
//       <div>
//         <h3>Current Stocks</h3>
//         {stocks.length > 0 ? (
//           <ul>
//             {stocks.map((stock, index) => (
//               <li key={index}>
//                 {stock.name} - {stock.quantity} shares at ${stock.price}
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <p>No stocks added yet.</p>
//         )}
//       </div>

//       {/* TradingView iframe */}
//       <iframe
//         title="TradingView Widget"
//         src={`https://s.tradingview.com/embed-widget/advanced-chart/?locale=en&symbol=${displaySymbol}&interval=D&theme=light&style=1&timezone=Etc/UTC&allow_symbol_change=true&autosize=true`}
//         style={{
//           width: "100%",
//           height: "100%",
//           border: "none",
//         }}
//       ></iframe>
//     </div>
//   )
// }

// export default TradingViewWidget;
// <div className="container" style={{ width:"200vh",height:"100vh"}}>
//   <iframe
//     title="TradingView Widget"
//     src={`https://s.tradingview.com/embed-widget/advanced-chart/?locale=en&symbol=${displaySymbol}&interval=D&theme=light&style=1&timezone=Etc/UTC&allow_symbol_change=true&autosize=true`}
//     style={{
//       width: "100%",
//       height: "100%",
//       border: "none",
//     }}
//   ></iframe>
// </div>

// import React, { useState, useEffect } from 'react';
// // import Plot from 'react-plotly.js';
// // import backgroundImage_st_bg1 from '../images/page2_bg.jpg';
// // import myGif from '../images/Iphone-spinner-2.gif';
// import './stock.css'
// // import TechnicalA from './TechnicaA';
// // import {
// //   InfoSec_stock,
// //   InfoSec
// // } from './InfoSection/InfoSection.elements';
// export default function Stockss({
//     lightBg
//   }) {
//     const [stockSymbol, setStockSymbol] = useState('TM'); // Default stock symbol
//     const [search, setSearch] = useState("");

 
  
//   const handleSearch = (e) => {
//     // Handle the search functionality here
//     // You can update the stockSymbol state with the value entered in the search bar
//     // Example: setStockSymbol(newValue);
//     e.preventDefault();
//     setStockSymbol(stockSymbol);
//     // console.log(symbol);
//     // setSearch("");
//     // fetchStock()
//   };
//   // const handleSubmit = (e) => {
//   //   e.preventDefault();
//   //   setStockSymbol(stockSymbol);
//   //   console.log(stockSymbol);
//   //   setSearch("");
   
//   // };
//   return (
//   <div style={{marginTop:"-10.5%" }}>
    
//         <div style={{ justifyContent: 'center',}}>
//           <input type="text" value={stockSymbol} placeholder='Enter stock symbol'onChange={e => setStockSymbol(e.target.value)} />
//           {/* <button onClick={handleSearch}>Search</button> */}
//         </div>   
//         <div style={{ display: 'flex', justifyContent: 'center', width: '100%', paddingBottom: '46.8%' }}>
//           <iframe
//             scrolling="no" allowtransparency="true" frameborder="0" id="tradingview_378bd"
//             src={`https://s.tradingview.com/widgetembed/?frameElementId=tradingview_378b...&symbol=${stockSymbol}`}
//             style={{ position: 'absolute', width: '100%', height: '100%' }}
//           />
          
//         </div>
           
//     </div>
   
//   )
// }
// import React, { useEffect, useRef, memo } from 'react';

// function TradingViewWidget() {
//   const container = useRef();

//   useEffect(
//     () => {
//         if (container.current.querySelector("iframe")) {
//             return; // Widget already initialized
//           }
//       const script = document.createElement("script");
//       script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
//       script.type = "text/javascript";
//       script.async = true;
//       script.innerHTML = `
//         {
//           "autosize": true,
//           "symbol": "NASDAQ:AAPL",
//           "interval": "D",
//           "timezone": "Etc/UTC",
//           "theme": "dark",
//           "style": "1",
//           "locale": "en",
//           "allow_symbol_change": true,
//           "calendar": false,
//           "support_host": "https://www.tradingview.com"
//         }`;
//       container.current.appendChild(script);
//     },
//     []
//   );

//   return (
//     <div className="tradingview-widget-container" ref={container} style={{ height: "100%", width: "100%" }}>
//       <div className="tradingview-widget-container__widget" style={{ height: "calc(100% - 32px)", width: "100%" }}></div>
//       <div className="tradingview-widget-copyright"><a href="https://www.tradingview.com/" rel="noopener nofollow" target="_blank"><span className="blue-text">Track all markets on TradingView</span></a></div>
//     </div>
//   );
// }

// export default TradingViewWidget;