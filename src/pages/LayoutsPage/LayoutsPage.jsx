import './LayoutsPage.css';
import { useState, useEffect } from 'react';
import * as layoutsAPI from '../../utilities/layouts-api';
import * as soundsAPI from '../../utilities/sounds-api'

const PAD_LETTERS = [
	'1', '2', '3', '4', 
	'Q', 'W', 'E', 'R', 
	'A', 'S', 'D', 'F', 
	'Z', 'X', 'C', 'V'];

export default function LayoutPage({layouts, setLayouts, sounds}) {

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

    const [saveMessage, setSaveMessage] = useState("");

    async function handleSubmit(evt) {
        evt.preventDefault();

        const existingLayout = layouts.find(layout => layout.title === newLayout.title);
        if (existingLayout) {
            setSaveMessage("Title is already in use, try again!");
            setTimeout(() => {
                setSaveMessage(null);
            }, 2000);
            return;
        }

        const layout = await layoutsAPI.create(newLayout);
        setLayouts([layout, ...layouts]);
        setSaveMessage("Layout saved!");
        setTimeout(() => {
            setSaveMessage(null);
        }, 2000);
    }

    function handleChange(evt) {
        setNewLayout({
            ...newLayout, 
            [evt.target.name]: evt.target.value
        });
    }

    const options = sounds.map(sound => <option key={sound._id} value={sound._id}>{`${sound.category.name} - ${sound.title}`}</option>);
    options.unshift(<option key='x'>-pick sound-</option>)
    const selects = PAD_LETTERS.map((letter, idx) => (
        <div key={letter}>
            <span className="pad-letter">{letter}</span> {/* Display PAD_LETTER */}
            <select value={newLayout[`pad${letter}`]} onChange={handleChange} name={`pad${letter}`}>
                {options}
            </select>
        </div>
    ));    const pads = PAD_LETTERS.map((letter, idx) => <div key={letter} className={newLayout[`pad${letter}`] ? '' : 'no-sound'}>{selects[idx]}</div>);

    return (
        <main className="LayoutsPage">
            <h1>KIT LAYOUTS</h1>
            <hr />
            <form onSubmit={handleSubmit}>
                <section>
                    {pads}
                </section>
                <br />
                <input className="dropdown" name="title" placeholder="Name your layout!" onChange={handleChange} required />
                <button style={{ textDecoration: 'underline' }} type="submit">{saveMessage ? saveMessage : 'Save Layout'}</button>
            </form>
        </main>
    )
}