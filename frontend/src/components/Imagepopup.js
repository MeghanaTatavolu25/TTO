import { useState } from "react";
import "../styles/ItemList.css";
import MyCard from "./Popup";


const items = [
    {
        id: 1,
        image: "https://via.placeholder.com/400x300/C4C4C4",
        popimage: "https://via.placeholder.com/250x230",
        title: "Item 1",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",

    },
    {
        id: 2,
        image: "https://via.placeholder.com/400x300/CCEBEB",
        popimage: "https://via.placeholder.com/250x230",
        title: "Item 2",
        content: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
        id: 3,
        image: "https://via.placeholder.com/400x300/BEC5CC",
        popimage: "https://via.placeholder.com/250x230",
        title: "Item 3",
        content: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
    },
    {
        id: 4,
        image: "https://via.placeholder.com/400x300/C4C4EE",
        popimage: "https://via.placeholder.com/250x230",
        title: "Item 4",
        content: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    },
    {
        id: 5,
        image: "https://via.placeholder.com/400x300/C2DDDD",
        popimage: "https://via.placeholder.com/250x230",
        title: "Item 5",
        content: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
    {
        id: 6,
        image: "https://via.placeholder.com/400x300/C3CADA",
        popimage: "https://via.placeholder.com/250x230",
        title: "Item 6",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
        id: 7,
        image: "https://via.placeholder.com/400x300/5E9906",
        popimage: "https://via.placeholder.com/250x230",
        title: "Item 7",
        content: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
        id: 8,
        image: "https://via.placeholder.com/400x300/E5E5E5",
        popimage: "https://via.placeholder.com/250x230",
        title: "Item 8",
        content: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
    },
    {
        id: 9,
        image: "https://via.placeholder.com/400x300/DCF3FD",
        popimage: "https://via.placeholder.com/250x230",
        title: "Item 9",
        content: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
    {
        id: 10,
        image: "https://via.placeholder.com/400x300",
        popimage: "https://via.placeholder.com/250x230",
        title: "Item 10",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
        id: 11,
        image: "https://via.placeholder.com/400x300/E1F7FC",
        popimage: "https://via.placeholder.com/250x230",
        title: "Item 11",
        content: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
        id: 12,
        image: "https://via.placeholder.com/400x300/CFECE0",
        popimage: "https://via.placeholder.com/250x230",
        title: "Item 12",
        content: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
    },
];

function ItemList() {
    const [activeItemId, setActiveItemId] = useState(null);

    const handleItemClick = (itemId) => {
        setActiveItemId(itemId);
    };

    const handlePopupClose = () => {
        setActiveItemId(null);
    };

    return (

        <>
            {/* <div>
                <MyCard
                    image="https://via.placeholder.com/200x200"
                    title="MY TITLE"
                    content="elerisque sit amet, egetie consequat aliquam, nisl ullamcorper fermentum, nascetur . " />
            </div> */}

            <div className="myitemList">
                {items.map((item, index) => (
                    <div key={item.id} className={`myitem ${index % 4 === 0 ? "firstInRow" : ""}`}>
                        <img style={{ width: "100%", height: "auto",borderRadius:"1em" }} src={item.image} alt={item.title} onMouseEnter={() => handleItemClick(item.id)} />
                        {activeItemId === item.id && (
                            <>
                                <div
                                    key={index}
                                    className={`popup ${index % 4 === 0 || index % 4 === 1 ? "left" : "right"
                                        }`}
                                >
                                    <MyCard image={item.popimage} title={item.title} content={item.content} />
                                </div>
                            </>
                        )}
                    </div>
                ))}


            </div>
        </>
    );
}

export default ItemList;
