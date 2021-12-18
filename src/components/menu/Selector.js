import React, { useState, useEffect } from 'react';

function Selector() {
    return (
        <div className="Selector" >
            <i className="fas fa-bars" style={selectorStyle}></i>
        </div>
    )
}

export default Selector;

const selectorStyle = {
    marginLeft: "10px",
    paddingTop: "3px"
}

