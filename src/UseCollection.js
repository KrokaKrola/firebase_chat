import { useEffect, useState } from 'react';
import { db } from './firebase';

export default function(path, orderField, where = []) {
  const [docs, setDocs] = useState([]);

  const [queryField, queryOperator, queryValue] = where;
  useEffect(() => {
    let collection = db.collection(path);

    if (orderField) {
      collection = collection.orderBy(orderField);
    }

    if (queryField) {
      collection = collection.where(queryField, queryOperator, queryValue);
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
