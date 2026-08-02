'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { 
  Lock, 
  Trash2, 
  Plus, 
  Printer, 
  Download, 
  Building, 
  User, 
  FileText, 
  CreditCard, 
  LogOut, 
  Check, 
  RefreshCw,
  Eye,
  EyeOff
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Types for invoice
interface LineItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  gstRate: number; // percentage (e.g. 18)
}

interface CompanyProfile {
  companyName: string;
  brandName: string;
  registeredOfficeAddress: string;
  panNumber: string;
  bankAccountName: string;
  bankAccountNumber: string;
  ifscCode: string;
  upiId: string;
  documentTitle: string; // 'Commercial Invoice' | 'Sales Invoice'
  gstDeclaration: string;
}

interface ClientDetails {
  customerName: string;
  billingAddress: string;
  shippingAddress: string;
  sameAsBilling: boolean;
}

interface InvoiceDetails {
  invoiceNumber: string;
  dateOfIssue: string;
  gstType: 'intra' | 'inter'; // intra: CGST+SGST, inter: IGST
}

// Indian Currency Number to Words converter helper
function numberToIndianWords(num: number): string {
  if (num === 0) return 'Rupees Zero Only';

  const ones = [
    '', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten',
    'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'
  ];

  const tens = [
    '', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'
  ];

  const formatAmount = (n: number): string => {
    let str = '';
    if (n >= 10000000) {
      str += formatAmount(Math.floor(n / 10000000)) + ' Crore ';
      n %= 10000000;
    }
    if (n >= 100000) {
      str += formatAmount(Math.floor(n / 100000)) + ' Lakh ';
      n %= 100000;
    }
    if (n >= 1000) {
      str += formatAmount(Math.floor(n / 1000)) + ' Thousand ';
      n %= 1000;
    }
    if (n >= 100) {
      str += formatAmount(Math.floor(n / 100)) + ' Hundred ';
      n %= 100;
    }
    if (n > 0) {
      if (n < 20) {
        str += ones[n] + ' ';
      } else {
        str += tens[Math.floor(n / 10)] + ' ' + ones[n % 10] + ' ';
      }
    }
    return str.trim();
  };

  const integerPart = Math.floor(num);
  // Get decimal parts up to 2 places
  const decimalPart = Math.round((num - integerPart) * 100);

  let result = 'Rupees ' + formatAmount(integerPart);
  
  if (decimalPart > 0) {
    result += ' and ' + formatAmount(decimalPart) + ' Paise';
  }
  
  return result.trim() + ' Only';
}

// Format number as Indian Currency string
function formatIndianCurrency(amount: number): string {
  const formatter = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return formatter.format(amount);
}

// Generate sequential invoice numbers helper
function getNextInvoiceNumber(lastNum: string): string {
  if (!lastNum) return 'DL/2026-27/001';
  
  const match = lastNum.match(/(\d+)(?!.*\d)/);
  if (!match) {
    return lastNum + '-01';
  }
  
  const numStr = match[1];
  const numVal = parseInt(numStr, 10);
  const nextVal = numVal + 1;
  const padded = nextVal.toString().padStart(numStr.length, '0');
  const lastIndex = lastNum.lastIndexOf(numStr);
  return lastNum.substring(0, lastIndex) + padded + lastNum.substring(lastIndex + numStr.length);
}

export default function InvoiceClient() {
  // Auth state
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [authError, setAuthError] = useState<string>('');
  const [isCheckingAuth, setIsCheckingAuth] = useState<boolean>(true);

  // App workspace active tab
  const [activeTab, setActiveTab] = useState<'profile' | 'client' | 'items'>('client');
  
  // Settings profile state (persisted)
  const [companyProfile, setCompanyProfile] = useState<CompanyProfile>({
    companyName: 'A2Z Version Private Limited',
    brandName: 'DotnLott',
    registeredOfficeAddress: 'Registered Office: MIG-94, Chitra, CDA Sector-6, Cuttack, Odisha, India - 753014',
    panNumber: 'AAICA7502R',
    bankAccountName: 'A2Z Version Private Limited',
    bankAccountNumber: '926020038834928',
    ifscCode: 'UTIB0000213',
    upiId: 'connect@dotnlott',
    documentTitle: 'Commercial Invoice',
    gstDeclaration: 'We declare that this invoice shows the actual price of the goods/services described and that all particulars are true and correct.',
  });

  // Client Details state (variables)
  const [clientDetails, setClientDetails] = useState<ClientDetails>({
    customerName: '',
    billingAddress: '',
    shippingAddress: '',
    sameAsBilling: true,
  });

  // Invoice variables state
  const [invoiceDetails, setInvoiceDetails] = useState<InvoiceDetails>({
    invoiceNumber: 'DL/2026-27/001',
    dateOfIssue: new Date().toISOString().split('T')[0],
    gstType: 'intra',
  });

  // Line items state
  const [lineItems, setLineItems] = useState<LineItem[]>([
    {
      id: '1',
      description: 'Workflow Automation Setup & Consulting',
      quantity: 1,
      unitPrice: 25000,
      gstRate: 18,
    }
  ]);

  // Profile Save Alert Status
  const [saveStatus, setSaveStatus] = useState<string>('');

  // Check auth on load
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const auth = localStorage.getItem('dotnlott_invoice_authenticated');
      if (auth === 'true') {
        setIsAuthenticated(true);
      }
      
      // Load saved company profile
      const savedProfile = localStorage.getItem('dotnlott_company_profile');
      if (savedProfile) {
        try {
          setCompanyProfile(JSON.parse(savedProfile));
        } catch (e) {
          console.error('Error loading company profile', e);
        }
      }

      // Load last invoice number to suggest the next one
      const lastInvoiceNum = localStorage.getItem('dotnlott_last_invoice_number');
      if (lastInvoiceNum) {
        setInvoiceDetails(prev => ({
          ...prev,
          invoiceNumber: getNextInvoiceNumber(lastInvoiceNum),
        }));
      }
      
      setIsCheckingAuth(false);
    }
  }, []);

  // Handle Login submission
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === 'connect@dotnlott.com' && (password === 'Welinv123#' || password === 'Welinv123#..')) {
      localStorage.setItem('dotnlott_invoice_authenticated', 'true');
      setIsAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError('Invalid username or password. Please try again.');
    }
  };

  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem('dotnlott_invoice_authenticated');
    setIsAuthenticated(false);
    setEmail('');
    setPassword('');
  };

  // Save company profile manually or alert on save
  const handleSaveProfile = () => {
    localStorage.setItem('dotnlott_company_profile', JSON.stringify(companyProfile));
    setSaveStatus('Profile Saved Successfully!');
    setTimeout(() => setSaveStatus(''), 3000);
  };

  // Handle adding line item
  const addLineItem = () => {
    const newItem: LineItem = {
      id: Date.now().toString(),
      description: '',
      quantity: 1,
      unitPrice: 0,
      gstRate: 18,
    };
    setLineItems([...lineItems, newItem]);
  };

  // Handle removing line item
  const removeLineItem = (id: string) => {
    if (lineItems.length > 1) {
      setLineItems(lineItems.filter(item => item.id !== id));
    }
  };

  // Handle changing item field
  const handleItemChange = (id: string, field: keyof LineItem, val: string | number) => {
    setLineItems(lineItems.map(item => {
      if (item.id === id) {
        return {
          ...item,
          [field]: val,
        };
      }
      return item;
    }));
  };

  // Financial calculations
  const itemsSubtotal = lineItems.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0);
  
  // Calculate total taxes
  const totalTaxAmount = lineItems.reduce((sum, item) => {
    const sub = item.quantity * item.unitPrice;
    return sum + (sub * (item.gstRate / 100));
  }, 0);

  const grandTotal = itemsSubtotal + totalTaxAmount;

  // Breakdown tax amounts per rate for CGST, SGST, IGST
  const getTaxBreakdown = () => {
    let cgstTotal = 0;
    let sgstTotal = 0;
    let igstTotal = 0;

    lineItems.forEach(item => {
      const sub = item.quantity * item.unitPrice;
      const tax = sub * (item.gstRate / 100);
      if (invoiceDetails.gstType === 'intra') {
        cgstTotal += tax / 2;
        sgstTotal += tax / 2;
      } else {
        igstTotal += tax;
      }
    });

    return { cgstTotal, sgstTotal, igstTotal };
  };

  const { cgstTotal, sgstTotal, igstTotal } = getTaxBreakdown();

  // Print function
  const triggerPrint = () => {
    // Save last invoice number to localStorage when printing, so we can suggest next +1 next time
    localStorage.setItem('dotnlott_last_invoice_number', invoiceDetails.invoiceNumber);
    window.print();
  };

  // Auth Guard Screen
  if (isCheckingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-100">
        <div className="flex flex-col items-center gap-3">
          <RefreshCw className="animate-spin text-brand-purple w-8 h-8" />
          <p className="text-slate-400 text-sm">Securing terminal...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4 bg-slate-950 py-12 relative overflow-hidden select-none">
        {/* Gradients */}
        <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-brand-purple/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-96 h-96 bg-brand-blue/10 rounded-full blur-[120px] pointer-events-none" />
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md bg-slate-900/60 backdrop-blur-xl border border-slate-800 p-8 rounded-2xl shadow-2xl relative z-10"
        >
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center p-3 bg-brand-purple/10 border border-brand-purple/20 rounded-xl mb-4 text-brand-purple">
              <Lock className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-white">Invoice Portal</h1>
            <p className="text-slate-400 text-sm mt-2">Access restricted to authorized team members</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Username / Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="connect@dotnlott.com"
                className="w-full bg-slate-950 border border-slate-800 focus:border-brand-purple focus:ring-1 focus:ring-brand-purple rounded-lg px-4 py-3 text-slate-100 text-sm outline-none transition-all placeholder:text-slate-600"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-950 border border-slate-800 focus:border-brand-purple focus:ring-1 focus:ring-brand-purple rounded-lg pl-4 pr-10 py-3 text-slate-100 text-sm outline-none transition-all placeholder:text-slate-600"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {authError && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="text-red-400 text-xs font-medium bg-red-950/30 border border-red-900/50 rounded-lg p-3"
              >
                {authError}
              </motion.div>
            )}

            <button
              type="submit"
              className="w-full flex items-center justify-center py-3 bg-gradient-to-r from-brand-blue to-brand-purple text-white font-semibold text-sm rounded-lg hover:brightness-110 active:scale-[0.98] transition-all cursor-pointer shadow-lg shadow-brand-purple/20"
            >
              Sign In to Portal
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  // Authenticated Dashboard
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col relative overflow-x-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-purple/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-blue/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Styled block injection for printing */}
      <style jsx global>{`
        @media print {
          /* Hide standard screen components completely */
          header, 
          footer, 
          nav, 
          .no-print, 
          .whatsapp-btn,
          .scroll-to-top,
          aside,
          button {
            display: none !important;
          }
          /* Reset root styles and layout */
          html, body {
            background-color: #ffffff !important;
            color: #000000 !important;
            font-family: 'Inter', sans-serif !important;
            margin: 0 !important;
            padding: 0 !important;
            width: 210mm !important;
            height: 297mm !important;
          }
          main {
            padding-top: 0 !important;
            margin: 0 !important;
            flex-grow: 0 !important;
          }
          /* Center the invoice content page */
          .print-wrapper {
            position: absolute !important;
            top: 0 !important;
            left: 0 !important;
            width: 210mm !important;
            height: 297mm !important;
            padding: 15mm !important;
            background: #ffffff !important;
            border: none !important;
            box-shadow: none !important;
            margin: 0 !important;
            color: #000000 !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          .invoice-table th {
            background-color: #f1f5f9 !important;
            color: #0f172a !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
        }
        @page {
          size: A4;
          margin: 0;
        }
      `}</style>

      {/* Top Admin Header */}
      <div className="no-print border-b border-slate-800 bg-slate-900/60 backdrop-blur-md px-6 py-4 flex items-center justify-between z-10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-white p-1 flex items-center justify-center">
            <Image src="/logo-v2.png" alt="Logo" width={24} height={24} className="object-contain" />
          </div>
          <div>
            <h2 className="text-sm font-bold tracking-tight text-white">DotnLott Invoice Panel</h2>
            <p className="text-[10px] text-slate-400">Manage internal invoices and print PDF sheets</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-xs bg-slate-800 border border-slate-700 px-3 py-1 rounded-full text-slate-300 font-medium flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            connect@dotnlott.com
          </span>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1 text-slate-400 hover:text-red-400 text-xs font-semibold bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg transition-all cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            Logout
          </button>
        </div>
      </div>

      {/* Main Workspace */}
      <div className="flex-grow flex flex-col lg:flex-row gap-6 max-w-7xl w-full mx-auto p-4 sm:p-6 z-10">
        
        {/* Left Side: Forms Configuration */}
        <div className="no-print w-full lg:w-[45%] flex flex-col gap-6">
          <div className="bg-slate-900/80 border border-slate-850 rounded-xl p-5 shadow-xl">
            {/* Tabs Selector */}
            <div className="flex bg-slate-950 p-1 rounded-lg border border-slate-800 mb-6">
              <button
                onClick={() => setActiveTab('client')}
                className={`flex-1 flex items-center justify-center gap-2 py-2 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                  activeTab === 'client' 
                    ? 'bg-slate-800 text-white border border-slate-700 shadow-md' 
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <User className="w-3.5 h-3.5" />
                Customer
              </button>
              <button
                onClick={() => setActiveTab('items')}
                className={`flex-1 flex items-center justify-center gap-2 py-2 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                  activeTab === 'items' 
                    ? 'bg-slate-800 text-white border border-slate-700 shadow-md' 
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                Line Items
              </button>
              <button
                onClick={() => setActiveTab('profile')}
                className={`flex-1 flex items-center justify-center gap-2 py-2 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                  activeTab === 'profile' 
                    ? 'bg-slate-800 text-white border border-slate-700 shadow-md' 
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Building className="w-3.5 h-3.5" />
                Company Profile
              </button>
            </div>

            {/* Tab Body */}
            <div>
              {/* Tab 1: Customer Details */}
              {activeTab === 'client' && (
                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-white mb-2 flex items-center gap-1.5">
                    <span>1. Invoice Metadata</span>
                  </h3>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Invoice No</label>
                      <input
                        type="text"
                        value={invoiceDetails.invoiceNumber}
                        onChange={(e) => setInvoiceDetails({...invoiceDetails, invoiceNumber: e.target.value})}
                        className="w-full bg-slate-950 border border-slate-800 focus:border-brand-purple focus:ring-1 focus:ring-brand-purple rounded-lg px-3 py-2 text-slate-200 text-sm outline-none transition-all"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Date of Issue</label>
                      <input
                        type="date"
                        value={invoiceDetails.dateOfIssue}
                        onChange={(e) => setInvoiceDetails({...invoiceDetails, dateOfIssue: e.target.value})}
                        className="w-full bg-slate-950 border border-slate-800 focus:border-brand-purple focus:ring-1 focus:ring-brand-purple rounded-lg px-3 py-2 text-slate-200 text-sm outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">GST Treatment</label>
                    <select
                      value={invoiceDetails.gstType}
                      onChange={(e) => setInvoiceDetails({...invoiceDetails, gstType: e.target.value as 'intra' | 'inter'})}
                      className="w-full bg-slate-950 border border-slate-800 focus:border-brand-purple focus:ring-1 focus:ring-brand-purple rounded-lg px-3 py-2 text-slate-200 text-sm outline-none transition-all cursor-pointer"
                    >
                      <option value="intra">Intra-State (CGST + SGST) - In Odisha Billing</option>
                      <option value="inter">Inter-State (IGST) - Outside Odisha Billing</option>
                    </select>
                  </div>

                  <hr className="border-slate-800 my-4" />
                  
                  <h3 className="text-sm font-bold text-white mb-2">2. Client Billing Details</h3>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Customer Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Acme Corp Inc."
                      value={clientDetails.customerName}
                      onChange={(e) => setClientDetails({...clientDetails, customerName: e.target.value})}
                      className="w-full bg-slate-950 border border-slate-800 focus:border-brand-purple focus:ring-1 focus:ring-brand-purple rounded-lg px-3 py-2 text-slate-200 text-sm outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Billing Address</label>
                    <textarea
                      placeholder="Enter billing address here..."
                      rows={3}
                      value={clientDetails.billingAddress}
                      onChange={(e) => {
                        const addr = e.target.value;
                        setClientDetails({
                          ...clientDetails,
                          billingAddress: addr,
                          shippingAddress: clientDetails.sameAsBilling ? addr : clientDetails.shippingAddress
                        });
                      }}
                      className="w-full bg-slate-950 border border-slate-800 focus:border-brand-purple focus:ring-1 focus:ring-brand-purple rounded-lg px-3 py-2 text-slate-200 text-sm outline-none transition-all resize-none"
                    />
                  </div>

                  <div className="flex items-center justify-between py-1 bg-slate-950/40 px-3 rounded-lg border border-slate-900">
                    <span className="text-xs font-medium text-slate-300">Shipping same as Billing</span>
                    <button
                      type="button"
                      onClick={() => {
                        const nextVal = !clientDetails.sameAsBilling;
                        setClientDetails({
                          ...clientDetails,
                          sameAsBilling: nextVal,
                          shippingAddress: nextVal ? clientDetails.billingAddress : ''
                        });
                      }}
                      className={`relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out outline-none ${
                        clientDetails.sameAsBilling ? 'bg-brand-purple' : 'bg-slate-750'
                      }`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                          clientDetails.sameAsBilling ? 'translate-x-4' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>

                  {!clientDetails.sameAsBilling && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="space-y-1.5"
                    >
                      <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Shipping Address</label>
                      <textarea
                        placeholder="Enter shipping address here..."
                        rows={3}
                        value={clientDetails.shippingAddress}
                        onChange={(e) => setClientDetails({...clientDetails, shippingAddress: e.target.value})}
                        className="w-full bg-slate-950 border border-slate-800 focus:border-brand-purple focus:ring-1 focus:ring-brand-purple rounded-lg px-3 py-2 text-slate-200 text-sm outline-none transition-all resize-none"
                      />
                    </motion.div>
                  )}
                </div>
              )}

              {/* Tab 2: Itemised Goods / Services */}
              {activeTab === 'items' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-bold text-white">Billing Items List</h3>
                    <button
                      onClick={addLineItem}
                      className="flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-white bg-brand-purple px-3 py-1.5 rounded-lg hover:bg-brand-purple/90 transition-all cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      Add Item
                    </button>
                  </div>

                  <div className="space-y-4 max-h-[50vh] overflow-y-auto pr-1">
                    {lineItems.map((item, index) => (
                      <div key={item.id} className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-3 relative group">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-semibold text-slate-500">Item #{index + 1}</span>
                          {lineItems.length > 1 && (
                            <button
                              onClick={() => removeLineItem(item.id)}
                              className="text-slate-500 hover:text-red-400 transition-colors p-1"
                              title="Delete Item"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>

                        <div>
                          <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1">Description / Services</label>
                          <input
                            type="text"
                            placeholder="e.g. Website development or SEO audit"
                            value={item.description}
                            onChange={(e) => handleItemChange(item.id, 'description', e.target.value)}
                            className="w-full bg-slate-900 border border-slate-800 focus:border-brand-purple focus:ring-1 focus:ring-brand-purple rounded-lg px-3 py-2 text-slate-200 text-sm outline-none transition-all"
                          />
                        </div>

                        <div className="grid grid-cols-3 gap-3">
                          <div>
                            <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1">Quantity</label>
                            <input
                              type="number"
                              min="1"
                              value={item.quantity}
                              onChange={(e) => handleItemChange(item.id, 'quantity', parseInt(e.target.value, 10) || 0)}
                              className="w-full bg-slate-900 border border-slate-800 focus:border-brand-purple focus:ring-1 focus:ring-brand-purple rounded-lg px-3 py-2 text-slate-200 text-sm outline-none transition-all"
                            />
                          </div>

                          <div>
                            <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1">Unit Price (₹)</label>
                            <input
                              type="number"
                              min="0"
                              value={item.unitPrice}
                              onChange={(e) => handleItemChange(item.id, 'unitPrice', parseFloat(e.target.value) || 0)}
                              className="w-full bg-slate-900 border border-slate-800 focus:border-brand-purple focus:ring-1 focus:ring-brand-purple rounded-lg px-3 py-2 text-slate-200 text-sm outline-none transition-all"
                            />
                          </div>

                          <div>
                            <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1">GST Rate (%)</label>
                            <select
                              value={item.gstRate}
                              onChange={(e) => handleItemChange(item.id, 'gstRate', parseInt(e.target.value, 10) || 0)}
                              className="w-full bg-slate-900 border border-slate-800 focus:border-brand-purple focus:ring-1 focus:ring-brand-purple rounded-lg px-3 py-2 text-slate-200 text-sm outline-none transition-all cursor-pointer"
                            >
                              <option value="0">0%</option>
                              <option value="5">5%</option>
                              <option value="12">12%</option>
                              <option value="18">18%</option>
                              <option value="28">28%</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tab 3: Company Profile Constants */}
              {activeTab === 'profile' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-bold text-white">Company Profile (Reused)</h3>
                    {saveStatus && (
                      <span className="text-[11px] font-semibold text-emerald-400 flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" />
                        {saveStatus}
                      </span>
                    )}
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Official Company Name</label>
                    <input
                      type="text"
                      value={companyProfile.companyName}
                      onChange={(e) => setCompanyProfile({...companyProfile, companyName: e.target.value})}
                      className="w-full bg-slate-950 border border-slate-800 focus:border-brand-purple focus:ring-1 focus:ring-brand-purple rounded-lg px-3 py-2 text-slate-200 text-sm outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Brand Name</label>
                    <input
                      type="text"
                      value={companyProfile.brandName}
                      onChange={(e) => setCompanyProfile({...companyProfile, brandName: e.target.value})}
                      className="w-full bg-slate-950 border border-slate-800 focus:border-brand-purple focus:ring-1 focus:ring-brand-purple rounded-lg px-3 py-2 text-slate-200 text-sm outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Registered Office Address</label>
                    <textarea
                      rows={2}
                      value={companyProfile.registeredOfficeAddress}
                      onChange={(e) => setCompanyProfile({...companyProfile, registeredOfficeAddress: e.target.value})}
                      className="w-full bg-slate-950 border border-slate-800 focus:border-brand-purple focus:ring-1 focus:ring-brand-purple rounded-lg px-3 py-2 text-slate-200 text-sm outline-none transition-all resize-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">PAN / CIN Number</label>
                      <input
                        type="text"
                        value={companyProfile.panNumber}
                        onChange={(e) => setCompanyProfile({...companyProfile, panNumber: e.target.value})}
                        className="w-full bg-slate-950 border border-slate-800 focus:border-brand-purple focus:ring-1 focus:ring-brand-purple rounded-lg px-3 py-2 text-slate-200 text-sm outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Document Title</label>
                      <select
                        value={companyProfile.documentTitle}
                        onChange={(e) => setCompanyProfile({...companyProfile, documentTitle: e.target.value})}
                        className="w-full bg-slate-950 border border-slate-800 focus:border-brand-purple focus:ring-1 focus:ring-brand-purple rounded-lg px-3 py-2 text-slate-200 text-sm outline-none transition-all cursor-pointer"
                      >
                        <option value="Commercial Invoice">Commercial Invoice</option>
                        <option value="Sales Invoice">Sales Invoice</option>
                      </select>
                    </div>
                  </div>

                  <hr className="border-slate-800 my-2" />
                  <h4 className="text-xs font-bold text-slate-350">Bank Account & Payment Details</h4>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Bank Account Name</label>
                    <input
                      type="text"
                      value={companyProfile.bankAccountName}
                      onChange={(e) => setCompanyProfile({...companyProfile, bankAccountName: e.target.value})}
                      className="w-full bg-slate-950 border border-slate-800 focus:border-brand-purple focus:ring-1 focus:ring-brand-purple rounded-lg px-3 py-2 text-slate-200 text-sm outline-none transition-all"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Account Number</label>
                      <input
                        type="text"
                        value={companyProfile.bankAccountNumber}
                        onChange={(e) => setCompanyProfile({...companyProfile, bankAccountNumber: e.target.value})}
                        className="w-full bg-slate-950 border border-slate-800 focus:border-brand-purple focus:ring-1 focus:ring-brand-purple rounded-lg px-3 py-2 text-slate-200 text-sm outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">IFSC Code</label>
                      <input
                        type="text"
                        value={companyProfile.ifscCode}
                        onChange={(e) => setCompanyProfile({...companyProfile, ifscCode: e.target.value})}
                        className="w-full bg-slate-950 border border-slate-800 focus:border-brand-purple focus:ring-1 focus:ring-brand-purple rounded-lg px-3 py-2 text-slate-200 text-sm outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">UPI ID</label>
                    <input
                      type="text"
                      value={companyProfile.upiId}
                      onChange={(e) => setCompanyProfile({...companyProfile, upiId: e.target.value})}
                      className="w-full bg-slate-950 border border-slate-800 focus:border-brand-purple focus:ring-1 focus:ring-brand-purple rounded-lg px-3 py-2 text-slate-200 text-sm outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">GST Declaration Text</label>
                    <textarea
                      rows={2}
                      value={companyProfile.gstDeclaration}
                      onChange={(e) => setCompanyProfile({...companyProfile, gstDeclaration: e.target.value})}
                      className="w-full bg-slate-950 border border-slate-800 focus:border-brand-purple focus:ring-1 focus:ring-brand-purple rounded-lg px-3 py-2 text-slate-200 text-sm outline-none transition-all resize-none"
                    />
                  </div>

                  <button
                    onClick={handleSaveProfile}
                    className="w-full py-2.5 bg-gradient-to-r from-brand-blue to-brand-purple text-white text-xs font-bold uppercase tracking-wider rounded-lg hover:brightness-110 transition-all cursor-pointer shadow-md shadow-brand-purple/10"
                  >
                    Save Company Profile (Persist)
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button
              onClick={() => {
                // Clear billing parameters
                setClientDetails({
                  customerName: '',
                  billingAddress: '',
                  shippingAddress: '',
                  sameAsBilling: true,
                });
                setLineItems([
                  {
                    id: Date.now().toString(),
                    description: '',
                    quantity: 1,
                    unitPrice: 0,
                    gstRate: 18,
                  }
                ]);
              }}
              className="flex-1 py-3 bg-slate-900 border border-slate-800 text-slate-300 font-semibold text-sm rounded-lg hover:bg-slate-850 transition-all cursor-pointer flex items-center justify-center gap-1.5"
            >
              Clear Invoice
            </button>
            <button
              onClick={triggerPrint}
              className="flex-1 py-3 bg-white text-slate-950 font-bold text-sm rounded-lg hover:bg-slate-100 transition-all cursor-pointer flex items-center justify-center gap-2 shadow-lg hover:scale-[1.01]"
            >
              <Printer className="w-4 h-4" />
              Print / Save PDF
            </button>
          </div>
          
          <div className="bg-slate-900/40 border border-slate-850 p-4 rounded-xl text-slate-400 text-xs flex flex-col gap-2">
            <p className="font-semibold text-slate-350">💡 Pro Tip for Perfect PDFs:</p>
            <ul className="list-disc pl-4 space-y-1">
              <li>Keep billing items concise to fit beautifully onto exactly one A4 page.</li>
              <li>When the print dialog opens, set the Destination to <b>"Save as PDF"</b>.</li>
              <li>Under More Settings, uncheck <b>"Headers and footers"</b> and set Margins to <b>"None"</b> or <b>"Default"</b>.</li>
            </ul>
          </div>
        </div>

        {/* Right Side: Interactive Invoice Sheet Visualizer */}
        <div className="w-full lg:w-[55%] flex justify-center">
          <div className="w-full max-w-[210mm] sticky top-28 mb-12">
            {/* Visualizer Frame */}
            <div className="no-print w-full bg-slate-900/40 border border-slate-850 px-4 py-2 rounded-t-xl flex justify-between items-center text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-brand-purple" />
                Live Print Layout Preview
              </span>
              <span>A4 Paper (210mm × 297mm)</span>
            </div>

            {/* The Print Sheet Container */}
            <div className="print-wrapper w-full aspect-[1/1.414] min-h-[297mm] bg-white text-slate-900 p-8 sm:p-10 shadow-2xl rounded-b-xl border border-slate-200 overflow-hidden flex flex-col justify-between select-text">
              
              {/* Header: Brand and Company Details */}
              <div className="space-y-6">
                <div className="flex justify-between items-start border-b border-slate-200 pb-6">
                  <div className="space-y-2">
                    {/* Brand Identifier */}
                    <div className="flex items-center gap-2">
                      <div className="relative w-8 h-8 flex items-center justify-center bg-slate-950 text-white rounded p-1">
                        <Image src="/logo.png" alt="Logo" width={24} height={24} className="object-contain filter invert" />
                      </div>
                      <span className="text-xl font-bold tracking-tight text-slate-900">
                        {companyProfile.brandName}
                      </span>
                    </div>
                    {/* Company Legal details */}
                    <div className="text-[11px] text-slate-600 leading-relaxed max-w-sm">
                      <p className="font-bold text-slate-800">{companyProfile.companyName}</p>
                      <p className="whitespace-pre-wrap">{companyProfile.registeredOfficeAddress}</p>
                      <p className="font-semibold text-slate-700 mt-1">PAN: {companyProfile.panNumber}</p>
                    </div>
                  </div>

                  <div className="text-right space-y-1">
                    <h1 className="text-xl font-bold tracking-tight text-slate-800 uppercase">{companyProfile.documentTitle}</h1>
                    <div className="text-[11px] text-slate-600 pt-1">
                      <p><span className="font-semibold text-slate-700">Invoice No:</span> {invoiceDetails.invoiceNumber}</p>
                      <p><span className="font-semibold text-slate-700">Date of Issue:</span> {invoiceDetails.dateOfIssue}</p>
                    </div>
                  </div>
                </div>

                {/* Billing Addresses Layout */}
                <div className="grid grid-cols-2 gap-6 text-[11px]">
                  {/* Bill To */}
                  <div className="space-y-1.5 p-3.5 bg-slate-50 border border-slate-100 rounded-lg">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Bill To:</span>
                    <div className="text-slate-800 leading-relaxed">
                      <p className="font-bold text-slate-900 text-xs">{clientDetails.customerName || '—'}</p>
                      <p className="whitespace-pre-wrap mt-1">{clientDetails.billingAddress || '—'}</p>
                    </div>
                  </div>

                  {/* Ship To */}
                  <div className="space-y-1.5 p-3.5 bg-slate-50 border border-slate-100 rounded-lg">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Ship To:</span>
                    <div className="text-slate-800 leading-relaxed">
                      {clientDetails.sameAsBilling ? (
                        <>
                          <p className="font-bold text-slate-900 text-xs">{clientDetails.customerName || '—'}</p>
                          <p className="whitespace-pre-wrap mt-1">{clientDetails.billingAddress || '—'}</p>
                        </>
                      ) : (
                        <>
                          <p className="font-bold text-slate-900 text-xs">{clientDetails.customerName || '—'}</p>
                          <p className="whitespace-pre-wrap mt-1">{clientDetails.shippingAddress || '—'}</p>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Items Table */}
                <div className="border border-slate-200 rounded-lg overflow-hidden">
                  <table className="invoice-table w-full text-left border-collapse text-[11px]">
                    <thead>
                      <tr className="bg-slate-100 border-b border-slate-200 text-slate-800 font-bold">
                        <th className="py-2.5 px-3 w-12 text-center">#</th>
                        <th className="py-2.5 px-3">Description of Service</th>
                        <th className="py-2.5 px-3 text-center w-16">Qty</th>
                        <th className="py-2.5 px-3 text-right w-24">Unit Price</th>
                        <th className="py-2.5 px-3 text-center w-16">GST (%)</th>
                        <th className="py-2.5 px-3 text-right w-28">Amount</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {lineItems.map((item, idx) => {
                        const amount = item.quantity * item.unitPrice;
                        return (
                          <tr key={item.id} className="hover:bg-slate-50/50">
                            <td className="py-2.5 px-3 text-center text-slate-500">{idx + 1}</td>
                            <td className="py-2.5 px-3 font-medium text-slate-900 whitespace-pre-wrap">{item.description || '—'}</td>
                            <td className="py-2.5 px-3 text-center">{item.quantity}</td>
                            <td className="py-2.5 px-3 text-right">{formatIndianCurrency(item.unitPrice)}</td>
                            <td className="py-2.5 px-3 text-center">{item.gstRate}%</td>
                            <td className="py-2.5 px-3 text-right font-semibold">{formatIndianCurrency(amount)}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {/* Calculations & Totals Panel */}
                <div className="grid grid-cols-12 gap-4">
                  <div className="col-span-7 space-y-4">
                    {/* Amount in words */}
                    <div className="p-3 bg-slate-50 border border-slate-150 rounded-lg text-[10px]">
                      <p className="font-bold text-slate-400 uppercase tracking-wider mb-1">Total Amount in Words:</p>
                      <p className="font-semibold text-slate-800 leading-relaxed italic">{numberToIndianWords(grandTotal)}</p>
                    </div>

                    {/* Bank Details section */}
                    <div className="space-y-1.5 text-[10px] border border-slate-200 p-3 rounded-lg bg-slate-50/50">
                      <p className="font-bold text-slate-700 uppercase tracking-wider border-b border-slate-200 pb-1 flex items-center gap-1">
                        <CreditCard className="w-3 h-3 text-slate-400" />
                        Bank Payment Instructions
                      </p>
                      <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-slate-700">
                        <p><span className="font-medium text-slate-500">Account Name:</span></p>
                        <p className="font-semibold">{companyProfile.bankAccountName || '—'}</p>
                        
                        <p><span className="font-medium text-slate-500">Account Number:</span></p>
                        <p className="font-semibold tracking-wider">{companyProfile.bankAccountNumber || '—'}</p>
                        
                        <p><span className="font-medium text-slate-500">IFSC Code:</span></p>
                        <p className="font-semibold tracking-wider">{companyProfile.ifscCode || '—'}</p>
                        
                        {companyProfile.upiId && (
                          <>
                            <p><span className="font-medium text-slate-500">UPI ID:</span></p>
                            <p className="font-semibold text-brand-blue">{companyProfile.upiId}</p>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="col-span-5 flex flex-col justify-end text-[11px] space-y-2">
                    <div className="flex justify-between py-1 border-b border-slate-100 text-slate-600">
                      <span>Subtotal:</span>
                      <span className="font-medium">{formatIndianCurrency(itemsSubtotal)}</span>
                    </div>

                    {invoiceDetails.gstType === 'intra' ? (
                      <>
                        <div className="flex justify-between py-1 border-b border-slate-100 text-slate-600">
                          <span>CGST:</span>
                          <span className="font-medium">{formatIndianCurrency(cgstTotal)}</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-slate-100 text-slate-600">
                          <span>SGST:</span>
                          <span className="font-medium">{formatIndianCurrency(sgstTotal)}</span>
                        </div>
                      </>
                    ) : (
                      <div className="flex justify-between py-1 border-b border-slate-100 text-slate-600">
                        <span>IGST:</span>
                        <span className="font-medium">{formatIndianCurrency(igstTotal)}</span>
                      </div>
                    )}

                    <div className="flex justify-between py-1 border-b border-slate-200 text-slate-600">
                      <span>Total GST:</span>
                      <span className="font-medium">{formatIndianCurrency(totalTaxAmount)}</span>
                    </div>

                    <div className="flex justify-between py-2 text-slate-900 font-bold bg-slate-100 px-3 rounded-lg text-xs">
                      <span>Grand Total:</span>
                      <span>{formatIndianCurrency(grandTotal)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer Declaration & Signatures */}
              <div className="mt-8 border-t border-slate-200 pt-6 space-y-6">
                <div className="grid grid-cols-12 gap-4 text-[10px] items-end">
                  {/* Disclaimer Declaration */}
                  <div className="col-span-8 space-y-1 text-slate-500">
                    <p className="font-bold text-slate-700 uppercase tracking-wider">Declaration:</p>
                    <p className="leading-relaxed whitespace-pre-wrap">{companyProfile.gstDeclaration}</p>
                  </div>

                  {/* Signature area */}
                  <div className="col-span-4 text-center space-y-12">
                    <div className="text-slate-800">
                      <p className="font-bold text-[9px] text-slate-500 uppercase tracking-wider">For {companyProfile.companyName}</p>
                    </div>
                    <div className="border-t border-slate-300 pt-1.5">
                      <p className="font-semibold text-slate-700">Authorized Signatory</p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
