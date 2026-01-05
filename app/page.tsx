'use client';

import { useState } from "react";
import {marked} from "marked";
import DOMPurify from 'isomorphic-dompurify';
import { sampleText } from "./sampleText";

export default function Home() {
  const [text, setText] = useState(sampleText);

  const renderText = (text: string) => marked.parse(DOMPurify.sanitize(text));

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
