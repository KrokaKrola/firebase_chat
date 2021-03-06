import { useEffect, useState } from "react";
import { db } from "./firebase";

const useDoc = path => {
  const [doc, setDoc] = useState(null);

  useEffect(() => {
    return db.doc(path).onSnapshot(doc => {
      setDoc({
        ...doc.data(),
        id: doc.id
      });
    });
  }, [path]);

  return doc;
};

export default useDoc;
