import React from 'react';
import { Redirect } from 'expo-router';

/** Entry route — hand straight to the branded splash. */
export default function Index() {
  return <Redirect href="/splash" />;
}
