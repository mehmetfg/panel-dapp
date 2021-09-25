import React from "react";

const AssetWidget = () => {

    return (
        <div className="col-md-6">

            <div className="card total-users">
                <div className="card-header card-no-border">

                    <div className="card-header-right">
                        <ul className="list-unstyled card-option">
                            <li><i className="fa fa-spin fa-cog"></i></li>
                            <li><i className="view-html fa fa-code"></i></li>
                            <li><i className="icofont icofont-maximize full-card"></i></li>
                            <li><i className="icofont icofont-minus minimize-card"></i></li>
                            <li><i className="icofont icofont-refresh reload-card"></i></li>
                            <li><i className="icofont icofont-error close-card"></i></li>
                        </ul>
                    </div>
                </div>
                <div className="card-body pt-0">
                    <div className="apex-chart-container goal-status text-center row">
                        <div className="rate-card col-xl-12">

                            <div className="goal-end-point">
                                <ul>
                                    <li className="mt-0 pt-0">
                                        <h6 className="font-primary">{['Varlıklarım']}</h6>
                                        <h6 className="f-w-400"> </h6>
                                    </li>
                                    <li>
                                        <div className="row">
                                            <div className="col-sm-6 col-xl-6 col-lg-6">
                                                <div className="card o-hidden">
                                                    <div className="bg-secondary b-r-4 card-body">
                                                        <div className="media static-top-widget">
                                                            <div className="align-self-center text-center">
                                                                <img style={{width: "35px",height: "35px", }} src="/white.png"></img>
                                                            </div>
                                                            <div className="media-body"><span className="m-0">{['Satış Başlangıç Tarihi']} </span>
                                                                <h5 className="mb-0 counter">28.05.2021</h5>

                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-sm-6 col-xl-6 col-lg-6">
                                                <div className="card o-hidden">
                                                    <div className="bg-secondary b-r-4 card-body">
                                                        <div className="media static-top-widget">
                                                            <div className="align-self-center text-center">
                                                                <img style={{width: "35px",height: "35px", }} src="/white.png"></img>
                                                            </div>
                                                            <div className="media-body"><span className="m-0">{['Bir Sonraki Adım']} </span>
                                                                <h5 className="mb-0 counter">ICO</h5>

                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-sm-6 col-xl-6 col-lg-6">
                                                <div className="card o-hidden">
                                                    <div className="bg-primary b-r-4 card-body">
                                                        <div className="media static-top-widget">
                                                            <div className="align-self-center text-center">
                                                                <img style={{width: "35px",height: "35px", }} src="/white.png"></img>
                                                            </div>
                                                            <div className="media-body"><span className="m-0">{['Satılacak CYCE Miktarı']}</span>
                                                                <h5 className="mb-0 counter">10.000.000 CYCE</h5>

                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-sm-6 col-xl-6 col-lg-6">
                                                <div className="card o-hidden">
                                                    <div className="bg-primary b-r-4 card-body">
                                                        <div className="media static-top-widget">
                                                            <div className="align-self-center text-center">
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                                                                     stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                                                     className="feather feather-user-plus">
                                                                    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                                                                    <circle cx="8.5" cy="7" r="4"></circle>
                                                                    <line x1="20" y1="8" x2="20" y2="14"></line>
                                                                    <line x1="23" y1="11" x2="17" y2="11"></line>
                                                                </svg>
                                                            </div>
                                                            <div className="media-body"><span className="m-0">{['CYCE Fiyatı']}</span>
                                                                <h5 className="mb-0 counter">1 CYCE = 1.1 USD</h5>
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                                                                     stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                                                     className="feather feather-user-plus icon-bg">
                                                                    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                                                                    <circle cx="8.5" cy="7" r="4"></circle>
                                                                    <line x1="20" y1="8" x2="20" y2="14"></line>
                                                                    <line x1="23" y1="11" x2="17" y2="11"></line>
                                                                </svg>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-sm-6 col-xl-6 col-lg-6">
                                                <div className="card o-hidden">
                                                    <div className="bg-primary b-r-4 card-body">
                                                        <div className="media static-top-widget">
                                                            <div className="align-self-center text-center">
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                                                                     stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                                                     className="feather feather-shopping-bag">
                                                                    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                                                                    <line x1="3" y1="6" x2="21" y2="6"></line>
                                                                    <path d="M16 10a4 4 0 0 1-8 0"></path>
                                                                </svg>
                                                            </div>
                                                            <div className="media-body"><span className="m-0">{['Satılan CYCE Miktarı']}</span>
                                                                <h5 className="mb-0 counter">7.567.726 CYCE</h5>
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                                                                     stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                                                     className="feather feather-shopping-bag icon-bg">
                                                                    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                                                                    <line x1="3" y1="6" x2="21" y2="6"></line>
                                                                    <path d="M16 10a4 4 0 0 1-8 0"></path>
                                                                </svg>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-sm-6 col-xl-6 col-lg-6">
                                                <div className="card o-hidden">
                                                    <div className="bg-primary b-r-4 card-body">
                                                        <div className="media static-top-widget">
                                                            <div className="align-self-center text-center">
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                                                                     stroke="currentColor"
                                                                     className="feather feather-message-circle">
                                                                    <path
                                                                        d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                                                                </svg>
                                                            </div>
                                                            <div className="media-body"><span className="m-0">ETH/USD</span>
                                                                <h5 className="mb-0 counter">{/*{this.props.ethExchange}*/}</h5>
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                                                                     stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                                                     className="feather feather-message-circle icon-bg">
                                                                    <path
                                                                        d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                                                                </svg>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <ul className="col-xl-12">
                            <li>
                                <div className="goal-detail">
                                    <h6><span className="font-primary">{['Satılan Miktar :']} 7.567.726</span> CYCE
                                    </h6>
                                    <div className="progress sm-progress-bar progress-animate">
                                        <div className="progress-gradient-primary" role="progressbar"
                                             style={{width: "60%"}} aria-valuenow="75" aria-valuemin="0"
                                             aria-valuemax="100"></div>
                                    </div>
                                </div>
                                <div className="goal-detail mb-0">
                                    <h6><span className="font-primary">{['Satış Süresi:']} </span>{['1 Ay']}</h6>
                                    <div className="progress sm-progress-bar progress-animate">
                                        <div className="progress-gradient-primary" role="progressbar"
                                             style={{width: "60%"}}  aria-valuenow="75" aria-valuemin="0"
                                             aria-valuemax="100"></div>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className="btn-download btn btn-gradient f-w-500"><a className="text-white"
                                                                                          href="https://etherscan.io/address/0x96f4c1a2ecf5fbacd04aa7b7c0c8bac7de737058"
                                                                                          target="_blank">{['Tüm Alımları Görmek İçin Tıklayın.']}</a></div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

        </div>

    )

}
export default AssetWidget;