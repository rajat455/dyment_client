import { DataGrid } from "@mui/x-data-grid";
import apiHelper from "../../Commen/ApiHelper";
import { useEffect, useState } from "react";
import DiamondIcon from '@mui/icons-material/Diamond';
import { Card, CardContent } from "@mui/material";


export default function EmployeeDashboard() {
    const [data, setdata] = useState({});
    const [loading, setloading] = useState(false);


    const GetData = async () => {
        try {
            setloading(true)
            const result = await apiHelper.FetchDashBorad()
            setdata(result.data.data)
            setloading(false)
        } catch (error) {
            setloading(false)
            window.showSnack(error.message, { variant: "error" })
        }
    }

    useEffect(() => {
        GetData()
    }, []);


    const columns = [
        {
            field: "lotNumber", headerName: "Lot Number", flex: 1, renderCell: (cell) => {
                return cell.row.lot.lotNumber
            }
        },
        { field: "totalPcs", headerName: "Total Pcs", flex: 1 },
        { field: "completedPcs", headerName: "Completed Pcs", flex: 1 },
        { field: "rejectedPcs", headerName: "Rejected Pcs", flex: 1 },
        {
            field: "purpose", headerName: "Purpose", flex: 1, renderCell: (cell) => {
                return cell.row.purpose.toUpperCase()
            }
        },

    ]
    return <>
        <div className="row">
            <div className="col-12">
                <h3>Dashboard</h3>
                <hr />
            </div>
            <div className="col-12 p-0">
                <h5 className="mt-3">
                    Today Work
                </h5>
            </div>
            <div className="col-12 mb-3 p-0">
                <div className="row mx-0" style={{ rowGap: "1rem" }}>
                    <div className="col-12 p-0  pe-md-2 col-md-6 col-lg-4">
                        <Card sx={{ width: "100%", background: "#2769a921" }}>
                            <CardContent>
                                <small><b>Toching</b></small>
                                <hr />
                                <div className="row m-0 gap-2">
                                    <div className="col-12 p-0">
                                        <div className="rounded-2" style={{ position: "relative", background: "#2769a9", color: "white", padding: "1.5rem" }}>
                                            <h6 className="mb-0" style={{ fontFamily: "serif", fontSize: "1.8rem" }}><b>{data.today && data.today.tochingData && data.today.tochingData.totalPcs ? data.today.tochingData.totalPcs.toLocaleString("en-US") : 0}</b></h6>
                                            <span style={{ fontFamily: "serif", fontSize: "1.3rem" }} className="fw-bold">Total Pcs</span>
                                            <DiamondIcon style={{
                                                opacity: 0.3,
                                                rotate: "49deg",
                                                fontSize: "5rem",
                                                position: "absolute",
                                                right: 30,
                                                top: "50%",
                                                transform: "translate(0%, -50%)",
                                            }} />
                                        </div>
                                    </div>
                                    <div className="col-12 p-0">
                                        <div className="rounded-2" style={{ position: "relative", background: "#307d33", color: "white", padding: "1.5rem" }}>
                                            <h6 className="mb-0" style={{ fontFamily: "serif", fontSize: "1.8rem" }}><b>{data.today && data.today.tochingData && data.today.tochingData.completedPcs ? data.today.tochingData.completedPcs.toLocaleString("en-US") : 0}</b></h6>
                                            <span style={{ fontFamily: "serif", fontSize: "1.3rem" }} className="fw-bold">Completed Pcs</span>
                                            <DiamondIcon style={{
                                                opacity: 0.3,
                                                rotate: "49deg",
                                                fontSize: "5rem",
                                                position: "absolute",
                                                right: 30,
                                                top: "50%",
                                                transform: "translate(0%, -50%)",
                                            }} />
                                        </div>
                                    </div>
                                    <div className="col-12 p-0">
                                        <div className="rounded-2" style={{ position: "relative", background: "#d61a0c", color: "white", padding: "1.5rem" }}>
                                            <h6 className="mb-0" style={{ fontFamily: "serif", fontSize: "1.8rem" }}><b>{data.today && data.today.tochingData && data.today.tochingData.rejectedPcs ? data.today.tochingData.rejectedPcs.toLocaleString("en-US") : 0}</b></h6>
                                            <span style={{ fontFamily: "serif", fontSize: "1.3rem" }} className="fw-bold">Rejected Pcs</span>
                                            <DiamondIcon style={{
                                                opacity: 0.3,
                                                rotate: "49deg",
                                                fontSize: "5rem",
                                                position: "absolute",
                                                right: 30,
                                                top: "50%",
                                                transform: "translate(0%, -50%)",
                                            }} />
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                    <div className="col-12 col-md-6 col-lg-8 p-0 ps-md-2" style={{ minHeight: "455px" }}>
                        <Card style={{ width: "100%", height: "100%", background: "#2769a921" }}>
                            <CardContent style={{ height: "100%" }}>
                                <small><b>Toching</b></small>
                                <hr />
                                <DataGrid loading={loading}
                                    rows={data.today && data.today.tochingData && data.today.tochingData.rows ? [...data.today.tochingData.rows] : []}
                                    columns={[...columns]}

                                    getRowId={(e) => e._id}
                                    style={{ border: "none", height: "calc(100% - 55px)" }}
                                    initialState={{
                                        pagination: {
                                            paginationModel: {
                                                pageSize: 5,
                                            },
                                        },
                                    }}
                                    pageSizeOptions={[5]}
                                />
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
            <div className="col-12 p-0">
                <div className="row mx-0" style={{ rowGap: "1rem" }}>
                    <div className="col-12 col-md-6 col-lg-8 p-0 pe-md-2" style={{ minHeight: "455px" }}>
                        <Card style={{ width: "100%", height: "99.5%", background: "#ff00001c" }}>
                            <CardContent style={{ height: "100%" }}>
                                <small><b>4P</b></small>
                                <hr />
                                <DataGrid loading={loading}
                                    rows={data.today && data.today.fourPData && data.today.fourPData.rows ? [...data.today.fourPData.rows] : []}
                                    columns={[...columns]}

                                    getRowId={(e) => e._id}
                                    style={{ border: "none", height: "calc(100% - 55px)" }}
                                    initialState={{
                                        pagination: {
                                            paginationModel: {
                                                pageSize: 5,
                                            },
                                        },
                                    }}
                                    pageSizeOptions={[5]}
                                />
                            </CardContent>
                        </Card>
                    </div>
                    <div className="col-12 p-0  ps-md-2 col-md-6 col-lg-4">
                        <Card sx={{ width: "100%", background: "#ff00001c" }}>
                            <CardContent>
                                <small><b>4P</b></small>
                                <hr />
                                <div className="row m-0 gap-2">
                                    <div className="col-12 p-0">
                                        <div className="rounded-2" style={{ position: "relative", background: "#2769a9", color: "white", padding: "1.5rem" }}>
                                            <h6 className="mb-0" style={{ fontFamily: "serif", fontSize: "1.8rem" }}><b>{data.today && data.today.fourPData && data.today.fourPData.totalPcs ? data.today.fourPData.totalPcs.toLocaleString("en-US") : 0}</b></h6>
                                            <span style={{ fontFamily: "serif", fontSize: "1.3rem" }} className="fw-bold">Total Pcs</span>
                                            <DiamondIcon style={{
                                                opacity: 0.3,
                                                rotate: "49deg",
                                                fontSize: "5rem",
                                                position: "absolute",
                                                right: 30,
                                                top: "50%",
                                                transform: "translate(0%, -50%)",
                                            }} />
                                        </div>
                                    </div>
                                    <div className="col-12 p-0">
                                        <div className="rounded-2" style={{ position: "relative", background: "#307d33", color: "white", padding: "1.5rem" }}>
                                            <h6 className="mb-0" style={{ fontFamily: "serif", fontSize: "1.8rem" }}><b>{data.today && data.today.fourPData && data.today.fourPData.completedPcs ? data.today.fourPData.completedPcs.toLocaleString("en-US") : 0}</b></h6>
                                            <span style={{ fontFamily: "serif", fontSize: "1.3rem" }} className="fw-bold">Completed Pcs</span>
                                            <DiamondIcon style={{
                                                opacity: 0.3,
                                                rotate: "49deg",
                                                fontSize: "5rem",
                                                position: "absolute",
                                                right: 30,
                                                top: "50%",
                                                transform: "translate(0%, -50%)",
                                            }} />
                                        </div>
                                    </div>
                                    <div className="col-12 p-0">
                                        <div className="rounded-2" style={{ position: "relative", background: "#d61a0c", color: "white", padding: "1.5rem" }}>
                                            <h6 className="mb-0" style={{ fontFamily: "serif", fontSize: "1.8rem" }}><b>{data.today && data.today.fourPData && data.today.fourPData.rejectedPcs ? data.today.fourPData.rejectedPcs.toLocaleString("en-US") : 0}</b></h6>
                                            <span style={{ fontFamily: "serif", fontSize: "1.3rem" }} className="fw-bold">Rejected Pcs</span>
                                            <DiamondIcon style={{
                                                opacity: 0.3,
                                                rotate: "49deg",
                                                fontSize: "5rem",
                                                position: "absolute",
                                                right: 30,
                                                top: "50%",
                                                transform: "translate(0%, -50%)",
                                            }} />
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
            <div className="col-12 p-0">
                <h5 className="mt-3">
                    Monthly Work
                </h5>
            </div>
            <div className="col-12 mb-3 p-0">
                <div className="row mx-0" style={{ rowGap: "1rem" }}>
                    <div className="col-12 p-0  pe-md-2 col-md-6 col-lg-4">
                        <Card sx={{ width: "100%", background: "#2769a921" }}>
                            <CardContent>
                                <small><b>Toching</b></small>
                                <hr />
                                <div className="row m-0 gap-2">
                                    <div className="col-12 p-0">
                                        <div className="rounded-2" style={{ position: "relative", background: "#2769a9", color: "white", padding: "1.5rem" }}>
                                            <h6 className="mb-0" style={{ fontFamily: "serif", fontSize: "1.8rem" }}><b>{data.month && data.month.tochingData && data.month.tochingData.totalPcs ? data.month.tochingData.totalPcs.toLocaleString("en-US") : 0}</b></h6>
                                            <span style={{ fontFamily: "serif", fontSize: "1.3rem" }} className="fw-bold">Total Pcs</span>
                                            <DiamondIcon style={{
                                                opacity: 0.3,
                                                rotate: "49deg",
                                                fontSize: "5rem",
                                                position: "absolute",
                                                right: 30,
                                                top: "50%",
                                                transform: "translate(0%, -50%)",
                                            }} />
                                        </div>
                                    </div>
                                    <div className="col-12 p-0">
                                        <div className="rounded-2" style={{ position: "relative", background: "#307d33", color: "white", padding: "1.5rem" }}>
                                            <h6 className="mb-0" style={{ fontFamily: "serif", fontSize: "1.8rem" }}><b>{data.month && data.month.tochingData && data.month.tochingData.completedPcs ? data.month.tochingData.completedPcs.toLocaleString("en-US") : 0}</b></h6>
                                            <span style={{ fontFamily: "serif", fontSize: "1.3rem" }} className="fw-bold">Completed Pcs</span>
                                            <DiamondIcon style={{
                                                opacity: 0.3,
                                                rotate: "49deg",
                                                fontSize: "5rem",
                                                position: "absolute",
                                                right: 30,
                                                top: "50%",
                                                transform: "translate(0%, -50%)",
                                            }} />
                                        </div>
                                    </div>
                                    <div className="col-12 p-0">
                                        <div className="rounded-2" style={{ position: "relative", background: "#d61a0c", color: "white", padding: "1.5rem" }}>
                                            <h6 className="mb-0" style={{ fontFamily: "serif", fontSize: "1.8rem" }}><b>{data.month && data.month.tochingData && data.month.tochingData.rejectedPcs ? data.month.tochingData.rejectedPcs.toLocaleString("en-US") : 0}</b></h6>
                                            <span style={{ fontFamily: "serif", fontSize: "1.3rem" }} className="fw-bold">Rejected Pcs</span>
                                            <DiamondIcon style={{
                                                opacity: 0.3,
                                                rotate: "49deg",
                                                fontSize: "5rem",
                                                position: "absolute",
                                                right: 30,
                                                top: "50%",
                                                transform: "translate(0%, -50%)",
                                            }} />
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                    <div className="col-12 col-md-6 col-lg-8 p-0 ps-md-2" style={{ minHeight: "455px" }}>
                        <Card style={{ width: "100%", height: "97.5%", background: "#2769a921" }}>
                            <CardContent style={{ height: "100%" }}>
                                <small><b>Toching</b></small>
                                <hr />
                                <DataGrid loading={loading}
                                    rows={data.month && data.month.tochingData && data.month.tochingData.rows ? [...data.month.tochingData.rows] : []}
                                    columns={[...columns]}

                                    getRowId={(e) => e._id}
                                    style={{ border: "none", height: "calc(100% - 55px)" }}
                                    initialState={{
                                        pagination: {
                                            paginationModel: {
                                                pageSize: 5,
                                            },
                                        },
                                    }}
                                    pageSizeOptions={[5]}
                                />
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
            <div className="col-12 p-0">
                <div className="row mx-0" style={{ rowGap: "1rem" }}>
                    <div className="col-12 col-md-6 col-lg-8 p-0 pe-md-2" style={{ minHeight: "455px" }}>
                        <Card style={{ width: "100%", height: "97.5%", background: "#ff00001c" }}>
                            <CardContent style={{ height: "100%" }}>
                                <small><b>4P</b></small>
                                <hr />
                                <DataGrid loading={loading}
                                    rows={data.month && data.month.fourPData && data.month.fourPData.rows ? [...data.month.fourPData.rows] : []}
                                    columns={[...columns]}
                                    getRowId={(e) => e._id}
                                    style={{ border: "none", height: "calc(100% - 55px)", }}
                                    initialState={{
                                        pagination: {
                                            paginationModel: {
                                                pageSize: 5,
                                            },
                                        },
                                    }}
                                    pageSizeOptions={[5]}
                                />
                            </CardContent>
                        </Card>
                    </div>
                    <div className="col-12 p-0  ps-md-2 col-md-6 col-lg-4">
                        <Card sx={{ width: "100%", background: "#ff00001c" }}>
                            <CardContent>
                                <small><b>4P</b></small>
                                <hr />
                                <div className="row m-0 gap-2">
                                    <div className="col-12 p-0">
                                        <div className="rounded-2" style={{ position: "relative", background: "#2769a9", color: "white", padding: "1.5rem" }}>
                                            <h6 className="mb-0" style={{ fontFamily: "serif", fontSize: "1.8rem" }}><b>{data.month && data.month.fourPData && data.month.fourPData.totalPcs ? data.month.fourPData.totalPcs.toLocaleString("en-US") : 0}</b></h6>
                                            <span style={{ fontFamily: "serif", fontSize: "1.3rem" }} className="fw-bold">Total Pcs</span>
                                            <DiamondIcon style={{
                                                opacity: 0.3,
                                                rotate: "49deg",
                                                fontSize: "5rem",
                                                position: "absolute",
                                                right: 30,
                                                top: "50%",
                                                transform: "translate(0%, -50%)",
                                            }} />
                                        </div>
                                    </div>
                                    <div className="col-12 p-0">
                                        <div className="rounded-2" style={{ position: "relative", background: "#307d33", color: "white", padding: "1.5rem" }}>
                                            <h6 className="mb-0" style={{ fontFamily: "serif", fontSize: "1.8rem" }}><b>{data.month && data.month.fourPData && data.month.fourPData.completedPcs ? data.month.fourPData.completedPcs.toLocaleString("en-US") : 0}</b></h6>
                                            <span style={{ fontFamily: "serif", fontSize: "1.3rem" }} className="fw-bold">Completed Pcs</span>
                                            <DiamondIcon style={{
                                                opacity: 0.3,
                                                rotate: "49deg",
                                                fontSize: "5rem",
                                                position: "absolute",
                                                right: 30,
                                                top: "50%",
                                                transform: "translate(0%, -50%)",
                                            }} />
                                        </div>
                                    </div>
                                    <div className="col-12 p-0">
                                        <div className="rounded-2" style={{ position: "relative", background: "#d61a0c", color: "white", padding: "1.5rem" }}>
                                            <h6 className="mb-0" style={{ fontFamily: "serif", fontSize: "1.8rem" }}><b>{data.month && data.month.fourPData && data.month.fourPData.rejectedPcs ? data.month.fourPData.rejectedPcs.toLocaleString("en-US") : 0}</b></h6>
                                            <span style={{ fontFamily: "serif", fontSize: "1.3rem" }} className="fw-bold">Rejected Pcs</span>
                                            <DiamondIcon style={{
                                                opacity: 0.3,
                                                rotate: "49deg",
                                                fontSize: "5rem",
                                                position: "absolute",
                                                right: 30,
                                                top: "50%",
                                                transform: "translate(0%, -50%)",
                                            }} />
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    </>
}