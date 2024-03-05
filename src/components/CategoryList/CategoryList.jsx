import './CategoryList.css';

export default function CategoryList({ categories, activeCat, setActiveCat }) {
  const cats = categories.map(cat =>
    <li
      key={cat}
      className={cat === activeCat ? 'active' : ''}
      onClick={() => setActiveCat(cat)}
    >
      {cat}
    </li>
  );
  return (
    <>
      <h3 className="AsideCat">Sounds</h3>
      <ul className="CategoryList">
        {cats}
      </ul>
      {/* <h3 className="AsideCat">Layouts</h3> */}
    </>
  );
}
