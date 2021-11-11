import React from 'react';
import '../themes/BookCard.css'
const BookCard = (props) => (
    <>
            <figure className='book'>
                {/*Front */}
                <ul className='hardcover_front'>
                    <li>
                        <div style={{
                            color:'yellow'
                        }} className="coverDesign yellow">
                            <span className="ribbon">NEW</span>
                            <h1>CSS</h1>
                            <p>TRANSFORM</p>
                        </div>
                    </li>
                    <li/>
                </ul>

                {/*Pages*/}

                <ul className='page'>
                    <li/>
                    <li><a className="btn" href="#">Download</a></li>
                    <li/>
                    <li/>
                    <li/>
                </ul>

                {/*Book*/}

                <ul className='hardcover_back'>
                    <li/>
                    <li/>
                </ul>
                <ul className='book_spine'>
                    <li/>
                    <li/>
                </ul>
                <figcaption>
                    <h1>CSS Ninja</h1>
                    <span>By Marco Barría for Codrops</span>
                    <p>Tomatillo water chestnut mustard cabbage yarrow sierra leone bologi. Watercress green bean
                        groundnut earthnut pea dandelion radicchio.</p>
                </figcaption>
            </figure>
    </>
);

export default BookCard;