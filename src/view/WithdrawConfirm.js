
const WithdrawConfirm = () => {

    return <div>

        <div className="col-xl-3 xl-50 chart_data_right box-col-12">
            <div className="card">
                <div className="card-body">
                    <div className="media align-items-center">
                        <div className="media-body right-chart-content">
                            <h4>$95,900<span className="new-box">Hot</span></h4><span>Purchase Order Value</span>
                        </div>
                        <div className="knob-block text-center">
                            <div style="display:inline;width:65px;height:65px;">
                                <canvas width="65" height="65"></canvas>
                                <input className="knob1" data-width="10" data-height="70" data-thickness=".3"
                                       data-angleoffset="0" data-linecap="round" data-fgcolor="#7366ff"
                                       data-bgcolor="#eef5fb" value="60"
                                      >
                                </input></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

}
export default WithdrawConfirm;