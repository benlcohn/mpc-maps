import './LayoutsPage.css';
import { useState, useEffect } from 'react';
import * as layoutsAPI from '../../utilities/layouts-api';
import * as soundsAPI from '../../utilities/sounds-api'

const PAD_LETTERS = [
	'1', '2', '3', '4', 
	'Q', 'W', 'E', 'R', 
	'A', 'S', 'D', 'F', 
	'Z', 'X', 'C', 'V'];

export default function LayoutPage() {
    const [layouts, setLayouts] = useState([]);
    const [sounds, setSounds] = useState([]);
    const [newLayout, setNewLayout] = useState({
        title: "",
        pad1: null,
        pad2: null,
        pad3: null,
        pad4: null,
        padQ: null,
        padW: null,
        padE: null,
        padR: null,
        padA: null,
        padS: null,
        padD: null,
        padF: null,
        padZ: null,
        padX: null,
        padC: null,
        padV: null,
    });


    useEffect(function() {
        layoutsAPI.getAll().then(layouts => setLayouts(layouts));
        soundsAPI.getAll().then(sounds => setSounds(sounds));
    }, []);

    async function handleSubmit(evt) {
        evt.preventDefault();
        
        const layout = await layoutsAPI.create(newLayout);
        setLayouts([layout, ...layouts]);
    }

    function handleChange(evt) {
        setNewLayout({
            ...newLayout, 
            [evt.target.name]: evt.target.value
        });
    }

    const options = sounds.map(sound => <option key={sound._id} value={sound._id}>{`${sound.category.name} - ${sound.title}`}</option>);
    options.unshift(<option key='x'>---select sound---</option>)
    const selects = PAD_LETTERS.map(letter => <select key={letter} value={newLayout[`pad${letter}`]} onChange={handleChange} name={`pad${letter}`}>{options}</select>);
    const pads = PAD_LETTERS.map((letter, idx) => <div key={letter} className={newLayout[`pad${letter}`] ? '' : 'no-sound'}>{selects[idx]}</div>);

    return (
        <main className="LayoutsPage">
            <h1>KIT LAYOUTS</h1>
            {layouts.length ? 
                <p>Layouts exist</p>
                :
                <h3>No existing layouts</h3>
            }
            <hr />
            <form onSubmit={handleSubmit}>
                <section>
                    {pads}
                </section>
                <br />
                <input name="title" placeholder="Name your layout!" onChange={handleChange} required />
                <button type="submit">SAVE LAYOUT</button>
            </form>
        </main>
    )
}