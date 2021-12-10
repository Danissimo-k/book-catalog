import React from 'react';

function BookDialog({title,description, isbn, rating,  year, authors, id}) {
    return (
        <>
        {/*    Title*/}
            <div>Title: {title}</div>
        {/*    Authors*/}
            <div>Authors: {authors}</div>
        {/*    Year*/}
            <div>Year: {year}</div>
        {/*    Rating*/}

        {/*    ISbn*/}
        {/*    Description*/}
        </>
    );
}

export default BookDialog;