"use client"

import { useEffect } from "react";
import { findLinkByShortURL, updateClickCount } from "../functions";
import { useParams, notFound } from "next/navigation";

export default function Page() {
  const { page } = useParams<{ page: string }>();

  useEffect(() => {
    findLinkByShortURL(page).then((data:any) => {
      if (data != undefined) {
        // Redirect to the original URL
        updateClickCount(data.uuid).then(() => {
          window.location.href = /^https?:\/\//i.test(data.url) ? data.url : `https://${data.url}`;
        });
      }
    }).catch((err) => {
      console.error("Error finding link:", err);
      window.location.href = "/"
    }).finally(() => {
      window.location.href = "/"
    });
  }, []);

  return (
    <div className="w-full h-full p-5">
      <h1 className="text-black font-bold">Redirect...</h1>
    </div>
  );
}

