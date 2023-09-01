import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from 'react-bootstrap/Button';

const useStyles = makeStyles({
    container: {
        width: 600,
        height: 400,
        borderRadius: "1em",
        overflow: "hidden",
        position: "relative",
        backgroundColor: "#012752",
        fontFamily: "Hahmlet",
        color: "white",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
        "@media (max-width: 1200px)": {
            width: 440,
            height: 270,
            borderRadius: "8px",
            fontSize:"15px"
        },
    },

    image: {
        width: 220,
        height: 220,
        objectFit: "cover",
        borderRadius: "16px",
        "@media (max-width: 1200px)": {
            width: 140,
            height: 140,
            borderRadius: "8px",
            fontSize:"15px"

        },
    },


    
});

function MyCard(props) {
    const classes = useStyles();
    const { image, title, content } = props;

    return (
        <div className={classes.container}>
            <div style={{ display: "flex", flexDirection: "row", margin: "30px 20px 10px 30px" }}>
                <div>
                    <img src={image} alt={title} className={classes.image} />
                    <p style={{ marginTop: "0.6em", fontSize: "1.6em", fontWeight: 600, color: "#FCFCFC" }}>{title}</p>
                </div>
                <p style={{ marginLeft: "30px", fontSize: "1.4em", color: "#FFFEFE" }}>{content}</p>
            </div>

            <div>
                <Button variant="success" style={{
                    fontFamily: "Hahmlet", fontSize: "1.5em", backgroundColor: '#0F74E7', color: '#fff', borderRadius: "2em", width: "9em", height: "2.2em", position: "absolute",
                    bottom: "2em",
                    right: "2em",
                }}>
                    Visit Page
                </Button>
            </div>
        </div>
    );
}

export default MyCard;
