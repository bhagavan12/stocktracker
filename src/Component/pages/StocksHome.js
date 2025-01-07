import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { DataView } from "primereact/dataview";
// import '../Styles/StocksHome.css'
const StockList = () => {
    const [stocks, setStocks] = useState([]); // All stocks fetched
    const [displayedStocks, setDisplayedStocks] = useState([]); // Stocks shown on UI with quote data
    const [offset, setOffset] = useState(0); // Offset for pagination
    const limit = 10; // Number of stocks to load at a time
    const [searchTerm, setSearchTerm] = useState(""); // Search term
    const apikey = process.env.REACT_APP_FIN_API
    const navigate = useNavigate();
    // Fetch all stocks from the API initially
    useEffect(() => {
        fetch(`https://finnhub.io/api/v1/stock/symbol?exchange=US&token=${apikey}`)
            .then((response) => response.json())
            .then((data) => {
                setStocks(data); // Save all stocks
                loadMoreStocks(data.slice(0, limit)); // Fetch and display the first batch
            });
    }, []);

    // Fetch quote data for sliced stocks and update displayed stocks
    const loadMoreStocks = async (slicedStocks) => {
        const updatedStocks = await Promise.all(
            slicedStocks.map(async (stock) => {
                const response = await fetch(
                    `https://finnhub.io/api/v1/quote?symbol=${stock.symbol}&token=${apikey}`
                );
                const quoteData = await response.json();
                return {
                    ...stock,
                    current: quoteData.c, // Current price
                    high: quoteData.h,    // High price
                    low: quoteData.l,     // Low price
                };
            })
        );

        setDisplayedStocks((prev) => [...prev, ...updatedStocks]); // Append to displayed stocks
    };

    // Load more stocks when "Load More" is clicked
    const loadMore = () => {
        const nextOffset = offset + limit;
        loadMoreStocks(stocks.slice(offset, nextOffset));
        setOffset(nextOffset);
    };
    const handleSearch = (e) => {
        const term = e.target.value.toLowerCase();
        setSearchTerm(term);

        // Filter stocks based on search term
        const filteredStocks = stocks.filter(
            (stock) =>
                stock.displaySymbol.toLowerCase().includes(term) ||
                stock.description.toLowerCase().includes(term)
        );

        // Fetch quote data for filtered stocks
        setDisplayedStocks([]); // Reset displayed stocks for new search
        setOffset(limit); // Reset offset
        loadMoreStocks(filteredStocks.slice(0, limit));
    };
    // const stockTemplate = (stock) => (
    //   <div className="p-card p-mb-3" 
    //   style={{
    //     width: "90%",
    //     border: "1px solid black",
    //     boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
    //     // height:"80%",
    //     fontSize:"16px",
    //     paddingTop:"15px",
    //     padding:"10px"
    //   }}>
    //     <div>
    //       <strong style={{fontFamily:"monospace",fontSize:"20px",backgroundColor:"black",color:"white",width:"100%"}}>{stock.displaySymbol}</strong>
    //       <p>{stock.description} ({stock.currency})</p>
    //       <p>Current: {stock.current || "Loading..."}</p>
    //       <p>High: {stock.high || "Loading..."}</p>
    //       <p>Low: {stock.low || "Loading..."}</p>
    //     </div>
    //   </div>
    // );

    const stockTemplate = (stock) => (
        <div
            className="p-card p-mb-3"
            style={{
                width: "100%",
                maxWidth: "350px", // Restrict the card width for larger screens
                borderRadius: "10px", // Rounded corners for modern look
                border: "1px solid #e0e0e0", // Subtle border color
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Soft shadow for elevation
                padding: "20px",
                fontSize: "16px",
                backgroundColor: "#ffffff", // White background for a clean look
                marginTop: "20px",
            }}
        >
            <div>
                <strong
                    style={{
                        fontFamily: "monospace",
                        fontSize: "20px",
                        backgroundColor: "#333", // Dark background for the header
                        color: "#fff", // White text for contrast
                        padding: "10px 15px",
                        borderRadius: "8px", // Rounded corners for the header
                        display: "block",
                    }}
                >
                    {stock.displaySymbol}
                </strong>
                <p
                    style={{
                        fontSize: "14px",
                        color: "#555", // Slightly grey text for description
                        marginBottom: "10px",
                        lineHeight: "1.5",
                    }}
                >
                    {stock.description} ({stock.currency})
                </p>
                <div style={{ marginBottom: "10px" }}>
                    <strong
                        style={{
                            color: "#333", // Dark color for key stats
                            fontSize: "16px",
                        }}
                    >
                        Current:{" "}
                    </strong>
                    <span style={{ color: "#007bff" }}>
                        {stock.current || "Loading..."}
                    </span>
                </div>
                <div style={{ marginBottom: "10px" }}>
                    <strong
                        style={{
                            color: "#333",
                            fontSize: "16px",
                        }}
                    >
                        High:{" "}
                    </strong>
                    <span style={{ color: "#28a745" }}>
                        {stock.high || "Loading..."}
                    </span>
                </div>
                <div>
                    <strong
                        style={{
                            color: "#333",
                            fontSize: "16px",
                        }}
                    >
                        Low:{" "}
                    </strong>
                    <span style={{ color: "#dc3545" }}>
                        {stock.low || "Loading..."}
                    </span>
                </div>
            </div>
            <button
                style={{
                    marginTop: "15px",
                    width: "100%",
                    backgroundColor: "#007bff",
                    color: "#fff",
                    border: "none",
                    padding: "10px 15px",
                    fontSize: "16px",
                    borderRadius: "8px",
                    cursor: "pointer",
                }}
                onClick={() => navigate(`/stockpage/${stock.displaySymbol}`, { state: { stock } })}
            >
                View Stock Details
            </button>
        </div>
    );


    return (
        <div className="" style={{}}>
            <div className="d-flex justify-content-center align-items-center" style={{ width: 'max-content', boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.1)", margin: "auto", borderRadius: "5px", marginTop: "2px" }}>
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                </span>
                    <InputText
                        value={searchTerm}
                        onChange={handleSearch}
                        placeholder="Search stocks by symbol or description..."
                        className="p-inputtext-lg"
                        style={{ width: "150%", height: "40px" }}
                    />
            </div>
            <div className="p-col-12">
                <div
                    className="p-grid justify-content-center"
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
                        gap: "10px",
                        justifyItems: "center",
                    }}
                >
                    {displayedStocks?displayedStocks.map((stock) => {
                        console.log("stock in home", stock);
                        return stockTemplate(stock)
                    }):(
                        <p>Loading....</p>
                    )}
                </div>
            </div>
            {offset < stocks.length && (
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "10vh" }}>
                    <button
                        type="button"
                        className="btn btn-outline-primary btn-sm"
                        onClick={loadMore}
                    >
                        Load more...
                    </button>
                </div>

            )}
        </div>
    );
};

export default StockList;

// <div>
//   <h1>Stock List</h1>
//   <div className="grid-container">
//     {displayedStocks.map((stock, index) => (

//       <Card title={stock.displaySymbol} key={index}>
//         {stock.description} ({stock.currency}) <br />
//         <span>Current: {stock.current || "Loading..."}</span> <br />
//         <span>High: {stock.high || "Loading..."}</span> <br />
//         <span>Low: {stock.low || "Loading..."}</span>
//       </Card>
//     ))}
//   </div>
//   {offset < stocks.length && (
//     <button onClick={loadMore}>Load More</button>
//   )}
// </div>

//   const handleSearch = (e) => {
//     const term = e.target.value.toLowerCase();
//     setSearchTerm(term);

//     const filteredStocks = stocks.filter(
//       (stock) =>
//         stock.displaySymbol.toLowerCase().includes(term) ||
//         stock.description.toLowerCase().includes(term)
//     );
//     loadMoreStocks(filteredStocks.slice(0, limit))
//     // setDisplayedStocks(filteredStocks.slice(0, limit)); // Update displayed stocks
//     setOffset(limit); // Reset offset for pagination
//   };
{/* <DataView
              value={displayedStocks}
              itemTemplate={stockTemplate}
              layout="grid"
              rows={limit}
            /> */}