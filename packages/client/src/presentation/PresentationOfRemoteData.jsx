import React from 'react';
import { useParams } from 'react-router-dom';
import { useRemoteData } from '../lib/network';
import parseMarkdown from './parse-markdown';
import Pages from './Pages';

function PresentationOfRemoteData() {
  const { course } = useParams();
  const query = `{getCourse(name:"${course}")}`;

  const { data } = useRemoteData(query);
  if (!data) return null;

  const parsedResult = parseMarkdown(data.getCourse);
  return <Pages data={parsedResult} />;
}

export default PresentationOfRemoteData;
