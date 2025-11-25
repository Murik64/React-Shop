
function Categories({ categoryId, onClickCategory }) {

  const categories = ['All', 'Beauty', 'fragrances', 'furniture', 'groceries', 'home-dec','kitchen-acc',]


  return (
    <>
      <div className="categories">
        <ul>
          {
            categories.map((categoryName, index) => (
              <li
                key={index}
                onClick={() => onClickCategory(index)}
                className={categoryId === index ? 'active' : ''}>
                {categoryName}
              </li>
            ))
          }
        </ul>
      </div>
    </>
  );
}

export default Categories;


