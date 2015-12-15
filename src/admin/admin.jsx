import React from 'react';
import ReactDOMServer from 'react-dom/server';
import DataTable from './components/table';
import mongoose from 'mongoose';
import DrakeSpeak from '../models/DrakeSpeak';


export default async function render() {
  const speech = await DrakeSpeak.find();
  return ReactDOMServer.renderToString(<DataTable rows={speech} />);
}
