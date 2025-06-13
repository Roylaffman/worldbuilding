function List() {
    const books = [
        {
            id: 1,
            title: "The Great Gatsby",
            author: "F. Scott Fitzgerald",
            description: "A story of wealth, love, and the American Dream in the 1920s."
        },
        {
            id: 2,
            title: "To Kill a Mockingbird",
            author: "Harper Lee",
            description: "A powerful story about racial inequality and moral growth in the American South."
        },
        {
            id: 3,
            title: "1984",
            author: "George Orwell",
            description: "A dystopian novel about totalitarianism, surveillance, and thought control."
        }
    ];

    return (
        <div className="book-list">
            <h2>Book List</h2>
            {books.map(book => (
                <div key={book.id} className="book-item">
                    <h2>{book.title}</h2>
                    <h3>by {book.author}</h3>
                    <p>{book.description}</p>
                    <div> *</div>
                    <div><a> *</a></div>
                    <hr></hr>
                </div>

            ))}
        </div>

    );
}

export default List;
