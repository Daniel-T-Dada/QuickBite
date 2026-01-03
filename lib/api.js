/*const isProd = process.env.NODE_ENV === "production"
export const BASE_URL = isProd 
? "https://quickbite-api-pi.vercel.app/api"
: "http://localhost:3001/api"

export const ENDPOINTS = {
  MENU: `${BASE_URL}/menu`, 
  SPECIAL: `${BASE_URL}/specials`,
  SINGLE_ITEM: (id) => `${BASE_URL}/menu/${id}`
}
*/

// lib/api.js
const isProd = process.env.NODE_ENV === "production";

// ✅ Temporarily force true if you want to test the Vercel API on your phone
const useRemote = true; 

export const BASE_URL = (isProd || useRemote)
  ? "https://quickbite-api-pi.vercel.app/api" // Added the colon :
  : "http://localhost:3001/api";

export const ENDPOINTS = {
  MENU: `${BASE_URL}/menu`, 
  SPECIALS: `${BASE_URL}/specials`,
  SINGLE_ITEM: (id) => `${BASE_URL}/menu/${id}`
};
