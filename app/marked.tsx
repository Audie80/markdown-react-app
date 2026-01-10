'use client';

import { useState, useEffect } from "react";
import {marked} from "marked";
import DOMPurify from 'isomorphic-dompurify';
import { setLocalStorageItem, getLocalStorageItem } from './localStorage';
import { sampleText } from "./sampleText";


export default function Marked() {
  const [text, setText] = useState(() => {
    return getLocalStorageItem('text') || sampleText;
  });

  const renderText = (text: string) => marked.parse(DOMPurify.sanitize(text), {async: false});

  useEffect(() => {
    setLocalStorageItem('text', text);
  }, [text]);

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-sm-6">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="form-control"
            rows={35}
          ></textarea>
        </div>
        <div className="col-sm-6">
          <div dangerouslySetInnerHTML={{__html: renderText(text)}}></div>
        </div>
      </div>
    </div>
  );
}
