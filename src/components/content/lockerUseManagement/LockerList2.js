export function LockerList2() {
    const space = " ";
    return (
        <div>
            <table className="styled-table" style={styledTable}>
                <thead>
                    <tr>
                        <th>Tòa nhà</th>
                        <th>Tầng</th>
                        <th>Tủ</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    </tr>
                </tbody>
            </table>
            <div style={{marginLeft: "228px", marginTop: "10px"}}> Không có dữ liệu để hiển thị </div>
            <div className="pagination" style={paginationStyle}>
                <i className="fas fa-chevron-left" style={pageNumberStyle}></i>
                <li className="page__numbers activate" style={pageNumberStyle}> 1</li>
                <li className="page__numbers" style={pageNumberStyle}>2</li>
                <li className="page__numbers" style={pageNumberStyle}>3</li>
                <li className="page__numbers" style={pageNumberStyle}>4</li>
                <li className="page__numbers" style={pageNumberStyle}>5</li>
                <li className="page__numbers" style={pageNumberStyle}>6</li>
                <li className="page__dots" style={pageNumberStyle}>...</li>
                <li className="page__numbers" style={pageNumberStyle}> 10</li>
                <i className="fas fa-chevron-right" style={pageNumberStyle}></i>
            </div>
        </div>

    )
}

const styledTable = {
    width: "630px",
    marginLeft: "10px",
    marginRight: "5px",
    marginTop: "20px",
    paddingBottom: "5px",
}

const actionIconStyle = {
    display: "inline",
    marginLeft: "25px",
    fontSize: "20px",
}

const paginationStyle = {
    marginLeft: "220px",
    marginTop: "25px",
    paddingBottom: "15px",
}

const pageNumberStyle = {
    display: "inline",
    width: "5px",
    marginLeft: "10px",
}