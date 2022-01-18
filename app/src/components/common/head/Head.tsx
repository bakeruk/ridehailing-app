import React from "react";
import { default as NextHead } from "next/head";

export interface HeadAttributes {
  title: string;
  description: string;
}

/**
 * Head component
 */
export const Head: React.FC<HeadAttributes> = ({ title, description }) => (
  <NextHead>
    <title>
      {title}
    </title>

    <meta
      name="description"
      content={description}
    />

    <link
      rel="icon"
      href="/favicon.ico"
    />
  </NextHead>
);