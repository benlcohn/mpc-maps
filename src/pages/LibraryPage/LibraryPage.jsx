import './LibraryPage.css';
import { useState, useEffect, useRef } from 'react'
import * as soundsAPI from '../../utilities/sounds-api'
import LibraryList from '../../components/LibraryList/LibraryList';
import CategoryList from '../../components/CategoryList/CategoryList';

export default function LibraryPage({ user, setUser }) {
    const [librarySounds, setLibrarySounds] = useState([]);
    const [activeCat, setActiveCat] = useState('');
    const categoriesRef = useRef([]);


    //WORK NEEDED
    useEffect(function() {
        async function getSounds() {
            const sounds = await soundsAPI.getAll();
            categoriesRef.current = [...new Set(sounds.map(sound => sound.category.name))];
            setLibrarySounds(sounds);
            setActiveCat(categoriesRef.current[0])
        }
        getSounds();
    }, []);
    
    return (
        <main className="LibraryPage">
            <aside>
                <CategoryList
                    categories={categoriesRef.current}
                    activeCat={activeCat}
                    setActiveCat={setActiveCat}
                />
            </aside>
            <LibraryList
            librarySounds={librarySounds.filter(sound => sound.category.name === activeCat)}
            />
            <h4 className="about-library">This page contains a collection of privately-shared sound samples.
                <br></br><br></br>Currently anyone can play or delete all sound files available,
                so please a careful with the goods!
            </h4>
        </main>
    );
}