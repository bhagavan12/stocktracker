import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchStocks, updateStock, deleteStock, selectStocks } from "../Slices/stockSlice";
import { useNavigate } from "react-router-dom";

const Portfolio = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const stocks = useSelector(selectStocks);
    const [selectedStock, setSelectedStock] = useState(null);
    const [newQuantity, setNewQuantity] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [showSellModal, setShowSellModal] = useState(false);
    const [stockToSell, setStockToSell] = useState(null);
    useEffect(() => {
        // Replace '1' with dynamic user ID if needed
        dispatch(fetchStocks(1));
    }, [dispatch]);
    const handleDeleteStock = (stockId) => {
        dispatch(deleteStock({ userId: 1, stockId }));
    };

    const handleUpdateStock = (stockId, updatedStock) => {
        dispatch(updateStock({ userId: 1, stockId, stock: updatedStock }));
    };
    const openModal = (stock) => {
        setSelectedStock(stock);
        setNewQuantity(stock.quantity);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const handleSaveChanges = () => {
        if (selectedStock) {
            handleUpdateStock(selectedStock.id, { quantity: newQuantity, buyPrice: selectedStock.buyPrice });
            closeModal();
        }
    };

    const calculateStockValue = (stock) => stock.quantity * stock.buyPrice;

    const calculateTotalPortfolioValue = () => {
        return stocks.reduce((total, stock) => total + calculateStockValue(stock), 0);
    };
    const stockTemplate = (stock) => (
        <div
            key={stock.id}
            className="p-card p-mb-3"
            style={{
                width: "100%",
                maxWidth: "350px",
                borderRadius: "10px",
                border: "1px solid #e0e0e0",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                padding: "20px",
                fontSize: "16px",
                backgroundColor: "#ffffff",
                marginTop: "20px",
            }}
        >
            <div>
                <strong
                    style={{
                        fontFamily: "monospace",
                        fontSize: "20px",
                        backgroundColor: "#333",
                        color: "#fff",
                        padding: "10px 15px",
                        borderRadius: "8px",
                        display: "block",
                    }}
                >

                    {stock.ticker}
                </strong>
                <p
                    style={{
                        fontSize: "14px",
                        color: "#555",
                        marginBottom: "10px",
                        lineHeight: "1.5",
                    }}
                >

                    {stock.stockName}
                </p>
                <div style={{ marginBottom: "10px" }}>
                    <strong style={{ color: "#333", fontSize: "16px" }}>Quantity: </strong>
                    <span>{stock.quantity}</span>
                </div>
                <div style={{ marginBottom: "10px" }}>
                    <strong style={{ color: "#333", fontSize: "16px" }}>Buy Price: </strong>
                    <span>${stock?.buyPrice}</span>
                </div>
                <div style={{ marginBottom: "10px" }}>
                    <strong style={{ color: "#333", fontSize: "16px" }}>Stock Value: </strong>
                    <span>${calculateStockValue(stock).toFixed(2)}</span>
                </div>
            </div>
            <div style={{ display: "flex", gap: "10px" }}>
                <button
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

                    }}
                    onClick={() => navigate(`/stockpage/${stock.ticker}`, { state: { stock } })}
                >
                    View
                </button>
                <button
                    style={{
                        marginTop: "10px",
                        width: "100%",
                        backgroundColor: "#ffc107",
                        color: "#fff",
                        border: "none",
                        padding: "5px 10px",
                        fontSize: "16px",
                        borderRadius: "8px",
                        cursor: "pointer",
                    }}
                    // onClick={() => handleUpdateStock(stock.id, { quantity: stock.quantity + 1, buyPrice: stock.buyPrice })}
                    onClick={() => openModal(stock)}
                >
                    Update Stock
                </button>
                <button
                    style={{
                        marginTop: "10px",
                        width: "100%",
                        backgroundColor: "#dc3545",
                        color: "#fff",
                        border: "none",
                        padding: "5px 10px",
                        fontSize: "16px",
                        borderRadius: "8px",
                        cursor: "pointer",
                    }}
                    onClick={() => openSellModal(stock)}
                >
                    Sell Stock
                </button>
            </div>
        </div>
    );
    const openSellModal = (stock) => {
        setStockToSell(stock);
        setShowSellModal(true);
    };

    const closeSellModal = () => {
        setShowSellModal(false);
    };

    const confirmSellStock = () => {
        if (stockToSell) {
            dispatch(deleteStock({ userId: 1, stockId: stockToSell.id }));
            setStockToSell(null);
            closeSellModal();
        }
    };
    return (
        <>
            <div>
                <p className="d-flex justify-content-center align-items-center mx-auto mb-2 p-3 border rounded text-primary" style={{ fontFamily: "monospace", fontSize: "18px", fontWeight: "bold",width:"max-content" }}>

                    <span className="marketeq--wallet-money"></span>
                    Total Portfolio Value: ${calculateTotalPortfolioValue().toFixed(2)}
                </p>
            </div>
            <div
                className="d-flex justify-content-center flex-wrap"
                style={{ gap: "20px", padding: "20px" }}
            >
                {stocks.map((stock) => stockTemplate(stock))}
            </div>
            {showModal && (
                <div
                    className="modal fade show"
                    id="updateStockModal"
                    style={{ display: "block" }}
                    aria-labelledby="updateStockModalLabel"
                    aria-hidden="true"
                >
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="updateStockModalLabel">Update Stock Quantity</h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={closeModal}
                                    aria-label="Close"
                                ></button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="mb-3">
                                        <label htmlFor="stockQuantity" className="form-label">
                                            New Quantity
                                        </label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            id="stockQuantity"
                                            value={newQuantity}
                                            onChange={(e) => setNewQuantity(Number(e.target.value))}
                                            min="1"
                                        />
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={closeModal}
                                >
                                    Close
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={handleSaveChanges}
                                >
                                    Save changes
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {showSellModal && (
                <div className="modal fade show"
                    id="sellStockModal"
                    style={{ display: "block" }}
                    aria-labelledby="sellStockModalLabel"
                    aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">

                            <div className="modal-body">
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={closeSellModal}
                                    aria-label="Close"
                                ></button>
                                <h5>Confirm Stock Sale</h5>
                                <p>Are you sure you want to sell {stockToSell?.stockName}?</p>
                                <button onClick={confirmSellStock} className="btn btn-primary" style={{ marginRight: "4px" }}>Yes</button>
                                <button onClick={closeSellModal} className="btn btn-danger">No</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Portfolio;
