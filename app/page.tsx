"use client"

import Image from "next/image";
import logoImg from "@/public/logo.png"
import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { addLinkToLocalStorage, addLinkToSupabase, extractDataLocalStorage, findExistAliasName, isValidURL } from "./functions";

export default function Home() {

  const [loading, setLoading] = useState(false);
  const [loadingLinks, setLoadingLinks] = useState(false);
  const [url, setUrl] = useState("");
  const [custom, setCustom] = useState("");

  const [links, setLinks] = useState([]);

  useEffect(() => {
    setLoadingLinks(true);
    async function loadLinks() {
      const data:any = await extractDataLocalStorage();
      setLinks(data);
      setLoadingLinks(false);
    }

    loadLinks();

  }, []);



  function submitUrl(e: any) {
    e.preventDefault();
    setLoading(true);

    const isValid = async (url: string) => {
      const result = await isValidURL(url);
      if (!result) {
        toast.error("Invalid URL format");
      }
      return result;
    };
    
    isValid(url).then((valid) => {
      if (valid) {
        
        
        if(custom.trim() != "" && custom.trim().length < 3) {
          toast.error("Custom alias must be at least 3 characters long!");
          setLoading(false);
          return;
        }
        else if(custom.trim() != "" && custom.trim().length >= 3){
          findExistAliasName(custom.trim()).then((exists) => {
            if (exists) {
              toast.error("Custom alias already exists! Please choose another.");
              setLoading(false);
              return;
            }
          });
        }

        //insert into supabase
        addLinkToSupabase(url, custom.trim()).then((data:any) => {
          if (data) {
            console.log("Link added to Supabase:", data);
            addLinkToLocalStorage(data?.uuid);
            toast.success("Link shortened successfully!");
          }
        });

      } else {
        setLoading(false);
        return;
      }
      setLoading(false);
    });

    setLoading(false);
  }

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 bg-gray-200">
      <div className="max-w-[1000px] h-full w-full flex flex-col gap-14">
        <div className="w-full flex flex-row items-center justify-start gap-5 h-auto">
          <div className="w-[70px] h-[70px] overflow-hidden rounded-xl">
            <Image src={logoImg} alt="Logo" className="w-full h-full object-cover" />
          </div>
          <div className="flex items-start justify-center flex-col">
            <h1 className="font-bold text-2xl">Zyrl</h1>
            <h3 className="text-gray-500 text-sm">Shorten. Share. Track.</h3>
          </div>
        </div>

        <div className="w-full bg-white p-6 rounded-2xl shadow flex flex-col gap-4">
          <div className="flex items-start justify-center flex-col">
            <h1 className="font-bold text-2xl">Shorten any link in seconds</h1>
            <h3 className="text-gray-500">Paste a link, add an optional alias and get a short URL with analytics and QR code.</h3>
          </div>

          <div className="w-full">
            <form onSubmit={submitUrl} className="mt-4 w-full gap-5 flex flex-row max-md:flex-col">
              <input
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Paste your long URL here"
                className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-200"
              />
              <div className="flex gap-2 w-full">
                <input
                  value={custom}
                  onChange={(e) => setCustom(e.target.value)}
                  placeholder="custom alias (optional)"
                  className="border w-full rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                />
                <button
                  type="submit"
                  className={`px-4 py-2 w-auto max-w-[180px] rounded-lg cursor-pointer hover:bg-indigo-500 transition-all duration-200 text-white ${loading ? 'bg-indigo-400' : 'bg-indigo-600'}`}>
                  {loading ? 'Shortening...' : 'Shorten'}
                </button>
              </div>
            </form>
          </div>

          <div>
            <p className="text-gray-500 flex items-center gap-4">
              <span>✅ Fast</span>
              <span>🔒 Private by default</span>
              <span>📊 Basic analytics</span>
            </p>
          </div>
        </div>

        <div className="w-full bg-white p-6 rounded-2xl shadow flex flex-col gap-4">
          <div className="flex items-centerer justify-between flex-wrap">
            <h1 className="font-bold text-xl">Recent links</h1>
            <p className="text-gray-500 text-sm"> Showing {links.length} links</p>
          </div>

          <div className="w-full space-y-3">
            {links.map((l:any) => (
              <div key={l.uuid} className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 border border-gray-400 rounded-lg p-3">
                <div className="flex-1">
                  <div className="text-sm text-gray-700 truncate">{l.url}</div>
                  <div className="text-xs text-indigo-600 mt-1 flex items-center gap-2">
                    <span className="font-mono">{l.short_url}</span>
                    <button className="text-xs underline cursor-pointer">Copy</button>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-sm text-gray-500">Clicks: <span className="font-semibold text-gray-700">{l.clicks}</span></div>
                  <button className="px-3 py-1 border rounded text-sm border-gray-400 cursor-pointer hover:border-gray-600 transition-all duration-100">QR</button>
                  <button className="px-3 py-1 border rounded text-sm border-gray-400 cursor-pointer hover:border-gray-600 transition-all duration-100">Share</button>
                  <button className="px-3 py-1 border rounded text-sm border-gray-400 cursor-pointer hover:border-gray-600 transition-all duration-100">Delete</button>
                </div>
              </div>
            ))}

            {loadingLinks ? <div className="text-sm text-gray-500">Loading links...</div> : links.length === 0 && <div className="text-sm text-gray-500">No links yet — short some!</div>}
          </div>


        </div>
        <footer className="mt-6 text-center text-sm text-gray-500">
          <p>Built with ♥ — Simple, fast, and privacy-conscious shortener.</p>
          <p className="mt-2 font-bold">~ nnmadalin ~</p>
        </footer>
      </div>
      <Toaster position="top-center" />
    </div>
  );
}
