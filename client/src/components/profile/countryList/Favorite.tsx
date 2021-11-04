import countries from "../../country/countries";
const Favorite = () => {
  return (
    <>
      {favorite.map((item) => (
        <div className={classes.itemContainer}>
          <div>
            <li
              value={countries[item].code}
              key={item}
              className={classes.list}
            >
              <img
                style={{ width: 30, marginRight: 10 }}
                alt={countries[item].name}
                src={`https://raw.githubusercontent.com/ekwonye-richard/react-flags-select/master/flags/${countries[
                  item
                ].code.toLowerCase()}.svg`}
              />
              {countries[item].name}
            </li>
          </div>
          <div
            style={isFavoriteEdit ? { display: "block" } : { display: "none" }}
          >
            <IconButton>
              <Edit />
            </IconButton>
            <IconButton>
              <Delete color="secondary" />
            </IconButton>
          </div>
        </div>
      ))}
      {isFavoriteEdit && (
        <div>
          <Button
            variant="outlined"
            color="primary"
            style={{ marginRight: 20 }}
          >
            Save
          </Button>
          <Button variant="outlined" color="secondary">
            Cancel
          </Button>
        </div>
      )}
    </>
  );
};

export default Favorite;
