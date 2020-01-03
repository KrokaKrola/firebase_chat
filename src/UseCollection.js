import { useEffect, useState } from "react";
import { db } from "./firebase";

export default function(path, orderField) {
  const [docs, setDocs] = useState([]);

  useEffect(() => {
    let collection = db.collection(path);

    if (orderField) {
      collection = collection.orderBy(orderField);
    }

    collection.onSnapshot(snapshot => {
      const docs = [];
      snapshot.forEach(message => {
        docs.push({
          ...message.data(),
          id: message.id
        });
      });
      setDocs(docs);
    });
  }, [orderField, path]);
  return docs;
}
