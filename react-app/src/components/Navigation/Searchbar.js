import { useState } from 'react';

function SearchBar() {
    const [query, setQuery] = useState('');

    const handleSearch = () => {
        window.location.href = `/search/results/?query=${query}`;
    };

    return (
        <div className='search-bar-component' id="s">
            <button className="edmBrite-search-button" onClick={handleSearch}><i className="fa">&#xf002;</i></button>
            <input
                className='input-search'
                type="text"
                value={query}
                placeholder=" Search events"
                onChange={(e) => setQuery(e.target.value)}
                onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                        handleSearch();
                    }
                }}
            />

        </div>
    );
}

export default SearchBar
