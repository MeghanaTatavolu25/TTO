import React from "react"
// import "../styles/Home.css"
// import bg from "../assets/cc.jpg"
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';





function BreadCrumbs() {
    return (

        // <div className="home" style={{ backgroundColor: '#D4F1F4' }}>
            // <div className="headerContainer" >
                <Breadcrumbs aria-label="breadcrumb" paddingLeft={10} paddingTop={5}>
                    <Link underline="hover" color="inherit" href="/">
                        MUI
                    </Link>
                    <Link
                        underline="hover"
                        color="inherit"
                        href="/material-ui/getting-started/installation/"
                    >
                        Core
                    </Link>
                    <Link underline="hover" color="inherit" href="/">Breadcrumbs</Link>
                </Breadcrumbs>
            // </div>
        // </div>



    );
}
export default BreadCrumbs;