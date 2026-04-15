import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

// ── SUPABASE CONFIG ───────────────────────────────────────────────────────────
const SUPABASE_URL = "https://xikeaikzbxvrvodxyxjd.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhpa2VhaWt6Ynh2cnZvZHh5eGpkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYxOTM4MDEsImV4cCI6MjA5MTc2OTgwMX0.2xsExcuVKvD0OWM2NCNBNegT8wqGWaPiJZzJC0k2_jU";
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ── MENU DATA ─────────────────────────────────────────────────────────────────
const MENU_CATEGORIES = [
  { id: "beverages", label: "Beverages", icon: "🥤" },
  { id: "milkshakes", label: "Milk Shakes", icon: "🥛" },
  { id: "hot", label: "Hot Beverages", icon: "☕" },
  { id: "maggie", label: "Maggie", icon: "🍜" },
  { id: "momos", label: "Momos", icon: "🥟" },
  { id: "sandwiches", label: "Sandwiches", icon: "🥪" },
  { id: "double_decker", label: "Double Decker", icon: "🥪" },
  { id: "pasta", label: "Pasta", icon: "🍝" },
  { id: "hotdog", label: "Hot Dog", icon: "🌭" },
  { id: "paratha", label: "Paratha", icon: "🫓" },
  { id: "veg_burger", label: "Veg Burger", icon: "🍔" },
  { id: "non_veg_burger", label: "Non-Veg Burger", icon: "🍔" },
  { id: "pizza", label: "Pizza", icon: "🍕" },
  { id: "eggs", label: "Eggs", icon: "🍳" },
  { id: "protein", label: "Protein Bowl", icon: "💪" },
  { id: "nuggets", label: "Nuggets", icon: "🍗" },
  { id: "fries", label: "Fries", icon: "🍟" },
  { id: "veg_rolls", label: "Veg Rolls", icon: "🌯" },
  { id: "non_veg_rolls", label: "Non-Veg Rolls", icon: "🌯" },
];

const MENU_ITEMS = [
  { id: 1, category: "beverages", name: "Lime and Mint Mojito", price: 60, veg: true, popular: true, desc: "Refreshing lime & mint cooler" },
  { id: 2, category: "beverages", name: "Blue Lagoon", price: 60, veg: true, desc: "Cool blue refresher" },
  { id: 3, category: "beverages", name: "Chilli Mojito", price: 60, veg: true, desc: "Spicy mojito twist" },
  { id: 4, category: "milkshakes", name: "Mango Shake", price: 60, veg: true, popular: true, desc: "Fresh mango blended smooth" },
  { id: 5, category: "milkshakes", name: "Strawberry Shake", price: 60, veg: true, desc: "Sweet strawberry bliss" },
  { id: 6, category: "milkshakes", name: "Black Current", price: 60, veg: true, desc: "Rich black current shake" },
  { id: 7, category: "milkshakes", name: "Cranberry", price: 60, veg: true, desc: "Tangy cranberry delight" },
  { id: 8, category: "milkshakes", name: "Kiwi", price: 60, veg: true, desc: "Fresh kiwi shake" },
  { id: 9, category: "milkshakes", name: "Blue Berry", price: 60, veg: true, desc: "Blueberry creamy shake" },
  { id: 10, category: "milkshakes", name: "Cold Bornvita", price: 60, veg: true, desc: "Chilled Bornvita shake" },
  { id: 11, category: "milkshakes", name: "Chocolate Shake", price: 70, veg: true, popular: true, desc: "Rich chocolate shake" },
  { id: 12, category: "milkshakes", name: "Kit Kat Shake", price: 70, veg: true, desc: "Kit Kat crunch shake" },
  { id: 13, category: "milkshakes", name: "Oreo Shake", price: 70, veg: true, desc: "Oreo cookie shake" },
  { id: 14, category: "milkshakes", name: "Brownie Loaded Shake", price: 100, veg: true, popular: true, desc: "Decadent brownie shake" },
  { id: 15, category: "milkshakes", name: "Cold Coffee", price: 50, veg: true, desc: "Chilled coffee blast" },
  { id: 16, category: "milkshakes", name: "Hazelnut", price: 60, veg: true, desc: "Hazelnut flavoured shake" },
  { id: 17, category: "milkshakes", name: "Chocolate (Cold)", price: 60, veg: true, desc: "Cold chocolate shake" },
  { id: 18, category: "hot", name: "Hot Coffee", price: 20, veg: true, desc: "Classic hot coffee" },
  { id: 19, category: "hot", name: "Hot Bornvita", price: 50, veg: true, desc: "Warm Bornvita drink" },
  { id: 20, category: "hot", name: "Hot Chocolate", price: 60, veg: true, desc: "Rich hot chocolate" },
  { id: 21, category: "maggie", name: "Plain Maggie", price: 30, veg: true, desc: "Classic plain maggi" },
  { id: 22, category: "maggie", name: "Hot and Spicy Maggie", price: 40, veg: true, popular: true, desc: "Spicy masala maggi" },
  { id: 23, category: "maggie", name: "Plain Masala", price: 40, veg: true, desc: "Masala flavoured maggi" },
  { id: 24, category: "maggie", name: "Vegetable Masala", price: 50, veg: true, desc: "Veggie loaded masala maggi" },
  { id: 25, category: "maggie", name: "Plain Cheese", price: 50, veg: true, desc: "Cheesy plain maggi" },
  { id: 26, category: "maggie", name: "Masala Cheese", price: 60, veg: true, desc: "Masala cheese maggi" },
  { id: 27, category: "maggie", name: "Vegetable Masala Cheese", price: 70, veg: true, desc: "Veg masala cheese maggi" },
  { id: 28, category: "maggie", name: "Punjabi Tadka", price: 70, veg: true, desc: "Punjabi style maggi" },
  { id: 29, category: "maggie", name: "Anda Maggie", price: 70, veg: false, desc: "Egg loaded maggi" },
  { id: 30, category: "momos", name: "Veg Fried Momos", price: 90, veg: true, popular: true, desc: "Crispy fried veg momos" },
  { id: 31, category: "momos", name: "Paneer Fried Momos", price: 120, veg: true, desc: "Paneer stuffed fried momos" },
  { id: 32, category: "momos", name: "Pizza Style Momos", price: 150, veg: true, popular: true, desc: "Pizza flavoured momos" },
  { id: 33, category: "sandwiches", name: "Plain Cheese Sandwich", price: 60, veg: true, desc: "Classic cheese sandwich" },
  { id: 34, category: "sandwiches", name: "Aloo Masala Sandwich", price: 60, veg: true, desc: "Spicy potato sandwich" },
  { id: 35, category: "sandwiches", name: "Veg Cheese Sandwich", price: 65, veg: true, desc: "Loaded veg cheese sandwich" },
  { id: 36, category: "sandwiches", name: "Veg Schezwan Sandwich", price: 65, veg: true, desc: "Schezwan spicy sandwich" },
  { id: 37, category: "sandwiches", name: "Bombay Sandwich", price: 70, veg: true, popular: true, desc: "Mumbai style sandwich" },
  { id: 38, category: "sandwiches", name: "Cheese Corn Sandwich", price: 70, veg: true, desc: "Corn & cheese delight" },
  { id: 39, category: "sandwiches", name: "Schezwan Cheese Corn", price: 75, veg: true, desc: "Schezwan corn sandwich" },
  { id: 40, category: "sandwiches", name: "Paneer Cheese Sandwich", price: 80, veg: true, desc: "Rich paneer cheese sandwich" },
  { id: 41, category: "sandwiches", name: "Paneer Makhni Sandwich", price: 90, veg: true, desc: "Makhni paneer sandwich" },
  { id: 42, category: "sandwiches", name: "Tandoori Paneer Sandwich", price: 90, veg: true, popular: true, desc: "Tandoori spiced paneer sandwich" },
  { id: 43, category: "sandwiches", name: "Chicken Cheese Sandwich", price: 100, veg: false, desc: "Loaded chicken cheese sandwich" },
  { id: 44, category: "sandwiches", name: "Chicken Schezwan Sandwich", price: 100, veg: false, desc: "Spicy schezwan chicken sandwich" },
  { id: 45, category: "sandwiches", name: "Tandoori Chicken Sandwich", price: 110, veg: false, desc: "Tandoori chicken sandwich" },
  { id: 46, category: "sandwiches", name: "Chicken Makhni Sandwich", price: 120, veg: false, desc: "Makhni chicken sandwich" },
  { id: 47, category: "double_decker", name: "Veg Cheese Sandwich (DD)", price: 100, veg: true, desc: "Double decker veg cheese" },
  { id: 48, category: "double_decker", name: "Cheese Corn Paneer Sandwich", price: 110, veg: true, desc: "Triple loaded double decker" },
  { id: 49, category: "double_decker", name: "Paneer Cheese Sandwich (DD)", price: 120, veg: true, desc: "Double decker paneer cheese" },
  { id: 50, category: "double_decker", name: "Tandoori Paneer Sandwich (DD)", price: 130, veg: true, popular: true, desc: "Double decker tandoori paneer" },
  { id: 51, category: "double_decker", name: "Paneer Makhni Sandwich (DD)", price: 130, veg: true, desc: "Makhni double decker" },
  { id: 52, category: "double_decker", name: "Chicken Cheese Sandwich (DD)", price: 150, veg: false, desc: "Chicken cheese double decker" },
  { id: 53, category: "double_decker", name: "Chiken Tandoori Sandwich (DD)", price: 150, veg: false, desc: "Tandoori chicken double decker" },
  { id: 54, category: "double_decker", name: "Egg Chiken Cheese Sandwich", price: 160, veg: false, desc: "Egg chicken cheese double decker" },
  { id: 55, category: "pasta", name: "Red Sauce Pasta", price: 120, veg: true, desc: "Classic tomato red sauce pasta" },
  { id: 56, category: "pasta", name: "White Sauce Pasta", price: 130, veg: true, popular: true, desc: "Creamy white sauce pasta" },
  { id: 57, category: "pasta", name: "Pink Sauce Pasta", price: 140, veg: true, desc: "Mixed pink sauce pasta" },
  { id: 58, category: "pasta", name: "Chicken Red Sauce Pasta", price: 140, veg: false, desc: "Chicken in red sauce pasta" },
  { id: 59, category: "pasta", name: "Chicken White Sauce Pasta", price: 150, veg: false, desc: "Chicken creamy pasta" },
  { id: 60, category: "hotdog", name: "Chicken Cheese Hot Dog", price: 150, veg: false, popular: true, desc: "Loaded chicken cheese hot dog" },
  { id: 61, category: "hotdog", name: "Spicy Chicken Hot Dog", price: 160, veg: false, desc: "Spicy grilled chicken hot dog" },
  { id: 62, category: "paratha", name: "Aloo Paratha", price: 60, veg: true, desc: "Classic stuffed aloo paratha" },
  { id: 63, category: "paratha", name: "Paneer Paratha", price: 80, veg: true, desc: "Stuffed paneer paratha" },
  { id: 64, category: "paratha", name: "Cheese Paratha", price: 80, veg: true, popular: true, desc: "Cheesy paratha" },
  { id: 65, category: "veg_burger", name: "Aloo Tikki Burger", price: 60, veg: true, desc: "Crispy aloo tikki burger" },
  { id: 66, category: "veg_burger", name: "Herb and Chilli Burger", price: 65, veg: true, desc: "Herb chilli veg burger" },
  { id: 67, category: "veg_burger", name: "Hot and Spicy Burger", price: 65, veg: true, popular: true, desc: "Fiery spicy veg burger" },
  { id: 68, category: "veg_burger", name: "Double Patty Burger", price: 90, veg: true, desc: "Double veg patty burger" },
  { id: 69, category: "veg_burger", name: "Zinger Paneer Burger", price: 110, veg: true, popular: true, desc: "Zinger style paneer burger" },
  { id: 70, category: "non_veg_burger", name: "Chicken Burger", price: 80, veg: false, popular: true, desc: "Classic chicken burger" },
  { id: 71, category: "non_veg_burger", name: "Chicken Egg Burger", price: 90, veg: false, desc: "Chicken egg layered burger" },
  { id: 72, category: "non_veg_burger", name: "Chicken Double Patty Burger", price: 110, veg: false, desc: "Double chicken patty burger" },
  { id: 73, category: "non_veg_burger", name: "Zinger Chicken Burger", price: 120, veg: false, popular: true, desc: "Zinger crispy chicken burger" },
  { id: 74, category: "pizza", name: "Marguerite Pizza", price: 90, veg: true, desc: "Classic margherita pizza" },
  { id: 75, category: "pizza", name: "Onion Capsicum Pizza", price: 100, veg: true, desc: "Onion capsicum pizza" },
  { id: 76, category: "pizza", name: "Tomato Onion Pizza", price: 100, veg: true, desc: "Tomato onion pizza" },
  { id: 77, category: "pizza", name: "Cheese Corn Pizza", price: 110, veg: true, popular: true, desc: "Loaded cheese corn pizza" },
  { id: 78, category: "pizza", name: "Veggie Overload Pizza", price: 110, veg: true, desc: "Loaded veggie pizza" },
  { id: 79, category: "pizza", name: "Tandoori Paneer Pizza", price: 130, veg: true, popular: true, desc: "Tandoori paneer pizza" },
  { id: 80, category: "pizza", name: "Paneer Makhni Pizza", price: 130, veg: true, desc: "Makhni paneer pizza" },
  { id: 81, category: "pizza", name: "Paneer Overloaded Pizza", price: 140, veg: true, desc: "Overloaded paneer pizza" },
  { id: 82, category: "pizza", name: "Chicken Pizza", price: 150, veg: false, popular: true, desc: "Classic chicken pizza" },
  { id: 83, category: "eggs", name: "Half Fry", price: 50, veg: false, desc: "Classic half fried egg" },
  { id: 84, category: "eggs", name: "Omlet", price: 50, veg: false, desc: "Plain omelette" },
  { id: 85, category: "eggs", name: "Butter Cheese Omlet", price: 70, veg: false, desc: "Buttery cheese omelette" },
  { id: 86, category: "eggs", name: "Fluffy Omlet", price: 80, veg: false, desc: "Fluffy whipped omelette" },
  { id: 87, category: "eggs", name: "Bhurji Bread", price: 80, veg: false, desc: "Egg bhurji with bread" },
  { id: 88, category: "protein", name: "Paneer Veggies Protein Salad", price: 150, veg: true, popular: true, desc: "High protein paneer veggie salad" },
  { id: 89, category: "protein", name: "Chicken Veggies Protein Salad", price: 160, veg: false, desc: "Chicken protein salad bowl" },
  { id: 90, category: "nuggets", name: "Veg Nuggets", price: 50, veg: true, desc: "Crispy veg nuggets" },
  { id: 91, category: "nuggets", name: "Cheese Nuggets", price: 70, veg: true, popular: true, desc: "Loaded cheese nuggets" },
  { id: 92, category: "nuggets", name: "Chicken Nuggets", price: 90, veg: false, desc: "Classic chicken nuggets" },
  { id: 93, category: "fries", name: "Plain Fries", price: 60, veg: true, desc: "Crispy plain fries" },
  { id: 94, category: "fries", name: "Peri Peri Fries", price: 70, veg: true, popular: true, desc: "Spicy peri peri fries" },
  { id: 95, category: "fries", name: "Cheese Fries", price: 90, veg: true, popular: true, desc: "Cheesy loaded fries" },
  { id: 96, category: "veg_rolls", name: "Paneer Roll", price: 90, veg: true, desc: "Classic paneer roll" },
  { id: 97, category: "veg_rolls", name: "Paneer Makhni Roll", price: 100, veg: true, popular: true, desc: "Makhni paneer roll" },
  { id: 98, category: "veg_rolls", name: "Tandoori Paneer Roll", price: 100, veg: true, desc: "Tandoori paneer roll" },
  { id: 99, category: "veg_rolls", name: "Paneer Cheese Roll", price: 100, veg: true, desc: "Cheese stuffed paneer roll" },
  { id: 100, category: "veg_rolls", name: "Paneer Schezwan Roll", price: 100, veg: true, desc: "Schezwan paneer roll" },
  { id: 101, category: "veg_rolls", name: "Veg Roll", price: 60, veg: true, desc: "Simple veg roll" },
  { id: 102, category: "veg_rolls", name: "Veg Cheese Roll", price: 70, veg: true, desc: "Veg with cheese roll" },
  { id: 103, category: "veg_rolls", name: "Veg Schezwan Roll", price: 70, veg: true, desc: "Schezwan veg roll" },
  { id: 104, category: "non_veg_rolls", name: "Chicken Cheese Roll", price: 120, veg: false, popular: true, desc: "Loaded chicken cheese roll" },
  { id: 105, category: "non_veg_rolls", name: "Tandoori Chicken Roll", price: 120, veg: false, desc: "Tandoori chicken roll" },
  { id: 106, category: "non_veg_rolls", name: "Chicken Makhni Roll", price: 130, veg: false, desc: "Makhni chicken roll" },
  { id: 107, category: "non_veg_rolls", name: "Butter Chicken Roll", price: 130, veg: false, desc: "Butter chicken roll" },
  { id: 108, category: "non_veg_rolls", name: "Egg Roll", price: 60, veg: false, desc: "Classic egg roll" },
  { id: 109, category: "non_veg_rolls", name: "Egg Cheese Roll", price: 70, veg: false, desc: "Egg cheese roll" },
  { id: 110, category: "non_veg_rolls", name: "Egg Schezwan Roll", price: 80, veg: false, desc: "Schezwan egg roll" },
];

const COUPONS = [
  { code: "MEDICOS10", discount: 10, type: "percent", minOrder: 300, desc: "10% off above ₹300" },
  { code: "FIRST50", discount: 50, type: "flat", minOrder: 200, desc: "₹50 off on first order" },
  { code: "SAVE20", discount: 20, type: "percent", minOrder: 500, desc: "20% off above ₹500" },
];

const ORDER_TYPES = ["Dine-in", "Pickup", "Delivery"];
const ADMIN_CREDENTIALS = { email: "admin@medicosinn.com", password: "Admin@123", role: "admin" };
const STAFF_CREDENTIALS = { email: "staff@medicosinn.com", password: "Staff@123", role: "staff" };

// ── STYLES ────────────────────────────────────────────────────────────────────
const S = {
  app: { fontFamily: "'Outfit', 'Segoe UI', sans-serif", minHeight: "100vh", background: "#0a0a0a", color: "#f5f5f5" },
  nav: { background: "#111", borderBottom: "1px solid #2a2a2a", padding: "0 16px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 60, position: "sticky", top: 0, zIndex: 100 },
  logo: { display: "flex", alignItems: "center", gap: 8, cursor: "pointer", flexShrink: 0 },
  logoText: { fontSize: 18, fontWeight: 800, color: "#e63946", letterSpacing: -0.5 },
  logoSub: { fontSize: 9, color: "#888", letterSpacing: 2, textTransform: "uppercase" },
  navLinks: { display: "flex", gap: 2, alignItems: "center" },
  navBtn: { background: "none", border: "none", color: "#ccc", fontSize: 13, cursor: "pointer", padding: "7px 9px", borderRadius: 8, fontFamily: "inherit" },
  navBtnActive: { background: "#1a1a1a", color: "#e63946" },
  cartBtn: { background: "#e63946", border: "none", color: "#fff", fontSize: 13, cursor: "pointer", padding: "8px 14px", borderRadius: 8, fontWeight: 700, fontFamily: "inherit", display: "flex", alignItems: "center", gap: 5 },
  hero: { background: "linear-gradient(135deg, #1a0000 0%, #111 50%, #0a0a0a 100%)", padding: "60px 16px", textAlign: "center", position: "relative", overflow: "hidden" },
  heroTitle: { fontSize: "clamp(30px, 7vw, 52px)", fontWeight: 900, color: "#fff", margin: "0 0 14px", lineHeight: 1.1 },
  heroAccent: { color: "#e63946" },
  heroSub: { fontSize: "clamp(13px, 3vw, 17px)", color: "#aaa", margin: "0 0 28px" },
  heroBtn: { background: "#e63946", border: "none", color: "#fff", fontSize: 15, fontWeight: 700, padding: "12px 26px", borderRadius: 12, cursor: "pointer", fontFamily: "inherit" },
  heroBtnOutline: { background: "none", border: "2px solid #444", color: "#ccc", fontSize: 15, fontWeight: 600, padding: "12px 22px", borderRadius: 12, cursor: "pointer", fontFamily: "inherit", marginLeft: 10 },
  section: { padding: "40px 16px" },
  sectionTitle: { fontSize: "clamp(20px, 5vw, 28px)", fontWeight: 800, color: "#f5f5f5", margin: "0 0 6px" },
  sectionSub: { fontSize: 13, color: "#888", margin: "0 0 22px" },
  card: { background: "#161616", border: "1px solid #2a2a2a", borderRadius: 16, overflow: "hidden" },
  menuCard: { background: "#161616", border: "1px solid #2a2a2a", borderRadius: 14, overflow: "hidden" },
  menuCardImg: { width: "100%", height: 130, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 48, background: "linear-gradient(135deg, #1a1a1a, #2a0000)" },
  menuCardBody: { padding: 12 },
  menuCardName: { fontSize: 13, fontWeight: 700, color: "#f5f5f5", margin: "0 0 3px" },
  menuCardDesc: { fontSize: 11, color: "#888", margin: "0 0 10px" },
  menuCardFooter: { display: "flex", alignItems: "center", justifyContent: "space-between" },
  price: { fontSize: 15, fontWeight: 800, color: "#e63946" },
  addBtn: { background: "#e63946", border: "none", color: "#fff", width: 28, height: 28, borderRadius: 7, cursor: "pointer", fontSize: 17, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "inherit" },
  qtyControl: { display: "flex", alignItems: "center", gap: 5 },
  qtyBtn: { background: "#2a2a2a", border: "none", color: "#f5f5f5", width: 24, height: 24, borderRadius: 6, cursor: "pointer", fontSize: 14, fontFamily: "inherit" },
  qtyNum: { fontSize: 13, fontWeight: 700, color: "#f5f5f5", minWidth: 16, textAlign: "center" },
  catBar: { display: "flex", gap: 7, overflowX: "auto", padding: "0 0 10px", scrollbarWidth: "none", WebkitOverflowScrolling: "touch" },
  catBtn: { background: "#1a1a1a", border: "1px solid #2a2a2a", color: "#ccc", padding: "6px 13px", borderRadius: 24, cursor: "pointer", fontSize: 12, fontWeight: 600, whiteSpace: "nowrap", fontFamily: "inherit", flexShrink: 0 },
  catBtnActive: { background: "#e63946", border: "1px solid #e63946", color: "#fff" },
  vegBadge: { display: "inline-flex", alignItems: "center", justifyContent: "center", width: 13, height: 13, borderRadius: 2, border: "2px solid", marginRight: 4, flexShrink: 0 },
  cartSidebar: { position: "fixed", right: 0, top: 0, height: "100vh", width: "min(380px,100vw)", background: "#111", borderLeft: "1px solid #2a2a2a", zIndex: 200, display: "flex", flexDirection: "column" },
  cartHeader: { padding: "14px 18px", borderBottom: "1px solid #2a2a2a", display: "flex", alignItems: "center", justifyContent: "space-between" },
  cartTitle: { fontSize: 17, fontWeight: 800, color: "#f5f5f5" },
  closeBtn: { background: "none", border: "none", color: "#888", fontSize: 22, cursor: "pointer", lineHeight: 1, padding: 4 },
  cartItems: { flex: 1, overflowY: "auto", padding: "10px 18px" },
  cartItem: { display: "flex", alignItems: "center", gap: 10, padding: "9px 0", borderBottom: "1px solid #1e1e1e" },
  cartItemName: { flex: 1, fontSize: 13, fontWeight: 600, color: "#f5f5f5" },
  cartItemPrice: { fontSize: 13, fontWeight: 700, color: "#e63946" },
  cartFooter: { padding: "14px 18px", borderTop: "1px solid #2a2a2a" },
  input: { background: "#1a1a1a", border: "1px solid #2a2a2a", borderRadius: 9, padding: "10px 13px", color: "#f5f5f5", fontSize: 13, width: "100%", fontFamily: "inherit", outline: "none", boxSizing: "border-box" },
  select: { background: "#1a1a1a", border: "1px solid #2a2a2a", borderRadius: 9, padding: "10px 13px", color: "#f5f5f5", fontSize: 13, width: "100%", fontFamily: "inherit", outline: "none", boxSizing: "border-box" },
  btnPrimary: { background: "#e63946", border: "none", color: "#fff", fontSize: 14, fontWeight: 700, padding: "11px 22px", borderRadius: 9, cursor: "pointer", fontFamily: "inherit", width: "100%" },
  btnSecondary: { background: "#1a1a1a", border: "1px solid #2a2a2a", color: "#f5f5f5", fontSize: 13, fontWeight: 600, padding: "8px 16px", borderRadius: 9, cursor: "pointer", fontFamily: "inherit" },
  btnDanger: { background: "#3a1010", border: "1px solid #7a2020", color: "#ff6b6b", fontSize: 12, fontWeight: 600, padding: "6px 12px", borderRadius: 7, cursor: "pointer", fontFamily: "inherit" },
  btnSuccess: { background: "#103a20", border: "1px solid #1a7a3a", color: "#6bff9e", fontSize: 12, fontWeight: 600, padding: "6px 12px", borderRadius: 7, cursor: "pointer", fontFamily: "inherit" },
  grid2: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(155px, 1fr))", gap: 11 },
  grid3: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: 12 },
  grid4: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))", gap: 11 },
  adminLayout: { display: "flex", minHeight: "calc(100vh - 52px)" },
  sidebar: { background: "#111", borderRight: "1px solid #2a2a2a", padding: "14px 0", width: 200, flexShrink: 0 },
  sidebarItem: { display: "flex", alignItems: "center", gap: 9, padding: "10px 18px", color: "#888", cursor: "pointer", fontSize: 13, fontWeight: 600 },
  sidebarItemActive: { background: "#1a1a1a", color: "#e63946", borderRight: "3px solid #e63946" },
  mainArea: { background: "#0d0d0d", padding: "22px 18px", overflowY: "auto", flex: 1, minWidth: 0 },
  statCard: { background: "#161616", border: "1px solid #2a2a2a", borderRadius: 14, padding: "18px", textAlign: "center" },
  statNum: { fontSize: 26, fontWeight: 900, color: "#e63946" },
  statLabel: { fontSize: 11, color: "#888", marginTop: 3 },
  table: { width: "100%", borderCollapse: "collapse" },
  th: { background: "#161616", padding: "9px 12px", textAlign: "left", fontSize: 11, fontWeight: 700, color: "#888", borderBottom: "1px solid #2a2a2a" },
  td: { padding: "11px 12px", fontSize: 12, color: "#ccc", borderBottom: "1px solid #1a1a1a" },
  badge: { padding: "3px 8px", borderRadius: 20, fontSize: 11, fontWeight: 700 },
  overlay: { position: "fixed", inset: 0, background: "rgba(0,0,0,0.75)", zIndex: 150, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 },
  modal: { background: "#161616", border: "1px solid #2a2a2a", borderRadius: 18, padding: 26, width: "100%", maxWidth: 440 },
  toast: { position: "fixed", bottom: 20, left: "50%", transform: "translateX(-50%)", background: "#1a1a1a", border: "1px solid #2a2a2a", color: "#f5f5f5", padding: "10px 20px", borderRadius: 10, zIndex: 999, fontSize: 13, fontWeight: 600, boxShadow: "0 8px 32px rgba(0,0,0,0.5)", whiteSpace: "nowrap" },
};

// ── HELPERS ───────────────────────────────────────────────────────────────────
function StatusBadge({ status }) {
  const colors = {
    pending: { bg: "#2a2000", color: "#ffb800", border: "#5a4000" },
    preparing: { bg: "#001a2a", color: "#00b8ff", border: "#003a5a" },
    ready: { bg: "#002a0a", color: "#00ff6a", border: "#005a1a" },
    completed: { bg: "#1a2a00", color: "#aaff00", border: "#3a5a00" },
    rejected: { bg: "#2a0000", color: "#ff4444", border: "#5a0000" },
  };
  const c = colors[status] || colors.pending;
  return <span style={{ ...S.badge, background: c.bg, color: c.color, border: `1px solid ${c.border}` }}>{status?.charAt(0).toUpperCase() + status?.slice(1)}</span>;
}

function VegDot({ veg }) {
  return (
    <span style={{ ...S.vegBadge, borderColor: veg ? "#00a651" : "#e63946" }}>
      <span style={{ width: 5, height: 5, borderRadius: "50%", background: veg ? "#00a651" : "#e63946", display: "block" }} />
    </span>
  );
}

function Toast({ msg, onDone }) {
  useEffect(() => { const t = setTimeout(onDone, 2500); return () => clearTimeout(t); }, []);
  return <div style={S.toast}>{msg}</div>;
}

// ── MENU CARD ─────────────────────────────────────────────────────────────────
function MenuItemCard({ item, cartQty, onAdd, onRemove }) {
  const emoji = MENU_CATEGORIES.find(c => c.id === item.category)?.icon || "🍴";
  return (
    <div style={S.menuCard}>
      <div style={S.menuCardImg}>{emoji}</div>
      <div style={S.menuCardBody}>
        <div style={{ display: "flex", alignItems: "center", marginBottom: 4 }}>
          <VegDot veg={item.veg} />
          {item.popular && <span style={{ ...S.badge, background: "#2a0000", color: "#ff6b6b", border: "1px solid #5a1010", fontSize: 10, padding: "1px 6px", marginLeft: 3 }}>🔥</span>}
        </div>
        <div style={S.menuCardName}>{item.name}</div>
        <div style={S.menuCardDesc}>{item.desc}</div>
        <div style={S.menuCardFooter}>
          <div style={S.price}>₹{item.price}</div>
          {cartQty > 0 ? (
            <div style={S.qtyControl}>
              <button style={S.qtyBtn} onClick={() => onRemove(item)}>−</button>
              <span style={S.qtyNum}>{cartQty}</span>
              <button style={{ ...S.qtyBtn, background: "#e63946" }} onClick={() => onAdd(item)}>+</button>
            </div>
          ) : (
            <button style={S.addBtn} onClick={() => onAdd(item)}>+</button>
          )}
        </div>
      </div>
    </div>
  );
}

// ── CART SIDEBAR ──────────────────────────────────────────────────────────────
function CartSidebar({ cart, onClose, onAdd, onRemove, onPlaceOrder }) {
  const [coupon, setCoupon] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [orderType, setOrderType] = useState("Dine-in");
  const [tableNo, setTableNo] = useState("");
  const [address, setAddress] = useState("");
  const [placing, setPlacing] = useState(false);
  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const discount = appliedCoupon ? (appliedCoupon.type === "percent" ? Math.round(subtotal * appliedCoupon.discount / 100) : appliedCoupon.discount) : 0;
  const total = Math.max(0, subtotal - discount);

  function applyCoupon() {
    const c = COUPONS.find(x => x.code === coupon.toUpperCase());
    if (!c) { alert("Invalid coupon"); return; }
    if (subtotal < c.minOrder) { alert(`Min order ₹${c.minOrder} required`); return; }
    setAppliedCoupon(c);
  }

  async function handlePlace() {
    if (!cart.length) return;
    setPlacing(true);
    await onPlaceOrder({ cart, total, discount, orderType, tableNo, address, coupon: appliedCoupon });
    setPlacing(false);
  }

  return (
    <div style={S.cartSidebar}>
      <div style={S.cartHeader}>
        <div style={S.cartTitle}>Your Order</div>
        <button style={S.closeBtn} onClick={onClose}>×</button>
      </div>
      <div style={S.cartItems}>
        {cart.length === 0 && <div style={{ textAlign: "center", color: "#555", padding: 40 }}>Cart is empty 🛒</div>}
        {cart.map(item => (
          <div key={item.id} style={S.cartItem}>
            <div style={S.qtyControl}>
              <button style={S.qtyBtn} onClick={() => onRemove(item)}>−</button>
              <span style={S.qtyNum}>{item.qty}</span>
              <button style={{ ...S.qtyBtn, background: "#e63946" }} onClick={() => onAdd(item)}>+</button>
            </div>
            <div style={S.cartItemName}>{item.name}</div>
            <div style={S.cartItemPrice}>₹{item.price * item.qty}</div>
          </div>
        ))}
        {cart.length > 0 && (
          <>
            <div style={{ margin: "12px 0 7px", fontSize: 11, fontWeight: 700, color: "#888" }}>Order Type</div>
            <div style={{ display: "flex", gap: 5, marginBottom: 9 }}>
              {ORDER_TYPES.map(t => (
                <button key={t} style={{ ...S.catBtn, ...(orderType === t ? S.catBtnActive : {}), flex: 1, fontSize: 11 }} onClick={() => setOrderType(t)}>{t}</button>
              ))}
            </div>
            {orderType === "Dine-in" && <input style={{ ...S.input, marginBottom: 7 }} placeholder="Table Number" value={tableNo} onChange={e => setTableNo(e.target.value)} />}
            {orderType === "Delivery" && <input style={{ ...S.input, marginBottom: 7 }} placeholder="Delivery Address" value={address} onChange={e => setAddress(e.target.value)} />}
            <div style={{ display: "flex", gap: 7, marginTop: 7 }}>
              <input style={{ ...S.input, flex: 1 }} placeholder="Coupon code" value={coupon} onChange={e => setCoupon(e.target.value)} />
              <button style={{ ...S.btnSecondary, whiteSpace: "nowrap", fontSize: 12 }} onClick={applyCoupon}>Apply</button>
            </div>
            {appliedCoupon && <div style={{ color: "#00ff6a", fontSize: 11, margin: "5px 0" }}>✓ {appliedCoupon.desc}</div>}
          </>
        )}
      </div>
      <div style={S.cartFooter}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
          <span style={{ color: "#888", fontSize: 13 }}>Subtotal</span>
          <span style={{ fontWeight: 700, fontSize: 13 }}>₹{subtotal}</span>
        </div>
        {discount > 0 && (
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
            <span style={{ color: "#00ff6a", fontSize: 13 }}>Discount</span>
            <span style={{ color: "#00ff6a", fontWeight: 700, fontSize: 13 }}>−₹{discount}</span>
          </div>
        )}
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16, paddingTop: 9, borderTop: "1px solid #2a2a2a" }}>
          <span style={{ fontWeight: 800, fontSize: 15 }}>Total</span>
          <span style={{ fontWeight: 900, fontSize: 16, color: "#e63946" }}>₹{total}</span>
        </div>
        <button style={{ ...S.btnPrimary, opacity: placing ? 0.7 : 1 }} onClick={handlePlace} disabled={cart.length === 0 || placing}>
          {placing ? "Placing..." : `Place Order — ₹${total}`}
        </button>
      </div>
    </div>
  );
}

// ── ORDER TRACKING ────────────────────────────────────────────────────────────
function OrderTracking({ order, onClose }) {
  const [current, setCurrent] = useState(order);
  const steps = ["pending", "preparing", "ready", "completed"];
  const idx = steps.indexOf(current.status);
  const labels = { pending: "Placed", preparing: "Preparing", ready: "Ready!", completed: "Done ✓" };

  useEffect(() => {
    const channel = supabase.channel(`order-${order.id}`)
      .on("postgres_changes", { event: "UPDATE", schema: "public", table: "orders", filter: `id=eq.${order.id}` },
        (payload) => setCurrent(prev => ({ ...prev, status: payload.new.status })))
      .subscribe();
    return () => supabase.removeChannel(channel);
  }, [order.id]);

  return (
    <div style={S.overlay} onClick={onClose}>
      <div style={S.modal} onClick={e => e.stopPropagation()}>
        <div style={{ fontSize: 17, fontWeight: 800, marginBottom: 3 }}>Order #{current.id}</div>
        <div style={{ fontSize: 12, color: "#888", marginBottom: 22 }}>{current.order_type} • ₹{current.total}</div>
        <div style={{ display: "flex", justifyContent: "space-between", position: "relative", marginBottom: 26 }}>
          <div style={{ position: "absolute", top: 13, left: "12.5%", right: "12.5%", height: 2, background: "#2a2a2a" }} />
          <div style={{ position: "absolute", top: 13, left: "12.5%", width: `${Math.max(0, idx / (steps.length - 1)) * 75}%`, height: 2, background: "#e63946", transition: "width 0.5s" }} />
          {steps.map((s, i) => (
            <div key={s} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 5, zIndex: 1 }}>
              <div style={{ width: 26, height: 26, borderRadius: "50%", background: i <= idx ? "#e63946" : "#2a2a2a", border: `2px solid ${i <= idx ? "#e63946" : "#3a3a3a"}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11 }}>
                {i < idx ? "✓" : i === idx ? "●" : "○"}
              </div>
              <div style={{ fontSize: 10, color: i <= idx ? "#e63946" : "#555", textAlign: "center", maxWidth: 52 }}>{labels[s]}</div>
            </div>
          ))}
        </div>
        <div style={{ background: "#1a1a1a", borderRadius: 9, padding: 12, marginBottom: 16 }}>
          {(current.cart || []).map((i, idx) => (
            <div key={idx} style={{ display: "flex", justifyContent: "space-between", fontSize: 12, padding: "3px 0", color: "#ccc" }}>
              <span>{i.qty}× {i.name}</span><span style={{ color: "#e63946" }}>₹{i.price * i.qty}</span>
            </div>
          ))}
        </div>
        <button style={S.btnPrimary} onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

// ── AUTH MODAL ────────────────────────────────────────────────────────────────
function AuthModal({ onClose, onLogin }) {
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    if (!email || !password) { alert("Email aur password daalo"); return; }
    setLoading(true);
    try {
      if (mode === "login") {
        const { data, error } = await supabase.from("users").select("*").eq("email", email).eq("password", password).single();
        if (error || !data) { alert("Invalid email ya password"); return; }
        onLogin(data); onClose();
      } else {
        if (!name || !phone) { alert("Saare fields zaroori hain"); return; }
        const { data: ex } = await supabase.from("users").select("id").eq("email", email).single();
        if (ex) { alert("Email already registered hai"); return; }
        const { data, error } = await supabase.from("users").insert([{ name, email, password, phone, role: "customer" }]).select().single();
        if (error) { alert("Error: " + error.message); return; }
        onLogin(data); onClose();
      }
    } finally { setLoading(false); }
  }

  return (
    <div style={S.overlay} onClick={onClose}>
      <div style={S.modal} onClick={e => e.stopPropagation()}>
        <div style={{ fontSize: 19, fontWeight: 800, marginBottom: 4, color: "#e63946" }}>MEDICOS INN</div>
        <div style={{ display: "flex", gap: 7, marginBottom: 18 }}>
          {["login", "signup"].map(m => (
            <button key={m} style={{ ...S.catBtn, flex: 1, ...(mode === m ? S.catBtnActive : {}) }} onClick={() => setMode(m)}>
              {m === "login" ? "Login" : "Sign Up"}
            </button>
          ))}
        </div>
        {mode === "signup" && <>
          <input style={{ ...S.input, marginBottom: 9 }} placeholder="Full Name" value={name} onChange={e => setName(e.target.value)} />
          <input style={{ ...S.input, marginBottom: 9 }} placeholder="Phone Number" value={phone} onChange={e => setPhone(e.target.value)} />
        </>}
        <input style={{ ...S.input, marginBottom: 9 }} placeholder="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} />
        <input style={{ ...S.input, marginBottom: 16 }} placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} onKeyDown={e => e.key === "Enter" && handleSubmit()} />
        <button style={{ ...S.btnPrimary, opacity: loading ? 0.7 : 1 }} onClick={handleSubmit} disabled={loading}>
          {loading ? "Please wait..." : mode === "login" ? "Login" : "Create Account"}
        </button>
      </div>
    </div>
  );
}

// ── ADMIN LOGIN ───────────────────────────────────────────────────────────────
function AdminLogin({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  function handle() {
    if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) onLogin(ADMIN_CREDENTIALS);
    else if (email === STAFF_CREDENTIALS.email && password === STAFF_CREDENTIALS.password) onLogin(STAFF_CREDENTIALS);
    else alert("Invalid admin credentials");
  }
  return (
    <div style={{ ...S.app, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
      <div style={{ ...S.modal, maxWidth: 360 }}>
        <div style={{ textAlign: "center", marginBottom: 22 }}>
          <div style={{ fontSize: 24, fontWeight: 900, color: "#e63946" }}>MEDICOS INN</div>
          <div style={{ fontSize: 12, color: "#888", marginTop: 3 }}>Admin Dashboard</div>
        </div>
        <input style={{ ...S.input, marginBottom: 9 }} placeholder="Admin Email" type="email" value={email} onChange={e => setEmail(e.target.value)} />
        <input style={{ ...S.input, marginBottom: 16 }} placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} onKeyDown={e => e.key === "Enter" && handle()} />
        <button style={S.btnPrimary} onClick={handle}>Login to Dashboard</button>
        <div style={{ fontSize: 11, color: "#444", marginTop: 10, textAlign: "center" }}>admin@medicosinn.com / Admin@123</div>
      </div>
    </div>
  );
}

// ── ADMIN DASHBOARD ───────────────────────────────────────────────────────────
function AdminDashboard({ user, onLogout }) {
  const [page, setPage] = useState("dashboard");
  const [orders, setOrders] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [menuItems, setMenuItems] = useState(MENU_ITEMS);
  const [coupons, setCoupons] = useState(COUPONS);
  const [toast, setToast] = useState(null);
  const [editItem, setEditItem] = useState(null);
  const [newItem, setNewItem] = useState(null);

  useEffect(() => {
    loadOrders();
    loadCustomers();
    const ch = supabase.channel("admin-orders")
      .on("postgres_changes", { event: "*", schema: "public", table: "orders" }, () => loadOrders())
      .subscribe();
    return () => supabase.removeChannel(ch);
  }, []);

  async function loadOrders() {
    const { data } = await supabase.from("orders").select("*").order("created_at", { ascending: false });
    if (data) setOrders(data);
  }

  async function loadCustomers() {
    const { data } = await supabase.from("users").select("*").eq("role", "customer").order("created_at", { ascending: false });
    if (data) setCustomers(data);
  }

  async function updateOrderStatus(id, status) {
    await supabase.from("orders").update({ status }).eq("id", id);
    setToast(`Order #${id} → ${status}`);
  }

  const todayOrders = orders.filter(o => new Date(o.created_at).toDateString() === new Date().toDateString());
  const todaySales = todayOrders.reduce((s, o) => s + (o.total || 0), 0);

  const sideItems = [
    { id: "dashboard", label: "Dashboard", icon: "📊" },
    { id: "orders", label: "Orders", icon: "🧾" },
    { id: "menu", label: "Menu Mgmt", icon: "🍴" },
    { id: "coupons", label: "Coupons", icon: "🏷️" },
    { id: "customers", label: "Customers", icon: "👥" },
  ];

  return (
    <div style={{ ...S.app, display: "flex", flexDirection: "column" }}>
      {toast && <Toast msg={toast} onDone={() => setToast(null)} />}
      <div style={{ background: "#111", borderBottom: "1px solid #2a2a2a", padding: "0 16px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 52, flexShrink: 0 }}>
        <div style={{ fontSize: 15, fontWeight: 800, color: "#e63946" }}>MEDICOS INN — Admin</div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 11, color: "#666" }}>{user.role}</span>
          <button style={{ ...S.btnDanger, padding: "5px 11px", fontSize: 11 }} onClick={onLogout}>Logout</button>
        </div>
      </div>
      <div style={S.adminLayout}>
        <div style={S.sidebar}>
          {sideItems.map(s => (
            <div key={s.id} style={{ ...S.sidebarItem, ...(page === s.id ? S.sidebarItemActive : {}) }} onClick={() => setPage(s.id)}>
              <span>{s.icon}</span>{s.label}
            </div>
          ))}
        </div>
        <div style={S.mainArea}>

          {/* DASHBOARD */}
          {page === "dashboard" && <>
            <div style={{ fontSize: 19, fontWeight: 800, marginBottom: 18 }}>Dashboard</div>
            <div style={{ ...S.grid4, marginBottom: 24 }}>
              {[
                { label: "Today Sales", value: `₹${todaySales}`, icon: "💰" },
                { label: "Today Orders", value: todayOrders.length, icon: "📦" },
                { label: "Pending", value: orders.filter(o => o.status === "pending").length, icon: "⏳" },
                { label: "Total Orders", value: orders.length, icon: "🧾" },
              ].map(c => (
                <div key={c.label} style={S.statCard}>
                  <div style={{ fontSize: 22, marginBottom: 4 }}>{c.icon}</div>
                  <div style={S.statNum}>{c.value}</div>
                  <div style={S.statLabel}>{c.label}</div>
                </div>
              ))}
            </div>
            <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 12 }}>Recent Orders</div>
            <div style={{ overflowX: "auto" }}>
              <div style={{ background: "#161616", border: "1px solid #2a2a2a", borderRadius: 14, overflow: "hidden", minWidth: 580 }}>
                <table style={S.table}>
                  <thead><tr><th style={S.th}>ID</th><th style={S.th}>Customer</th><th style={S.th}>Total</th><th style={S.th}>Type</th><th style={S.th}>Status</th><th style={S.th}>Actions</th></tr></thead>
                  <tbody>
                    {orders.slice(0, 10).map(o => (
                      <tr key={o.id}>
                        <td style={S.td}>#{o.id}</td>
                        <td style={S.td}>{o.customer_name || "Guest"}</td>
                        <td style={{ ...S.td, color: "#e63946", fontWeight: 700 }}>₹{o.total}</td>
                        <td style={S.td}>{o.order_type}</td>
                        <td style={S.td}><StatusBadge status={o.status} /></td>
                        <td style={S.td}>
                          <div style={{ display: "flex", gap: 4 }}>
                            {o.status === "pending" && <button style={S.btnSuccess} onClick={() => updateOrderStatus(o.id, "preparing")}>Accept</button>}
                            {o.status === "preparing" && <button style={S.btnSuccess} onClick={() => updateOrderStatus(o.id, "ready")}>Ready</button>}
                            {o.status === "ready" && <button style={S.btnSuccess} onClick={() => updateOrderStatus(o.id, "completed")}>Done</button>}
                            {["pending", "preparing"].includes(o.status) && <button style={S.btnDanger} onClick={() => updateOrderStatus(o.id, "rejected")}>Reject</button>}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {orders.length === 0 && <div style={{ textAlign: "center", color: "#555", padding: 40 }}>No orders yet</div>}
              </div>
            </div>
          </>}

          {/* ORDERS */}
          {page === "orders" && <>
            <div style={{ fontSize: 19, fontWeight: 800, marginBottom: 18 }}>All Orders ({orders.length})</div>
            <div style={{ overflowX: "auto" }}>
              <div style={{ background: "#161616", border: "1px solid #2a2a2a", borderRadius: 14, overflow: "hidden", minWidth: 680 }}>
                <table style={S.table}>
                  <thead><tr><th style={S.th}>ID</th><th style={S.th}>Customer</th><th style={S.th}>Items</th><th style={S.th}>Total</th><th style={S.th}>Type</th><th style={S.th}>Status</th><th style={S.th}>Time</th><th style={S.th}>Actions</th></tr></thead>
                  <tbody>
                    {orders.map(o => (
                      <tr key={o.id}>
                        <td style={S.td}>#{o.id}</td>
                        <td style={S.td}>{o.customer_name || "Guest"}</td>
                        <td style={{ ...S.td, maxWidth: 130 }}>{(o.cart || []).map(i => `${i.qty}×${i.name}`).join(", ").substring(0, 30)}...</td>
                        <td style={{ ...S.td, color: "#e63946", fontWeight: 700 }}>₹{o.total}</td>
                        <td style={S.td}>{o.order_type}</td>
                        <td style={S.td}><StatusBadge status={o.status} /></td>
                        <td style={{ ...S.td, fontSize: 10, color: "#555" }}>{new Date(o.created_at).toLocaleTimeString()}</td>
                        <td style={S.td}>
                          <div style={{ display: "flex", gap: 3 }}>
                            {o.status === "pending" && <button style={{ ...S.btnSuccess, fontSize: 10, padding: "3px 7px" }} onClick={() => updateOrderStatus(o.id, "preparing")}>Prep</button>}
                            {o.status === "preparing" && <button style={{ ...S.btnSuccess, fontSize: 10, padding: "3px 7px" }} onClick={() => updateOrderStatus(o.id, "ready")}>Ready</button>}
                            {o.status === "ready" && <button style={{ ...S.btnSuccess, fontSize: 10, padding: "3px 7px" }} onClick={() => updateOrderStatus(o.id, "completed")}>Done</button>}
                            {["pending", "preparing"].includes(o.status) && <button style={{ ...S.btnDanger, fontSize: 10, padding: "3px 7px" }} onClick={() => updateOrderStatus(o.id, "rejected")}>✕</button>}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {orders.length === 0 && <div style={{ textAlign: "center", color: "#555", padding: 40 }}>No orders yet</div>}
              </div>
            </div>
          </>}

          {/* MENU MANAGEMENT */}
          {page === "menu" && <>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
              <div style={{ fontSize: 19, fontWeight: 800 }}>Menu Management</div>
              <button style={{ ...S.btnPrimary, width: "auto", padding: "8px 14px", fontSize: 12 }} onClick={() => setNewItem({ name: "", price: "", category: "beverages", veg: true, desc: "", popular: false })}>+ Add Item</button>
            </div>
            {newItem && (
              <div style={{ background: "#161616", border: "1px solid #2a2a2a", borderRadius: 12, padding: 18, marginBottom: 18 }}>
                <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 12, color: "#e63946" }}>Add New Item</div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 9, marginBottom: 9 }}>
                  <input style={S.input} placeholder="Item Name" value={newItem.name} onChange={e => setNewItem({ ...newItem, name: e.target.value })} />
                  <input style={S.input} placeholder="Price (₹)" type="number" value={newItem.price} onChange={e => setNewItem({ ...newItem, price: +e.target.value })} />
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 9, marginBottom: 9 }}>
                  <select style={S.select} value={newItem.category} onChange={e => setNewItem({ ...newItem, category: e.target.value })}>
                    {MENU_CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
                  </select>
                  <select style={S.select} value={newItem.veg} onChange={e => setNewItem({ ...newItem, veg: e.target.value === "true" })}>
                    <option value="true">Vegetarian</option>
                    <option value="false">Non-Vegetarian</option>
                  </select>
                </div>
                <input style={{ ...S.input, marginBottom: 9 }} placeholder="Description" value={newItem.desc} onChange={e => setNewItem({ ...newItem, desc: e.target.value })} />
                <div style={{ display: "flex", gap: 7 }}>
                  <button style={{ ...S.btnPrimary, width: "auto", padding: "8px 16px", fontSize: 13 }} onClick={() => {
                    if (!newItem.name || !newItem.price) { alert("Name & price zaroori hai"); return; }
                    setMenuItems([...menuItems, { ...newItem, id: Date.now() }]);
                    setNewItem(null); setToast(`${newItem.name} added!`);
                  }}>Save</button>
                  <button style={S.btnSecondary} onClick={() => setNewItem(null)}>Cancel</button>
                </div>
              </div>
            )}
            {editItem && (
              <div style={{ background: "#161616", border: "1px solid #2a2a2a", borderRadius: 12, padding: 18, marginBottom: 18 }}>
                <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 12, color: "#e63946" }}>Edit: {editItem.name}</div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 9, marginBottom: 9 }}>
                  <input style={S.input} value={editItem.name} onChange={e => setEditItem({ ...editItem, name: e.target.value })} />
                  <input style={S.input} type="number" value={editItem.price} onChange={e => setEditItem({ ...editItem, price: +e.target.value })} />
                </div>
                <input style={{ ...S.input, marginBottom: 9 }} value={editItem.desc} onChange={e => setEditItem({ ...editItem, desc: e.target.value })} />
                <div style={{ display: "flex", gap: 7 }}>
                  <button style={{ ...S.btnPrimary, width: "auto", padding: "8px 16px", fontSize: 13 }} onClick={() => { setMenuItems(menuItems.map(x => x.id === editItem.id ? editItem : x)); setEditItem(null); setToast("Updated!"); }}>Update</button>
                  <button style={S.btnSecondary} onClick={() => setEditItem(null)}>Cancel</button>
                </div>
              </div>
            )}
            <div style={{ overflowX: "auto" }}>
              <div style={{ background: "#161616", border: "1px solid #2a2a2a", borderRadius: 14, overflow: "hidden", minWidth: 480 }}>
                <table style={S.table}>
                  <thead><tr><th style={S.th}>Name</th><th style={S.th}>Category</th><th style={S.th}>Price</th><th style={S.th}>Type</th><th style={S.th}>Actions</th></tr></thead>
                  <tbody>
                    {menuItems.map(item => (
                      <tr key={item.id}>
                        <td style={S.td}><VegDot veg={item.veg} />{item.name}</td>
                        <td style={{ ...S.td, color: "#888" }}>{MENU_CATEGORIES.find(c => c.id === item.category)?.label}</td>
                        <td style={{ ...S.td, color: "#e63946", fontWeight: 700 }}>₹{item.price}</td>
                        <td style={S.td}><span style={{ ...S.badge, background: item.veg ? "#0a2a10" : "#2a0a0a", color: item.veg ? "#00ff6a" : "#ff6b6b", border: `1px solid ${item.veg ? "#1a5a20" : "#5a1a1a"}` }}>{item.veg ? "Veg" : "Non-Veg"}</span></td>
                        <td style={S.td}>
                          <div style={{ display: "flex", gap: 5 }}>
                            <button style={{ ...S.btnSecondary, padding: "4px 9px", fontSize: 11 }} onClick={() => setEditItem(item)}>Edit</button>
                            <button style={{ ...S.btnDanger, padding: "4px 9px", fontSize: 11 }} onClick={() => { setMenuItems(menuItems.filter(x => x.id !== item.id)); setToast("Deleted"); }}>Delete</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>}

          {/* COUPONS */}
          {page === "coupons" && <>
            <div style={{ fontSize: 19, fontWeight: 800, marginBottom: 18 }}>Coupon Management</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 12 }}>
              {coupons.map(c => (
                <div key={c.code} style={{ ...S.card, padding: 16 }}>
                  <div style={{ fontSize: 17, fontWeight: 900, color: "#e63946", letterSpacing: 2, marginBottom: 5 }}>{c.code}</div>
                  <div style={{ fontSize: 12, color: "#ccc", marginBottom: 3 }}>{c.desc}</div>
                  <div style={{ fontSize: 11, color: "#555", marginBottom: 9 }}>Min order: ₹{c.minOrder}</div>
                  <button style={{ ...S.btnDanger, fontSize: 11, padding: "4px 11px" }} onClick={() => { setCoupons(coupons.filter(x => x.code !== c.code)); setToast("Deleted"); }}>Delete</button>
                </div>
              ))}
            </div>
          </>}

          {/* CUSTOMERS */}
          {page === "customers" && <>
            <div style={{ fontSize: 19, fontWeight: 800, marginBottom: 18 }}>Customers ({customers.length})</div>
            <div style={{ overflowX: "auto" }}>
              <div style={{ background: "#161616", border: "1px solid #2a2a2a", borderRadius: 14, overflow: "hidden" }}>
                <table style={S.table}>
                  <thead><tr><th style={S.th}>Name</th><th style={S.th}>Email</th><th style={S.th}>Phone</th><th style={S.th}>Joined</th></tr></thead>
                  <tbody>
                    {customers.map(u => (
                      <tr key={u.id}>
                        <td style={S.td}>{u.name}</td>
                        <td style={S.td}>{u.email}</td>
                        <td style={S.td}>{u.phone}</td>
                        <td style={{ ...S.td, fontSize: 11, color: "#555" }}>{new Date(u.created_at).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {customers.length === 0 && <div style={{ textAlign: "center", color: "#555", padding: 40 }}>No customers yet</div>}
              </div>
            </div>
          </>}

        </div>
      </div>
    </div>
  );
}

// ── HOME PAGE ─────────────────────────────────────────────────────────────────
function HomePage({ onGoMenu }) {
  const featured = MENU_ITEMS.filter(i => i.popular).slice(0, 6);
  const offers = [
    { title: "10% OFF", desc: "on orders above ₹300", code: "MEDICOS10", color: "#e63946" },
    { title: "₹50 OFF", desc: "on your first order", code: "FIRST50", color: "#ff6b35" },
    { title: "20% OFF", desc: "on orders above ₹500", code: "SAVE20", color: "#c23b22" },
  ];
  return (
    <>
      <div style={S.hero}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(ellipse at 20% 50%, rgba(230,57,70,0.15) 0%, transparent 60%)" }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: "#e63946", letterSpacing: 4, textTransform: "uppercase", marginBottom: 10 }}>Welcome to Medicos Inn</div>
          <h1 style={S.heroTitle}>Good Food,<br /><span style={S.heroAccent}>Great Vibes 🔴</span></h1>
          <p style={S.heroSub}>Premium café — Dine-in, Pickup & Delivery</p>
          <button style={S.heroBtn} onClick={onGoMenu}>Order Now</button>
          <button style={S.heroBtnOutline} onClick={onGoMenu}>View Menu</button>
          <div style={{ display: "flex", justifyContent: "center", gap: "clamp(14px, 5vw, 32px)", marginTop: 36 }}>
            {[["110+", "Menu Items"], ["⭐ 4.8", "Rating"], ["Fast", "Delivery"]].map(([v, l]) => (
              <div key={l} style={{ textAlign: "center" }}>
                <div style={{ fontSize: 18, fontWeight: 900, color: "#e63946" }}>{v}</div>
                <div style={{ fontSize: 10, color: "#666" }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ ...S.section, paddingBottom: 0 }}>
        <div style={S.sectionTitle}>Today's Offers 🏷️</div>
        <div style={S.sectionSub}>Use these codes at checkout</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 12 }}>
          {offers.map(o => (
            <div key={o.code} style={{ background: `linear-gradient(135deg, ${o.color}22, #1a1a1a)`, border: `1px solid ${o.color}44`, borderRadius: 12, padding: "16px 18px" }}>
              <div style={{ fontSize: 24, fontWeight: 900, color: o.color }}>{o.title}</div>
              <div style={{ fontSize: 12, color: "#aaa", marginBottom: 9 }}>{o.desc}</div>
              <div style={{ background: "#1a1a1a", border: "1px dashed #3a3a3a", borderRadius: 7, padding: "4px 9px", display: "inline-block", fontFamily: "monospace", fontSize: 12, fontWeight: 700 }}>{o.code}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={S.section}>
        <div style={S.sectionTitle}>Most Popular 🔥</div>
        <div style={S.sectionSub}>Customer favourites</div>
        <div style={S.grid3}>
          {featured.map(item => {
            const emoji = MENU_CATEGORIES.find(c => c.id === item.category)?.icon || "🍴";
            return (
              <div key={item.id} style={{ ...S.card, padding: 14, display: "flex", gap: 12, alignItems: "center" }}>
                <div style={{ fontSize: 32, width: 52, height: 52, display: "flex", alignItems: "center", justifyContent: "center", background: "#1a1a1a", borderRadius: 10, flexShrink: 0 }}>{emoji}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 2 }}>{item.name}</div>
                  <div style={{ fontSize: 11, color: "#888", marginBottom: 5 }}>{item.desc}</div>
                  <div style={{ fontSize: 14, fontWeight: 800, color: "#e63946" }}>₹{item.price}</div>
                </div>
              </div>
            );
          })}
        </div>
        <div style={{ textAlign: "center", marginTop: 18 }}>
          <button style={{ ...S.btnPrimary, width: "auto", padding: "10px 24px" }} onClick={onGoMenu}>View Full Menu →</button>
        </div>
      </div>

      <div style={{ background: "#111", borderTop: "1px solid #1a1a1a", padding: "24px 16px", textAlign: "center" }}>
        <div style={{ fontSize: 11, color: "#888", marginBottom: 5 }}>Accepts UPI, Cards & Cash</div>
        <div style={{ fontSize: 11, color: "#555" }}>UPI: Q057269975@ybl | 📞 9175509001 / 9922333089</div>
      </div>
    </>
  );
}

// ── MENU PAGE ─────────────────────────────────────────────────────────────────
function MenuPage({ cart, onAdd, onRemove }) {
  const [activeCat, setActiveCat] = useState("all");
  const [search, setSearch] = useState("");
  const [vegOnly, setVegOnly] = useState(false);
  const getQty = item => (cart.find(x => x.id === item.id) || {}).qty || 0;
  const filtered = MENU_ITEMS.filter(i => {
    if (activeCat !== "all" && i.category !== activeCat) return false;
    if (vegOnly && !i.veg) return false;
    if (search && !i.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });
  return (
    <div style={S.section}>
      <div style={S.sectionTitle}>Our Menu</div>
      <div style={{ display: "flex", gap: 9, marginBottom: 14, flexWrap: "wrap" }}>
        <input style={{ ...S.input, flex: "1 1 160px" }} placeholder="🔍 Search dishes..." value={search} onChange={e => setSearch(e.target.value)} />
        <button style={{ ...S.catBtn, ...(vegOnly ? S.catBtnActive : {}), flexShrink: 0 }} onClick={() => setVegOnly(!vegOnly)}>🟢 Veg Only</button>
      </div>
      <div style={S.catBar}>
        <button style={{ ...S.catBtn, ...(activeCat === "all" ? S.catBtnActive : {}) }} onClick={() => setActiveCat("all")}>All</button>
        {MENU_CATEGORIES.map(c => (
          <button key={c.id} style={{ ...S.catBtn, ...(activeCat === c.id ? S.catBtnActive : {}) }} onClick={() => setActiveCat(c.id)}>
            {c.icon} {c.label}
          </button>
        ))}
      </div>
      <div style={{ marginTop: 14, marginBottom: 7, fontSize: 12, color: "#555" }}>{filtered.length} items</div>
      <div style={S.grid2}>
        {filtered.map(item => <MenuItemCard key={item.id} item={item} cartQty={getQty(item)} onAdd={onAdd} onRemove={onRemove} />)}
      </div>
      {filtered.length === 0 && <div style={{ textAlign: "center", color: "#555", padding: 50 }}>No items found 🍽️</div>}
    </div>
  );
}

// ── PROFILE PAGE ──────────────────────────────────────────────────────────────
function ProfilePage({ user }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.from("orders").select("*").eq("user_id", user.id).order("created_at", { ascending: false })
      .then(({ data }) => { if (data) setOrders(data); setLoading(false); });
  }, [user.id]);

  return (
    <div style={S.section}>
      <div style={S.sectionTitle}>My Profile</div>
      <div style={{ display: "grid", gridTemplateColumns: "clamp(160px, 28%, 220px) 1fr", gap: 18, marginTop: 14 }}>
        <div style={{ ...S.card, padding: 18 }}>
          <div style={{ width: 52, height: 52, borderRadius: "50%", background: "#2a0000", border: "2px solid #e63946", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, fontWeight: 800, color: "#e63946", marginBottom: 12 }}>
            {user.name?.charAt(0).toUpperCase()}
          </div>
          <div style={{ fontWeight: 800, fontSize: 15, marginBottom: 3 }}>{user.name}</div>
          <div style={{ color: "#888", fontSize: 12, marginBottom: 2 }}>{user.email}</div>
          <div style={{ color: "#888", fontSize: 12 }}>{user.phone}</div>
        </div>
        <div>
          <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 12 }}>Order History ({orders.length})</div>
          {loading && <div style={{ color: "#555", fontSize: 13 }}>Loading...</div>}
          {!loading && orders.length === 0 && <div style={{ color: "#555", fontSize: 13 }}>No orders yet!</div>}
          {orders.map(o => (
            <div key={o.id} style={{ ...S.card, padding: 12, marginBottom: 9 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                <span style={{ fontWeight: 700, fontSize: 13 }}>Order #{o.id}</span>
                <StatusBadge status={o.status} />
              </div>
              <div style={{ fontSize: 11, color: "#888", marginBottom: 4 }}>{(o.cart || []).map(i => `${i.qty}×${i.name}`).join(", ")}</div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontSize: 11, color: "#555" }}>{o.order_type} • {new Date(o.created_at).toLocaleDateString()}</span>
                <span style={{ fontWeight: 700, color: "#e63946", fontSize: 13 }}>₹{o.total}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── ROOT APP ──────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState("home");
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [showAuth, setShowAuth] = useState(false);
  const [toast, setToast] = useState(null);
  const [trackOrder, setTrackOrder] = useState(null);
  const [adminMode, setAdminMode] = useState(false);
  const [adminUser, setAdminUser] = useState(null);

  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700;800;900&display=swap";
    document.head.appendChild(link);
  }, []);

  function addToCart(item) {
    setCart(prev => {
      const ex = prev.find(x => x.id === item.id);
      if (ex) return prev.map(x => x.id === item.id ? { ...x, qty: x.qty + 1 } : x);
      return [...prev, { ...item, qty: 1 }];
    });
    setToast(`${item.name} added! 🛒`);
  }

  function removeFromCart(item) {
    setCart(prev => {
      const ex = prev.find(x => x.id === item.id);
      if (!ex || ex.qty === 1) return prev.filter(x => x.id !== item.id);
      return prev.map(x => x.id === item.id ? { ...x, qty: x.qty - 1 } : x);
    });
  }

  async function placeOrder(orderData) {
    const orderId = Date.now().toString().slice(-6);
    const order = {
      id: orderId,
      user_id: user?.id || null,
      customer_name: user?.name || "Guest",
      cart: orderData.cart,
      total: orderData.total,
      discount: orderData.discount || 0,
      order_type: orderData.orderType,
      table_no: orderData.tableNo || null,
      address: orderData.address || null,
      coupon: orderData.coupon || null,
      status: "pending",
    };
    const { data, error } = await supabase.from("orders").insert([order]).select().single();
    if (error) { setToast("Order place karne mein error! ❌"); return; }
    setCart([]);
    setCartOpen(false);
    setTrackOrder(data || order);
    setToast(`Order #${orderId} placed! 🎉`);
  }

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  if (adminMode) {
    if (!adminUser) return <AdminLogin onLogin={u => setAdminUser(u)} />;
    return <AdminDashboard user={adminUser} onLogout={() => { setAdminMode(false); setAdminUser(null); }} />;
  }

  return (
    <div style={S.app}>
      {toast && <Toast msg={toast} onDone={() => setToast(null)} />}
      {showAuth && <AuthModal onClose={() => setShowAuth(false)} onLogin={u => { setUser(u); setToast(`Welcome, ${u.name}! 👋`); }} />}
      {trackOrder && <OrderTracking order={trackOrder} onClose={() => setTrackOrder(null)} />}

      <nav style={S.nav}>
        <div style={S.logo} onClick={() => setPage("home")}>
          <div style={{ width: 30, height: 30, borderRadius: 8, background: "#e63946", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15 }}>🏥</div>
          <div>
            <div style={S.logoText}>MEDICOS INN</div>
            <div style={S.logoSub}>Premium Café</div>
          </div>
        </div>
        <div style={S.navLinks}>
          {[["home", "Home"], ["menu", "Menu"], ["profile", "Profile"]].map(([p, l]) => (
            <button key={p} style={{ ...S.navBtn, ...(page === p ? S.navBtnActive : {}) }} onClick={() => p === "profile" && !user ? setShowAuth(true) : setPage(p)}>{l}</button>
          ))}
          {!user
            ? <button style={S.navBtn} onClick={() => setShowAuth(true)}>Login</button>
            : <button style={{ ...S.navBtn, color: "#e63946", fontSize: 11 }} onClick={() => { setUser(null); setToast("Logged out"); }}>Logout</button>
          }
          <button style={{ ...S.navBtn, color: "#444", fontSize: 10 }} onClick={() => setAdminMode(true)}>Admin</button>
          <button style={S.cartBtn} onClick={() => setCartOpen(true)}>
            🛒 {cartCount > 0 && <span style={{ background: "#fff", color: "#e63946", borderRadius: "50%", width: 17, height: 17, display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 900 }}>{cartCount}</span>}
          </button>
        </div>
      </nav>

      {cartOpen && <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 150 }} onClick={() => setCartOpen(false)} />}
      {cartOpen && <CartSidebar cart={cart} onClose={() => setCartOpen(false)} onAdd={addToCart} onRemove={removeFromCart} onPlaceOrder={placeOrder} />}

      {page === "home" && <HomePage onGoMenu={() => setPage("menu")} />}
      {page === "menu" && <MenuPage cart={cart} onAdd={addToCart} onRemove={removeFromCart} />}
      {page === "profile" && user && <ProfilePage user={user} />}
      {page === "profile" && !user && (
        <div style={{ padding: 60, textAlign: "center" }}>
          <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>Please login to view profile</div>
          <button style={{ ...S.btnPrimary, width: "auto", padding: "10px 24px" }} onClick={() => setShowAuth(true)}>Login / Sign Up</button>
        </div>
      )}

      <footer style={{ background: "#0a0a0a", borderTop: "1px solid #1a1a1a", padding: "24px 16px", textAlign: "center" }}>
        <div style={{ fontSize: 16, fontWeight: 800, color: "#e63946", marginBottom: 3 }}>MEDICOS INN</div>
        <div style={{ fontSize: 11, color: "#555", marginBottom: 5 }}>Premium Café • Pune, Maharashtra</div>
        <div style={{ fontSize: 11, color: "#555" }}>📞 9175509001 / 9922333089 | UPI: Q057269975@ybl</div>
        <div style={{ fontSize: 10, color: "#333", marginTop: 10 }}>Buy Any 3 Rolls Get 1 Free! 🌯</div>
      </footer>
    </div>
  );
}
