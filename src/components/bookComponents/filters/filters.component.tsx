import { useLiveQuery } from "dexie-react-hooks";
import { FunctionComponent } from "react";
import { db } from "../../../database/db";

interface FiltersProps {
  setFilters: React.Dispatch<React.SetStateAction<string>>;
}

const Filters: FunctionComponent<FiltersProps> = ({ setFilters }) => {
  const books = useLiveQuery(() => db.books.toArray());
  return (
    <>
      <h1>Filters</h1>
      <div
        onClick={(e) => {
          setFilters(e.currentTarget.innerText);
        }}
      >
        all
      </div>
      <div>
        {/* TODO clear code */}
        {books &&
          books
            .map((book) => book.author)
            .filter((value, index, self) => self.indexOf(value) === index)
            .map((author) => (
              <div
                onClick={(e) => {
                  setFilters(e.currentTarget.innerText);
                }}
              >
                {author}
              </div>
            ))}
      </div>
    </>
  );
};

export default Filters;
