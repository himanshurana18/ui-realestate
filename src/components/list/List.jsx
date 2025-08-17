import "./list.scss";
import Card from "../card/Card";
// import { listData } from "../../lib/dummydata";

function List({ posts }) {
  return (
    <div className="list">
      {Array.isArray(posts) &&
        posts.map((item) => <Card key={item.id} item={item} />)}
    </div>
  );
}

export default List;
