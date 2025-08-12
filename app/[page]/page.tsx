"use client"

import { useEffect } from "react";
import { findLinkByShortURL, updateClickCount } from "../functions";
import { useParams, notFound } from "next/navigation";

export default function Page() {
  const { page } = useParams<{ page: string }>();

  useEffect(() => {
    findLinkByShortURL(page).then((data:any) => {
      //alert(data);
      if (data != undefined) {
        // Redirect to the original URL
        updateClickCount(data.uuid).then(() => {

        }).finally(() => {
          window.location.href = /^https?:\/\//i.test(data.url) ? data.url : `https://${data.url}`;
        });
      }
      else if(data == undefined)
        window.location.href = "/";
    })
  }, []);

  return (
    <div className="w-full h-full p-5">
      <h1 className="text-black font-bold">Redirect...</h1>
    </div>
  );
}

