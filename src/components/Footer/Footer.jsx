import {observer} from "mobx-react-lite";
import React, {useContext, useState, useEffect} from "react";
import { Link } from 'react-router-dom';
import {Context} from "../../index";
import './Footer.css';

const Footer = observer(() => {
    const {radioStation} = useContext(Context);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        // Clean up the event listener when the component unmounts
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const getColumnCount = () => {
        return windowWidth >= 650 ? 4 : windowWidth >= 450 ? 3 : 2;
    };

    const columnCount = getColumnCount();

    const setGenreOnFooter = (genre) => {
        radioStation.setSelectGenre(genre)
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <div
            style={{
                width: '100%',
                background: 'black',
                marginTop: '60px',
                justifyContent: 'flex-start',
                alignContent: 'space-between',
                position: 'relative',
                padding: '0 auto'
            }}
        >
            <div
                style={{
                    display: 'flex',
                    width: '100%',
                    margin: '0 auto',
                    maxWidth: '1060px',
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    alignItems: 'flex-start',
                    padding:"0 10px"
                }}
            >
                {Array.from({ length: columnCount }).map((_, columnIndex) => (
                    <div
                        key={columnIndex}
                        style={{ margin: '50px 10px 20px', alignSelf: 'flex-start', color: 'white', cursor: 'pointer' }}
                    >
                        {radioStation.genres
                            .slice(
                                columnIndex * (Math.ceil(radioStation.genres.length / columnCount)),
                                (columnIndex + 1) * (Math.ceil(radioStation.genres.length / columnCount))
                            )
                            .map((genre) => (
                                <p key={genre.id} onClick={() => {genre.numberOfRS > 0 ? setGenreOnFooter(genre) : console.error('')}}>
                                    {genre.name} ({genre.numberOfRS})
                                </p>
                            ))}
                    </div>
                ))}
            </div>
            <div style={{ position: 'relative' }}>
                <div className='contact-info'>
                    <Link to="/contacts" className='contact-info-text'>Контакты</Link>
                    <Link to="/owners" className='contact-info-text'>Правообладателям</Link>
                    <Link to="/privacy-policy" className='contact-info-text'>Политика конфиденциальности</Link>
                </div>
            </div>
        </div>
    );
});

export default Footer;
