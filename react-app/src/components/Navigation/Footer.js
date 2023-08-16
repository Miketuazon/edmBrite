import { useState } from 'react';

function Footer() {
    const [query, setQuery] = useState('');

    const handleSearch = () => {
        window.location.href = `/search/results/?query=${query}`;
    };

    return (
        <div className='footer'>
            <ul className='git-linked-link'>
                <li className='name'>
                    Michael Tuazon
                </li>
                <li className='link'>
                    <a href='https://www.linkedin.com/in/miketuazon/' target="_blank"><i class="fa-brands fa-linkedin"></i></a>
                    &nbsp;&nbsp; |
                    <a href='https://github.com/Miketuazon' target="_blank" className='end'><i class="fa-brands fa-github" style={{ "color": "black" }}></i></a>
                    &nbsp;&nbsp; |
                    <a href='https://wellfound.com/u/michael-tuazon' target="_blank" className='end'><i class="fa-brands fa-angellist" style={{ "color": "gray", "listStyle": "none" }}></i></a>

                </li>
            </ul>
        </div>

    );
}

export default Footer
